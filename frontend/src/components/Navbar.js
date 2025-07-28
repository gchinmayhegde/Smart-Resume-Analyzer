import React from 'react';
import { motion } from 'framer-motion';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Brain, Upload, BarChart3, User, LogOut, Sparkles } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 300
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <BootstrapNavbar 
        expand="lg" 
        className="py-3 shadow-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="container">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
              <motion.div
                className="me-2 d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Brain className="text-white" size={20} />
              </motion.div>
              <span 
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '1.5rem'
                }}
              >
                Smart Resume Analyzer
              </span>
            </BootstrapNavbar.Brand>
          </motion.div>
          
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  className={`d-flex align-items-center px-3 py-2 rounded-3 mx-1 fw-semibold ${
                    location.pathname === '/' ? 'active' : ''
                  }`}
                  style={{
                    background: location.pathname === '/' 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : 'transparent',
                    color: location.pathname === '/' ? 'white' : '#6c757d',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Upload size={18} className="me-2" />
                  Upload Resume
                </Nav.Link>
              </motion.div>
              
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Nav.Link 
                  as={Link} 
                  to="/dashboard" 
                  className={`d-flex align-items-center px-3 py-2 rounded-3 mx-1 fw-semibold ${
                    location.pathname === '/dashboard' ? 'active' : ''
                  }`}
                  style={{
                    background: location.pathname === '/dashboard' 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : 'transparent',
                    color: location.pathname === '/dashboard' ? 'white' : '#6c757d',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <BarChart3 size={18} className="me-2" />
                  Dashboard
                </Nav.Link>
              </motion.div>
              
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <Nav.Link 
                  as={Link} 
                  to="/profile" 
                  className={`d-flex align-items-center px-3 py-2 rounded-3 mx-1 fw-semibold ${
                    location.pathname === '/profile' ? 'active' : ''
                  }`}
                  style={{
                    background: location.pathname === '/profile' 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                      : 'transparent',
                    color: location.pathname === '/profile' ? 'white' : '#6c757d',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <User size={18} className="me-2" />
                  Profile
                </Nav.Link>
              </motion.div>
            </Nav>
            
            <Nav className="align-items-center">
              <motion.div
                className="d-flex align-items-center me-3 px-3 py-2 rounded-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                  border: '1px solid rgba(102, 126, 234, 0.2)'
                }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles size={16} className="text-primary me-2" />
                </motion.div>
                <span className="fw-semibold text-primary">
                  Welcome, {user?.username}!
                </span>
              </motion.div>
              
              <motion.button
                className="btn d-flex align-items-center px-3 py-2 border-0 rounded-4 fw-semibold text-white"
                onClick={handleLogout}
                style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px rgba(240, 147, 251, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <LogOut size={16} className="me-2" />
                Logout
              </motion.button>
            </Nav>
          </BootstrapNavbar.Collapse>
        </div>
      </BootstrapNavbar>
    </motion.div>
  );
}

export default Navbar;