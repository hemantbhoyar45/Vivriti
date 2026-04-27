import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText, AlertTriangle, BarChart3,
  BookOpen, CheckCircle, Star,
  Users, Building2, Clock, Shield, Zap, TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';
import './Home.css';

const NAV_ITEMS = [
  { id: 'product',         label: 'Product'  },
  { id: 'features',        label: 'Features' },
  { id: 'research',        label: 'Research' },
  { id: 'pricing',         label: 'Pricing'  },
  { id: 'history-section', label: 'History'  },
];

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay } },
});

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardReveal = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

function Home() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('');

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
    <div className="karta-page">
      {/* ─── NAVBAR ─────────────────────────────────────────────── */}
      <Navbar activeSection={activeSection} onScrollTo={scrollTo} />

      <main>
        {/* ─── HERO ───────────────────────────────────────────────── */}
        <HeroSection onScrollTo={scrollTo} />

        {/* ─── TECH RIBBON ──────────────────────────────────────── */}
        <div className="karta-ribbon">
          <div className="karta-ribbon__inner">
            {['PdfTable', 'XGBoost', 'SHAP', 'LangChain', 'FinBERT', 'Cohere', 'ChromaDB', 'AWS Textract'].map(t => (
              <span key={t} className="karta-ribbon__item">{t}</span>
            ))}
          </div>
        </div>

        {/* ─── STATS ──────────────────────────────────────────────── */}
        <section className="karta-stats-section">
          <div className="karta-container">
            <motion.div
              className="karta-stats-grid"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {[
                { icon: <Zap size={26} />, value: '2 Hours', desc: 'CAM Generation vs. 5 Days Manual', color: '#6366f1' },
                { icon: <Shield size={26} />, value: '94%+', desc: 'Fraud Detection Accuracy', color: '#10b981' },
                { icon: <TrendingUp size={26} />, value: '20%+', desc: 'Better Default Prediction via RAG', color: '#f59e0b' },
              ].map(({ icon, value, desc, color }) => (
                <motion.div
                  key={value}
                  className="karta-stat-card"
                  variants={cardReveal}
                  whileHover={{ y: -6, boxShadow: `0 20px 40px ${color}22` }}
                  transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                >
                  <div className="karta-stat-card__icon" style={{ color, background: `${color}14` }}>
                    {icon}
                  </div>
                  <div className="karta-stat-card__value" style={{ color }}>{value}</div>
                  <div className="karta-stat-card__desc">{desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── PRODUCT ────────────────────────────────────────────── */}
        <section id="product" className="karta-section">
          <div className="karta-container">
            <motion.div
              className="karta-section__header"
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="karta-section__label">PRODUCT</div>
              <h2 className="karta-section__title">End-to-End Credit Intelligence Platform</h2>
              <p className="karta-section__subtitle">
                KARTA automates the entire credit appraisal workflow — from document ingestion to
                final CAM generation — with full RBI compliance and explainability at every step.
              </p>
            </motion.div>

            <motion.div
              className="karta-workflow-grid"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {[
                { step: '01', icon: <FileText size={28} />, title: 'Upload Documents', desc: 'Balance sheets, bank statements, GST filings processed via AI-powered OCR engine.' },
                { step: '02', icon: <AlertTriangle size={28} />, title: 'Fraud Detection', desc: 'Cross-verifies GST data, circular trading patterns, and MCA promoter history.' },
                { step: '03', icon: <BarChart3 size={28} />, title: 'Risk Scoring', desc: 'XGBoost model calculates Probability of Default with SHAP-based explanations.' },
                { step: '04', icon: <FileText size={28} />, title: 'CAM Generation', desc: 'Cohere AI drafts a full Credit Appraisal Memo — RBI-compliant, audit-ready.' },
              ].map(({ step, icon, title, desc }) => (
                <motion.div
                  key={step}
                  className="karta-workflow-card"
                  variants={cardReveal}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <div className="karta-workflow-card__step">{step}</div>
                  <div className="karta-workflow-card__icon">{icon}</div>
                  <h4 className="karta-workflow-card__title">{title}</h4>
                  <p className="karta-workflow-card__desc">{desc}</p>
                  <div className="karta-workflow-card__connector" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── FEATURES ───────────────────────────────────────────── */}
        <FeatureCards />

        {/* ─── RESEARCH ───────────────────────────────────────────── */}
        <section id="research" className="karta-section">
          <div className="karta-container">
            <motion.div
              className="karta-section__header"
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="karta-section__label">RESEARCH</div>
              <h2 className="karta-section__title">Built on Peer-Reviewed AI Research</h2>
              <p className="karta-section__subtitle">
                Every KARTA engine is grounded in published research, fine-tuned for India's credit markets.
              </p>
            </motion.div>

            <motion.div
              className="karta-research-grid"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {[
                { model: 'XGBoost', badge: 'Scoring Engine', desc: 'Gradient-boosted trees trained on CIBIL + RBI NPA datasets. Achieves AUC 0.91 on Indian SME default prediction.', papers: '3 papers' },
                { model: 'SHAP', badge: 'Explainability', desc: 'SHapley Additive exPlanations provide regulator-grade reasoning for every credit decision, legally defensible under RBI guidelines.', papers: '2 papers' },
                { model: 'FinBERT', badge: 'NLP / Sentiment', desc: 'Domain-adapted BERT model for financial news. Fine-tuned on Indian market corpus to detect promoter risk signals.', papers: '4 papers' },
                { model: 'LangChain', badge: 'RAG Pipeline', desc: '4-level RAG framework: raw financials + risk signals + sector benchmarks + RBI regulatory context fed to Cohere.', papers: '2 papers' },
                { model: 'PdfTable', badge: 'Document AI', desc: 'Extracts structured financial tables from scanned PDFs without ML, enabling zero-shot document understanding.', papers: '1 paper' },
                { model: 'ChromaDB', badge: 'Vector Memory', desc: 'Stores sector benchmark embeddings and historical NPA case studies for real-time RAG retrieval during analysis.', papers: '1 paper' },
              ].map(({ model, badge, desc, papers }) => (
                <motion.div
                  key={model}
                  className="karta-research-card"
                  variants={cardReveal}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <div className="karta-research-card__header">
                    <span className="karta-research-card__model">{model}</span>
                    <span className="karta-research-card__badge">{badge}</span>
                  </div>
                  <p className="karta-research-card__desc">{desc}</p>
                  <div className="karta-research-card__papers">
                    <BookOpen size={12} /> {papers}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── PRICING ────────────────────────────────────────────── */}
        <section id="pricing" className="karta-section karta-section--alt">
          <div className="karta-container">
            <motion.div
              className="karta-section__header"
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="karta-section__label">PRICING</div>
              <h2 className="karta-section__title">Simple, Transparent Pricing</h2>
              <p className="karta-section__subtitle">Choose the plan that fits your lending institution.</p>
            </motion.div>

            <motion.div
              className="karta-pricing-grid"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {[
                {
                  name: 'Starter', price: '₹49,999', period: '/month',
                  desc: 'For NBFCs and MFIs beginning their AI credit journey.',
                  features: ['50 analyses / month', 'Document OCR Engine', 'Basic Fraud Detection', 'SHAP Risk Score', 'Email Support'],
                  cta: 'Get Started', highlight: false,
                },
                {
                  name: 'Professional', price: '₹1,49,999', period: '/month',
                  desc: 'For mid-sized banks and lending institutions.',
                  features: ['250 analyses / month', 'Full Fraud Suite (GST + MCA + Circular)', 'News Intelligence Agent', 'AI CAM Generation', 'Early Warning System', 'Priority Support'],
                  cta: 'Start Free Trial', highlight: true,
                },
                {
                  name: 'Enterprise', price: 'Custom', period: '',
                  desc: 'For large banks and financial conglomerates.',
                  features: ['Unlimited analyses', 'On-premise deployment', 'Custom model training', 'API integration', 'Dedicated SLA', 'White-label option'],
                  cta: 'Contact Sales', highlight: false,
                },
              ].map(({ name, price, period, desc, features, cta, highlight }) => (
                <motion.div
                  key={name}
                  className={`karta-pricing-card${highlight ? ' karta-pricing-card--highlight' : ''}`}
                  variants={cardReveal}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  {highlight && (
                    <div className="karta-pricing-card__badge">
                      <Star size={11} /> Most Popular
                    </div>
                  )}
                  <div className="karta-pricing-card__name">{name}</div>
                  <div className="karta-pricing-card__price">
                    {price}<span className="karta-pricing-card__period">{period}</span>
                  </div>
                  <p className="karta-pricing-card__desc">{desc}</p>
                  <ul className="karta-pricing-card__features">
                    {features.map(f => (
                      <li key={f}><CheckCircle size={15} /> {f}</li>
                    ))}
                  </ul>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/login"
                      className={`karta-btn karta-pricing-card__cta ${highlight ? 'karta-btn--primary' : 'karta-btn--outline'}`}
                    >
                      {cta}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── HISTORY ────────────────────────────────────────────── */}
        <section id="history-section" className="karta-section">
          <div className="karta-container">
            <motion.div
              className="karta-section__header"
              variants={fadeUp(0)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className="karta-section__label">HISTORY</div>
              <h2 className="karta-section__title">Platform Activity & Milestones</h2>
              <p className="karta-section__subtitle">
                A glimpse of KARTA's growing impact across Indian lending institutions.
              </p>
            </motion.div>

            <div className="karta-history-grid">
              {/* Stats panel */}
              <motion.div
                className="karta-history-stats"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {[
                  { icon: <Users size={22} />, value: '120+', label: 'Financial Institutions' },
                  { icon: <Building2 size={22} />, value: '8,400+', label: 'Companies Analysed' },
                  { icon: <Clock size={22} />, value: '₹2,300 Cr+', label: 'Credit Assessed' },
                  { icon: <Shield size={22} />, value: '94.2%', label: 'Fraud Detection Rate' },
                ].map(({ icon, value, label }) => (
                  <motion.div key={label} className="karta-history-stat" variants={cardReveal}>
                    <div className="karta-history-stat__icon">{icon}</div>
                    <div>
                      <div className="karta-history-stat__value">{value}</div>
                      <div className="karta-history-stat__label">{label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Timeline */}
              <motion.div
                className="karta-timeline"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {[
                  { date: 'Mar 2026', event: 'KARTA v2.0 — Cohere CAM Generation launched', type: 'major' },
                  { date: 'Feb 2026', event: 'Early Warning System (EWS) with real-time alerts deployed', type: 'major' },
                  { date: 'Jan 2026', event: 'FinBERT News Intelligence integrated, covering 24 sources', type: 'minor' },
                  { date: 'Dec 2025', event: 'XGBoost model fine-tuned on 50,000 Indian SME cases (AUC 0.91)', type: 'minor' },
                  { date: 'Oct 2025', event: 'KARTA v1.0 launched — Document OCR + Risk Scoring', type: 'major' },
                ].map(({ date, event, type }) => (
                  <motion.div
                    key={event}
                    className={`karta-timeline__item${type === 'major' ? ' karta-timeline__item--major' : ''}`}
                    variants={cardReveal}
                  >
                    <div className="karta-timeline__dot" />
                    <div className="karta-timeline__content">
                      <span className="karta-timeline__date">{date}</span>
                      <span className="karta-timeline__event">{event}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── POWERED BY ─────────────────────────────────────────── */}
        <section className="karta-powered">
          <div className="karta-container">
            <motion.div
              className="karta-powered__title"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              POWERED BY
            </motion.div>
            <motion.div
              className="karta-powered__logos"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {['PdfTable', 'XGBoost', 'SHAP', 'LangChain', 'FinBERT', 'Cohere', 'ChromaDB'].map(t => (
                <motion.div
                  key={t}
                  className="karta-powered__logo"
                  whileHover={{ scale: 1.08, color: '#1C335B' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {t}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── CTA BANNER ─────────────────────────────────────────── */}
        <section className="karta-cta">
          <div className="karta-cta__orb karta-cta__orb--1" />
          <div className="karta-cta__orb karta-cta__orb--2" />
          <div className="karta-container karta-cta__inner">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="karta-cta__headline">
                Ready to transform your<br />credit appraisal process?
              </h2>
              <p className="karta-cta__sub">
                Join top-tier Indian financial institutions using KARTA's AI.
              </p>
              <div className="karta-cta__actions">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/login" className="karta-btn karta-btn--white karta-btn--lg">
                    Get Started Today
                  </Link>
                </motion.div>
                <motion.button
                  className="karta-btn karta-btn--outline-white karta-btn--lg"
                  onClick={() => scrollTo('product')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Book a Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─────────────────────────────────────────────── */}
      <footer className="karta-footer">
        <div className="karta-container karta-footer__inner">
          <div className="karta-logo">
            <div className="karta-logo__icon">
              <Zap size={16} fill="currentColor" stroke="none" />
            </div>
            <span className="karta-logo__text">KARTA</span>
          </div>
          <div className="karta-footer__links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Compliance</a>
            <a href="#">Contact</a>
          </div>
          <div className="karta-footer__copy">© 2024 KARTA AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
