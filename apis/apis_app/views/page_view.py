from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from apis_app.data_models.page import Page
from apis_app.data_models.page_serializer import PageSerializer

class PageView(viewsets.ModelViewSet):
    @action(detail=True, methods=["GET"])
    def get_page_content(self, request, id):
        pds = Page.objects.all()
        serializer = PageSerializer(pds, many=True)
        data = {'content': serializer.data}
        return Response({'status': True, 'data': data})
    
