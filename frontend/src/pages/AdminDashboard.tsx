import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Shield, History, LogOut, Search, Activity, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';
import HistoryPage from './History';

const AdminDashboard: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('operations');

    const renderContent = () => {
        switch (activeTab) {
            case 'operations':
                return (
                    <div className="tab-content">
                        <h2 className="tab-title">Operations View</h2>
                        <div className="stats-cards">
                            <div className="admin-stat-card">
                                <div className="stat-icon-wrapper" style={{background: 'rgba(79, 70, 229, 0.1)'}}>
                                    <Activity size={24} color="#4F46E5" />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">System Status</span>
                                    <span className="stat-value text-green" style={{color: '#10B981'}}>Operational</span>
                                </div>
                            </div>
                            <div className="admin-stat-card">
                                <div className="stat-icon-wrapper" style={{background: 'rgba(8, 145, 178, 0.1)'}}>
                                    <FileText size={24} color="#0891B2" />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">Active Appraisals</span>
                                    <span className="stat-value">12</span>
                                </div>
                            </div>
                            <div className="admin-stat-card">
                                <div className="stat-icon-wrapper" style={{background: 'rgba(124, 58, 237, 0.1)'}}>
                                    <Users size={24} color="#7C3AED" />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-label">Connected Agents</span>
                                    <span className="stat-value">4</span>
                                </div>
                            </div>
                        </div>
                        <div className="recent-activity">
                            <h3>Real-time Activity Log</h3>
                            <div className="activity-list">
                                {[
                                    { msg: "Analysis #1024 completed for Tata Motors", time: "2 mins ago" },
                                    { msg: "System audit performed by Admin", time: "1 hour ago" },
                                    { msg: "Fraud detection engine updated to v2.4", time: "3 hours ago" },
                                    { msg: "New appraisal initiated for Reliance Indus.", time: "5 hours ago" }
                                ].map((act, i) => (
                                    <div key={i} className="activity-item">
                                        <div className="activity-dot"></div>
                                        <div className="activity-content">
                                            <span className="activity-msg">{act.msg}</span>
                                            <span className="activity-time">{act.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'admin':
                return (
                    <div className="tab-content">
                        <h2 className="tab-title">Admin Panel</h2>
                        <div className="settings-grid">
                            <div className="settings-section">
                                <h3>Security Settings</h3>
                                <div className="setting-toggle-row">
                                    <span>Two-Factor Authentication</span>
                                    <div className="toggle-switch active">
                                        <div className="toggle-knob"></div>
                                    </div>
                                </div>
                                <div className="setting-toggle-row">
                                    <span>IP Restriction (VPN Required)</span>
                                    <div className="toggle-switch">
                                        <div className="toggle-knob"></div>
                                    </div>
                                </div>
                                <div className="setting-toggle-row">
                                    <span>Session Timeout (30 min)</span>
                                    <div className="toggle-switch active">
                                        <div className="toggle-knob"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="settings-section">
                                <h3>API Access</h3>
                                <p className="section-desc">Manage authentication keys for external agent integrations.</p>
                                <div className="api-key-box">
                                    <code>karta_sk_live_2837xxxxxx</code>
                                    <button className="btn-copy">Copy Key</button>
                                </div>
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
                        onClick={() => navigate('/newanalysis')}
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
                            <span className="profile-name">System Administrator</span>
                            <span className="profile-role">Super Admin</span>
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
