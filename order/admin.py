from django.contrib import admin
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'product', 'quantity', 'status', 'price', 'stock')
    list_filter = ('status', 'user')
    search_fields = ('user__username', 'product__title')
