from functools import wraps
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError, NotFound
from django.core.exceptions import ImproperlyConfigured

from atmospheres.models import Atmosphere
from tags.models import Tag
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
        except (NotFound, Atmosphere.DoesNotExist, Tag.DoesNotExist) as e:
            print(e.__class__.__name__)
            print(e)
            return Response (e.__dict__ if e.__dict__ else { 'detail': str(e)}, status.HTTP_404_NOT_FOUND)
        except (ImproperlyConfigured, ValidationError) as e :
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e :
            print(e.__class__.__name__)
            print(e)
            return Response(e.__dict__ if e.__dict__ else { 'detail': str(e) }, status.HTTP_500_INTERNAL_SERVER_ERROR)
    return wrapper
