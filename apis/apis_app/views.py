from django.shortcuts import render
from django.db import transaction
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from apis_app.models import Product, Order, OrderDetail
from apis_app.serializers import ProductSerializer, CustomerSerializer, UserSerializer, OrderSerializer, OrderDetailSerializer
from apis_app.helper import Helper

import time, json, copy


# Create your views here.
class ProductView(viewsets.ModelViewSet):
    @action(detail=True, methods=["get"])
    def products(self, request):
        req_params = request.query_params
        if 'latestProducts' in req_params and req_params['latestProducts'] == "1":
            products_set = Product.objects.all().order_by('-id')[:4]
        elif 'categoryId' in req_params and req_params['categoryId'] != "0":
            products_set = Product.objects.filter(product_category=req_params['categoryId']).all()
        else:
            products_set = Product.objects.all()
        serializer = ProductSerializer(products_set, many=True)
        return Response({"status": "success", "data": serializer.data })

    @action(detail=True, methods=["get"])
    def product(self, request, product_id):
        product_set = Product.objects.get(pk=product_id)
        serializer = ProductSerializer(product_set)
        return Response({"status": "success", "data": serializer.data})
        

class CustomerView(viewsets.ModelViewSet):
    @action(detail=True, methods=['post'])
    def register(self, request):
        transaction.set_autocommit(False)
        data = request.data
        db_data1 = { "username": data["email"], "email": data["email"], "password": make_password(data["password1"]) }
        serializer1 = UserSerializer(data=db_data1)
        if serializer1.is_valid():
            user = serializer1.save()
            db_data2 = { "user": user.id, "name": data["name"], "mobile_number": data["mobileNumber"] }
            serializer2 = CustomerSerializer(data=db_data2)
            if serializer2.is_valid():
                serializer2.save()
                transaction.commit()
                return Response({"status": "success", "msg": "Registration successful"})
            else:
                return Response({"status": "fail", "msg": str(serializer2.errors)}, 400)
        else:
            return Response({"status": "fail", "msg": str(serializer1.errors)}, 400)
    
    @action(detail=True, methods=["post"])
    def login(self, request):
        data = request.data
        user = authenticate(username=data["email"], password=data["password"])
        serializer = UserSerializer(user)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({ "status": "success", "msg": "Login succcessful", "jwt": str(refresh.access_token), "jwt_refresh": str(refresh) })
        else:
            return Response({"status": "fail", "msg": "Authentication failure"}, 400)

class ProtectedView(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
       
    @action(detail=True, methods=["post"])
    def read_user_token(self, request, direct_return=False):
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        valid_data = TokenBackend(algorithm='HS256').decode(token, verify=False)
        uds = User.objects.get(pk=valid_data["user_id"])
        serializer = UserSerializer(uds)
        if direct_return:
            return serializer.data
        return Response({"status": "success", "user": serializer.data, "token_data": valid_data })
    
    @action(detail=True, methods=["post"])
    def create(self, request):
        data = request.data
        cart = data["cart"]
        cartSummary = data["cartSummary"]
        try:
            transaction.set_autocommit(False)
            user = self.read_user_token(request, direct_return=True)
            db_data1 = { 
                "customer":  user["customer_data"]["id"],
                "total": cartSummary["netTotal"]+cartSummary["netTotal"],
                "status": 1
            }
            serializer1 = OrderSerializer(data=db_data1)
            res1 = {}
            if serializer1.is_valid():
                res1 = serializer1.save()
            else:
                raise Exception("Database error occured while inserting order: "+str(serializer1.errors))
            for item in cart:
                db_data2 = {
                    "order": res1.id,
                    "product": item["productId"], 
                    "rate": item["product"]["rate"], 
                    "discount": item["product"]["discount"], 
                    "discount_type": item["product"]["discount_type"],
                    "gst": item["product"]["gst"],
                    "qty": item["qty"]
                }
                serializer2 = OrderDetailSerializer(data=db_data2)
                if serializer2.is_valid():
                    serializer2.save()
                else:
                    raise Exception("Database error while inserting order detail: "+str(serializer2.errors))
        except Exception as e:
            return Response({ "status": "fail", "msg": str(e) })
        else:
            transaction.commit()
        finally:
            return Response({ "status": "success", "msg": "Order created successfully" })

    @action(detail=True, methods=["get"])
    def orders(self, request):
        user = self.read_user_token(request, direct_return=True)
        ods = Order.objects.filter(customer=user["customer_data"]["id"]).all()
        serializer = OrderSerializer(ods, many=True)
        return Response({"status": "success", "data": serializer.data})
    
    @action(detail=True, methods=["get"])
    def order_detail(self, request, order_id):
        ods = OrderDetail.objects.filter(order=order_id).all()
        serializer = OrderDetailSerializer(ods, many=True)
        summary = Helper.get_order_summary(serializer.data)
        return Response({"status": "success", "data": { "products": serializer.data, "summary": summary } })




