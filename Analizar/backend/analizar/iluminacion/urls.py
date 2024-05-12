from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('', getIluminacion, name='getIluminacion'),
    path('addIluminacion', views.addIluminacion.as_view(), name='addIluminacion'),
    path('Iluminacionbyuser/<int:user_id>', getIluminacionByUser.as_view(), name='getIluminacionByUser'),
    path('deleteIluminacion/<int:id>', deleteIluminacion, name='deleteIluminacion')
]