from django.shortcuts import render
from rest_framework import generics,viewsets
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

# Create your views here.


class UserList(APIView):
    def get(self, request):
        email = request.query_params.get("email", None)
        password = request.query_params.get("password", None)

        if email and password:
            users = User.objects.filter(email=email, password=password)
        elif email:
            users = User.objects.filter(email=email)
        else:
            users = User.objects.all()

        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        id = request.query_params.get("id", None)
        if id:
            user = User.objects.filter(id=id).first()
            if user:
                serializer = UserSerializer(user, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(
                {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        else:
            email = request.query_params.get("email", None)
            if email:
                user = User.objects.filter(email=email).first()
                if user:
                    serializer = UserSerializer(user, data=request.data, partial=True)
                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data)
                    return Response(
                        serializer.errors, status=status.HTTP_400_BAD_REQUEST
                    )
                return Response(
                    {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
                )
            return Response(
                {"message": "Id or Email parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def delete(self, request):
        id = request.query_params.get("id", None)
        if id:
            user = User.objects.filter(id=id).first()
            if user:
                user.delete()
                return Response({"message": "User deleted successfully"})
            return Response(
                {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        else:
            email = request.query_params.get("email", None)
            if email:
                user = User.objects.filter(email=email).first()
                if user:
                    user.delete()
                    return Response({"message": "User deleted successfully"})
                return Response(
                    {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
                )
            return Response(
                {"message": "Id or Email parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
