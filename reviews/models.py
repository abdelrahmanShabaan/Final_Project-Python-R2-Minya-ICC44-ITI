from django.db import models


class Review(models.Model):
    name = models.CharField(max_length=255)
    rate = models.FloatField(max_length=255)
    reviews = models.CharField(max_length=255)

    def __str__(self):
        return self.name
