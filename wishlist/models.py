from decimal import Decimal
from django.db import models
from django.contrib.auth.models import User
from cart.models import CartItem
from products.models import Product
from django.conf import settings

class Wishlist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
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
        return f"Wishlist item for {self.user.email} - {self.product.title}"
