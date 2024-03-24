from rest_framework import generics ,viewsets
from .models import Category
from .serializers import CategorySerializer
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
@csrf_exempt  
@api_view(['GET', 'POST'])  
def category_list(request):
    if request.method == 'GET':
        category_names = Category.objects.all().values_list('name', flat=True)
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return JsonResponse(list(category_names), safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer