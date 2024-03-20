from rest_framework import serializers
from .models import Order
from products.models import Product

class OrderSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='user.username')  
    productid = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product', write_only=True)
    product = serializers.StringRelatedField(read_only=True)  

    class Meta:
        model = Order
        fields = ['id', 'name', 'product', 'productid', 'price', 'stock', 'status', 'quantity']
        extra_kwargs = {
            'product': {'read_only': True},  
        }