# Generated by Django 5.0.3 on 2024-03-23 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0003_remove_order_user_order_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='name',
            field=models.CharField(max_length=255),
        ),
    ]
