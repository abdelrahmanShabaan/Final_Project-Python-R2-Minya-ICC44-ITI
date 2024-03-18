from django.db import models
from django.conf import settings
from products.models import Product
from decimal import Decimal


class Cart(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart {self.id} of User {self.user.username}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    title = models.CharField()
    rating = models.PositiveIntegerField(default=1)
    stock = models.PositiveIntegerField(default=1)
    brand = models.CharField()
    category = models.CharField()
    thumbnail = models.CharField()
    images = models.CharField()
    description = models.CharField()
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    discountPercentage = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False
    )

    def save(self, *args, **kwargs):
        discountPercentage = (
            self.product.discountPercentage
            if self.product.discountPercentage
            else Decimal("0")
        )
        self.price = self.quantity * self.product.price
        self.discountPercentage = self.price * (
            Decimal("1") - (discountPercentage / Decimal("100.0"))
        )
        super(CartItem, self).save(*args, **kwargs)


def __str__(self):
    return f"{self.quantity} of {self.product.title}"
