import { useState } from 'react';
import { LogOut, MapPin, Camera, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NearbyAreas from '../components/User/NearbyAreas';
import IssueReportingForm from '../components/User/IssueReportingForm';
import LocationSelector from '../components/Shared/LocationSelector';
import TrafficMap from '../components/Shared/TrafficMap';

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      {/* Top Navbar */}
      <nav className="glass-navbar">
        <div className="nav-brand">
          <MapPin className="text-primary" size={24} />
          <h2 className="text-gradient">Citizen Portal</h2>
        </div>
        <LocationSelector />
        <button className="btn-secondary" onClick={() => navigate('/login')}>
          <LogOut size={16} /> Logout
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="dashboard-content">
        <div className="content-grid">
          {/* Left Column: Report Formulation */}
          <section className="report-section slide-in-bottom">
            <IssueReportingForm />
          </section>

          {/* Right Column: Information/Nearby */}
          <section className="info-section fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <NearbyAreas />
            <TrafficMap />
          </section>
        </div>
      </main>

      <style>{`
        .dashboard-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .glass-navbar {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-glass);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .dashboard-content {
          flex: 1;
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 968px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          .glass-navbar {
            padding: 1rem;
          }
          .dashboard-content {
            padding: 1rem;
          }
        }
        .slide-in-bottom {
          animation: slideUp 0.6s ease-out forwards;
        }
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
