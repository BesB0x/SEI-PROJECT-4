from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation, hashers

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self,data):
      
      # Remove password for later hashing
      password = data.pop('password')

      # Remove password confirmation for validation

      password_confirmation = data.pop('password_confirmation')

      # Validate password and password_confirmation

      if password != password_confirmation:
          raise serializers.ValidationError({ 'password_confirmation': 'Does not match password'})
      
      # Password strength validation
      password_validation.validate_password(password)
      
      # Hash password
      data['password'] = hashers.make_password(password)

      return data
    
    class Meta:
        fields = ('id', 'username', 'email', 'password', 'password_confirmation')
        model = User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'username', 'email', 'user_library','profile_image','cover_photo')
        model = User


class UserLibrarySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('user_library',)
        model = User

class Put_In_LibrarySerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id',)
        model = User

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ( 'username','id')
        model = User