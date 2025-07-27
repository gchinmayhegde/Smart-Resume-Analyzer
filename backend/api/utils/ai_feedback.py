import requests
import os
import logging

logger = logging.getLogger(__name__)

def generate_feedback(resume_text, job_description, ats_score, job_match_score):
    """Generate AI feedback using OpenRouter API with fallback."""
    
    # Check if API key is available
    api_key = os.getenv('OPENROUTER_API_KEY')
    
    if not api_key:
        logger.warning("OPENROUTER_API_KEY not found. Using fallback feedback.")
        return generate_fallback_feedback(resume_text, job_description, ats_score, job_match_score)
    
    url = "https://openrouter.ai/api/v1/chat/completions"
    
    # Truncate texts to avoid token limits
    resume_preview = resume_text[:800] if len(resume_text) > 800 else resume_text
    job_preview = job_description[:800] if len(job_description) > 800 else job_description
    
    prompt = f"""
    Analyze the resume and job description below. Provide 3-5 actionable suggestions to improve ATS compatibility (current score: {ats_score:.1f}%) and job match (current score: {job_match_score:.1f}%).

    Resume: {resume_preview}...
    Job Description: {job_preview}...

    Please provide specific, actionable suggestions in bullet points. Focus on:
    1. Keywords to add
    2. Skills to highlight
    3. Format improvements
    4. Content structure
    """
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 500,
        "temperature": 0.7
    }
    
    try:
        logger.info("Attempting to generate AI feedback...")
        response = requests.post(url, json=data, headers=headers, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        if 'choices' in result and len(result['choices']) > 0:
            feedback = result['choices'][0]['message']['content']
            logger.info("AI feedback generated successfully")
            return feedback
        else:
            logger.warning("Unexpected API response format")
            return generate_fallback_feedback(resume_text, job_description, ats_score, job_match_score)
            
    except requests.exceptions.Timeout:
        logger.warning("API request timeout. Using fallback feedback.")
        return generate_fallback_feedback(resume_text, job_description, ats_score, job_match_score)
    except requests.exceptions.RequestException as e:
        logger.warning(f"API request failed: {e}. Using fallback feedback.")
        return generate_fallback_feedback(resume_text, job_description, ats_score, job_match_score)
    except Exception as e:
        logger.error(f"Unexpected error generating feedback: {e}")
        return generate_fallback_feedback(resume_text, job_description, ats_score, job_match_score)

def generate_fallback_feedback(resume_text, job_description, ats_score, job_match_score):
    """Generate basic feedback without AI API."""
    
    # Extract key information for basic analysis
    resume_lower = resume_text.lower()
    job_lower = job_description.lower()
    
    # Common technical skills
    tech_skills = ['python', 'javascript', 'java', 'react', 'node', 'sql', 'aws', 'docker', 'git']
    job_tech_skills = [skill for skill in tech_skills if skill in job_lower]
    missing_tech_skills = [skill for skill in job_tech_skills if skill not in resume_lower]
    
    # Common action words
    action_words = ['developed', 'implemented', 'designed', 'created', 'managed', 'led', 'improved']
    has_action_words = any(word in resume_lower for word in action_words)
    
    feedback_parts = []
    
    # ATS Score feedback
    if ats_score < 50:
        feedback_parts.append("• **Keyword Optimization Needed**: Your ATS score is low. Add more relevant keywords from the job description throughout your resume.")
    elif ats_score < 75:
        feedback_parts.append("• **Good Keyword Usage**: Your ATS score is decent, but there's room for improvement. Consider adding a few more relevant keywords.")
    else:
        feedback_parts.append("• **Excellent Keyword Match**: Your resume has good ATS compatibility with relevant keywords.")
    
    # Job Match feedback
    if job_match_score < 50:
        feedback_parts.append("• **Improve Job Relevance**: Your experience doesn't closely match the job requirements. Tailor your resume more specifically to this role.")
    elif job_match_score < 75:
        feedback_parts.append("• **Good Job Alignment**: Your resume shows relevant experience, but could be more targeted to the specific role.")
    else:
        feedback_parts.append("• **Strong Job Match**: Your resume aligns well with the job requirements.")
    
    # Technical skills feedback
    if missing_tech_skills:
        feedback_parts.append(f"• **Add Technical Skills**: Consider highlighting these skills if you have them: {', '.join(missing_tech_skills[:3])}")
    
    # Action words feedback
    if not has_action_words:
        feedback_parts.append("• **Use Action Words**: Start your bullet points with strong action verbs like 'Developed', 'Implemented', 'Led', or 'Improved'.")
    
    # General improvements
    feedback_parts.extend([
        "• **Quantify Achievements**: Add specific numbers and metrics to demonstrate your impact (e.g., 'Improved performance by 25%').",
        "• **Format for ATS**: Use standard section headings like 'Experience', 'Education', 'Skills' and avoid complex formatting.",
    ])
    
    # Combine feedback
    feedback = f"""**Resume Analysis Results:**

**Scores:**
- ATS Compatibility: {ats_score:.1f}%
- Job Match: {job_match_score:.1f}%

**Recommendations:**

{chr(10).join(feedback_parts)}

**General Tips:**
• Tailor your resume for each application
• Use the same terminology as the job posting
• Keep formatting simple and ATS-friendly
• Include a skills section with relevant keywords
• Proofread for spelling and grammar errors

*Note: This analysis was generated using our built-in algorithm. For more detailed AI-powered insights, please ensure your OpenRouter API key is configured.*
"""
    
    return feedback