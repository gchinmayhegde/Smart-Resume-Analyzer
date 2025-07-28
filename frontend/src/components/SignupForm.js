import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Form, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, User, Mail, Lock, UserPlus, Check } from 'lucide-react';

function SignupForm({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: 'weak', color: '#ef4444', percentage: 25 };
    if (password.length < 8) return { strength: 'fair', color: '#f59e0b', percentage: 50 };
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 'strong', color: '#10b981', percentage: 100 };
    }
    return { strength: 'good', color: '#3b82f6', percentage: 75 };
  };

  const passwordStrength = getPasswordStrength(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    const result = await signup(username, email, password);
    
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
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            boxShadow: '0 10px 25px rgba(240, 147, 251, 0.3)'
          }}
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <UserPlus className="text-white" size={32} />
        </motion.div>
        <h2 className="fw-bold mb-2" style={{ color: '#2d3748' }}>Create Account</h2>
        <p className="text-muted mb-0">Join us to unlock your career potential</p>
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
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(240, 147, 251, 0.1)',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 0 3px rgba(240, 147, 251, 0.1)',
                borderColor: '#f093fb'
              }}
            />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-4">
          <div className="position-relative">
            <div className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
              <Mail size={20} />
            </div>
            <motion.input
              type="email"
              className="form-control ps-5 py-3 border-0 rounded-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(240, 147, 251, 0.1)',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 0 3px rgba(240, 147, 251, 0.1)',
                borderColor: '#f093fb'
              }}
            />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-3">
          <div className="position-relative">
            <div className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
              <Lock size={20} />
            </div>
            <motion.input
              type={showPassword ? 'text' : 'password'}
              className="form-control ps-5 pe-5 py-3 border-0 rounded-4"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(240, 147, 251, 0.1)',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 0 3px rgba(240, 147, 251, 0.1)',
                borderColor: '#f093fb'
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
          
          {/* Password Strength Indicator */}
          {password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2"
            >
              <div className="d-flex justify-content-between align-items-center mb-1">
                <small className="text-muted">Password Strength</small>
                <small style={{ color: passwordStrength.color }} className="fw-semibold text-capitalize">
                  {passwordStrength.strength}
                </small>
              </div>
              <div className="progress" style={{ height: '4px', borderRadius: '2px' }}>
                <motion.div
                  className="progress-bar"
                  style={{ backgroundColor: passwordStrength.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${passwordStrength.percentage}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-4">
          <div className="position-relative">
            <div className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
              <Lock size={20} />
            </div>
            <motion.input
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-control ps-5 pe-5 py-3 border-0 rounded-4"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${passwordsMatch ? 'rgba(16, 185, 129, 0.3)' : 'rgba(240, 147, 251, 0.1)'}`,
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              whileFocus={{
                scale: 1.02,
                boxShadow: '0 0 0 3px rgba(240, 147, 251, 0.1)',
                borderColor: '#f093fb'
              }}
            />
            <div className="position-absolute top-50 end-0 translate-middle-y me-3 d-flex align-items-center">
              {passwordsMatch && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="me-2"
                >
                  <Check size={16} className="text-success" />
                </motion.div>
              )}
              <motion.button
                type="button"
                className="btn p-0 border-0 bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showConfirmPassword ? <EyeOff size={20} className="text-muted" /> : <Eye size={20} className="text-muted" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            className="btn w-100 py-3 border-0 rounded-4 fw-semibold text-white position-relative overflow-hidden"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              fontSize: '16px',
              letterSpacing: '0.5px'
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 15px 35px rgba(240, 147, 251, 0.4)'
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
                Creating Account...
              </motion.div>
            ) : (
              <motion.div
                className="d-flex align-items-center justify-content-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <UserPlus size={20} className="me-2" />
                Create Account
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
        
        <span className="text-muted">Already have an account? </span>
        <motion.button
          className="btn p-0 border-0 fw-semibold"
          onClick={onSwitchToLogin}
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign In
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default SignupForm;