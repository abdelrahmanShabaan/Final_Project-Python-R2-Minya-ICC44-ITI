# Generated by Django 4.2.11 on 2024-03-24 23:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('seller', '0007_remove_seller_product_seller_products_seller_product'),
    ]

    operations = [
        migrations.RenameField(
            model_name='seller_product',
            old_name='seller',
            new_name='sellers',
        ),
    ]