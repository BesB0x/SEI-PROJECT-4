from .common import TagSerializer
from atmospheres.models import Atmosphere
from atmospheres.serializers.populated import PopulatedAtmosSerializer

class PopulatedTagSerializer(TagSerializer):
    atmospheres = PopulatedAtmosSerializer(many=True)