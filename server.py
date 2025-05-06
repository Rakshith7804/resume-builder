from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pdfplumber
import nltk
from sentence_transformers import SentenceTransformer, util
from transformers import T5Tokenizer, T5ForConditionalGeneration
import re
import traceback
import logging
from docx import Document
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from io import BytesIO
import os

# Set up logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Download NLTK data
try:
    nltk.download('punkt', quiet=True)
    nltk.download('punkt_tab', quiet=True)
    nltk.download('stopwords', quiet=True)
except Exception as e:
    logging.error(f"Failed to download NLTK data: {e}")
    raise

app = Flask(__name__)
CORS(app)

# Load pre-trained sentence transformer model
try:
    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
except Exception as e:
    logging.error(f"Failed to load sentence-transformers model: {e}")
    raise

# Load Flan-T5 model and tokenizer
try:
    t5_tokenizer = T5Tokenizer.from_pretrained('google/flan-t5-base')
    t5_model = T5ForConditionalGeneration.from_pretrained('google/flan-t5-base')
except Exception as e:
    logging.error(f"Failed to load Flan-T5 model: {e}")
    raise

# Stop words for keyword filtering
try:
    stop_words = set(nltk.corpus.stopwords.words('english'))
except Exception as e:
    logging.error(f"Failed to load NLTK stopwords: {e}")
    raise

def extract_text_from_pdf(pdf_file):
    """Extract text from a PDF file using pdfplumber."""
    try:
        text = ""
        with pdfplumber.open(pdf_file) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                text += page_text or ""
        if not text.strip():
            raise ValueError("No text extracted from PDF. It may be scanned or empty.")
        return text
    except Exception as e:
        logging.error(f"Error extracting text from PDF: {e}")
        raise ValueError(f"Failed to extract text from PDF: {str(e)}")

def extract_text_from_docx(docx_file):
    """Extract text from a DOC or DOCX file using python-docx."""
    try:
        doc = Document(docx_file)
        text = ""
        for para in doc.paragraphs:
            text += para.text + "\n"
        if not text.strip():
            raise ValueError("No text extracted from DOC/DOCX. It may be empty.")
        return text
    except Exception as e:
        logging.error(f"Error extracting text from DOC/DOCX: {e}")
        raise ValueError(f"Failed to extract text from DOC/DOCX: {str(e)}")

def extract_keywords(text):
    """Extract keywords from text, removing stop words and punctuation."""
    try:
        if not text.strip():
            raise ValueError("Input text is empty")
        tokens = nltk.word_tokenize(text.lower())
        tokens = [re.sub(r'[^\w\s]', '', token) for token in tokens]
        keywords = [token for token in tokens if token and len(token) > 2 and token not in stop_words]
        return keywords
    except Exception as e:
        logging.error(f"Error extracting keywords: {e}")
        raise ValueError(f"Failed to extract keywords: {str(e)}")

def parse_resume_text(text):
    """Parse resume text into structured JSON data."""
    try:
        json_data = {
            'contactInfo': {},
            'skills': [],
            'workExperience': [],
            'projects': [],
            'education': [],
            'certifications': [],
            'summary': ""
        }

        lines = [line.strip() for line in text.split("\n") if line.strip()]
        current_section = ""

        for line in lines:
            if re.search(r'contact|email|phone|address', line, re.IGNORECASE):
                current_section = "contactInfo"
                email_match = re.search(r'[\w.-]+@[\w.-]+\.\w+', line)
                phone_match = re.search(r'\d{3}-\d{3}-\d{4}', line)
                name_match = re.search(r'^[A-Z][a-z]+\s[A-Z][a-z]+', line)
                json_data['contactInfo']['email'] = email_match.group(0) if email_match else ""
                json_data['contactInfo']['phone'] = phone_match.group(0) if phone_match else ""
                json_data['contactInfo']['name'] = name_match.group(0) if name_match else ""
            elif re.search(r'skills|technologies', line, re.IGNORECASE):
                current_section = "skills"
            elif re.search(r'experience|work|employment', line, re.IGNORECASE):
                current_section = "workExperience"
            elif re.search(r'projects', line, re.IGNORECASE):
                current_section = "projects"
            elif re.search(r'education|university|college', line, re.IGNORECASE):
                current_section = "education"
            elif re.search(r'certificates|certifications', line, re.IGNORECASE):
                current_section = "certifications"
            elif re.search(r'summary|description|objective', line, re.IGNORECASE):
                current_section = "summary"
            else:
                if current_section == "skills":
                    json_data['skills'].extend([s.strip() for s in line.split(",") if s.strip()])
                elif current_section == "workExperience":
                    json_data['workExperience'].append({'title': line, 'details': ""})
                elif current_section == "projects":
                    json_data['projects'].append({'name': line, 'details': ""})
                elif current_section == "education":
                    json_data['education'].append({'degree': line, 'institution': ""})
                elif current_section == "certifications":
                    json_data['certifications'].append({'name': line, 'issuer': ""})
                elif current_section == "summary":
                    json_data['summary'] += line + " "

        json_data['skills'] = [s for s in json_data['skills'] if s]
        json_data['workExperience'] = [w for w in json_data['workExperience'] if w['title']]
        json_data['projects'] = [p for p in json_data['projects'] if p['name']]
        json_data['education'] = [e for e in json_data['education'] if e['degree']]
        json_data['certifications'] = [c for c in json_data['certifications'] if c['name']]
        json_data['summary'] = json_data['summary'].strip()

        return json_data
    except Exception as e:
        logging.error(f"Error parsing resume text: {e}")
        raise ValueError(f"Failed to parse resume text: {str(e)}")

