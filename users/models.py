from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import URLValidator

# Create your models here.

class User(AbstractUser):
    email = models.CharField(max_length=50)
    profile_image = models.URLField(validators=[URLValidator()], null=True)
    cover_photo = models.URLField(validators=[URLValidator()], null=True)
    user_library = models.ManyToManyField('atmospheres.Atmosphere', related_name='put_in_library', blank=True)

    def __str__(self):
        return f'{self.username}'
    