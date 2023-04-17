from django.shortcuts import render

from .serializers.common import TagSerializer
from .serializers.populated import PopulatedTagSerializer
from .models import Tag

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from lib.exceptions import exceptions

# Create your views here.

class TagListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    @exceptions
    def get(self,request):
        tags = Tag.objects.all()
        serialized_tags = PopulatedTagSerializer(tags, many=True)
        return Response(serialized_tags.data)
    
    @exceptions
    def post(self,request):
        tag = Tag.objects.all()
        serialized_tag = TagSerializer( data = request.data)
        serialized_tag.is_valid(raise_exception=True)
        serialized_tag.save()
        return Response(serialized_tag.data, status.HTTP_201_CREATED)