def generate_summary(jd_text):
    """Generate a professional resume summary using Flan-T5."""
    try:
        jd_keywords = extract_keywords(jd_text)
        prompt = f"Generate a professional resume summary (3-4 sentences) for a candidate applying to a job with the following description: {jd_text}. Incorporate these keywords: {', '.join(jd_keywords[:5])}. Output as plain text."

        inputs = t5_tokenizer(prompt, return_tensors="pt", max_length=512, truncation=True)
        outputs = t5_model.generate(**inputs, max_length=100, num_beams=5, temperature=0.7)
        generated_text = t5_tokenizer.decode(outputs[0], skip_special_tokens=True)
        return generated_text.strip()
    except Exception as e:
        logging.error(f"Error generating summary: {e}")
        return "Professional with strong skills tailored to the job requirements."

def create_pdf_resume(resume_data):
    """Create a professional ATS-friendly PDF resume using reportlab."""
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    styles = getSampleStyleSheet()
    
    # Custom styles
    styles.add(ParagraphStyle(name='Header', fontSize=16, leading=20, spaceAfter=10, alignment=1, fontName='Helvetica-Bold'))
    styles.add(ParagraphStyle(name='Contact', fontSize=10, leading=12, spaceAfter=10, alignment=1, fontName='Helvetica'))
    styles.add(ParagraphStyle(name='Section', fontSize=12, leading=14, spaceAfter=8, fontName='Helvetica-Bold'))
    styles.add(ParagraphStyle(name='Body', fontSize=10, leading=12, spaceAfter=6, fontName='Helvetica'))
    
    story = []

    # Header: Name
    story.append(Paragraph(resume_data['personalInfo']['name'] or 'Candidate Name', styles['Header']))
    
    # Contact Info
    contact_info = f"{resume_data['personalInfo']['email']} | {resume_data['personalInfo']['phone']} | {resume_data['personalInfo']['address']}"
    story.append(Paragraph(contact_info, styles['Contact']))
    story.append(Spacer(1, 12))

    # Summary
    story.append(Paragraph('Professional Summary', styles['Section']))
    summary = resume_data['summary'] or 'Dedicated professional with relevant skills and experience.'
    story.append(Paragraph(summary, styles['Body']))
    story.append(Spacer(1, 12))

    # Skills
    if resume_data['skills']:
        story.append(Paragraph('Skills', styles['Section']))
        skills = ', '.join(resume_data['skills'])
        story.append(Paragraph(skills, styles['Body']))
        story.append(Spacer(1, 12))

    # Work Experience
    if resume_data['workExperience']:
        story.append(Paragraph('Work Experience', styles['Section']))
        for exp in resume_data['workExperience']:
            story.append(Paragraph(exp, styles['Body']))
            story.append(Spacer(1, 6))
        story.append(Spacer(1, 12))

    # Education
    if resume_data['education']:
        story.append(Paragraph('Education', styles['Section']))
        for edu in resume_data['education']:
            story.append(Paragraph(edu, styles['Body']))
            story.append(Spacer(1, 6))
        story.append(Spacer(1, 12))

    # Projects
    if resume_data['projects']:
        story.append(Paragraph('Projects', styles['Section']))
        for proj in resume_data['projects']:
            story.append(Paragraph(proj, styles['Body']))
            story.append(Spacer(1, 6))
        story.append(Spacer(1, 12))

    # Certifications
    if resume_data['certifications']:
        story.append(Paragraph('Certifications', styles['Section']))
        for cert in resume_data['certifications']:
            story.append(Paragraph(cert, styles['Body']))
            story.append(Spacer(1, 6))

    doc.build(story)
    buffer.seek(0)
    return buffer

