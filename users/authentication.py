from rest_framework.authentication import BaseAuthentication
import jwt
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

class JWTAuthentication(BaseAuthentication):
    
    def authenticate(self, request):
      # Check for headers
      if not request.headers:
        return None
      # Check for Authorization header
      auth_header = request.headers.get('Authorization')
      if not auth_header:
        return None
      # Check for Bearer token
      if not auth_header.startswith('Bearer'):
        return None
      # remove Bearer from token
      token = auth_header.replace('Bearer ', '')
      # decode token
      try:
        payload = jwt.decode( token, settings.SECRET_KEY, algorithms='HS256')
        user = User.objects.get(pk=payload.get('sub'))
      except jwt.exceptions.InvalidSignatureError as e :
        print(e.__class__.__name__)
        print(e)
        return None
      except User.DoesNotExist as e :
        print(e.__class__.__name__)
        print(e)
        return None
      return (user,token)
