from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ResumeAnalysis
from .serializers import ResumeAnalysisSerializer
from .utils.resume_parser import parse_resume

class ResumeUploadView(APIView):
    def post(self, request):
        try:
            # Validate file type
            resume_file = request.FILES['resume']
            if not resume_file.name.endswith('.pdf'):
                return Response({'error': 'Only PDF files are supported'}, status=status.HTTP_400_BAD_REQUEST)
            
            job_description = request.data['job_description']
            
            # Save file locally via model
            analysis = ResumeAnalysis(
                user=request.user,
                resume_file=resume_file,
                job_description=job_description,
                ats_score=0.0,  # Placeholder
                job_match_score=0.0,  # Placeholder
                feedback="Analysis pending NLP implementation."
            )
            analysis.save()
            
            # Parse resume
            resume_text = parse_resume(analysis.resume_file.path)
            
            serializer = ResumeAnalysisSerializer(analysis)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)