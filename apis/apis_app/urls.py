from django.urls import path
from apis_app.views.page_view import PageView

urlpatterns=[
    path("page/<int:id>", PageView.as_view({'get': 'get_page_content'}))
]