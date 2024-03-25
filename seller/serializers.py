from rest_framework import serializers

from products.serializers import ProductSerializer
from .models import Seller


class SellerSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)  

    class Meta:
        model = Seller
        fields = ['id', 'name', 'email', 'password', 'products', 'role']

