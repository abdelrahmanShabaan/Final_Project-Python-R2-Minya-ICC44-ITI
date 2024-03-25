from django.db import models
from products.models import Product

class Seller(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, blank=True)
    products = models.ManyToManyField(Product, blank=True)
    role = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"Seller name: {self.name}"

