import React from 'react';
import { Card, ProgressBar, Badge } from 'react-bootstrap';

function AnalysisResult({ analysis }) {
  const getScoreVariant = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <Card className="mt-3 border-0 bg-light">
      <Card.Body>
        <Card.Title className="d-flex align-items-center justify-content-between">
          <span>Analysis Results</span>
          <Badge bg="primary">Latest</Badge>
        </Card.Title>
        
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>ATS Compatibility Score</strong>
            <Badge bg={getScoreVariant(analysis.ats_score)}>
              {getScoreLabel(analysis.ats_score)}
            </Badge>
          </div>
          <ProgressBar 
            now={analysis.ats_score} 
            label={`${analysis.ats_score.toFixed(1)}%`}
            variant={getScoreVariant(analysis.ats_score)}
          />
          <small className="text-muted">
            How well your resume passes Applicant Tracking Systems
          </small>
        </div>
        
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Job Match Score</strong>
            <Badge bg={getScoreVariant(analysis.job_match_score)}>
              {getScoreLabel(analysis.job_match_score)}
            </Badge>
          </div>
          <ProgressBar 
            now={analysis.job_match_score} 
            label={`${analysis.job_match_score.toFixed(1)}%`}
            variant={getScoreVariant(analysis.job_match_score)}
          />
          <small className="text-muted">
            How well your resume matches the job requirements
          </small>
        </div>
        
        <div>
          <strong className="d-block mb-2">AI Feedback & Suggestions:</strong>
          <Card className="border-start border-primary border-3">
            <Card.Body className="py-2">
              <div style={{ whiteSpace: 'pre-line', fontSize: '0.95rem' }}>
                {analysis.feedback}
              </div>
            </Card.Body>
          </Card>
        </div>
        
        {analysis.job_description && (
          <div className="mt-3">
            <details>
              <summary className="btn btn-link p-0 text-decoration-none">
                <small>View Job Description</small>
              </summary>
              <Card className="mt-2 bg-white">
                <Card.Body className="py-2">
                  <small className="text-muted" style={{ whiteSpace: 'pre-line' }}>
                    {analysis.job_description.length > 300 
                      ? analysis.job_description.substring(0, 300) + '...'
                      : analysis.job_description
                    }
                  </small>
                </Card.Body>
              </Card>
            </details>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default AnalysisResult;