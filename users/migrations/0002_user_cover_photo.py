# Generated by Django 4.2 on 2023-04-14 17:46

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='cover_photo',
            field=models.URLField(default=1, validators=[django.core.validators.URLValidator()]),
            preserve_default=False,
        ),
    ]