import { useState } from 'react';
import { Bot, MapPin, AlertTriangle, ArrowRight, X } from 'lucide-react';
import { useIssues } from '../../context/IssueContext';

export default function IssueList() {
  const { issues } = useIssues();
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Auto-sort by priority score (descending)
  const sortedIssues = [...issues].sort((a, b) => b.priorityScore - a.priorityScore);

  const getPriorityColor = (score) => {
    if (score >= 90) return 'var(--danger)';
    if (score >= 70) return 'var(--accent)';
    return 'var(--secondary)';
  };

  return (
    <div className="issues-container">
      {/* List View */}
      <div className={`glass-panel issues-list ${selectedIssue ? 'split-view' : 'full-view'}`}>
        <div className="list-header">
          <h3>AI-Prioritized Active Reports</h3>
          <p className="text-muted text-sm">Sorted automatically by Machine Learning severity scores</p>
        </div>

        <div className="list-body">
          {sortedIssues.map((issue) => (
            <div 
              key={issue.id} 
              className={`issue-row ${selectedIssue?.id === issue.id ? 'active-row' : ''}`}
              onClick={() => setSelectedIssue(issue)}
            >
              <div className="issue-primary-info">
                <span className="priority-badge" style={{ background: getPriorityColor(issue.priorityScore) }}>
                  {issue.priorityScore}
                </span>
                <div>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {issue.type} <span className="text-muted text-sm">{issue.id}</span>
                  </h4>
                  <p className="text-muted text-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <MapPin size={12} /> {issue.location}
                  </p>
                </div>
              </div>
              <div className="flex-align-end text-muted text-sm">
                {issue.date} <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail View sliding in from right */}
      {selectedIssue && (
        <div className="glass-panel issue-detail slide-in-right">
          <div className="detail-header">
            <h3>Report Details</h3>
            <button className="btn-icon" onClick={() => setSelectedIssue(null)}>
              <X size={20} />
            </button>
          </div>

          <div className="detail-content">
            <div className="image-container">
              <img src={selectedIssue.image} alt={selectedIssue.type} className="issue-img" />
              <div className="ai-overlay">
                <Bot size={16} /> Image Analyzed by Deep Learning Model
              </div>
            </div>

            <div className="analysis-card">
              <h4 className="text-gradient-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bot size={18} /> AI Analysis Results
              </h4>
              
              <div className="meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Detected Type</span>
                  <span className="meta-value text-white">{selectedIssue.type}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Severity Score</span>
                  <span className="meta-value p-score" style={{ color: getPriorityColor(selectedIssue.priorityScore) }}>
                    {selectedIssue.priorityScore} / 100
                  </span>
                </div>
              </div>

              <div className="keywords-section">
                <span className="meta-label d-block text-sm" style={{ marginBottom: '0.5rem' }}>Extracted NLP Keywords</span>
                <div className="tags-wrapper">
                  {selectedIssue.keywords.map((kw, i) => (
                    <span key={i} className="keyword-tag">{kw}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="citizen-report-card">
              <h4 className="text-muted mb-2">Original Citizen Description</h4>
              <p className="text-main" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                "{selectedIssue.description}"
              </p>
              <hr className="divider" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                <MapPin size={16} className="text-muted" /> {selectedIssue.location}
              </div>
            </div>
            
            <button className="btn-primary w-full" style={{ marginTop: '1rem' }}>
              Dispatch Maintenance Crew
            </button>
          </div>
        </div>
      )}

      <style>{`
        .issues-container {
          display: flex;
          gap: 2rem;
          height: calc(100vh - 160px);
          align-items: stretch;
        }
        .issues-list {
          display: flex;
          flex-direction: column;
          transition: width var(--transition-normal);
        }
        .issues-list.full-view { width: 100%; }
        .issues-list.split-view { width: 50%; }
        
        .list-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-glass);
        }
        .list-body {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .issue-row {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-glass);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: background var(--transition-fast);
        }
        .issue-row:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .issue-row.active-row {
          background: rgba(79, 70, 229, 0.15);
          border-left: 3px solid var(--primary);
        }
        .issue-primary-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .priority-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          box-shadow: var(--shadow-sm);
        }
        .flex-align-end {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        /* Detail View Styles */
        .issue-detail {
          width: 50%;
          display: flex;
          flex-direction: column;
        }
        .slide-in-right {
          animation: slideInRight 0.4s ease-out forwards;
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .detail-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-glass);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .btn-icon {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.5rem;
        }
        .btn-icon:hover { color: white; }
        .detail-content {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .image-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .issue-img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          display: block;
        }
        .ai-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(4px);
          padding: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--secondary);
          font-weight: 500;
        }
        .analysis-card {
           background: rgba(79, 70, 229, 0.05);
           border: 1px solid rgba(79, 70, 229, 0.2);
           border-radius: 12px;
           padding: 1.5rem;
        }
        .meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .meta-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          font-weight: 600;
        }
        .meta-value {
          font-size: 1.125rem;
          font-weight: 600;
        }
        .p-score { font-size: 1.5rem; }
        .tags-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .keyword-tag {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--border-glass);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
        }
        .citizen-report-card {
           background: rgba(15, 23, 42, 0.4);
           padding: 1.5rem;
           border-radius: 12px;
        }
        .divider {
          border: none;
          height: 1px;
          background: var(--border-glass);
          margin-top: 1rem;
        }
        .w-full { width: 100%; }
        .d-block { display: block; }
        .mb-2 { margin-bottom: 0.5rem; }
      `}</style>
    </div>
  );
}