@app.route('/api/scan', methods=['POST'])
def scan_resume():
    try:
        if 'resume' not in request.files:
            logging.warning("Missing resume file in request")
            return jsonify({'error': 'Missing resume file'}), 400
        if 'jd' not in request.form:
            logging.warning("Missing job description in request")
            return jsonify({'error': 'Missing job description'}), 400

        resume_file = request.files['resume']
        jd_text = request.form['jd'].strip()

        if not resume_file.filename.lower().endswith(('.pdf', '.doc', '.docx')):
            logging.warning(f"Invalid file type uploaded: {resume_file.filename}")
            return jsonify({'error': 'Only PDF, DOC, or DOCX files are supported'}), 400

        if not jd_text:
            logging.warning("Job description is empty")
            return jsonify({'error': 'Job description cannot be empty'}), 400

        if resume_file.filename.lower().endswith('.pdf'):
            resume_text = extract_text_from_pdf(resume_file)
        else:
            resume_text = extract_text_from_docx(resume_file)

        resume_keywords = set(extract_keywords(resume_text))
        jd_keywords = set(extract_keywords(jd_text))
        common_keywords = resume_keywords.intersection(jd_keywords)

        resume_embedding = model.encode(resume_text, convert_to_tensor=True)
        jd_embedding = model.encode(jd_text, convert_to_tensor=True)
        cosine_score = util.cos_sim(resume_embedding, jd_embedding)[0][0]
        score = float(cosine_score) * 100

        logging.info(f"Resume scan successful: score={score:.2f}, keywords={common_keywords}")
        return jsonify({
            'score': round(score, 2),
            'matched_keywords': list(common_keywords) if common_keywords else []
        })

    except ValueError as ve:
        logging.error(f"Validation error in scan_resume: {ve}")
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        logging.error(f"Error in scan_resume: {e}\n{traceback.format_exc()}")
        return jsonify({'error': f'Failed to scan resume: {str(e)}'}), 500

@app.route('/api/parse_resume', methods=['POST'])
def parse_resume():
    try:
        if 'resume' not in request.files:
            logging.warning("Missing resume file in request")
            return jsonify({'error': 'Missing resume file'}), 400

        resume_file = request.files['resume']

        if not resume_file.filename.lower().endswith(('.pdf', '.doc', '.docx')):
            logging.warning(f"Invalid file type uploaded: {resume_file.filename}")
            return jsonify({'error': 'Only PDF, DOC, or DOCX files are supported'}), 400

        if resume_file.filename.lower().endswith('.pdf'):
            resume_text = extract_text_from_pdf(resume_file)
        else:
            resume_text = extract_text_from_docx(resume_file)

        parsed_data = parse_resume_text(resume_text)

        logging.info("Resume parsed successfully")
        return jsonify(parsed_data)

    except ValueError as ve:
        logging.error(f"Validation error in parse_resume: {ve}")
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        logging.error(f"Error in parse_resume: {e}\n{traceback.format_exc()}")
        return jsonify({'error': f'Failed to parse resume: {str(e)}'}), 500

@app.route('/api/build_resume', methods=['POST'])
def build_resume():
    try:
        data = request.get_json()
        if not data:
            logging.warning("Missing JSON data in request")
            return jsonify({'error': 'Missing resume data'}), 400

        resume_data = {
            'personalInfo': data.get('personalInfo', {'name': 'Candidate Name', 'email': '', 'phone': '', 'address': ''}),
            'skills': data.get('skills', []),
            'workExperience': data.get('workExperience', []),
            'education': data.get('education', []),
            'projects': data.get('projects', []),
            'certifications': data.get('certifications', []),
            'summary': data.get('summary', '')
        }

        jd_text = data.get('jobDescription', '')
        if jd_text:
            resume_data['summary'] = generate_summary(jd_text)
        else:
            resume_data['summary'] = "Dedicated professional with relevant skills and experience tailored to the job requirements."

        pdf_buffer = create_pdf_resume(resume_data)
        pdf_path = "generated_resume.pdf"
        with open(pdf_path, 'wb') as f:
            f.write(pdf_buffer.getvalue())

        logging.info("Resume built successfully")
        return jsonify({
            'resume_data': resume_data,
            'pdf_url': f"/download/{pdf_path}"
        })

    except ValueError as ve:
        logging.error(f"Validation error in build_resume: {ve}")
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        logging.error(f"Error in build_resume: {e}\n{traceback.format_exc()}")
        return jsonify({'error': f'Failed to build resume: {str(e)}'}), 500

@app.route('/download/<path:filename>', methods=['GET'])
def download_file(filename):
    try:
        return send_file(filename, as_attachment=True)
    except Exception as e:
        logging.error(f"Error downloading file: {e}")
        return jsonify({'error': f'Failed to download file: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)