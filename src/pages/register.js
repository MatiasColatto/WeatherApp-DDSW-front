import React, { useState } from 'react';
import Link from "../context/Link";
import './Weather/WeatherForm.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const hideErrorAfterDelay = () => {
    setTimeout(() => {
      setError('');
    }, 2000);
  };

  const hideSuccessAfterDelay = () => {
    setTimeout(() => {
      setRegistrationSuccess(false);
    }, 2000);
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Registration successful');
        setRegistrationSuccess(true);
        hideSuccessAfterDelay();
        setTimeout(() => {
            window.location.href = '/'; // Ajusta la ruta según tu configuración
          }, 2000);
  
      } else {
        const responseBody = await response.json();

        if (response.status === 409) {
          setError('User already exists. Please use a different email.');
        } else if (response.status === 400) {
          setError(responseBody.message || 'Invalid registration data.');
        } else {
          console.error('Registration failed');
        }

        hideErrorAfterDelay();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <br />
      <div className="form fontlogin">
        Register
        <br />
        <form onSubmit={handleRegister}>
          <input
            type="email"
            name="email"
            required
            className='input w-fix'
            placeholder="Put your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="text"
            name="password"
            required
            className='input w-fix'
            placeholder="Put your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type='submit' value="Register" className="button mt" />
        </form>
        {error && (
          <div className="error-card">
            <div className="error-message fontf">
              {error}
            </div>
          </div>
        )}
        {registrationSuccess && (
          <div className="success-card">
            <div className="success-message fontf">
              Registration successful!
            </div>
          </div>
        )}

        <div className="fontf">
          You have an account? <br />Log in &nbsp;
          <Link className="fontlink" href="/" >
            here
          </Link>
        </div>
      </div>
    </div>
  );
}
