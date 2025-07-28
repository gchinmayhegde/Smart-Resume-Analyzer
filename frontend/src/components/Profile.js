import React from 'react';
import { motion } from 'framer-motion';
import { Card } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar, Shield, Sparkles, Award } from 'lucide-react';

function Profile() {
  const { user } = useAuth();

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100
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
        <div className="col-lg-8">
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-5">
            <motion.div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
              style={{
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
              }}
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <User className="text-white" size={48} />
            </motion.div>
            <h1 className="display-6 fw-bold mb-3" style={{ color: '#2d3748' }}>
              User Profile
            </h1>
            <p className="lead text-muted">
              Manage your account information and preferences
            </p>
          </motion.div>

          {/* Profile Card */}
          <motion.div variants={cardVariants}>
            <motion.div
              className="card border-0"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
              whileHover={{
                y: -8,
                boxShadow: '0 35px 60px -12px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="card-body p-5">
                {/* Profile Header */}
                <div className="d-flex align-items-center mb-5">
                  <motion.div
                    className="rounded-4 p-3 me-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.05))',
                      border: '2px solid rgba(102, 126, 234, 0.2)'
                    }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <User size={32} className="text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="fw-bold mb-1" style={{ color: '#2d3748' }}>
                      Account Information
                    </h3>
                    <p className="text-muted mb-0">
                      Your personal details and account status
                    </p>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="row g-4">
                  {/* Username Field */}
                  <div className="col-md-6">
                    <motion.div
                      className="p-4 rounded-4 h-100"
                      style={{
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.02))',
                        border: '1px solid rgba(102, 126, 234, 0.1)'
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <motion.div
                          className="rounded-3 p-2 me-3"
                          style={{ background: 'rgba(102, 126, 234, 0.15)' }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <User size={20} className="text-primary" />
                        </motion.div>
                        <h6 className="fw-semibold mb-0 text-muted">Username</h6>
                      </div>
                      <motion.p 
                        className="fs-5 fw-bold mb-0" 
                        style={{ color: '#2d3748' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {user?.username || 'Not available'}
                      </motion.p>
                    </motion.div>
                  </div>

                  {/* Email Field */}
                  <div className="col-md-6">
                    <motion.div
                      className="p-4 rounded-4 h-100"
                      style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02))',
                        border: '1px solid rgba(16, 185, 129, 0.1)'
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <motion.div
                          className="rounded-3 p-2 me-3"
                          style={{ background: 'rgba(16, 185, 129, 0.15)' }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Mail size={20} className="text-success" />
                        </motion.div>
                        <h6 className="fw-semibold mb-0 text-muted">Email Address</h6>
                      </div>
                      <motion.p 
                        className="fs-5 fw-bold mb-0" 
                        style={{ color: '#2d3748' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        {user?.email || 'Not available'}
                      </motion.p>
                    </motion.div>
                  </div>

                  {/* Account Status */}
                  <div className="col-md-6">
                    <motion.div
                      className="p-4 rounded-4 h-100"
                      style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(37, 99, 235, 0.02))',
                        border: '1px solid rgba(59, 130, 246, 0.1)'
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <motion.div
                          className="rounded-3 p-2 me-3"
                          style={{ background: 'rgba(59, 130, 246, 0.15)' }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Shield size={20} className="text-info" />
                        </motion.div>
                        <h6 className="fw-semibold mb-0 text-muted">Account Status</h6>
                      </div>
                      <motion.div 
                        className="d-flex align-items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.div
                          className="rounded-pill px-3 py-1 me-2"
                          style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white'
                          }}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <small className="fw-semibold">Active</small>
                        </motion.div>
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                          <Sparkles size={16} className="text-success" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Member Since */}
                  <div className="col-md-6">
                    <motion.div
                      className="p-4 rounded-4 h-100"
                      style={{
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(217, 119, 6, 0.02))',
                        border: '1px solid rgba(245, 158, 11, 0.1)'
                      }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <motion.div
                          className="rounded-3 p-2 me-3"
                          style={{ background: 'rgba(245, 158, 11, 0.15)' }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Calendar size={20} className="text-warning" />
                        </motion.div>
                        <h6 className="fw-semibold mb-0 text-muted">Member Since</h6>
                      </div>
                      <motion.p 
                        className="fs-5 fw-bold mb-0" 
                        style={{ color: '#2d3748' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        {new Date().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </motion.p>
                    </motion.div>
                  </div>
                </div>

                {/* Achievement Section */}
                <motion.div
                  className="mt-5 p-4 rounded-4 text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.05), rgba(245, 87, 108, 0.02))',
                    border: '1px solid rgba(240, 147, 251, 0.1)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <motion.div
                    className="d-flex align-items-center justify-content-center mb-3"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="rounded-circle p-3 me-3"
                      style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                      }}
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Award className="text-white" size={24} />
                    </motion.div>
                    <div>
                      <h5 className="fw-bold mb-1" style={{ color: '#2d3748' }}>
                        Resume Optimization Expert
                      </h5>
                      <p className="text-muted mb-0">
                        Ready to enhance your career prospects with AI-powered insights
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="row g-3 justify-content-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <div className="col-auto">
                      <motion.div
                        className="px-4 py-2 rounded-pill"
                        style={{
                          background: 'rgba(102, 126, 234, 0.1)',
                          border: '1px solid rgba(102, 126, 234, 0.2)'
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <small className="fw-semibold text-primary">AI Analysis Ready</small>
                      </motion.div>
                    </div>
                    <div className="col-auto">
                      <motion.div
                        className="px-4 py-2 rounded-pill"
                        style={{
                          background: 'rgba(16, 185, 129, 0.1)',
                          border: '1px solid rgba(16, 185, 129, 0.2)'
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <small className="fw-semibold text-success">ATS Optimized</small>
                      </motion.div>
                    </div>
                    <div className="col-auto">
                      <motion.div
                        className="px-4 py-2 rounded-pill"
                        style={{
                          background: 'rgba(59, 130, 246, 0.1)',
                          border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        <small className="fw-semibold text-info">Career Focused</small>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Note Section */}
                <motion.div
                  className="mt-4 p-4 rounded-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.02))',
                    border: '1px solid rgba(99, 102, 241, 0.1)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <div className="d-flex align-items-start">
                    <motion.div
                      className="rounded-3 p-2 me-3 flex-shrink-0"
                      style={{ background: 'rgba(99, 102, 241, 0.15)' }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles size={20} className="text-primary" />
                    </motion.div>
                    <div>
                      <h6 className="fw-semibold mb-2" style={{ color: '#2d3748' }}>
                        Profile Management
                      </h6>
                      <p className="text-muted mb-0 small">
                        Profile editing features will be available in the next version. 
                        Currently, you can view your account information and track your resume analysis progress.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Action Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-5"
          >
            <motion.div
              className="d-flex flex-wrap justify-content-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.a
                href="/"
                className="btn px-5 py-3 border-0 rounded-4 fw-semibold text-white text-decoration-none"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontSize: '16px'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={20} className="me-2" />
                Analyze Resume
              </motion.a>
              
              <motion.a
                href="/dashboard"
                className="btn px-5 py-3 border-0 rounded-4 fw-semibold"
                style={{
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: '#667eea',
                  border: '2px solid rgba(102, 126, 234, 0.2)',
                  fontSize: '16px'
                }}
                whileHover={{
                  scale: 1.05,
                  background: 'rgba(102, 126, 234, 0.15)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Award size={20} className="me-2" />
                View Dashboard
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;