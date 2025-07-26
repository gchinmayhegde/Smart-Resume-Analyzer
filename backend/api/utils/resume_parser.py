import pdfplumber
import re

def parse_resume(file_path):
    """Parse PDF resume and extract text using pdfplumber."""
    try:
        with pdfplumber.open(file_path) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text() or ""  # Handle None
        text = re.sub(r'\s+', ' ', text).strip()  # Clean text
        return text
    except Exception as e:
        raise Exception(f"Error parsing resume: {str(e)}")