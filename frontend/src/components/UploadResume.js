import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import AnalysisResult from './AnalysisResult';

function UploadResume() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post('/api/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
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

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card>
            <Card.Body>
              <Card.Title>Upload Resume for Analysis</Card.Title>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Resume (PDF only)</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                    required
                  />
                  <Form.Text className="text-muted">
                    Please upload your resume in PDF format only.
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Job Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here..."
                    required
                  />
                </Form.Group>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                  disabled={loading}
                  className="w-100"
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Analyzing Resume...
                    </>
                  ) : (
                    'Analyze Resume'
                  )}
                </Button>
              </Form>
              
              {analysis && <AnalysisResult analysis={analysis} />}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UploadResume;