from django.db import models

class Page(models.Model):
    content = models.CharField(max_length=500)