from atmospheres.serializers.common import AtmosSerializer
from .common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
    user_library = AtmosSerializer(many=True)