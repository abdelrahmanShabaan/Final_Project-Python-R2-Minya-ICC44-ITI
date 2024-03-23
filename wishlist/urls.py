from django.urls import path
from .views import WishlistList, WishlistDetail

urlpatterns = [
    path("", WishlistList.as_view(), name="review-list"),
    path("<int:pk>/", WishlistDetail.as_view(), name="review-detail"),
]