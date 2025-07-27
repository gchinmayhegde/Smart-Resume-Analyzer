import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';
import AnalysisResult from './AnalysisResult';

function UploadResume() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('job_description', jobDescription);

    try {
      const response = await axios.post('http://localhost:8000/api/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setAnalysis(response.data);
    } catch (err) {
      setError('Error analyzing resume. Ensure you are logged in.');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <Card.Body>
        <Card.Title>Upload Resume</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Resume (PDF)</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Job Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">Analyze</Button>
        </Form>
        {error && <p className="text-danger mt-3">{error}</p>}
        {analysis && <AnalysisResult analysis={analysis} />}
      </Card.Body>
    </Card>
  );
}

export default UploadResume;