from django.shortcuts import render

from lib.exceptions import exceptions

from tags.serializers.common import TagSerializer
from .serializers.common import AtmosSerializer
from .serializers.populated import PopulatedAtmosSerializer, TagsPopulatedSerializer
from .models import Atmosphere
from tags.models import Tag

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
# Create your views here.

class AtmosListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    
    @exceptions
    def get(self,request):
        atmos = Atmosphere.objects.all()
        serialized_atmos = PopulatedAtmosSerializer(atmos, many=True)
        return Response(serialized_atmos.data)
    
    @exceptions
    def post(self,request):
        request.data['owner'] = request.user.id
        print(request.data.get('owner'))
        print(request.data['tags'])
        for tag in request.data['tags'] :
            tag_is_in_list = Tag.objects.filter(tag=tag['tag'])
            if not tag_is_in_list :
                tag_is_in_list = TagSerializer(data=tag)
                tag_is_in_list.is_valid(raise_exception=True)
                tag_is_in_list.save()
                print(tag['tag'])
        atmos = TagsPopulatedSerializer( data=request.data)
        atmos.is_valid(raise_exception=True)
        atmos.save()
        return Response(atmos.data, status.HTTP_201_CREATED)
    
class AtmosSingleView(APIView):
    permission_classes = (IsAuthenticated,)
    
    @exceptions
    def put(self,request,pk):
        atmos = Atmosphere.objects.get(pk=pk)
        if atmos.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        serialized_atmos = TagsPopulatedSerializer( atmos, request.data, partial=True)
        serialized_atmos.is_valid(raise_exception=True)
        serialized_atmos.save()
        return Response(serialized_atmos.data)
    
    @exceptions
    def delete(self,request,pk):
        atmos = Atmosphere.objects.get(pk=pk)
        if atmos.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        atmos.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

