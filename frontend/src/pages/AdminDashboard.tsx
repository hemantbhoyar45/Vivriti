import React, { useState } from 'react';
import {
    LayoutDashboard, Users, Shield, History, LogOut, Search,
    FileText, AlertTriangle, BarChart3, RefreshCw, Copy,
    CheckCircle, Cpu, Activity, Lock, Globe, Clock,
    TrendingUp, Zap, Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';
import HistoryPage from './History';
import NewAnalysis from './NewAnalysis';

const AdminDashboard: React.FC = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('operations');
    const [copied, setCopied] = useState(false);
    const [apiKey] = useState('karta_sk_live_2837xxxxxx');
    const [rbacRole, setRbacRole] = useState('Admin');

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'operations':
                return (
                    <div className="tab-content-full" style={{ padding: 0 }}>
                        <NewAnalysis hideNavbar={true} />
                    </div>
                );
            case 'admin':
                return (
                    <div className="tab-content ap-enterprise">

                        {/* ── TOP METRIC CARDS ── */}
                        <div className="ap-metric-row">
                            {[
                                { icon: <FileText size={22}/>, label: 'Total Analyses', value: '1,284', delta: '+12%', color: '#4F46E5', bg: 'rgba(79,70,229,0.1)' },
                                { icon: <Users size={22}/>, label: 'Active Users', value: '38', delta: '+3', color: '#0891B2', bg: 'rgba(8,145,178,0.1)' },
                                { icon: <AlertTriangle size={22}/>, label: 'Fraud Alerts', value: '7', delta: '↑ High', color: '#DC2626', bg: 'rgba(220,38,38,0.1)' },
                                { icon: <BarChart3 size={22}/>, label: 'API Requests', value: '48.2K', delta: 'Today', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)' },
                            ].map(({ icon, label, value, delta, color, bg }) => (
                                <div key={label} className="ap-metric-card">
                                    <div className="ap-metric-icon" style={{ background: bg, color }}>{icon}</div>
                                    <div>
                                        <div className="ap-metric-label">{label}</div>
                                        <div className="ap-metric-value" style={{ color }}>{value}</div>
                                        <div className="ap-metric-delta">{delta}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ── ROW 2: SECURITY + API ── */}
                        <div className="ap-two-col">

                            {/* SECURITY SETTINGS */}
                            <div className="ap-card">
                                <div className="ap-card-header">
                                    <Lock size={18} /> Security Settings
                                </div>
                                {[
                                    { label: 'Two-Factor Authentication', active: true },
                                    { label: 'IP Restriction (VPN Required)', active: false },
                                    { label: 'Session Timeout (30 min)', active: true },
                                ].map(({ label, active }) => (
                                    <div key={label} className="ap-toggle-row">
                                        <span>{label}</span>
                                        <div className={`toggle-switch ${active ? 'active' : ''}`}>
                                            <div className="toggle-knob" />
                                        </div>
                                    </div>
                                ))}
                                <div className="ap-divider" />
                                <div className="ap-card-subheader"><Shield size={14}/> Role-Based Access Control</div>
                                <div className="ap-rbac-pills">
                                    {['Admin', 'Analyst', 'Viewer'].map(role => (
                                        <button
                                            key={role}
                                            className={`ap-role-pill ${rbacRole === role ? 'ap-role-pill-active' : ''}`}
                                            onClick={() => setRbacRole(role)}
                                        >{role}</button>
                                    ))}
                                </div>
                            </div>

                            {/* API MANAGEMENT */}
                            <div className="ap-card">
                                <div className="ap-card-header"><Globe size={18}/> API Management</div>
                                <p className="ap-card-desc">Authentication keys for external agent integrations.</p>
                                <div className="api-key-box" style={{ marginTop: '0.75rem' }}>
                                    <code>{apiKey}</code>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="btn-copy" onClick={handleCopy}>
                                            <Copy size={12}/> {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                        <button className="btn-copy ap-btn-regen"><RefreshCw size={12}/> Regen</button>
                                    </div>
                                </div>
                                <div className="ap-divider" />
                                <div className="ap-card-subheader"><BarChart3 size={14}/> API Usage Today</div>
                                <div className="ap-api-stats">
                                    {[
                                        { endpoint: '/api/upload', calls: 284, color: '#4F46E5' },
                                        { endpoint: '/api/analyze', calls: 196, color: '#0891B2' },
                                        { endpoint: '/api/fraud', calls: 142, color: '#DC2626' },
                                        { endpoint: '/api/cam/generate', calls: 89, color: '#7C3AED' },
                                    ].map(({ endpoint, calls, color }) => (
                                        <div key={endpoint} className="ap-api-row">
                                            <code className="ap-endpoint">{endpoint}</code>
                                            <div className="ap-bar-wrap">
                                                <div className="ap-bar" style={{ width: `${Math.round((calls / 300) * 100)}%`, background: color }} />
                                            </div>
                                            <span className="ap-calls">{calls}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── ROW 3: FRAUD MONITORING + AI MODEL ── */}
                        <div className="ap-two-col">

                            {/* FRAUD MONITORING */}
                            <div className="ap-card">
                                <div className="ap-card-header"><AlertTriangle size={18}/> Fraud Monitoring</div>
                                <div className="ap-fraud-list">
                                    {[
                                        { company: 'Reliance Exports Ltd.', issue: 'GST Mismatch (₹4.2Cr)', risk: 'High' },
                                        { company: 'Bharat Steel Works', issue: 'Circular Trading Detected', risk: 'High' },
                                        { company: 'Mumbai Textile Co.', issue: 'Promoter Default (MCA)', risk: 'Medium' },
                                        { company: 'Sunrise Agro Pvt.', issue: 'News Sentiment Negative', risk: 'Medium' },
                                        { company: 'Delta Infra Ltd.', issue: 'PAN-GST Name Mismatch', risk: 'Low' },
                                    ].map(({ company, issue, risk }) => (
                                        <div key={company} className="ap-fraud-row">
                                            <div className="ap-fraud-info">
                                                <span className="ap-fraud-company">{company}</span>
                                                <span className="ap-fraud-issue">{issue}</span>
                                            </div>
                                            <span className={`ap-risk-badge ap-risk-${risk.toLowerCase()}`}>{risk}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* AI MODEL STATUS */}
                            <div className="ap-card">
                                <div className="ap-card-header"><Cpu size={18}/> AI Model Status</div>
                                <div className="ap-model-grid">
                                    {[
                                        { label: 'Model Status', value: 'Active', icon: <CheckCircle size={16} color="#10B981"/>, badge: 'ap-badge-green' },
                                        { label: 'Accuracy (AUC)', value: '94.2%', icon: <TrendingUp size={16} color="#4F46E5"/>, badge: 'ap-badge-blue' },
                                        { label: 'Last Trained', value: '22 Mar 2026', icon: <Clock size={16} color="#7C3AED"/>, badge: '' },
                                        { label: 'Training Dataset', value: '50K Cases', icon: <Activity size={16} color="#0891B2"/>, badge: '' },
                                        { label: 'Fraud F1 Score', value: '0.918', icon: <Zap size={16} color="#D97706"/>, badge: '' },
                                        { label: 'Avg Inference', value: '1.4s', icon: <Clock size={16} color="#64748B"/>, badge: '' },
                                    ].map(({ label, value, icon }) => (
                                        <div key={label} className="ap-model-stat">
                                            <div className="ap-model-icon">{icon}</div>
                                            <div>
                                                <div className="ap-model-label">{label}</div>
                                                <div className="ap-model-value">{value}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="ap-retrain-btn"><RefreshCw size={14}/> Retrain Model</button>
                            </div>
                        </div>

                        {/* ── ROW 4: SYSTEM LOGS ── */}
                        <div className="ap-card ap-logs-card">
                            <div className="ap-card-header"><Bell size={18}/> System Logs</div>
                            <div className="ap-logs-list">
                                {[
                                    { time: '04:12 IST', user: 'admin@gmail.com', action: 'User login successful', type: 'info' },
                                    { time: '03:58 IST', user: 'System', action: 'Analysis #1287 completed for Tata Motors', type: 'success' },
                                    { time: '03:44 IST', user: 'System', action: 'Fraud alert raised — Bharat Steel Works (Circular Trading)', type: 'danger' },
                                    { time: '03:31 IST', user: 'ops@karta.ai', action: 'CAM document generated for Reliance Exports Ltd.', type: 'success' },
                                    { time: '03:20 IST', user: 'System', action: 'API rate limit warning — 92% of daily quota used', type: 'warn' },
                                    { time: '02:55 IST', user: 'admin@gmail.com', action: 'API key regenerated', type: 'info' },
                                    { time: '02:40 IST', user: 'System', action: 'XGBoost model inference completed in 1.2s', type: 'info' },
                                    { time: '02:15 IST', user: 'admin@gmail.com', action: 'User role changed: ops@karta.ai → Editor', type: 'info' },
                                ].map(({ time, user, action, type }, i) => (
                                    <div key={i} className={`ap-log-row ap-log-${type}`}>
                                        <span className="ap-log-time">{time}</span>
                                        <span className={`ap-log-dot ap-log-dot-${type}`} />
                                        <span className="ap-log-user">{user}</span>
                                        <span className="ap-log-action">{action}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                );
            case 'users':
                return (
                    <div className="tab-content">
                        <h2 className="tab-title">User Management</h2>
                        <div className="user-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Last Login</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="user-cell">
                                                <div className="user-avatar" style={{background: '#4F46E5'}}>S</div>
                                                <span>System Admin</span>
                                            </div>
                                        </td>
                                        <td>admin@karta.ai</td>
                                        <td><span className="role-pill-super">Super Admin</span></td>
                                        <td><span className="status-indicator-online">Online</span></td>
                                        <td>Just now</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="user-cell">
                                                <div className="user-avatar" style={{background: '#7C3AED'}}>O</div>
                                                <span>Operations Lead</span>
                                            </div>
                                        </td>
                                        <td>ops@karta.ai</td>
                                        <td><span className="role-pill">Editor</span></td>
                                        <td><span className="status-indicator-away">Away</span></td>
                                        <td>2 hours ago</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'history':
                return (
                    <div className="tab-content-full">
                        <HistoryPage hideNavbar={true} />
                    </div>
                );
            default:
                return <div>Select a section</div>;
        }
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <div className="logo-icon">▽</div>
                        <span>KARTA AI</span>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        className={`nav-item ${activeTab === 'operations' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('operations')}
                    >
                        <LayoutDashboard size={20} />
                        <span>Operations View</span>
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'admin' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('admin')}
                    >
                        <Shield size={20} />
                        <span>Admin Panel</span>
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'users' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('users')}
                    >
                        <Users size={20} />
                        <span>User Management</span>
                    </button>
                    <button 
                        className={`nav-item ${activeTab === 'history' ? 'active' : ''}`} 
                        onClick={() => setActiveTab('history')}
                    >
                        <History size={20} />
                        <span>Company History</span>
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={logout} className="logout-btn">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            <main className="admin-main">
                <header className="admin-header">
                    <div className="search-bar">
                        <Search size={18} />
                        <input type="text" placeholder="Search appraisals, clients, or logs..." />
                    </div>
                    <div className="admin-profile">
                        <div className="profile-info">
                            <span className="profile-name">Admin</span>
                            <span className="profile-role"></span>
                        </div>
                        <div className="profile-avatar">S</div>
                    </div>
                </header>
                <div className="admin-content-area">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
