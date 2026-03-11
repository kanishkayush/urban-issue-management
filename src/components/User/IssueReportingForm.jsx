import { useState, useRef } from 'react';
import { Camera, Send, UploadCloud, X, Loader2, CheckCircle } from 'lucide-react';
import { useIssues } from '../../context/IssueContext';

export default function IssueReportingForm() {
  const { addIssue } = useIssues();
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description && !image) return;
    
    setIsSubmitting(true);
    // Simulate API delay and AI processing
    setTimeout(() => {
      addIssue({ description, image });
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setDescription('');
        setImage(null);
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="glass-panel reporting-card success-state">
        <CheckCircle size={64} className="text-secondary" style={{ marginBottom: '1rem' }} />
        <h2 className="text-gradient">Report Submitted!</h2>
        <p className="text-muted" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          Our AI models are analyzing your report. It will be prioritized and sent to the concerned authorities immediately.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel reporting-card">
      <div className="card-header">
        <h3>Report an Urban Issue</h3>
        <p className="text-muted text-sm">Help us identify potholes, blockages, or traffic problems</p>
      </div>

      <form onSubmit={handleSubmit} className="reporting-form">
        
        {/* Image Upload Area */}
        <div 
          className="upload-area" 
          onClick={() => fileInputRef.current?.click()}
          style={{ backgroundImage: image ? `url(${image})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          {!image && (
            <div className="upload-placeholder">
              <div className="upload-icon-wrapper">
                <UploadCloud size={32} className="text-primary" />
              </div>
              <p style={{ fontWeight: 500 }}>Click to upload an image</p>
              <p className="text-muted text-sm">JPG, PNG (Max 5MB)</p>
            </div>
          )}
          {image && (
            <button 
              type="button" 
              className="remove-img-btn"
              onClick={(e) => { e.stopPropagation(); setImage(null); }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Chatbox / Description Area */}
        <div className="chatbox-wrapper">
          <textarea 
            className="input-field chat-input" 
            placeholder="Describe the issue here in detail (e.g. Huge pothole on Main St causing traffic)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isSubmitting || (!description && !image)}>
            {isSubmitting ? (
              <><Loader2 size={18} className="spin" /> Analyzing via AI...</>
            ) : (
              <><Send size={18} /> Submit Report</>
            )}
          </button>
        </div>
      </form>

      <style>{`
        .reporting-card {
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .success-state {
          align-items: center;
          justify-content: center;
          animation: fade-in 0.5s ease;
        }
        .reporting-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1.5rem;
          flex: 1;
        }
        .upload-area {
          border: 2px dashed rgba(79, 70, 229, 0.4);
          border-radius: 12px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          background-color: rgba(15, 23, 42, 0.4);
          position: relative;
          overflow: hidden;
        }
        .upload-area:hover {
          border-color: var(--primary);
          background-color: rgba(30, 41, 59, 0.6);
        }
        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .upload-icon-wrapper {
          background: rgba(79, 70, 229, 0.1);
          padding: 1rem;
          border-radius: 50%;
          margin-bottom: 0.5rem;
        }
        .remove-img-btn {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          border: none;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          backdrop-filter: blur(4px);
        }
        .remove-img-btn:hover {
          background: rgba(239, 68, 68, 0.8);
        }
        .chatbox-wrapper {
          display: flex;
          flex-direction: column;
        }
        .chat-input {
          resize: none;
          background: rgba(15, 23, 42, 0.5);
          border-radius: 12px;
          padding: 1rem;
          font-size: 1rem;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: auto;
        }
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          box-shadow: none;
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
