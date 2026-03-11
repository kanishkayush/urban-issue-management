import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import GovDashboard from './pages/GovDashboard';
import { IssueProvider } from './context/IssueContext';

function App() {
  return (
    <IssueProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route path="/dashboard/gov" element={<GovDashboard />} />
      </Routes>
    </Router>
    </IssueProvider>
  );
}

export default App;
