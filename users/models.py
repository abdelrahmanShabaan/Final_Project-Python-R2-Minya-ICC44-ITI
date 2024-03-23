from django.db import models
from datetime import datetime, timedelta
from django.core.mail import send_mail
import random

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=50)
    
    def __str__(self):
        return f"User name {self.name} and email {self.email}"


class Verification(models.Model):
    email = models.EmailField(unique=True)
    code = models.CharField(max_length=6, default=000000)
    expireTime = models.DateTimeField()

    def __str__(self):
        return f"{self.email} | {self.code} | expires: {self.expireTime}"

    def sendCode(self):
        send_mail(
            subject="Welcome to EasyTrade",
            message=f"Thank you for Registration\nYour verification code is: {self.code}\nThis Code is valid for 24 hours",
            from_email="noreply@myfundingplatform.com",
            recipient_list=[self.email],
            fail_silently=False,
        )

    def generateCode(self):
        self.code = random.randint(100000, 999999)
        self.expireTime = datetime.now() + timedelta(days=1)
        self.save()