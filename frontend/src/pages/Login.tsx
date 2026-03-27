import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const formData = new FormData();
            formData.append('username', email); // FastAPI OAuth2 expects 'username' instead of 'email'
            formData.append('password', password);
            await login(formData);
            navigate('/new-analysis');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to login');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo">
                    <div className="logo-icon">⚡</div>
                    <h1>KARTA AI</h1>
                </div>
                <h2>Welcome Back</h2>
                <p className="subtitle">Enter your credentials to access your dashboard</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
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
                        />
                    </div>
                    <button type="submit" className="login-btn">Sign In</button>
                </form>

                <p className="signup-text">
                    Don't have an account? <Link to="/signup">Create an account</Link>
                </p>
                
                <div className="back-to-home">
                    <Link to="/">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
