import { useState } from 'react';
import { LogOut, Activity, LayoutDashboard, BarChart3, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatsOverview from '../components/Gov/StatsOverview';
import IssueList from '../components/Gov/IssueList';
import InsightsCharts from '../components/Gov/InsightsCharts';
import LocationSelector from '../components/Shared/LocationSelector';
import TrafficMap from '../components/Shared/TrafficMap';

export default function GovDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'list', 'analytics'

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar glass-panel">
        <div className="sidebar-brand">
          <Activity className="text-primary" size={28} />
          <h2 className="text-gradient-primary">GovConnect</h2>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            <List size={20} /> Reports List
          </button>
          <button 
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={20} /> Data Intelligence
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-secondary" style={{ width: '100%' }} onClick={() => navigate('/login')}>
            <LogOut size={16} /> Logout Access
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content">
        <header className="content-header fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="text-gradient">
              {activeTab === 'overview' && 'Command Center Overview'}
              {activeTab === 'list' && 'Prioritized AI Reports'}
              {activeTab === 'analytics' && 'Geospatial Data Intelligence'}
            </h1>
            <p className="text-muted">Real-time artificial intelligence analysis of urban infrastructure.</p>
          </div>
          <LocationSelector />
        </header>

        <div className="tab-content fade-in">
          {activeTab === 'overview' && (
            <div className="overview-grid">
              <StatsOverview />
              <div style={{ marginTop: '2rem' }}>
                <InsightsCharts compact={true} />
              </div>
            </div>
          )}
          {activeTab === 'list' && <IssueList />}
          {activeTab === 'analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <h3 className="text-gradient-primary">System AI Predictions & Weather Impact</h3>
                  <p className="text-muted text-sm">Deep learning weather correlation model</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(15, 23, 42, 0.4)', padding: '1.5rem', borderRadius: '12px' }}>
                  <div>
                    <h5 className="text-muted" style={{ marginBottom: '0.5rem' }}>Upcoming 48h Weather Risk</h5>
                    <p style={{ fontWeight: 600, color: 'var(--danger)', fontSize: '1.25rem' }}>Severe Rain Expected</p>
                    <p className="text-sm text-muted">Predicted 35% increase in pothole expansions and 60% chance of severe waterlogging in C-Scheme.</p>
                  </div>
                  <div style={{ borderLeft: '1px solid var(--border-glass)', paddingLeft: '1rem' }}>
                    <h5 className="text-muted" style={{ marginBottom: '0.5rem' }}>Recommended Proactive Action</h5>
                    <p style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '1.1rem' }}>Pre-deploy Drainage Pumps</p>
                    <p className="text-sm text-muted">Dispatch 4 municipal pump units to Downtown Commerce District before Friday 18:00 HRS.</p>
                  </div>
                </div>
              </div>
              <TrafficMap height="400px" />
              <InsightsCharts compact={false} />
            </div>
          )}
        </div>
      </main>

      <style>{`
        .admin-layout {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }
        .sidebar {
          width: 280px;
          border-radius: 0;
          border-left: none;
          border-top: none;
          border-bottom: none;
          display: flex;
          flex-direction: column;
          z-index: 10;
        }
        .sidebar-brand {
          padding: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid var(--border-glass);
        }
        .sidebar-nav {
          padding: 1.5rem 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
        }
        .nav-item:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.05);
        }
        .nav-item.active {
          color: white;
          background: linear-gradient(90deg, rgba(79, 70, 229, 0.2), transparent);
          border-left: 3px solid var(--primary);
        }
        .sidebar-footer {
          padding: 2rem 1rem;
          border-top: 1px solid var(--border-glass);
        }
        .admin-content {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          background: rgba(15, 23, 42, 0.2);
        }
        .content-header {
          padding: 2rem 3rem;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border-glass);
          position: sticky;
          top: 0;
          z-index: 5;
        }
        .tab-content {
          padding: 2rem 3rem;
          flex: 1;
        }
        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @media (max-width: 768px) {
          .admin-layout {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
            height: auto;
            border-bottom: 1px solid var(--border-glass);
            border-right: none;
          }
          .sidebar-nav {
            flex-direction: row;
            overflow-x: auto;
            padding: 1rem;
          }
          .content-header, .tab-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
