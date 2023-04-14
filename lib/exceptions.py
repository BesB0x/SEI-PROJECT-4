from functools import wraps
from rest_framework import status
from rest_framework.response import Response
from django.core.exceptions import ImproperlyConfigured, PermissionDenied




from django.contrib.auth import get_user_model

User = get_user_model()

def exceptions(func):
    @wraps(func)

    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except (User.DoesNotExist, PermissionDenied) as e :
            print(e.__class__.__name__)
            print(e)
            return Response ( {'detail':'unauthorized'}, status.HTTP_403_FORBIDDEN)
        except (ImproperlyConfigured,) as e :
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__, status.HTTP_422_UNPROCESSABLE_ENTITY)
    return wrapper
