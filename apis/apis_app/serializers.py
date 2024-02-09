from rest_framework import serializers
from django.contrib.auth.models import User
from apis_app.models import Customer, Unit, Product, Status, Order, Discount_Type, Coupon, OrderDetail, Payment


class ProductSerializer(serializers.ModelSerializer):
    discounted_rate = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = "__all__"

    def get_discounted_rate(self, obj):
        if obj.discount:
            if obj.discount_type.id == 1:
                return obj.rate-obj.discount
            else:
                return round(obj.rate-((obj.rate/100)*obj.discount), 2)
        else:
            return obj.rate

class CustomerSerializer(serializers.ModelSerializer):
    created_date = serializers.SerializerMethodField()
    class Meta:
        model = Customer
        fields = "__all__"
    
    def get_created_date(self, obj):
        return obj.created_date.date()

class UserSerializer(serializers.ModelSerializer):
    customer_data = serializers.SerializerMethodField()
    class Meta:
        model=User
        fields=['id', 'customer_data', 'username', 'email', 'password']
    
    def get_customer_data(self, obj):
        return CustomerSerializer(obj.customer).data

    def to_representation(self, obj):
        ret = super(UserSerializer, self).to_representation(obj)
        ret.pop('password')
        return ret

class OrderSerializer(serializers.ModelSerializer):
    customer_data = serializers.SerializerMethodField()
    created_date = serializers.SerializerMethodField()
    class Meta:
        model = Order
        fields = "__all__"

    def get_customer_data(self, obj):
        return CustomerSerializer(obj.customer).data

    def get_created_date(self, obj):
        return obj.created_date.date()

class OrderDetailSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    discount_data = serializers.SerializerMethodField()
    gst_data = serializers.SerializerMethodField()
    total_with_gst = serializers.SerializerMethodField()

    class Meta:
        model = OrderDetail
        fields = "__all__"
    
    def get_name(self, obj):
        return obj.product.name
    
    def get_discount_data(self, obj):
        discount = 0
        if obj.discount:
            if obj.discount_type.id == 1:
                discount = obj.discount
                discounted_rate = obj.rate-obj.discount
            else:
                discount = round((obj.rate/100)*obj.discount, 2)
                discounted_rate = round(obj.rate-discount, 2)
        else:
            discounted_rate = obj.rate
        return { "total_rate": obj.rate*obj.qty, "discount_type": obj.discount_type.name, "total_discount": discount*obj.qty,
        "discounted_rate": discounted_rate, "total_discounted_rate": discounted_rate*obj.qty }
    
    def get_gst_data(self, obj):
        discount_data = self.get_discount_data(obj)
        gst_amt = round((discount_data["discounted_rate"]/100)*obj.gst, 2)
        gst_data = { "gst_amt": gst_amt, "total_gst_amt": gst_amt*obj.qty }
        return gst_data

    def get_total_with_gst(self, obj):
        total_discounted_rate = self.get_discount_data(obj)["total_discounted_rate"]
        total_gst = self.get_gst_data(obj)["total_gst_amt"]
        return round(total_discounted_rate+total_gst, 2)