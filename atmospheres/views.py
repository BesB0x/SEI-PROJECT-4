from django.shortcuts import render

from lib.exceptions import exceptions

from tags.serializers.common import PostTagSerializer
from .serializers.common import AtmosSerializer
from users.serializers.common import UserSerializer, UserLibrarySerializer
from .serializers.populated import PopulatedAtmosSerializer, TagsPopulatedSerializer, PopulatedNoTags, PutAtmosSerializer
from .models import Atmosphere
from tags.models import Tag


from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from django.contrib.auth import get_user_model
User = get_user_model()
# Create your views here.


class AtmosListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    @exceptions
    def get(self, request):
        atmos = Atmosphere.objects.all()
        serialized_atmos = PopulatedAtmosSerializer(atmos, many=True)
        return Response(serialized_atmos.data)

    @exceptions
    def post(self, request):
        # add atmo to database
        request.data['owner'] = request.user.id
        print(request.data)
        atmos = AtmosSerializer(data=request.data)
        atmos.is_valid(raise_exception=True)
        atmos.save()
        # # add atmo to user library
        user = User.objects.get(pk=request.user.id)
        serialized_user = UserSerializer(user)
        user_library = serialized_user.data['user_library']
        user_library.append(atmos.instance.id)
        serialized_user_library = UserLibrarySerializer(
            user, {'user_library': user_library}, partial=True)
        serialized_user_library.is_valid(raise_exception=True)
        serialized_user_library.save()
        return Response(atmos.data, status.HTTP_201_CREATED)


class AtmosSingleView(APIView):
    permission_classes = (IsAuthenticated,)

    @exceptions
    def get(self, request, pk):
        atmos = Atmosphere.objects.get(pk=pk)
        serialized_atmos = TagsPopulatedSerializer(atmos)
        return Response(serialized_atmos.data)

    @exceptions
    def put(self, request, pk):
        atmos = Atmosphere.objects.get(pk=pk)
        if atmos.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        print(request.data)
        serialized_atmos = AtmosSerializer(
            atmos, request.data, partial=True)
        serialized_atmos.is_valid(raise_exception=True)
        serialized_atmos.save()
        return Response(serialized_atmos.data)

    @exceptions
    def delete(self, request, pk):
        atmos = Atmosphere.objects.get(pk=pk)
        if atmos.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        atmos.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
