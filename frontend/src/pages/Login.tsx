import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await login(email, password);
            navigate('/admin-dashboard');
        } catch (err: any) {
            setError(err.message || 'Invalid credentials. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            {/* Left Branding Panel */}
            <div className="login-visual-panel">
                <div className="visual-content">
                    <div className="branding-header">
                        <div className="logo-icon-light">⚡</div>
                        <h1>KARTA AI</h1>
                    </div>
                    <div className="visual-main">
                        <h2>Enterprise Credit Intelligence</h2>
                        <p>Streamline risk assessment and fraud detection with our advanced AI decision engine.</p>
                        
                        <div className="feature-list">
                            <div className="feature-item">
                                <div className="feature-icon"><Zap size={18} /></div>
                                <span>Real-time AI analysis & scoring</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon"><ShieldCheck size={18} /></div>
                                <span>Automated fraud detection engine</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon"><Activity size={18} /></div>
                                <span>Deep financial insights & extraction</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="visual-footer">
                        Secure Environment • AES-256 Encryption
                    </div>
                </div>
                
                {/* Abstract Background Elements */}
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            {/* Right Login Panel */}
            <div className="login-form-panel">
                <div className="back-link">
                    <Link to="/">← Back to Home</Link>
                </div>
                
                <div className="login-card">
                    <div className="login-header">
                        <h2>Welcome Back</h2>
                        <p className="subtitle">Sign in to your admin account to continue</p>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={18} />
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="admin@karta.ai"
                                    required 
                                />
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18} />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="••••••••••••"
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="login-btn" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <><Loader2 size={18} className="spinner" /> Authenticating...</>
                            ) : (
                                <>Sign In <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
