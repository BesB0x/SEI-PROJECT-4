from ..models import Atmosphere

from .common import AtmosSerializer, EditedAtmosSerializer
from users.serializers.common import OwnerSerializer, Put_In_LibrarySerializer
from tags.serializers.common import TagSerializer, PostTagSerializer

from tags.models import Tag


class TagsPopulatedSerializer(AtmosSerializer):
    tags = PostTagSerializer(many=True)

    def create(self, validated_data):
        tag_data = validated_data.pop('tags')
        atmosphere = Atmosphere.objects.create(**validated_data)
        for tag in tag_data:
            tag_obj, _ = Tag.objects.get_or_create(tag=tag['tag'])
            atmosphere.tags.add(tag_obj)
        return atmosphere


class PutAtmosSerializer(EditedAtmosSerializer):
    tags = PostTagSerializer(many=True)

    def update(self, instance, validated_data):
        tag_data = validated_data.pop('tags')
        instance.name = validated_data.get('name', instance.name)
        instance.picture = validated_data.get('picture', instance.picture)
        instance.audio = validated_data.get('audio', instance.audio)
        instance.tags.clear()
        for tag in tag_data:
            tag_obj, _ = Tag.objects.get_or_create(tag=tag['tag'])
            instance.tags.add(tag_obj)
        instance.save()
        return instance


class PopulatedAtmosSerializer(AtmosSerializer):
    tags = TagSerializer(many=True)
    owner = OwnerSerializer()
    put_in_library = Put_In_LibrarySerializer(many=True)


class PopulatedNoTags(AtmosSerializer):
    owner = OwnerSerializer()
    put_in_library = Put_In_LibrarySerializer(many=True)
