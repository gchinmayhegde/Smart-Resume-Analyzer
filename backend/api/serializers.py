from rest_framework import serializers
from .models import ResumeAnalysis

class ResumeAnalysisSerializer(serializers.ModelSerializer):
    resume_file = serializers.FileField(use_url=True)  # Include file URL in JSON

    class Meta:
        model = ResumeAnalysis
        fields = '__all__'