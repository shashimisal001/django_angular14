from django.contrib import admin
from apis_app.models import Customer, Unit, Product_Category, Product, Status, Order, Discount_Type, Coupon, OrderDetail, Payment

# Register your models here.
admin.site.register(Customer)
admin.site.register(Unit)
admin.site.register(Product)
admin.site.register(Status)
admin.site.register(Order)
admin.site.register(OrderDetail)
admin.site.register(Discount_Type)
admin.site.register(Coupon)
admin.site.register(Product_Category)
admin.site.register(Payment)
