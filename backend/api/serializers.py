from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ResumeAnalysis

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ResumeAnalysisSerializer(serializers.ModelSerializer):
    resume_file = serializers.FileField(use_url=True)  # Include file URL in JSON
    user = UserSerializer(read_only=True)

    class Meta:
        model = ResumeAnalysis
        fields = '__all__'