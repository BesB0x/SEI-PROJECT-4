from .common import AtmosSerializer, EditedAtmosSerializer
from users.serializers.common import OwnerSerializer, Put_In_LibrarySerializer
from tags.serializers.common import TagSerializer, PostTagSerializer


class TagsPopulatedSerializer(AtmosSerializer):
    tags = PostTagSerializer(many=True)

class PutAtmosSerializer(EditedAtmosSerializer):
    tags = TagSerializer(many=True)

class PopulatedAtmosSerializer(AtmosSerializer):
    tags = TagSerializer(many=True)
    owner = OwnerSerializer()
    put_in_library = Put_In_LibrarySerializer(many=True)

class PopulatedNoTags(AtmosSerializer):
    owner = OwnerSerializer()
    put_in_library = Put_In_LibrarySerializer(many=True)
