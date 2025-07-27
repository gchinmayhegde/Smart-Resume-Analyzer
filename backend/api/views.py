from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from .models import ResumeAnalysis
from .serializers import ResumeAnalysisSerializer, UserSerializer
from .utils.resume_parser import parse_resume
from .utils.nlp_analyzer import calculate_ats_score, calculate_job_match_score
from .utils.ai_feedback import generate_feedback
import json
import traceback
import logging

# Set up logging
logger = logging.getLogger(__name__)

class CSRFTokenView(APIView):
    """Get CSRF token for frontend."""
    permission_classes = [AllowAny]
    
    def get(self, request):
        token = get_token(request)
        return Response({'csrfToken': token})

class LoginView(APIView):
    """Handle user login."""
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if username and password:
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return Response({
                    'success': True,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

class SignupView(APIView):
    """Handle user registration."""
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not all([username, email, password]):
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            login(request, user)
            return Response({
                'success': True,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'Error creating user'}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    """Handle user logout."""
    
    def post(self, request):
        logout(request)
        return Response({'success': True}, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    """Get current user profile."""
    
    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                'user': {
                    'id': request.user.id,
                    'username': request.user.username,
                    'email': request.user.email
                }
            })
        return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    
    def put(self, request):
        """Update user profile (email only)."""
        if not request.user.is_authenticated:
            return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        email = request.data.get('email')
        if email:
            if User.objects.filter(email=email).exclude(id=request.user.id).exists():
                return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
            request.user.email = email
            request.user.save()
            
            return Response({
                'success': True,
                'user': {
                    'id': request.user.id,
                    'username': request.user.username,
                    'email': request.user.email
                }
            })
        
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

class ResumeUploadView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        try:
            resume_file = request.FILES.get('resume')
            if not resume_file:
                return Response({'error': 'Resume file is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            if not resume_file.name.endswith('.pdf'):
                return Response({'error': 'Only PDF files are supported'}, status=status.HTTP_400_BAD_REQUEST)
            
            job_description = request.data.get('job_description')
            if not job_description:
                return Response({'error': 'Job description is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Save initial analysis
            analysis = ResumeAnalysis(
                user=request.user,
                resume_file=resume_file,
                job_description=job_description,
                ats_score=0.0,
                job_match_score=0.0,
                feedback="Analyzing..."
            )
            analysis.save()
            
            try:
                # Step 1: Parse resume
                logger.info(f"Parsing resume: {analysis.resume_file.path}")
                resume_text = parse_resume(analysis.resume_file.path)
                logger.info(f"Resume text extracted: {len(resume_text)} characters")
                
                if not resume_text or len(resume_text.strip()) < 50:
                    raise Exception("Resume text extraction failed or text too short")
                
                # Step 2: Calculate ATS score
                logger.info("Calculating ATS score")
                ats_score = calculate_ats_score(resume_text, job_description)
                logger.info(f"ATS score calculated: {ats_score}")
                
                # Step 3: Calculate job match score
                logger.info("Calculating job match score")
                job_match_score = calculate_job_match_score(resume_text, job_description)
                logger.info(f"Job match score calculated: {job_match_score}")
                
                # Step 4: Generate feedback (with fallback)
                logger.info("Generating AI feedback")
                try:
                    feedback = generate_feedback(resume_text, job_description, ats_score, job_match_score)
                except Exception as feedback_error:
                    logger.warning(f"AI feedback generation failed: {feedback_error}")
                    # Fallback feedback
                    feedback = f"""
Based on your resume analysis:

• ATS Score: {ats_score:.1f}% - {"Good" if ats_score > 70 else "Needs improvement"}
• Job Match Score: {job_match_score:.1f}% - {"Good match" if job_match_score > 70 else "Could be improved"}

General Suggestions:
• Include more relevant keywords from the job description
• Ensure your resume follows a clean, ATS-friendly format
• Highlight specific achievements and quantifiable results
• Tailor your experience section to match job requirements
• Consider adding relevant skills mentioned in the job posting

Note: AI-powered detailed feedback is temporarily unavailable.
                    """.strip()
                
                # Update analysis
                analysis.ats_score = ats_score
                analysis.job_match_score = job_match_score
                analysis.feedback = feedback
                analysis.save()
                
                logger.info("Analysis completed successfully")
                serializer = ResumeAnalysisSerializer(analysis)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
                
            except Exception as processing_error:
                logger.error(f"Processing error: {processing_error}")
                logger.error(f"Traceback: {traceback.format_exc()}")
                
                # Update analysis with error info
                analysis.ats_score = 0.0
                analysis.job_match_score = 0.0
                analysis.feedback = f"Analysis failed: {str(processing_error)}"
                analysis.save()
                
                return Response({
                    'error': f'Analysis processing failed: {str(processing_error)}',
                    'details': 'Please check if the PDF is readable and try again.'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        except Exception as e:
            logger.error(f"Upload error: {e}")
            logger.error(f"Traceback: {traceback.format_exc()}")
            return Response({
                'error': f'Upload failed: {str(e)}',
                'details': 'Please check your file and try again.'
            }, status=status.HTTP_400_BAD_REQUEST)

class AnalysisHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        analyses = ResumeAnalysis.objects.filter(user=request.user).order_by('-created_at')
        serializer = ResumeAnalysisSerializer(analyses, many=True)
        return Response(serializer.data)