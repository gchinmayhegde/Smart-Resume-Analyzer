import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Form, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, User, Lock, LogIn } from 'lucide-react';

function LoginForm({ onSwitchToSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const formVariants = {
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

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="text-center mb-4">
        <motion.div
          className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
          style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
          }}
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <LogIn className="text-white" size={32} />
        </motion.div>
        <h2 className="fw-bold mb-2" style={{ color: '#2d3748' }}>Welcome Back!</h2>
        <p className="text-muted mb-0">Sign in to continue your journey</p>
      </motion.div>
      
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert variant="danger" className="border-0 rounded-4 mb-4"
                 style={{
                   background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                   backdropFilter: 'blur(10px)'
                 }}>
            {error}
          </Alert>
        </motion.div>
      )}
      
      <Form onSubmit={handleSubmit}>
        <motion.div variants={itemVariants} className="mb-4">
          <div className="position-relative">
            <div className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
              <User size={20} />
            </div>
            <motion.input
              type="text"
              className="form-control ps-5 py-3 border-0 rounded-4"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(102, 126, 234, 0.1)',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                borderColor: '#667eea'
              }}
            />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-4">
          <div className="position-relative">
            <div className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
              <Lock size={20} />
            </div>
            <motion.input
              type={showPassword ? 'text' : 'password'}
              className="form-control ps-5 pe-5 py-3 border-0 rounded-4"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(102, 126, 234, 0.1)',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                borderColor: '#667eea'
              }}
            />
            <motion.button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y me-3 p-0 border-0 bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? <EyeOff size={20} className="text-muted" /> : <Eye size={20} className="text-muted" />}
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            className="btn w-100 py-3 border-0 rounded-4 fw-semibold text-white position-relative overflow-hidden"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontSize: '16px',
              letterSpacing: '0.5px'
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {loading ? (
              <motion.div
                className="d-flex align-items-center justify-content-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="spinner-border spinner-border-sm me-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Signing In...
              </motion.div>
            ) : (
              <motion.div
                className="d-flex align-items-center justify-content-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <LogIn size={20} className="me-2" />
                Sign In
              </motion.div>
            )}
          </motion.button>
        </motion.div>
      </Form>
      
      <motion.div
        variants={itemVariants}
        className="text-center mt-4"
      >
        <motion.div
          className="d-flex align-items-center my-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex-grow-1" style={{ height: '1px', background: 'linear-gradient(to right, transparent, #ddd, transparent)' }}></div>
          <span className="px-3 text-muted small">OR</span>
          <div className="flex-grow-1" style={{ height: '1px', background: 'linear-gradient(to right, transparent, #ddd, transparent)' }}></div>
        </motion.div>
        
        <span className="text-muted">Don't have an account? </span>
        <motion.button
          className="btn p-0 border-0 fw-semibold"
          onClick={onSwitchToSignup}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Account
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default LoginForm;