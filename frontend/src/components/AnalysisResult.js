import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';

function AnalysisResult({ analysis }) {
  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Analysis Results</Card.Title>
        <div className="mb-3">
          <strong>ATS Compatibility Score: {analysis.ats_score.toFixed(2)}%</strong>
          <ProgressBar now={analysis.ats_score} label={`${analysis.ats_score.toFixed(2)}%`} />
        </div>
        <div className="mb-3">
          <strong>Job Match Score: {analysis.job_match_score.toFixed(2)}%</strong>
          <ProgressBar now={analysis.job_match_score} label={`${analysis.job_match_score.toFixed(2)}%`} />
        </div>
        <div>
          <strong>Feedback:</strong>
          <p>{analysis.feedback}</p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AnalysisResult;