from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('', getIluminacion, name='getIluminacion'),
    path('addIluminacion', views.addIluminacion.as_view(), name='addIluminacion'),
    path('iluminacionbyuser/<int:user_id>', getIluminacionByUser.as_view(), name='getIluminacionByUser'),
    path('deleteIluminacion/<int:id>', deleteIluminacion, name='deleteIluminacion'),
    path('editIluminacion/<int:id>', editIluminacion.as_view(), name='editIluminacion'),
    path('getIluminacionById/<int:id>', getIluminacionById.as_view(), name='getIluminacionById')
]