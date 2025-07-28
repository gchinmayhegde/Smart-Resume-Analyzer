import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './components/AuthPage';
import Navbar from './components/Navbar';
import UploadResume from './components/UploadResume';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import { Brain } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function AppContent() {
  const { user, loading } = useAuth();

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center"
           style={{
             background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
           }}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
            style={{
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
            }}
            variants={loadingVariants}
            animate="animate"
          >
            <Brain className="text-white" size={40} />
          </motion.div>
          
          <motion.h3 
            className="fw-bold mb-3"
            style={{ color: '#2d3748' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Smart Resume Analyzer
          </motion.h3>
          
          <motion.p 
            className="text-muted mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Initializing AI-powered analysis engine...
          </motion.p>
          
          <motion.div 
            className="d-flex justify-content-center"
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div 
              className="progress rounded-pill" 
              style={{ height: '4px', width: '100%' }}
            >
              <motion.div
                className="progress-bar rounded-pill"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.7, duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AuthPage />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      <Navbar />
      
      <AnimatePresence mode="wait">
        <Routes>
          <Route 
            path="/" 
            element={
              <motion.div
                key="upload"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <UploadResume />
              </motion.div>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <motion.div
                key="dashboard"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Dashboard />
              </motion.div>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <motion.div
                key="profile"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Profile />
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
      
      {/* Floating Background Elements */}
      <div className="position-fixed top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: -1, pointerEvents: 'none' }}>
        <motion.div
          className="position-absolute"
          style={{
            top: '10%',
            left: '5%',
            width: '20px',
            height: '20px',
            background: 'rgba(102, 126, 234, 0.1)',
            borderRadius: '50%'
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="position-absolute"
          style={{
            top: '60%',
            right: '10%',
            width: '30px',
            height: '30px',
            background: 'rgba(16, 185, 129, 0.08)',
            borderRadius: '30%'
          }}
          animate={{
            y: [20, -20, 20],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="position-absolute"
          style={{
            bottom: '20%',
            left: '15%',
            width: '25px',
            height: '25px',
            background: 'rgba(245, 158, 11, 0.06)',
            borderRadius: '20%'
          }}
          animate={{
            y: [-15, 15, -15],
            x: [15, -15, 15],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-vh-100">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;