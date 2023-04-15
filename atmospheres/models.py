from django.db import models

from django.core.validators import URLValidator

# Create your models here.
class Atmosphere(models.Model):
    name= models.CharField(max_length=50 )
    picture= models.URLField(validators=[URLValidator()])
    audio= models.URLField(validators=[URLValidator()])
    tags= models.ManyToManyField('tags.Tag', related_name='atmospheres')
    owner = models.ForeignKey(
        'users.User',
        on_delete= models.CASCADE,
        related_name='created_atmospheres'
    )
    date_created: models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.name}'