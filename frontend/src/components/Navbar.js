import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to="/">
          Smart Resume Analyzer
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              active={location.pathname === '/'}
            >
              Upload Resume
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/dashboard" 
              active={location.pathname === '/dashboard'}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/profile" 
              active={location.pathname === '/profile'}
            >
              Profile
            </Nav.Link>
          </Nav>
          
          <Nav>
            <BootstrapNavbar.Text className="me-3">
              Welcome, {user?.username}!
            </BootstrapNavbar.Text>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </div>
    </BootstrapNavbar>
  );
}

export default Navbar;