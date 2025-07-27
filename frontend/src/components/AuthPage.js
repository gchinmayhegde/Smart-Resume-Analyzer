import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="col-md-4">
        {isLogin ? (
          <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;