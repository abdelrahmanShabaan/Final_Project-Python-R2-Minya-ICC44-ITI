from django.db import models
from django.core.validators import MinLengthValidator, EmailValidator, RegexValidator, MinValueValidator
from decimal import Decimal

class Order(models.Model):
    name = models.CharField(max_length=100, validators=[MinLengthValidator(3)])
    address = models.CharField(max_length=255, validators=[MinLengthValidator(5)])
    email = models.EmailField(validators=[EmailValidator()])
    card_number = models.CharField(max_length=16, validators=[
        MinLengthValidator(16),
        RegexValidator(regex=r'^\d{16}$', message='Card number must be 16 digits long')
    ])
    exp_date = models.CharField(max_length=5, validators=[
        MinLengthValidator(5),
        RegexValidator(regex=r'^\d{2}/\d{2}$', message='Expiration date must be in MM/YY format')
    ])
    cvv = models.CharField(max_length=3, validators=[
        MinLengthValidator(3),
        RegexValidator(regex=r'^\d{3}$', message='CVV must be 3 digits long')
    ])
    total_items = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'), validators=[MinValueValidator(Decimal('0.00'))])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.pk} - {self.name}"
