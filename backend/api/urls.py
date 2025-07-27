from django.urls import path
from .views import ResumeUploadView, AnalysisHistoryView

urlpatterns = [
    path('upload/', ResumeUploadView.as_view(), name='resume-upload'),
    path('history/', AnalysisHistoryView.as_view(), name='analysis-history'),
]