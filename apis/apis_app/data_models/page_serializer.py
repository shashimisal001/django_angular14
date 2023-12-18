from rest_framework import serializers
from apis_app.data_models.page import Page
class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = "__all__"