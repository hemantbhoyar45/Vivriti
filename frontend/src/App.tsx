import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewAnalysis from './pages/NewAnalysis';
import Analysis from './pages/Analysis';
import Dashboard from './pages/Dashboard';
import FraudReport from './pages/FraudReport';
import WarningSystem from './pages/WarningSystem';
import CamSuccess from './pages/CamSuccess';
import History from './pages/History';

import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';

/* 
  All inter-page navigation uses URL query params to carry the analysis ID:
  /analysis?id=2
  /dashboard?id=2
  /fraud-report?id=2
  /cam-success?id=2
  /warning-system?company_id=1&id=2
*/
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/new-analysis" element={<ProtectedRoute><NewAnalysis /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/analysis" element={<ProtectedRoute><Analysis /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/fraud-report" element={<ProtectedRoute><FraudReport /></ProtectedRoute>} />
          <Route path="/warning-system" element={<ProtectedRoute><WarningSystem /></ProtectedRoute>} />
          <Route path="/cam-success" element={<ProtectedRoute><CamSuccess /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
