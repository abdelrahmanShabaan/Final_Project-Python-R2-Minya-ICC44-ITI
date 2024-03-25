from rest_framework import viewsets
from products.models import Product
from .models import Seller
from .serializers import SellerSerializer
from rest_framework import generics, viewsets, filters
from rest_framework.response import Response


# Create your views here.


class SellerViewSet(viewsets.ModelViewSet):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer
    


class SellerList(generics.ListCreateAPIView):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer


class SellerDetail(generics.RetrieveAPIView):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer


