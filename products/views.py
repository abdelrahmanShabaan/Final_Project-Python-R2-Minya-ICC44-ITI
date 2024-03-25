from rest_framework import generics, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product
from .serializers import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q


class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'price']  
    search_fields = ['title', 'description']

@api_view(['GET'])
def search_products(request):
    search_term = request.query_params.get('q', None)
    if search_term is not None:
        products = Product.objects.filter(
            Q(title__icontains=search_term) |
            Q(description__icontains=search_term)
        )
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    else:
        return Response([])

@api_view(['GET'])
def filter_products(request):
    queryset = Product.objects.all()
    serializer = ProductSerializer(queryset, many=True)
    return Response(serializer.data)

