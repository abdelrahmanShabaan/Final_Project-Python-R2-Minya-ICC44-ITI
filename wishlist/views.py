from rest_framework import generics, viewsets
from .models import Wishlist
from .serializers import WishlistSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# class WishlistList(generics.ListCreateAPIView):
#     queryset = Wishlist.objects.all()
#     serializer_class = WishlistSerializer

class WishlistDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer


class WishlistList(APIView):
    def get(self, request):
        name = request.query_params.get("name", None)

        if name:
            # Filter wishlists by name if name parameter is provided
            wishlists = Wishlist.objects.filter(name=name)
        else:
            # Otherwise, return all wishlists
            wishlists = Wishlist.objects.all()

        serializer = WishlistSerializer(wishlists, many=True)
        return Response(serializer.data)

    
    def post(self, request):
        serializer = WishlistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)