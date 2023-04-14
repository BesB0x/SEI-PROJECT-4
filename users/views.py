from .serializers.common import UserSerializer
from django.conf import settings

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from lib.exceptions import exceptions

import jwt
from datetime import datetime, timedelta

# Create your views here.

User = get_user_model()

class RegisterView(APIView):
    
    @exceptions
    def post(self,request):
        # serialize data
        user_to_add = UserSerializer(data=request.data)
        user_to_add.is_valid(raise_exception=True)
        user_to_add.save()
        return Response( user_to_add.data, status.HTTP_201_CREATED)

class LoginView(APIView):
    
    @exceptions
    def post(self,request):
      username = request.data.get('username')
      password = request.data.get('password')
      user_to_login = User.objects.get(username=username)

      if not user_to_login.check_password(password):
          raise PermissionDenied('Unauthorized')
      dt = datetime.now() + timedelta(days=7)
      token = jwt.encode({'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')
      return Response({ 'message': f'heya {username}', 'token': {token}})