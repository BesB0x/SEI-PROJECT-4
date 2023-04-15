from .serializers.common import UserSerializer, UserLibrarySerializer
from .serializers.populated import PopulatedUserSerializer
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
    
class UsersListView(APIView):
    @exceptions
    def get(self,request):
        users = User.objects.all()
        serialized_users =  UserSerializer(users, many=True)
        return Response(serialized_users.data)
    

# for adding in items to user_library

class UsersSingleView(APIView):
    # @exceptions
    def put(self,request,pk):
        user = User.objects.get(pk=pk)
        for atmos in request.data['user_library'] :
            atmos_is_in_library = user.objects.filter(user_library=atmos)

            if atmos_is_in_library:
                user.user_library.pop(atmos)
                print('yay')
            else:
                # user.user_library.append(atmos)
                print('aw')

        # serialized_user_library = UserLibrarySerializer(user, request.data, partial=True )
        # serialized_user_library.is_valid(raise_exception=True)
        # serialized_user_library.save()
        return Response('watever')