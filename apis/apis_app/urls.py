from django.urls import path
from apis_app.views import ProductView, CustomerView, ProtectedView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("jwt/refresh", TokenRefreshView.as_view(), name='token_refresh'),

    path("products", ProductView.as_view({"get":"products"})),
    path("products/<int:product_id>", ProductView.as_view({"get":"product"})),
    path("customers/register", CustomerView.as_view({"post": "register"})),
    path("customers/login", CustomerView.as_view({"post": "login"})),

    path("read_user_token", ProtectedView.as_view({"get": "read_user_token"})),
    path("orders", ProtectedView.as_view({"get": "orders"})),
    path("orders/<int:order_id>", ProtectedView.as_view({"get": "order_detail"})),
    path("orders/create", ProtectedView.as_view({"post": "create"}))
]