import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Brain, Sparkles, Zap, Target } from 'lucide-react';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
         }}>
      
      {/* Animated Background Elements */}
      <motion.div
        className="position-absolute top-0 start-0 w-100 h-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Floating Shapes */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="position-absolute"
          style={{
            top: '10%',
            left: '10%',
            width: '80px',
            height: '80px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            backdropFilter: 'blur(10px)'
          }}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="position-absolute"
          style={{
            top: '20%',
            right: '15%',
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            animationDelay: '1s'
          }}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="position-absolute"
          style={{
            bottom: '30%',
            left: '20%',
            width: '100px',
            height: '100px',
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '30px',
            backdropFilter: 'blur(10px)',
            animationDelay: '2s'
          }}
        />
      </motion.div>

      <div className="container">
        <div className="row align-items-center min-vh-100">
          {/* Left Side - Branding */}
          <motion.div
            className="col-lg-6 d-none d-lg-block"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="text-white mb-5">
              <motion.div
                className="d-flex align-items-center mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Brain size={60} className="me-3 text-white" />
                <h1 className="display-4 fw-bold mb-0">Smart Resume Analyzer</h1>
              </motion.div>
              <motion.p variants={itemVariants} className="lead mb-4 opacity-90">
                Transform your career with AI-powered resume analysis. Get instant ATS scores, 
                job match insights, and personalized feedback to land your dream job.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} className="row g-4">
              <div className="col-md-6">
                <motion.div
                  className="d-flex align-items-center p-3 rounded-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Zap className="text-warning me-3" size={24} />
                  <div className="text-white">
                    <h6 className="mb-1 fw-semibold">Instant Analysis</h6>
                    <small className="opacity-80">Get results in seconds</small>
                  </div>
                </motion.div>
              </div>
              <div className="col-md-6">
                <motion.div
                  className="d-flex align-items-center p-3 rounded-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Target className="text-success me-3" size={24} />
                  <div className="text-white">
                    <h6 className="mb-1 fw-semibold">ATS Optimization</h6>
                    <small className="opacity-80">Beat applicant tracking systems</small>
                  </div>
                </motion.div>
              </div>
              <div className="col-md-6">
                <motion.div
                  className="d-flex align-items-center p-3 rounded-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Sparkles className="text-info me-3" size={24} />
                  <div className="text-white">
                    <h6 className="mb-1 fw-semibold">AI Feedback</h6>
                    <small className="opacity-80">Personalized suggestions</small>
                  </div>
                </motion.div>
              </div>
              <div className="col-md-6">
                <motion.div
                  className="d-flex align-items-center p-3 rounded-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)'
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Brain className="text-primary me-3" size={24} />
                  <div className="text-white">
                    <h6 className="mb-1 fw-semibold">Smart Matching</h6>
                    <small className="opacity-80">Job compatibility scoring</small>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Auth Forms */}
          <div className="col-lg-6 col-md-8 mx-auto">
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
            >
              <div
                className="glass-card p-5"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
              >
                {/* Form Switch Animation */}
                <div className="text-center mb-4">
                  <motion.div
                    className="d-inline-flex p-1 rounded-pill"
                    style={{
                      background: 'rgba(102, 126, 234, 0.1)',
                      border: '1px solid rgba(102, 126, 234, 0.2)'
                    }}
                  >
                    <motion.button
                      className={`btn px-4 py-2 rounded-pill fw-semibold position-relative ${
                        isLogin ? 'text-white' : 'text-muted'
                      }`}
                      onClick={() => setIsLogin(true)}
                      style={{
                        background: isLogin ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                        border: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </motion.button>
                    <motion.button
                      className={`btn px-4 py-2 rounded-pill fw-semibold position-relative ${
                        !isLogin ? 'text-white' : 'text-muted'
                      }`}
                      onClick={() => setIsLogin(false)}
                      style={{
                        background: !isLogin ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                        border: 'none',
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up
                    </motion.button>
                  </motion.div>
                </div>

                {/* Animated Form Container */}
                <AnimatePresence mode="wait">
                  {isLogin ? (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="signup"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;