from django.urls import path
from reviews.views import ReviewList, ReviewDetail, ReviewViewSet

urlpatterns = [
    path("", ReviewList.as_view(), name="review-list"),
    path("<int:pk>/", ReviewDetail.as_view(), name="review-detail"),
]
