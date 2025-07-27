import pdfplumber
import re
import logging

logger = logging.getLogger(__name__)

def parse_resume(file_path):
    """Parse PDF resume and extract text using pdfplumber with improved error handling."""
    try:
        logger.info(f"Attempting to parse PDF: {file_path}")
        
        # Check if file exists
        import os
        if not os.path.exists(file_path):
            raise Exception(f"File not found: {file_path}")
        
        # Check file size
        file_size = os.path.getsize(file_path)
        logger.info(f"File size: {file_size} bytes")
        
        if file_size == 0:
            raise Exception("File is empty")
        
        if file_size > 10 * 1024 * 1024:  # 10MB limit
            raise Exception("File too large (max 10MB)")
        
        text = ""
        page_count = 0
        
        with pdfplumber.open(file_path) as pdf:
            logger.info(f"PDF opened successfully, pages: {len(pdf.pages)}")
            
            for page_num, page in enumerate(pdf.pages, 1):
                try:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
                        page_count += 1
                        logger.info(f"Extracted text from page {page_num}: {len(page_text)} characters")
                    else:
                        logger.warning(f"No text found on page {page_num}")
                except Exception as page_error:
                    logger.warning(f"Error extracting text from page {page_num}: {page_error}")
                    continue
        
        if not text.strip():
            # Try alternative extraction method
            logger.info("Attempting alternative text extraction...")
            try:
                import PyPDF2
                with open(file_path, 'rb') as file:
                    pdf_reader = PyPDF2.PdfReader(file)
                    for page_num, page in enumerate(pdf_reader.pages):
                        try:
                            page_text = page.extract_text()
                            if page_text:
                                text += page_text + "\n"
                        except:
                            continue
            except ImportError:
                logger.warning("PyPDF2 not available for alternative extraction")
            except Exception as alt_error:
                logger.warning(f"Alternative extraction failed: {alt_error}")
        
        # Clean and validate text
        if text.strip():
            # Clean text
            text = re.sub(r'\s+', ' ', text).strip()  # Normalize whitespace
            text = re.sub(r'[^\x00-\x7F]+', ' ', text)  # Remove non-ASCII characters
            text = text.replace('\x00', ' ')  # Remove null characters
            
            logger.info(f"Final extracted text: {len(text)} characters")
            
            if len(text) < 50:
                raise Exception("Extracted text too short (less than 50 characters). PDF might be image-based or corrupted.")
            
            return text
        else:
            raise Exception("No readable text found in PDF. The file might be image-based, corrupted, or password-protected.")
            
    except Exception as e:
        error_msg = f"Error parsing resume: {str(e)}"
        logger.error(error_msg)
        raise Exception(error_msg)