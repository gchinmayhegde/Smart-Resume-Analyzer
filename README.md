# Smart Resume Analyzer 🧠

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-green.svg)
![Django](https://img.shields.io/badge/django-4.2.7-darkgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

A sophisticated AI-powered resume analysis tool that helps job seekers optimize their resumes for better ATS (Applicant Tracking System) compatibility and job matching scores. Upload your resume, provide a job description, and get detailed insights with actionable feedback.

## ✨ Features

- **📄 PDF Resume Parsing**: Advanced PDF text extraction using pdfplumber
- **🎯 ATS Score Analysis**: Calculate how well your resume passes through ATS systems
- **🔍 Job Match Scoring**: Semantic analysis of how well your resume matches job requirements
- **🤖 AI-Powered Feedback**: Intelligent recommendations using OpenRouter API with GPT-3.5
- **📊 Interactive Dashboard**: Beautiful, responsive UI with real-time progress tracking
- **👤 User Authentication**: Secure login/signup with session management
- **📈 Analysis History**: Track your resume improvements over time
- **🎨 Modern UI/UX**: Glassmorphism design with smooth animations using Framer Motion

## 🛠️ Tech Stack

### Backend
- **Django 4.2.7** - Web framework
- **Django REST Framework** - API development
- **SQLite** - Database (Django's built-in)
- **pdfplumber** - PDF text extraction
- **spaCy** - Natural language processing
- **scikit-learn** - Machine learning for text analysis
- **OpenRouter API** - AI-powered feedback generation

### Frontend
- **React 18.2.0** - User interface
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Bootstrap 5** - UI components
- **Axios** - HTTP client

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-resume-analyzer.git
   cd smart-resume-analyzer
   ```

2. **Backend Setup**
   ```bash
   cd backend
   
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Download spaCy model
   python -m spacy download en_core_web_sm
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   DJANGO_SECRET_KEY=your-secret-key-here
   DEBUG=True
   
   # Optional: AI Feedback (OpenRouter API)
   OPENROUTER_API_KEY=your-openrouter-api-key
   ```

4. **Database Setup**
   ```bash
   # Run migrations to set up SQLite database
   python manage.py makemigrations
   python manage.py migrate
   
   # Create superuser (optional)
   python manage.py createsuperuser
   ```

5. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start the Application**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   python manage.py runserver
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm start
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Admin Panel: http://localhost:8000/admin
   - Database: SQLite file created automatically in backend directory (`db.sqlite3`)

## 📖 Usage

1. **Sign Up/Login**: Create an account or login to access the analyzer
2. **Upload Resume**: Upload your PDF resume (max 10MB)
3. **Job Description**: Paste the job description you're targeting
4. **Analysis**: Wait for the AI-powered analysis to complete
5. **Review Results**: Get your ATS score, job match score, and detailed feedback
6. **Dashboard**: Track your analysis history and improvements

## 🔧 Configuration

### AI Feedback Setup (Optional)
To enable AI-powered feedback, sign up for an [OpenRouter](https://openrouter.ai/) account and add your API key to the `.env` file:
```env
OPENROUTER_API_KEY=your-api-key-here
```

Without the API key, the system will use fallback feedback generation.

### Database Configuration
The project uses Django's built-in SQLite database by default, which requires no additional setup. The database file (`db.sqlite3`) will be created automatically when you run migrations.

For production or if you prefer PostgreSQL, you can modify `settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'resume_analyzer',
        'USER': 'postgres',
        'PASSWORD': 'your-password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```
```

## 📁 Project Structure

```
smart-resume-analyzer/
├── backend/
│   ├── api/
│   │   ├── models.py          # Database models
│   │   ├── views.py           # API endpoints
│   │   ├── serializers.py     # Data serialization
│   │   ├── utils/
│   │   │   ├── resume_parser.py    # PDF parsing
│   │   │   ├── nlp_analyzer.py     # NLP analysis
│   │   │   └── ai_feedback.py      # AI feedback generation
│   │   └── urls.py            # URL routing
│   ├── resume_analyzer/
│   │   ├── settings.py        # Django settings
│   │   └── urls.py           # Main URL configuration
│   ├── requirements.txt       # Python dependencies
│   └── manage.py             # Django management
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── contexts/         # React contexts
│   │   ├── app.js           # Main app component
│   │   └── styles.css       # Custom styles
│   └── public/
└── README.md
```

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login/` | User authentication |
| POST | `/api/signup/` | User registration |
| POST | `/api/logout/` | User logout |
| GET | `/api/profile/` | Get user profile |
| PUT | `/api/profile/` | Update user profile |
| POST | `/api/upload/` | Upload and analyze resume |
| GET | `/api/history/` | Get analysis history |
| GET | `/api/csrf-token/` | Get CSRF token |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint for JavaScript code
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📊 Features in Detail

### ATS Score Calculation
- Keyword matching between resume and job description
- Industry-standard scoring algorithm
- Fallback analysis when spaCy is unavailable

### Job Match Analysis
- TF-IDF vectorization for semantic similarity
- Cosine similarity calculation
- Multiple fallback methods for reliability

### AI Feedback Generation
- Context-aware suggestions
- Actionable recommendations
- Fallback to rule-based feedback

## 🐛 Troubleshooting

### Common Issues

**PDF Parsing Fails:**
- Ensure PDF is text-based, not image-based
- Check file size (max 10MB)
- Verify file is not corrupted or password-protected

**Database Connection Error:**
- The project uses SQLite by default (no setup required)
- If using PostgreSQL, verify it's running and check credentials
- Ensure database exists if using PostgreSQL

**Frontend Build Issues:**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [spaCy](https://spacy.io/) for natural language processing
- [pdfplumber](https://github.com/jsvine/pdfplumber) for PDF text extraction
- [OpenRouter](https://openrouter.ai/) for AI API services
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/smart-resume-analyzer/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🔮 Future Enhancements

- [ ] Support for DOCX files
- [ ] Resume template suggestions
- [ ] Advanced analytics dashboard

---

Made with ❤️ by gchinmayhegde