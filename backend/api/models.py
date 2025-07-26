
# Create your models here.
from django.db import models
from django.contrib.auth.models import User
import os

def user_resume_path(instance, filename):
    """Generate file path for user-specific resume storage."""
    return f'resumes/{instance.user.id}/{filename}'

class ResumeAnalysis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resume_file = models.FileField(upload_to=user_resume_path)  # Stores file locally
    job_description = models.TextField()
    ats_score = models.FloatField()
    job_match_score = models.FloatField()
    feedback = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s analysis from {self.created_at}"