import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Form, Alert } from 'react-bootstrap';
import AnalysisResult from './AnalysisResult';
import { Upload, FileText, Zap, Target, Brain, CheckCircle } from 'lucide-react';

function UploadResume() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        setResume(file);
      } else {
        setError('Please upload a PDF file only');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAnalysis(null);
    setLoading(true);
    
    if (!resume) {
      setError('Please select a resume file');
      setLoading(false);
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      setLoading(false);
      return;
    }
    
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('job_description', jobDescription);

    try {
      function getCSRFToken() {
  const name = 'csrftoken';
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

const csrfToken = getCSRFToken();

const response = await axios.post('/api/upload/', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'X-CSRFToken': csrfToken,
  },
  withCredentials: true,
});
      setAnalysis(response.data);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.error || 'Error analyzing resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="container mt-4">
      <motion.div
        className="row justify-content-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="col-lg-10">
          {/* Header Section */}
          <motion.div 
            variants={itemVariants} 
            className="text-center mb-5"
          >
            <motion.div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
              }}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Upload className="text-white" size={32} />
            </motion.div>
            <h1 className="display-6 fw-bold mb-3" style={{ color: '#2d3748' }}>
              AI-Powered Resume Analysis
            </h1>
            <p className="lead text-muted mb-4">
              Upload your resume and get instant ATS compatibility scores, job matching insights, 
              and personalized feedback to boost your chances of landing interviews.
            </p>
            
            {/* Feature Pills */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
              <motion.div
                className="d-flex align-items-center px-4 py-2 rounded-pill"
                style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                  border: '1px solid rgba(102, 126, 234, 0.2)'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Zap size={16} className="text-warning me-2" />
                <small className="fw-semibold text-primary">Instant Analysis</small>
              </motion.div>
              <motion.div
                className="d-flex align-items-center px-4 py-2 rounded-pill"
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Target size={16} className="text-success me-2" />
                <small className="fw-semibold text-success">ATS Optimization</small>
              </motion.div>
              <motion.div
                className="d-flex align-items-center px-4 py-2 rounded-pill"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1))',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Brain size={16} className="text-info me-2" />
                <small className="fw-semibold text-info">AI Feedback</small>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Form Card */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-5 mb-4"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-4"
              >
                <Alert 
                  variant="danger" 
                  className="border-0 rounded-4"
                  style={{
                    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {error}
                </Alert>
              </motion.div>
            )}
            
            <Form onSubmit={handleSubmit}>
              {/* File Upload Section */}
              <motion.div variants={itemVariants} className="mb-5">
                <label className="form-label fw-semibold mb-3 d-flex align-items-center">
                  <FileText size={20} className="me-2 text-primary" />
                  Upload Your Resume (PDF only)
                </label>
                
                <motion.div
                  className={`border rounded-4 p-5 text-center position-relative ${
                    dragActive ? 'border-primary bg-primary bg-opacity-10' : 'border-2 border-dashed'
                  }`}
                  style={{
                    borderColor: dragActive ? '#667eea' : '#dee2e6',
                    transition: 'all 0.3s ease',
                    background: dragActive ? 'rgba(102, 126, 234, 0.05)' : 'rgba(255, 255, 255, 0.5)'
                  }}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  whileHover={{ scale: 1.02 }}
                  animate={dragActive ? { scale: 1.02 } : { scale: 1 }}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                    style={{ cursor: 'pointer' }}
                  />
                  
                  <motion.div
                    className="d-flex flex-column align-items-center"
                    animate={dragActive ? { y: -5 } : { y: 0 }}
                  >
                    {resume ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mb-3"
                        >
                          <CheckCircle size={48} className="text-success" />
                        </motion.div>
                        <h5 className="fw-bold text-success mb-2">File Selected!</h5>
                        <p className="text-muted mb-0">{resume.name}</p>
                        <small className="text-muted">
                          {(resume.size / 1024 / 1024).toFixed(2)} MB
                        </small>
                      </>
                    ) : (
                      <>
                        <motion.div
                          className="mb-3"
                          animate={{ y: [-5, 5, -5] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Upload size={48} className={dragActive ? 'text-primary' : 'text-muted'} />
                        </motion.div>
                        <h5 className="fw-bold mb-2">
                          {dragActive ? 'Drop your resume here!' : 'Drag & drop your resume'}
                        </h5>
                        <p className="text-muted mb-3">
                          or <span className="text-primary fw-semibold">browse files</span>
                        </p>
                        <small className="text-muted">
                          Supports PDF files up to 10MB
                        </small>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Job Description Section */}
              <motion.div variants={itemVariants} className="mb-5">
                <label className="form-label fw-semibold mb-3">
                  Job Description
                </label>
                <motion.textarea
                  className="form-control border-0 rounded-4 p-4"
                  rows={8}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here... Include requirements, responsibilities, and preferred qualifications for the best analysis results."
                  required
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(102, 126, 234, 0.1)',
                    fontSize: '16px',
                    resize: 'vertical',
                    minHeight: '200px'
                  }}
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                    borderColor: '#667eea'
                  }}
                />
                <div className="d-flex justify-content-between mt-2">
                  <small className="text-muted">
                    Tip: Include all job requirements for better analysis
                  </small>
                  <small className="text-muted">
                    {jobDescription.length} characters
                  </small>
                </div>
              </motion.div>
              
              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="btn w-100 py-4 border-0 rounded-4 fw-bold text-white position-relative overflow-hidden"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '18px',
                    letterSpacing: '1px'
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <motion.div
                          variants={loadingVariants}
                          animate="animate"
                          className="me-3"
                        >
                          <Brain size={24} />
                        </motion.div>
                        <div>
                          <div>Analyzing Your Resume...</div>
                          <small className="opacity-75">This may take a few moments</small>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="analyze"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="d-flex align-items-center justify-content-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Zap size={24} className="me-3" />
                        START AI ANALYSIS
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </Form>
          </motion.div>
          
          {/* Analysis Results */}
          <AnimatePresence>
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              >
                <AnalysisResult analysis={analysis} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
       </div>
  );
}

export default UploadResume;
