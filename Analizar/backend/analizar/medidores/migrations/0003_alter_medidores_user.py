# Generated by Django 4.0.5 on 2023-06-11 19:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
        ('medidores', '0002_alter_medidores_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='medidores',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user'),
        ),
    ]
