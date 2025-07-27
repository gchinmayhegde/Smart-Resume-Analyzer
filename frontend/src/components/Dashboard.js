import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Alert, Spinner, Badge } from 'react-bootstrap';
import AnalysisResult from './AnalysisResult';

function Dashboard() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await axios.get('/api/history/', {
          withCredentials: true,
        });
        setAnalyses(response.data);
      } catch (err) {
        console.error('Error fetching analysis history:', err);
        setError('Failed to load analysis history');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyses();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading your analysis history...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Card.Title className="mb-0">Analysis History</Card.Title>
            <Badge bg="primary" pill>
              {analyses.length} {analyses.length === 1 ? 'Analysis' : 'Analyses'}
            </Badge>
          </div>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          {analyses.length === 0 ? (
            <Alert variant="info">
              <Alert.Heading>No analyses yet!</Alert.Heading>
              <p>
                You haven't uploaded any resumes for analysis yet. 
                <a href="/" className="alert-link"> Upload your first resume</a> to get started.
              </p>
            </Alert>
          ) : (
            <div className="row">
              {analyses.map((analysis) => (
                <div key={analysis.id} className="col-lg-6 mb-4">
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h6 className="card-subtitle text-muted">
                          Analysis #{analysis.id}
                        </h6>
                        <small className="text-muted">
                          {new Date(analysis.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </small>
                      </div>
                      <AnalysisResult analysis={analysis} />
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Dashboard;