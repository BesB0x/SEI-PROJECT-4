from atmospheres.serializers.populated import PopulatedAtmosSerializer
from .common import UserSerializer, UserLibrarySerializer

class PopulatedUserSerializer(UserSerializer):
    user_library = PopulatedAtmosSerializer(many=True)

# class PopulatedUserLibrarySerializer(UserLibrarySerializer):
#     user_library = AtmosSerializer(many=True)