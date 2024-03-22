from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discountPercentage = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)      
    rating = models.FloatField()
    stock = models.IntegerField()
    brand = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    thumbnail = models.ImageField(upload_to='products/thumbnails/')
    def __str__(self):
        return self.title 

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/images/')

    def __str__(self):
        return f"{self.product.title} Image"
