from django.contrib import admin
from .models import Order

# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):
#     list_display = ('id', 'name', 'product', 'quantity', 'status', 'totalPrice', 'stock')
#     list_filter = ('status', 'name')
#     search_fields = ('user__username', 'product__title')
