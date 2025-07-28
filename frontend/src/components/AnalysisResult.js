import React from 'react';
import { motion } from 'framer-motion';
import { Card, Badge } from 'react-bootstrap';
import { TrendingUp, Target, Brain, Award, ChevronDown, ChevronUp, FileText } from 'lucide-react';

function AnalysisResult({ analysis }) {
  const [showJobDescription, setShowJobDescription] = React.useState(false);

  const getScoreColor = (score) => {
    if (score >= 80) return { color: '#10b981', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' };
    if (score >= 60) return { color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' };
    if (score >= 40) return { color: '#ef4444', gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' };
    return { color: '#6b7280', gradient: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)' };
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const atsScoreColor = getScoreColor(analysis.ats_score);
  const jobMatchColor = getScoreColor(analysis.job_match_score);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const scoreVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (score) => ({
      width: `${score}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-5"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-4">
        <motion.div
          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
          style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            boxShadow: '0 20px 40px rgba(79, 172, 254, 0.3)'
          }}
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Award className="text-white" size={32} />
        </motion.div>
        <h2 className="fw-bold mb-2" style={{ color: '#2d3748' }}>
          Analysis Complete!
        </h2>
        <p className="text-muted">
          Here's your comprehensive resume analysis with actionable insights
        </p>
      </motion.div>

      {/* Score Cards */}
      <div className="row g-4 mb-5">
        {/* ATS Score Card */}
        <div className="col-md-6">
          <motion.div
            variants={itemVariants}
            className="h-100"
          >
            <motion.div
              className="card border-0 h-100 position-relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-3 p-2 me-3"
                      style={{ background: 'rgba(102, 126, 234, 0.1)' }}
                    >
                      <Target size={24} className="text-primary" />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">ATS Compatibility</h6>
                      <small className="text-muted">Applicant Tracking System</small>
                    </div>
                  </div>
                  <Badge
                    className="px-3 py-2 rounded-3 fw-semibold"
                    style={{
                      background: atsScoreColor.gradient,
                      color: 'white'
                    }}
                  >
                    {getScoreLabel(analysis.ats_score)}
                  </Badge>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">Score</span>
                    <motion.span
                      variants={scoreVariants}
                      className="fw-bold fs-4"
                      style={{ color: atsScoreColor.color }}
                    >
                      {analysis.ats_score.toFixed(1)}%
                    </motion.span>
                  </div>
                  <div
                    className="progress rounded-pill"
                    style={{ height: '8px', background: 'rgba(0, 0, 0, 0.1)' }}
                  >
                    <motion.div
                      className="progress-bar rounded-pill"
                      variants={progressVariants}
                      custom={analysis.ats_score}
                      style={{ background: atsScoreColor.gradient }}
                    />
                  </div>
                </div>

                <p className="text-muted small mb-0">
                  Measures how well your resume passes through automated screening systems
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Job Match Score Card */}
        <div className="col-md-6">
          <motion.div
            variants={itemVariants}
            className="h-100"
          >
            <motion.div
              className="card border-0 h-100 position-relative overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-3 p-2 me-3"
                      style={{ background: 'rgba(16, 185, 129, 0.1)' }}
                    >
                      <TrendingUp size={24} className="text-success" />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">Job Match</h6>
                      <small className="text-muted">Relevance to Position</small>
                    </div>
                  </div>
                  <Badge
                    className="px-3 py-2 rounded-3 fw-semibold"
                    style={{
                      background: jobMatchColor.gradient,
                      color: 'white'
                    }}
                  >
                    {getScoreLabel(analysis.job_match_score)}
                  </Badge>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold">Score</span>
                    <motion.span
                      variants={scoreVariants}
                      className="fw-bold fs-4"
                      style={{ color: jobMatchColor.color }}
                    >
                      {analysis.job_match_score.toFixed(1)}%
                    </motion.span>
                  </div>
                  <div
                    className="progress rounded-pill"
                    style={{ height: '8px', background: 'rgba(0, 0, 0, 0.1)' }}
                  >
                    <motion.div
                      className="progress-bar rounded-pill"
                      variants={progressVariants}
                      custom={analysis.job_match_score}
                      style={{ background: jobMatchColor.gradient }}
                    />
                  </div>
                </div>

                <p className="text-muted small mb-0">
                  Shows how well your experience aligns with job requirements
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* AI Feedback Section */}
      <motion.div variants={itemVariants}>
        <motion.div
          className="card border-0"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}
          whileHover={{
            y: -5,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
          }}
        >
          <div className="card-body p-5">
            <div className="d-flex align-items-center mb-4">
              <motion.div
                className="rounded-3 p-3 me-3"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Brain className="text-white" size={28} />
              </motion.div>
              <div>
                <h4 className="fw-bold mb-1">AI-Powered Feedback</h4>
                <p className="text-muted mb-0">Personalized suggestions to improve your resume</p>
              </div>
            </div>
            
            <motion.div
              className="p-4 rounded-4"
              style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
                border: '1px solid rgba(102, 126, 234, 0.1)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div 
                className="text-dark"
                style={{ 
                  whiteSpace: 'pre-line', 
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}
              >
                {analysis.feedback}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Job Description Toggle */}
      {analysis.job_description && (
        <motion.div variants={itemVariants} className="mt-4">
          <motion.div
            className="card border-0"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px'
            }}
          >
            <motion.button
              className="btn d-flex align-items-center justify-content-between w-100 p-4 border-0 bg-transparent text-start"
              onClick={() => setShowJobDescription(!showJobDescription)}
              whileHover={{ backgroundColor: 'rgba(102, 126, 234, 0.05)' }}
            >
              <div className="d-flex align-items-center">
                <FileText size={20} className="text-primary me-3" />
                <span className="fw-semibold">View Job Description</span>
              </div>
              <motion.div
                animate={{ rotate: showJobDescription ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} className="text-muted" />
              </motion.div>
            </motion.button>
            
            <motion.div
              initial={false}
              animate={{
                height: showJobDescription ? 'auto' : 0,
                opacity: showJobDescription ? 1 : 0
              }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-4 pb-4">
                <div
                  className="p-4 rounded-3 text-muted"
                  style={{
                    background: 'rgba(0, 0, 0, 0.02)',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-line',
                    maxHeight: '300px',
                    overflowY: 'auto'
                  }}
                >
                  {analysis.job_description}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default AnalysisResult;