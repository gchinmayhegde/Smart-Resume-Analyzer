import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Alert, Badge } from 'react-bootstrap';
import AnalysisResult from './AnalysisResult';
import { BarChart3, TrendingUp, Clock, FileText, Brain, Sparkles, Calendar } from 'lucide-react';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const getStats = () => {
    if (analyses.length === 0) return { avgATS: 0, avgJobMatch: 0, totalAnalyses: 0 };
    
    const avgATS = analyses.reduce((sum, analysis) => sum + analysis.ats_score, 0) / analyses.length;
    const avgJobMatch = analyses.reduce((sum, analysis) => sum + analysis.job_match_score, 0) / analyses.length;
    
    return {
      avgATS: avgATS.toFixed(1),
      avgJobMatch: avgJobMatch.toFixed(1),
      totalAnalyses: analyses.length
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
              style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="text-white" size={32} />
            </motion.div>
            <motion.h4 
              className="fw-bold mb-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading Dashboard...
            </motion.h4>
            <p className="text-muted">Fetching your analysis history</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-5">
          <motion.div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              boxShadow: '0 20px 40px rgba(79, 172, 254, 0.3)'
            }}
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <BarChart3 className="text-white" size={32} />
          </motion.div>
          <h1 className="display-6 fw-bold mb-3" style={{ color: '#2d3748' }}>
            Your Analytics Dashboard
          </h1>
          <p className="lead text-muted">
            Track your resume optimization progress and insights over time
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="card border-0 h-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.05))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="card-body p-4 text-center">
                  <motion.div
                    className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <FileText className="text-white" size={24} />
                  </motion.div>
                  <motion.h3
                    className="fw-bold mb-2"
                    style={{ color: '#667eea' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    {stats.totalAnalyses}
                  </motion.h3>
                  <p className="text-muted mb-0 fw-semibold">Total Analyses</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-md-4">
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="card border-0 h-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="card-body p-4 text-center">
                  <motion.div
                    className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <TrendingUp className="text-white" size={24} />
                  </motion.div>
                  <motion.h3
                    className="fw-bold mb-2"
                    style={{ color: '#10b981' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  >
                    {stats.avgATS}%
                  </motion.h3>
                  <p className="text-muted mb-0 fw-semibold">Avg ATS Score</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-md-4">
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="card border-0 h-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.05))',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="card-body p-4 text-center">
                  <motion.div
                    className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Sparkles className="text-white" size={24} />
                  </motion.div>
                  <motion.h3
                    className="fw-bold mb-2"
                    style={{ color: '#3b82f6' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    {stats.avgJobMatch}%
                  </motion.h3>
                  <p className="text-muted mb-0 fw-semibold">Avg Job Match</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          variants={itemVariants}
          className="card border-0"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="card-body p-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold mb-2" style={{ color: '#2d3748' }}>
                  Analysis History
                </h3>
                <p className="text-muted mb-0">
                  Review your past resume analyses and track improvements
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  className="px-4 py-2 rounded-4 fw-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '14px'
                  }}
                >
                  {analyses.length} {analyses.length === 1 ? 'Analysis' : 'Analyses'}
                </Badge>
              </motion.div>
            </div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Alert 
                  variant="danger" 
                  className="border-0 rounded-4 mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  {error}
                </Alert>
              </motion.div>
            )}
            
            <AnimatePresence>
              {analyses.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-5"
                >
                  <motion.div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                    style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.05))',
                      border: '3px dashed rgba(102, 126, 234, 0.3)'
                    }}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <FileText size={40} className="text-primary" />
                  </motion.div>
                  <h4 className="fw-bold mb-3" style={{ color: '#2d3748' }}>
                    No analyses yet!
                  </h4>
                  <p className="text-muted mb-4">
                    You haven't uploaded any resumes for analysis yet. Start your journey to a better resume!
                  </p>
                  <motion.a
                    href="/"
                    className="btn px-4 py-3 border-0 rounded-4 fw-semibold text-white text-decoration-none"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText size={20} className="me-2" />
                    Upload Your First Resume
                  </motion.a>
                </motion.div>
              ) : (
                <div className="row g-4">
                  {analyses.map((analysis, index) => (
                    <motion.div
                      key={analysis.id}
                      className="col-12"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <motion.div
                        className="card border-0"
                        style={{
                          background: 'rgba(255, 255, 255, 0.7)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '16px',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                        whileHover={{
                          y: -5,
                          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <div className="card-body p-4">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="d-flex align-items-center">
                              <motion.div
                                className="rounded-3 p-2 me-3"
                                style={{ background: 'rgba(102, 126, 234, 0.1)' }}
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.6 }}
                              >
                                <Brain size={20} className="text-primary" />
                              </motion.div>
                              <div>
                                <h6 className="fw-bold mb-0">Analysis #{analysis.id}</h6>
                                <small className="text-muted">
                                  Resume Analysis Report
                                </small>
                              </div>
                            </div>
                            <div className="text-end">
                              <div className="d-flex align-items-center text-muted mb-1">
                                <Calendar size={16} className="me-2" />
                                <small>
                                  {new Date(analysis.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </small>
                              </div>
                              <div className="d-flex align-items-center text-muted">
                                <Clock size={16} className="me-2" />
                                <small>
                                  {new Date(analysis.created_at).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </small>
                              </div>
                            </div>
                          </div>
                          <AnalysisResult analysis={analysis} />
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Dashboard;