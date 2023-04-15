from atmospheres.serializers.common import AtmosSerializer
from .common import UserSerializer, UserLibrarySerializer

class PopulatedUserSerializer(UserSerializer):
    user_library = AtmosSerializer(many=True)

class PopulatedUserLibrarySerializer(UserLibrarySerializer):
    user_library = AtmosSerializer(many=True)