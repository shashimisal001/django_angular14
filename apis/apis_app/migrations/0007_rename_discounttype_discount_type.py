# Generated by Django 5.0 on 2024-01-05 16:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('apis_app', '0006_coupon'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='DiscountType',
            new_name='Discount_Type',
        ),
    ]