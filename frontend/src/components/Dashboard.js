import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';
import AnalysisResult from './AnalysisResult';

function Dashboard() {
  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/history/', {
          withCredentials: true,
        });
        setAnalyses(response.data);
      } catch (err) {
        console.error('Error fetching analysis history:', err);
      }
    };
    fetchAnalyses();
  }, []);

  return (
    <Card>
      <Card.Body>
        <Card.Title>Analysis History</Card.Title>
        <ListGroup>
          {analyses.map((analysis) => (
            <ListGroup.Item key={analysis.id}>
              <AnalysisResult analysis={analysis} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default Dashboard;