# Generated by Django 4.2 on 2023-05-28 23:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medidores', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medidores',
            name='user',
            field=models.PositiveIntegerField(),
        ),
    ]
