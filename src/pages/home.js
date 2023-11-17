import React, { useState } from 'react';
import Link from "../context/Link"
import './Weather/WeatherForm.css';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const hideErrorAfterDelay = () => {
        setTimeout(() => {
          setError('');
        },2000);
      };
    
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:8001/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          console.log('Login successful');
          setEmail('');
          setPassword('');
          

          window.location.href = '/weather';
        } else {
          // Manejar error de inicio de sesión
          setError('Login failed. Please check your email and password.');
          hideErrorAfterDelay();
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred during login.');
        hideErrorAfterDelay();
      }
      
    };
  
    return (
      <div>
        <br />
        <div className="form fontlogin">
          Login
          <br />
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              value={email}
              className='input w-fix'
              placeholder="Put your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="text"
              required
              name="password"
              value={password}
              className='input w-fix'
              placeholder="Put your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit" className="button mt"> Sign in </button>
          </form>
          {error && (
          <div className={`error-card ${error ? '' : 'hidden'}`}>
            <div className="error-message fontf">
              {error}
            </div>
          </div>
        )}
          <div className="fontf">
            You dont have an account? <br />Register &nbsp;
            <Link className="fontlink" href="/register" >
              here
            </Link>
          </div>
        </div>
      </div>
    );
  }
  