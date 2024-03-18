from django.contrib import admin
from .models import Cart, CartItem


admin.site.register(CartItem)
admin.site.register(Cart)
