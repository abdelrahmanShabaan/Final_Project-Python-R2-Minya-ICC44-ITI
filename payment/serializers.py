from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'name', 'address', 'email', 'card_number', 'exp_date', 'cvv', 'total_items', 'total_amount', 'created_at']
