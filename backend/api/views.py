from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ResumeAnalysis
from .serializers import ResumeAnalysisSerializer
from .utils.resume_parser import parse_resume
from .utils.nlp_analyzer import calculate_ats_score, calculate_job_match_score
from .utils.ai_feedback import generate_feedback

class ResumeUploadView(APIView):
    def post(self, request):
        try:
            resume_file = request.FILES['resume']
            if not resume_file.name.endswith('.pdf'):
                return Response({'error': 'Only PDF files are supported'}, status=status.HTTP_400_BAD_REQUEST)
            
            job_description = request.data['job_description']
            
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
            
            # Parse resume and calculate scores
            resume_text = parse_resume(analysis.resume_file.path)
            ats_score = calculate_ats_score(resume_text, job_description)
            job_match_score = calculate_job_match_score(resume_text, job_description)
            feedback = generate_feedback(resume_text, job_description, ats_score, job_match_score)
            
            # Update analysis
            analysis.ats_score = ats_score
            analysis.job_match_score = job_match_score
            analysis.feedback = feedback
            analysis.save()
            
            serializer = ResumeAnalysisSerializer(analysis)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class AnalysisHistoryView(APIView):
    def get(self, request):
        analyses = ResumeAnalysis.objects.filter(user=request.user).order_by('-created_at')
        serializer = ResumeAnalysisSerializer(analyses, many=True)
        return Response(serializer.data)