from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
import pandas as pd
import time

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
        filtered_df = df[0:1]
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

class PandasExamples(viewsets.ModelViewSet):   

    @action(detail=True, methods=["GET"])
    def pandas_json(self, request):
        df = pd.read_json("static/data.json")
        #result = FilterByColumnValues.within_row_range(self.df)
        return Response({ "status": True, "data": str(df) })
    
    @action(detail=True, methods=["GET"])
    def pandas_excel(self, request):
        t1 = time.time()
        df = pd.read_excel("static/sample.xlsx")
        t2 = time.time()
        return Response({"status": True, "data": df[30000:30011], "time_elapsed": t2-t1}, 200)

    