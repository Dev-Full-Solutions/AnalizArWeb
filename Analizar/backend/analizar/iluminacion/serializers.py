from rest_framework import serializers
from .models import Iluminacion

class IluminacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Iluminacion
        fields = '__all__'