# Generated by Django 4.2.11 on 2024-03-24 22:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('seller', '0004_alter_seller_products'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='seller',
            name='products',
        ),
    ]