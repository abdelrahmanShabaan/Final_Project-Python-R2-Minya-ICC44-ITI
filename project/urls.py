"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from Categories.views import CategoryList
from products.views import ProductDetail, ProductList,ProductViewSet
from project import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework import routers, permissions
from reviews.views import ReviewList, ReviewDetail, ReviewViewSet
from users.views import UserViewSet
from payment.views import CheckoutAPIView
from order.views import OrderList, OrderDetail, OrderViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'users', UserViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('user/', include('users.urls')),
    path('review/', include('reviews.urls')),
    path('products/', csrf_exempt(ProductList.as_view()), name='product-list'),
    path('products/<int:pk>/', ProductDetail.as_view(), name='product-detail'),
    path('category/', CategoryList.as_view(), name='category-list'),
    path('checkout/', CheckoutAPIView.as_view(), name='checkout'),
    path('orders/', OrderList.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderDetail.as_view(), name='order-detail'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
