from django.db import models

# Create your models here.
from decimal import Decimal
from django.db import models
from users.models import User
from products.models import Product
from django.conf import settings


class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    # def save(self, *args, **kwargs):
    #     if not self.name:  # Only set name if it's not already provided
    #         self.name = User.name
    #     super().save(*args, **kwargs)

    def __str__(self):
        return f"Wishlist item for {self.user.email} - {self.product.title}"
