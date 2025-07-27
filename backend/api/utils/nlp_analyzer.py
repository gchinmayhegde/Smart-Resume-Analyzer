import re
import logging
from collections import Counter

logger = logging.getLogger(__name__)

# Fallback analyzer if spacy is not available
def calculate_ats_score_fallback(resume_text, job_description):
    """Calculate ATS score using basic keyword matching without spacy."""
    try:
        # Convert to lowercase and extract words
        resume_words = set(re.findall(r'\b[a-zA-Z]{3,}\b', resume_text.lower()))
        job_words = set(re.findall(r'\b[a-zA-Z]{3,}\b', job_description.lower()))
        
        # Remove common stop words
        stop_words = {
            'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 
            'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 
            'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 
            'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use', 'will', 'with'
        }
        
        resume_words = resume_words - stop_words
        job_words = job_words - stop_words
        
        if not job_words:
            return 0.0
        
        # Find common keywords
        common_words = resume_words.intersection(job_words)
        ats_score = (len(common_words) / len(job_words)) * 100
        
        return min(ats_score, 100.0)
        
    except Exception as e:
        logger.error(f"Fallback ATS calculation error: {e}")
        return 0.0

def calculate_job_match_score_fallback(resume_text, job_description):
    """Calculate job match using basic text similarity without sklearn."""
    try:
        # Simple word frequency approach
        resume_words = re.findall(r'\b[a-zA-Z]{3,}\b', resume_text.lower())
        job_words = re.findall(r'\b[a-zA-Z]{3,}\b', job_description.lower())
        
        resume_counter = Counter(resume_words)
        job_counter = Counter(job_words)
        
        # Calculate overlap
        common_words = set(resume_counter.keys()) & set(job_counter.keys())
        
        if not common_words:
            return 0.0
        
        # Simple similarity score
        total_overlap = sum(min(resume_counter[word], job_counter[word]) for word in common_words)
        max_possible = sum(job_counter.values())
        
        similarity = (total_overlap / max_possible) * 100 if max_possible > 0 else 0.0
        return min(similarity, 100.0)
        
    except Exception as e:
        logger.error(f"Fallback job match calculation error: {e}")
        return 0.0

def calculate_ats_score(resume_text, job_description):
    """Calculate ATS score based on keyword overlap."""
    try:
        # Try using spacy if available
        import spacy
        try:
            nlp = spacy.load('en_core_web_sm')
            
            resume_doc = nlp(resume_text.lower())
            job_doc = nlp(job_description.lower())
            
            resume_keywords = set(token.text for token in resume_doc if token.is_alpha and not token.is_stop and len(token.text) > 2)
            job_keywords = set(token.text for token in job_doc if token.is_alpha and not token.is_stop and len(token.text) > 2)
            
            if not job_keywords:
                return 0.0
            
            common_keywords = resume_keywords.intersection(job_keywords)
            ats_score = len(common_keywords) / len(job_keywords) * 100
            
            return min(ats_score, 100.0)
            
        except OSError as spacy_error:
            logger.warning(f"Spacy model not found: {spacy_error}. Using fallback method.")
            return calculate_ats_score_fallback(resume_text, job_description)
            
    except ImportError:
        logger.warning("Spacy not installed. Using fallback method.")
        return calculate_ats_score_fallback(resume_text, job_description)
    except Exception as e:
        logger.error(f"ATS calculation error: {e}")
        return calculate_ats_score_fallback(resume_text, job_description)

def calculate_job_match_score(resume_text, job_description):
    """Calculate semantic similarity using TF-IDF or fallback method."""
    try:
        # Try using sklearn if available
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.metrics.pairwise import cosine_similarity
        
        vectorizer = TfidfVectorizer(stop_words='english', max_features=1000)
        vectors = vectorizer.fit_transform([resume_text, job_description])
        
        similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]
        return similarity * 100
        
    except ImportError:
        logger.warning("Sklearn not installed. Using fallback method.")
        return calculate_job_match_score_fallback(resume_text, job_description)
    except Exception as e:
        logger.error(f"Job match calculation error: {e}")
        return calculate_job_match_score_fallback(resume_text, job_description)