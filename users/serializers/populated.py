from atmospheres.serializers.populated import PopulatedAtmosSerializer
from .common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
    user_library = PopulatedAtmosSerializer(many=True)

