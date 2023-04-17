from ..models import Atmosphere

from .common import AtmosSerializer
from users.serializers.common import OwnerSerializer, Put_In_LibrarySerializer
from tags.serializers.common import TagSerializer 

from tags.models import Tag

class TagsPopulatedSerializer(AtmosSerializer):
    tags = TagSerializer(many=True)

    def create(self, validated_data):
        tag_data = validated_data.pop('tags')
        atmosphere = Atmosphere.objects.create(**validated_data)
        for tag in tag_data:
            tag_obj, _ = Tag.objects.get_or_create(tag=tag['tag'])
            atmosphere.tags.add(tag_obj)
        return atmosphere

class PopulatedAtmosSerializer(AtmosSerializer):
    tags = TagSerializer(many=True)
    owner = OwnerSerializer()
    put_in_library = Put_In_LibrarySerializer(many=True)

