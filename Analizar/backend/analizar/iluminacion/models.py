from django.db import models
from django.core.exceptions import ValidationError
from users.models import User

# Create your models here.

def validate_range(value):
    if value < 0 or value > 99:
        raise ValidationError(f'Value must be between 0 and 99. Received {value}.')

class Iluminacion(models.Model):
    idIluminacion = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45)
    detalle = models.CharField(max_length=45)
    identificador = models.CharField(max_length=45)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    intensidad = models.IntegerField(validators=[validate_range], default=0)
    encendido = models.BooleanField(default=False)

    def __str__(self):
        return self.identificador

