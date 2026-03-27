import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post('http://localhost:8000/api/auth/register', {
                email,
                password,
                full_name: fullName
            });
            // Successfully registered, navigate to login
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to register account');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo">
                    <div className="logo-icon">⚡</div>
                    <h1>KARTA AI</h1>
                </div>
                <h2>Create Account</h2>
                <p className="subtitle">Sign up to start analyzing credit</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            value={fullName} 
                            onChange={(e) => setFullName(e.target.value)} 
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="input-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="name@company.com"
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="••••••••"
                            required 
                            minLength={6}
                        />
                    </div>
                    <button type="submit" className="login-btn">Sign Up</button>
                </form>

                <p className="signup-text">
                    Already have an account? <Link to="/login">Sign in instead</Link>
                </p>

                <div className="back-to-home">
                    <Link to="/">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
