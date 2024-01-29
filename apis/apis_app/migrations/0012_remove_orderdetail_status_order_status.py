# Generated by Django 5.0 on 2024-01-27 12:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis_app', '0011_alter_order_modified_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderdetail',
            name='status',
        ),
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='apis_app.status'),
        ),
    ]
