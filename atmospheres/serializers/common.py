
from rest_framework.serializers import ModelSerializer
from ..models import Atmosphere

class AtmosSerializer(ModelSerializer):
    class Meta:
        model = Atmosphere
        fields = '__all__'