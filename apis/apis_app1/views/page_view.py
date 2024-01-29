from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
import pandas as pd
from apis_app.data_models.page import Page
from apis_app.data_models.page_serializer import PageSerializer

class FilterByColumnValues:
    @staticmethod
    def like(df):
        filtered_df = df[df["name"].str.contains("hi")]
        filtered_df.to_json("static/data1.json")
        return filtered_df
    
    @staticmethod
    def greater_than(df):
        filtered_df = df[df["salary"]>20000]
        filtered_df.to_json("static/data1.json")
        return filtered_df
    
    @staticmethod
    def within_row_range(df):
        filtered_df = df[0:2]
        filtered_df.to_json("static/data1.json")
        return filtered_df

class Calculate:
    @staticmethod
    def total_salary(df):
        total = df["salary"].sum()
        return total
        
    @staticmethod
    def age_wise_salary(df):
        total = df[df["age"]>30]["salary"].sum()
        return total

class PageView(viewsets.ModelViewSet):   
    df = None
    def __init__(self):
        self.df = pd.read_json("static/data.json")

    @action(detail=True, methods=["GET"])
    def get_page_content(self, request, id):
        pds = Page.objects.all()
        serializer = PageSerializer(pds, many=True)
        data = {'content': serializer.data}
        return Response({'status': True, 'data': data})
    
    @action(detail=True, methods=["GET"])
    def pandas_json(self, request):
        result = FilterByColumnValues.within_row_range(self.df)
        return Response({ "status": True, "data": str(result) })
    
    