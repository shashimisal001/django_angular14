from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Customer(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    mobile_number = models.CharField(max_length=12, unique=True)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Unit(models.Model):
    name = models.CharField(max_length=20)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Discount_Type(models.Model):
    name = models.CharField(max_length=20)
    created_date = models.DateTimeField()

    def __str__(self):
        return self.name

class Product_Category(models.Model):
    name = models.CharField(max_length=50)
    created_date = models.DateTimeField()

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    rate = models.FloatField()
    discount = models.FloatField(null=True)
    discount_type = models.ForeignKey(Discount_Type, on_delete=models.CASCADE, null=True)
    product_category = models.ForeignKey(Product_Category, on_delete=models.CASCADE, null=True)
    gst = models.FloatField(default=12)
    stock = models.FloatField()
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='static/images', null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Status(models.Model):
    name = models.CharField(max_length=20)
    created_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Coupon(models.Model):
    number = models.CharField(max_length=30)
    from_date = models.DateTimeField()
    to_date = models.DateTimeField()
    minimum_bill = models.FloatField()
    discount_upto = models.FloatField()
    discount = models.FloatField()
    discount_type = models.ForeignKey(Discount_Type, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.number

class Order(models.Model):
    customer = models.ForeignKey(Customer, null=True, on_delete=models.SET_NULL)
    coupon_number = models.CharField(max_length=30, null=True)
    coupon_minimum_bill = models.FloatField(null=True)
    coupon_discount_upto = models.FloatField(null=True)
    total = models.FloatField(default=0)
    discount = models.FloatField(null=True)
    discount_type = models.ForeignKey(Discount_Type, on_delete=models.CASCADE, null=True)
    status = models.ForeignKey(Status, on_delete=models.CASCADE, default=1)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(null=True)

    def __int__(self):
        return self.id


class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)
    qty = models.FloatField(default=0)
    rate = models.FloatField(default=0)
    discount = models.FloatField(null=True)
    discount_type = models.ForeignKey(Discount_Type, on_delete=models.CASCADE)
    gst = models.FloatField(default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(null=True)
    
    def __str__(self):
        return str(self.id)
    
class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id
