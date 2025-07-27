import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

nlp = spacy.load('en_core_web_sm')

def calculate_ats_score(resume_text, job_description):
    """Calculate ATS score based on keyword overlap."""
    resume_doc = nlp(resume_text.lower())
    job_doc = nlp(job_description.lower())
    
    resume_keywords = set(token.text for token in resume_doc if token.is_alpha and not token.is_stop)
    job_keywords = set(token.text for token in job_doc if token.is_alpha and not token.is_stop)
    
    common_keywords = resume_keywords.intersection(job_keywords)
    ats_score = len(common_keywords) / len(job_keywords) * 100 if job_keywords else 0
    
    return min(ats_score, 100)

def calculate_job_match_score(resume_text, job_description):
    """Calculate semantic similarity using TF-IDF."""
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([resume_text, job_description])
    
    similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]
    return similarity * 100