# Generated by Django 5.0 on 2024-01-06 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis_app', '0008_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='static/images'),
        ),
    ]