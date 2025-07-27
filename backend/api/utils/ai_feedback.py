import requests
import os

def generate_feedback(resume_text, job_description, ats_score, job_match_score):
    """Generate AI feedback using OpenRouter API."""
    api_key = os.getenv('OPENROUTER_API_KEY')
    url = "https://openrouter.ai/api/v1/chat/completions"
    
    prompt = f"""
    Analyze the resume and job description below. Provide 3-5 actionable suggestions to improve ATS compatibility (score: {ats_score}%) and job match (score: {job_match_score}%).

    Resume: {resume_text[:1000]}...
    Job Description: {job_description[:1000]}...

    Return suggestions in bullet points.
    """
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}]
    }
    
    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        feedback = response.json()['choices'][0]['message']['content']
        return feedback
    except Exception as e:
        return f"Error generating feedback: {str(e)}"