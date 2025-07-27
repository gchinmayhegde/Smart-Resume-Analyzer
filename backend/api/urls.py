from django.urls import path
from .views import (
    ResumeUploadView, 
    AnalysisHistoryView, 
    LoginView, 
    SignupView, 
    LogoutView, 
    UserProfileView,
    CSRFTokenView
)

urlpatterns = [
    path('csrf-token/', CSRFTokenView.as_view(), name='csrf-token'),
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('upload/', ResumeUploadView.as_view(), name='resume-upload'),
    path('history/', AnalysisHistoryView.as_view(), name='analysis-history'),
]