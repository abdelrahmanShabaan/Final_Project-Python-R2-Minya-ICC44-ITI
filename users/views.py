from django.shortcuts import render
from rest_framework import generics,viewsets
from .models import User
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.views import View
from django.shortcuts import render, redirect, get_object_or_404
from django.utils import timezone
# from .forms import (
#     EmailVerificationForm,
#     RegistrationForm,
#     SignInForm,
# )
# from .models import MyUser, UserEmailVerification
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


# def Registration(request):
#     if request.method == "POST":
#         form = RegistrationForm(request.POST, request.FILES)
#         if form.is_valid():
#             email = form.cleaned_data["email"]
#             if MyUser.objects.filter(email=email).exists():
#                 form.add_error("email", "Email already exists.")
#                 return render(
#                     request, "registration/registration_form.html", {"form": form}
#                 )

#             new_user = MyUser.objects.create(
#                 first_name=form.cleaned_data["first_name"].title(),
#                 last_name=form.cleaned_data["last_name"].title(),
#                 email=email,
#                 password=form.cleaned_data["password"],
#                 mobile_phone=form.cleaned_data["mobile_phone"],
#                 profile_picture=form.cleaned_data["profile_picture"],
#                 is_active=True,
#             )
#             new_verification = UserEmailVerification(email=new_user.email)
#             new_verification.generateCode()
#             new_verification.sendCode()
#             new_user.save()
#             # Send email verification
#             request.session["user_email"] = new_user.email
#             request.session["first_name"] = new_user.first_name
#             return redirect("verify_email")
#     else:
#         form = RegistrationForm()
#     return render(request, "registration/registration_form.html", {"form": form})


# def signin(request):
#     if request.method == "GET":
#         form = SignInForm()
#         return render(request, "registration/signin_form.html", {"form": form})

#     if request.method == "POST":
#         form = SignInForm(request.POST)
#         if form.is_valid():
#             email = form.cleaned_data.get("email")
#             password = form.cleaned_data.get("password")
#             try:
#                 user = MyUser.objects.get(email=email)
#                 if user.isEmailVerified:
#                     if user.password == password:
#                         request.session["user_email"] = email
#                         request.session["first_name"] = user.first_name
#                         return redirect("home")
#                     else:
#                         form.add_error(None, "Invalid email or password")
#                 else:
#                     form.add_error(None, "Please verify your email first.")
#             except MyUser.DoesNotExist:
#                 form.add_error(None, "User does not exist")
#         return render(request, "registration/signin_form.html", {"form": form})


# # def signout(request):
# #     request.session.clear()
# #     return redirect("signin")


# # class VerifyEmail(View):
#     def get(self, request):
#         logged_in = request.session.get("user_email")
#         if not logged_in:
#             return redirect("signin")
#         form = EmailVerificationForm()

#         return render(request, "registration/verify_email.html", {"form": form})

#     def post(self, request):
#         form = EmailVerificationForm(request.POST)
#         email = request.session.get("user_email")
#         if not email:
#             return redirect("signin")
#         if form.is_valid():
#             code = form.cleaned_data["code"]
#             user = MyUser.objects.get(email=email)
#             userEmailVerification = UserEmailVerification.objects.get(email=email)

#             expireTime = userEmailVerification.expireTime
#             if timezone.now() > expireTime:
#                 form.add_error(None, "Code expired, a new code was sent to your email!")
#                 userEmailVerification.generateCode()
#                 userEmailVerification.sendCode()
#             if code == userEmailVerification.code:
#                 user.isEmailVerified = True
#                 user.save()
#                 return redirect("home")
#             else:
#                 form.add_error(None, "Invalid code")
#         return render(request, "registration/verify_email.html", {"form": form})