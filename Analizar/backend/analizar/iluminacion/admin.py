from django.contrib import admin

from .models import Iluminacion

# Register your models here.

@admin.register(Iluminacion)
class IluminacionAdmin(admin.ModelAdmin):
    list_display = ('idIluminacion', 'nombre', 'detalle', 'identificador')