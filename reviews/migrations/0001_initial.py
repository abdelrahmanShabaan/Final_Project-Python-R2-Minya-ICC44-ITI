# Generated by Django 5.0.3 on 2024-03-24 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('rate', models.FloatField(max_length=255)),
                ('reviews', models.CharField(max_length=255)),
            ],
        ),
    ]
