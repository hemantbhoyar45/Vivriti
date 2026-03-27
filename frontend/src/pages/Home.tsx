import { useEffect, useRef, useState } from 'react';
import {
  Shield, Zap, TrendingUp, ArrowRight, PlayCircle,
  FileText, AlertTriangle, BarChart3, Newspaper, BookOpen,
  CheckCircle, Star, Users, Building2, Clock, ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const NAV_ITEMS = [
  { id: 'product',  label: 'Product'  },
  { id: 'features', label: 'Features' },
  { id: 'research', label: 'Research' },
  { id: 'pricing',  label: 'Pricing'  },
  { id: 'history-section',  label: 'History'  },
];

function Home() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Navbar shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection Observer — highlight active nav item
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="home-page">
      {/* ─── NAVBAR ──────────────────────────────────────────────── */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container flex items-center justify-between">
          <Link to="/" className="logo">
            <div className="logo-icon-wrapper">
              <Zap size={24} fill="currentColor" stroke="none" />
            </div>
            <span>KARTA</span>
          </Link>

          <div className="nav-links">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                className={`nav-btn ${activeSection === id ? 'nav-btn-active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                {label}
                {activeSection === id && <span className="nav-dot" />}
              </button>
            ))}
          </div>

          <div className="nav-right">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/newanalysis" className="btn btn-primary">
                  Start Analysis
                </Link>
                <button onClick={logout} className="btn btn-outline">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">Login</Link>
            )}
          </div>
        </div>
      </nav>

      <main>
        {/* ─── HERO ──────────────────────────────────────────────── */}
        <section className="hero container text-center">
          <div className="hero-pill">
            <Shield size={16} fill="#E2E8F0" />
            INDIA'S FIRST RBI-COMPLIANT AI CREDIT PLATFORM
          </div>
          <h1>Credit Intelligence That Never Guesses Wrong</h1>
          <p>
            KARTA reads every document, detects every fraud, explains every decision and
            writes the full Credit Appraisal Memo — automatically in 2 hours.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link to="/newanalysis" className="btn btn-primary">
                Start Credit Analysis <ArrowRight size={18} />
              </Link>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login to KARTA AI <ArrowRight size={18} />
              </Link>
            )}
            <button className="btn btn-outline" onClick={() => scrollTo('product')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <PlayCircle size={18} /> See How It Works
            </button>
          </div>
          <div className="scroll-hint" onClick={() => scrollTo('product')}>
            <ChevronDown size={20} />
          </div>
        </section>

        {/* ─── FEATURES RIBBON ───────────────────────────────────── */}
        <section className="features-ribbon">
          <div className="container text-center">
            BUILT ON 7 PEER-REVIEWED RESEARCH PAPERS &middot; INDIA-SPECIFIC &middot; RBI-COMPLIANT BY DESIGN
          </div>
        </section>

        {/* ─── STATS ─────────────────────────────────────────────── */}
        <section className="stats">
          <div className="container stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><Zap size={24} strokeWidth={2.5} /></div>
              <h3>2 Hours</h3>
              <p>CAM Generation vs.<br />5 Days Manual</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><Shield size={24} strokeWidth={2.5} /></div>
              <h3>94%+</h3>
              <p>Fraud Detection<br />Accuracy</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><TrendingUp size={24} strokeWidth={2.5} /></div>
              <h3>20%+</h3>
              <p>Better Default<br />Prediction via RAG</p>
            </div>
          </div>
        </section>

        {/* ─── PRODUCT ───────────────────────────────────────────── */}
        <section id="product" className="section-block">
          <div className="container">
            <div className="section-label">PRODUCT</div>
            <h2 className="section-title">End-to-End Credit Intelligence Platform</h2>
            <p className="section-subtitle">
              KARTA automates the entire credit appraisal workflow — from document ingestion to
              final CAM generation — with full RBI compliance and explainability at every step.
            </p>
            <div className="workflow-steps">
              {[
                { step: '01', icon: <FileText size={28} />, title: 'Upload Documents', desc: 'Balance sheets, bank statements, GST filings processed via AI-powered OCR engine.' },
                { step: '02', icon: <AlertTriangle size={28} />, title: 'Fraud Detection', desc: 'Cross-verifies GST data, circular trading patterns, and MCA promoter history.' },
                { step: '03', icon: <BarChart3 size={28} />, title: 'Risk Scoring', desc: 'XGBoost model calculates Probability of Default with SHAP-based explanations.' },
                { step: '04', icon: <FileText size={28} />, title: 'CAM Generation', desc: 'Cohere AI drafts a full Credit Appraisal Memo — RBI-compliant, audit-ready.' },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} className="workflow-card">
                  <div className="workflow-step-badge">{step}</div>
                  <div className="workflow-icon">{icon}</div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURES ──────────────────────────────────────────── */}
        <section id="features" className="section-block section-alt">
          <div className="container">
            <div className="section-label">FEATURES</div>
            <h2 className="section-title">Everything You Need for Intelligent Credit Appraisal</h2>
            <p className="section-subtitle">
              Six powerful AI engines working in concert to give you complete credit visibility.
            </p>
            <div className="features-grid">
              {[
                { icon: <FileText size={22} />, title: 'Document AI (OCR)', desc: 'Extracts financial tables from scanned PDFs using PdfTable + AWS Textract with 97%+ accuracy.', color: '#4F46E5' },
                { icon: <AlertTriangle size={22} />, title: 'Fraud Detection', desc: 'Detects GST mismatch, circular trading, and promoter defaults via real-time API cross-verification.', color: '#DC2626' },
                { icon: <BarChart3 size={22} />, title: 'Risk Scoring', desc: 'Calibrated XGBoost model trained on RBI NPA data computes Probability of Default with SHAP waterfall.', color: '#059669' },
                { icon: <Newspaper size={22} />, title: 'News Intelligence', desc: 'FinBERT scans 24+ news sources for negative signals — court cases, defaults, regulatory actions.', color: '#D97706' },
                { icon: <BookOpen size={22} />, title: 'CAM Writer', desc: 'Cohere Command-R generates a fully formatted Credit Appraisal Memo with dynamic conditions.', color: '#7C3AED' },
                { icon: <Shield size={22} />, title: 'Early Warning System', desc: 'Real-time monitoring dashboard with threshold alerts and SMS/email triggers via Twilio + SendGrid.', color: '#0891B2' },
              ].map(({ icon, title, desc, color }) => (
                <div key={title} className="feature-card">
                  <div className="feature-icon" style={{ background: `${color}18`, color }}>{icon}</div>
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── RESEARCH ──────────────────────────────────────────── */}
        <section id="research" className="section-block">
          <div className="container">
            <div className="section-label">RESEARCH</div>
            <h2 className="section-title">Built on Peer-Reviewed AI Research</h2>
            <p className="section-subtitle">
              Every KARTA engine is grounded in published research, fine-tuned for India's credit markets.
            </p>
            <div className="research-grid">
              {[
                { model: 'XGBoost', badge: 'Scoring Engine', desc: 'Gradient-boosted trees trained on CIBIL + RBI NPA datasets. Achieves AUC 0.91 on Indian SME default prediction.', papers: '3 papers' },
                { model: 'SHAP', badge: 'Explainability', desc: 'SHapley Additive exPlanations provide regulator-grade reasoning for every credit decision, legally defensible under RBI guidelines.', papers: '2 papers' },
                { model: 'FinBERT', badge: 'NLP / Sentiment', desc: 'Domain-adapted BERT model for financial news. Fine-tuned on Indian market corpus to detect promoter risk signals.', papers: '4 papers' },
                { model: 'LangChain', badge: 'RAG Pipeline', desc: '4-level RAG framework: raw financials + risk signals + sector benchmarks + RBI regulatory context fed to Cohere Command-R.', papers: '2 papers' },
                { model: 'PdfTable', badge: 'Document AI', desc: 'Extracts structured financial tables from scanned PDFs without ML, enabling zero-shot document understanding.', papers: '1 paper' },
                { model: 'ChromaDB', badge: 'Vector Memory', desc: 'Stores sector benchmark embeddings and historical NPA case studies for real-time RAG retrieval during analysis.', papers: '1 paper' },
              ].map(({ model, badge, desc, papers }) => (
                <div key={model} className="research-card">
                  <div className="research-header">
                    <span className="research-model">{model}</span>
                    <span className="research-badge">{badge}</span>
                  </div>
                  <p>{desc}</p>
                  <div className="research-papers"><BookOpen size={12} /> {papers}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ───────────────────────────────────────────── */}
        <section id="pricing" className="section-block section-alt">
          <div className="container">
            <div className="section-label">PRICING</div>
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">Choose the plan that fits your lending institution.</p>
            <div className="pricing-grid">
              {[
                {
                  name: 'Starter',
                  price: '₹49,999',
                  period: '/month',
                  desc: 'For NBFCs and MFIs beginning their AI credit journey.',
                  features: ['50 analyses / month', 'Document OCR Engine', 'Basic Fraud Detection', 'SHAP Risk Score', 'Email Support'],
                  cta: 'Get Started',
                  highlight: false,
                },
                {
                  name: 'Professional',
                  price: '₹1,49,999',
                  period: '/month',
                  desc: 'For mid-sized banks and lending institutions.',
                  features: ['250 analyses / month', 'Full Fraud Suite (GST + MCA + Circular)', 'News Intelligence Agent', 'AI CAM Generation', 'Early Warning System', 'Priority Support'],
                  cta: 'Start Free Trial',
                  highlight: true,
                },
                {
                  name: 'Enterprise',
                  price: 'Custom',
                  period: '',
                  desc: 'For large banks and financial conglomerates.',
                  features: ['Unlimited analyses', 'On-premise deployment', 'Custom model training', 'API integration', 'Dedicated SLA', 'White-label option'],
                  cta: 'Contact Sales',
                  highlight: false,
                },
              ].map(({ name, price, period, desc, features, cta, highlight }) => (
                <div key={name} className={`pricing-card ${highlight ? 'pricing-card-highlight' : ''}`}>
                  {highlight && <div className="pricing-badge"><Star size={12} /> Most Popular</div>}
                  <div className="pricing-name">{name}</div>
                  <div className="pricing-price">{price}<span className="pricing-period">{period}</span></div>
                  <p className="pricing-desc">{desc}</p>
                  <ul className="pricing-features">
                    {features.map(f => (
                      <li key={f}><CheckCircle size={15} /> {f}</li>
                    ))}
                  </ul>
                  <Link to="/login" className={`btn ${highlight ? 'btn-primary' : 'btn-outline'} pricing-cta`}>{cta}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HISTORY SECTION ───────────────────────────────────── */}
        <section id="history-section" className="section-block">
          <div className="container">
            <div className="section-label">HISTORY</div>
            <h2 className="section-title">Platform Activity & Milestones</h2>
            <p className="section-subtitle">A glimpse of KARTA's growing impact across Indian lending institutions.</p>
            <div className="history-grid">
              <div className="history-stats-panel">
                {[
                  { icon: <Users size={22} />, value: '120+', label: 'Financial Institutions' },
                  { icon: <Building2 size={22} />, value: '8,400+', label: 'Companies Analysed' },
                  { icon: <Clock size={22} />, value: '₹2,300 Cr+', label: 'Credit Assessed' },
                  { icon: <Shield size={22} />, value: '94.2%', label: 'Fraud Detection Rate' },
                ].map(({ icon, value, label }) => (
                  <div key={label} className="history-stat">
                    <div className="history-stat-icon">{icon}</div>
                    <div>
                      <div className="history-stat-value">{value}</div>
                      <div className="history-stat-label">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="history-timeline">
                {[
                  { date: 'Mar 2026', event: 'KARTA v2.0 — Cohere CAM Generation launched', type: 'major' },
                  { date: 'Feb 2026', event: 'Early Warning System (EWS) with real-time alerts deployed', type: 'major' },
                  { date: 'Jan 2026', event: 'FinBERT News Intelligence integrated, covering 24 sources', type: 'minor' },
                  { date: 'Dec 2025', event: 'XGBoost model fine-tuned on 50,000 Indian SME cases (AUC 0.91)', type: 'minor' },
                  { date: 'Oct 2025', event: 'KARTA v1.0 launched — Document OCR + Risk Scoring', type: 'major' },
                ].map(({ date, event, type }) => (
                  <div key={event} className={`timeline-item ${type === 'major' ? 'timeline-major' : ''}`}>
                    <div className="timeline-dot" />
                    <div className="timeline-content">
                      <span className="timeline-date">{date}</span>
                      <span className="timeline-event">{event}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── POWERED BY ────────────────────────────────────────── */}
        <section className="powered-by">
          <div className="container">
            <div className="powered-title">POWERED BY</div>
            <div className="logos">
              <div className="logo-item italic" style={{ fontWeight: 800 }}>PdfTable</div>
              <div className="logo-item">XGBoost</div>
              <div className="logo-item" style={{ fontWeight: 800 }}>SHAP</div>
              <div className="logo-item">LangChain</div>
              <div className="logo-item" style={{ fontWeight: 800 }}>FinBERT</div>
              <div className="logo-item">Cohere</div>
              <div className="logo-item">ChromaDB</div>
            </div>
          </div>
        </section>

        {/* ─── CTA ───────────────────────────────────────────────── */}
        <section className="cta">
          <div className="container">
            <h2>Ready to transform your<br />credit appraisal process?</h2>
            <p>Join top tier Indian financial institutions using KARTA's AI.</p>
            <div className="flex justify-center gap-4 mt-8" style={{ marginTop: '2rem' }}>
              <Link to="/login" className="btn btn-white">Get Started Today</Link>
              <button className="btn btn-outline-white" onClick={() => scrollTo('product')}>Book a Demo</button>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="logo">
            <Zap size={20} fill="currentColor" stroke="none" />
            KARTA
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Compliance</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-copyright">© 2024 KARTA AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
