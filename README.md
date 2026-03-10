# ⚡ KARTA AI

**India's First RBI-Compliant AI Credit Intelligence Platform**

KARTA AI is a powerful, automated credit appraisal engine built for the Indian mid-market lending sector. It ingests complex, messy financial documents, detects fraud, evaluates risk, and automatically writes the full Credit Appraisal Memo (CAM) natively. It takes subjective, unorganized MSME data and turns it into concrete, explainable lending decisions.

---

## 🚀 What We Have Done

1. **Intelligent Document Parsing**: Created an engine that accepts scanned, handwritten, and mixed-language (Hindi/English) PDFs like Balance Sheets, Bank Statements, and GST Filings.
2. **Real-time Early Warning System (EWS)**: Built a dynamic dashboard with live WebSocket telemetry that monitors active portfolios for volatility using simulated real-time drift algorithms.
3. **Advanced Risk Assessment UI**: Designed an interface that presents XGBoost Default Risk, Fraud Multipliers, Data Quality, and News Sentiment scores.
4. **SHAP Value Explanations**: Visualized the actual drivers behind a rejection or approval utilizing Waterfall SHAP diagrams.
5. **Generative CAM**: Integrated LLMs to instantly generate a comprehensive, multi-page Credit Appraisal Memo synthesizing all financial records and background findings.
6. **Robust Hackathon Demo Flow**: Designed a built-in stress-test flow that takes "messy" distressed company data and successfully proves an AI-driven "REJECT" decision based on EMI bounces and plunging revenue.

---

## 🛠️ Technology Stack

### Frontend Hub
- **React.js (Vite)** 
- **TypeScript** 
- **Vanilla CSS / Lucide React Icons**
- **React Router DOM** & **Recharts**

### Backend Engine
- **FastAPI (Python)** - Core orchestration and routing.
- **WebSockets** - Live data streaming for the EWS pipeline.
- **SQLite** - Session and document-state storage.
- **PyMuPDF (fitz) / FPDF / pdfplumber** - High-speed PDF processing and generation.

### AI & Analysis Integration
- **Cohere API** - Generative AI for drafting the Credit Appraisal Memos (CAM).
- **Computer Vision (Boto3 / Tesseract OCR)** - For extracting tables and text from messy scanned images.
- **NLP / FinBERT Pipeline** - Evaluating News Sentiment and textual annotations in Hindi/English.
- **XGBoost (Decision Emulation)** - Machine learning models for calculating Probability of Default (PD).

---

## 🔑 Environment Variables & API Keys Required

To run this platform successfully, create a `.env` file in the root directory (`/KARTA/.env`) with the following keys:

```env
# Required for Generative CAM features
COHERE_API_KEY="your-cohere-api-key-here"

# (Optional) If utilizing AWS Textract for extreme OCR
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="ap-south-1"

# General Config 
ENVIRONMENT="development"
FRONTEND_URL="http://localhost:5173"
```

---

## 🏁 How to Run the Project Locally

You will need two terminal windows to run the frontend and backend simultaneously.

### 1. Start the Backend API (Terminal 1)
```bash
# Navigate to the project root
cd /path/to/KARTA

# Create and activate a virtual environment (Windows)
python -m venv venv
.\venv\Scripts\activate

# Install the required Python packages
pip install -r requirements.txt

# Start the FastAPI server on port 8000
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
*The backend API will be available at: http://localhost:8000*

### 2. Start the Frontend Dashboard (Terminal 2)
```bash
# Navigate to the frontend source folder
cd /path/to/KARTA/src

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```
*The web interface will be available at: http://localhost:5173*

---

## 📂 Project Structure

* `/src/`: React frontend codebase (Pages, Components, Services).
* `/routers/`: FastAPI endpoint controllers (websockets, CAM generation, analysis).
* `/services/`: Core python background services (OCR engine, EWS logic, API wrappers).
* `/utils/`: Helper scripts for file parsing and data formatting.
* `main.py`: Application entry point and configuration for FastAPI.
* `karta.db`: Local SQLite database storing analysis history.

---

*Built during hackathon development sprints focusing on bridging AI execution with banking and MSME compliance standards.*
