import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, MessageSquare } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('citizen'); // 'citizen' or 'gov'
  const [govId, setGovId] = useState('');
  const [govPassword, setGovPassword] = useState('');
  
  // Citizen OTP Flow states
  const [citizenId, setCitizenId] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'citizen') {
      if (!citizenId) return alert('Please enter phone or email');
      
      if (!otpSent) {
        setIsLoading(true);
        // Simulate Twilio API Call
        setTimeout(() => {
          setIsLoading(false);
          setOtpSent(true);
        }, 1200);
      } else {
        if (otpInput.length >= 4) {
          setIsLoading(true);
          setTimeout(() => {
            navigate('/dashboard/user');
          }, 800);
        } else {
          alert('Please enter valid 4-digit OTP code');
        }
      }
    } else {
      // Mock static credentials validation
      if (govId === 'admin' && govPassword === 'admin123') {
        navigate('/dashboard/gov');
      } else {
        alert('Invalid Government ID or Password. (Hint: admin / admin123)');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="glass-panel login-card">
        <div className="login-header">
          <h2 className={role === 'gov' ? 'text-gradient-primary' : 'text-gradient'}>
            Urban Issue Management
          </h2>
          <p className="text-muted" style={{ marginTop: '0.5rem' }}>
            Welcome back. Please select your portal to continue.
          </p>
        </div>

        <div className="role-toggle">
          <button 
            className={`toggle-btn ${role === 'citizen' ? 'active' : ''}`}
            onClick={() => setRole('citizen')}
          >
            <User size={18} /> Citizen
          </button>
          <button 
            className={`toggle-btn ${role === 'gov' ? 'active-gov' : ''}`}
            onClick={() => setRole('gov')}
          >
            <ShieldCheck size={18} /> Official
          </button>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {role === 'citizen' ? (
            <div className="form-group slide-in">
              {!otpSent ? (
                <>
                  <label>Mobile Number (For Twilio OTP)</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="+91 98765 43210"
                    value={citizenId}
                    onChange={(e) => setCitizenId(e.target.value)}
                  />
                  <p className="text-muted text-sm pt-2">An SMS containing a verification code will be sent to your phone number via Twilio.</p>
                </>
              ) : (
                <div className="fade-in" style={{ textAlign: 'center' }}>
                  <MessageSquare size={32} className="text-secondary" style={{ margin: '0 auto 1rem' }} />
                  <label>Enter OTP Sent to {citizenId}</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.25rem' }}
                    placeholder="••••"
                    maxLength={4}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                  />
                  <p className="text-muted text-sm pt-2" style={{ cursor: 'pointer', textDecoration: 'underline' }}>Resend Code</p>
                </div>
              )}
            </div>
          ) : (
            <div className="form-group slide-in">
              <label>Government ID</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Enter your fixed Official ID"
                value={govId}
                onChange={(e) => setGovId(e.target.value)}
              />
              <label style={{ marginTop: '1rem' }}>Password</label>
              <input 
                type="password" 
                className="input-field" 
                placeholder="Enter password"
                value={govPassword}
                onChange={(e) => setGovPassword(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} disabled={role === 'citizen' && isLoading}>
            {role === 'citizen' ? (
              isLoading ? 'Processing...' : (!otpSent ? 'Send Twilio OTP' : 'Verify & Login')
            ) : 'Authenticate Securely'}
          </button>
        </form>
      </div>
      
      {/* Basic inline styling for specific login components */}
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .login-card {
          width: 100%;
          max-width: 440px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          animation: fade-up 0.6s ease-out;
        }
        .login-header {
          text-align: center;
        }
        .role-toggle {
          display: flex;
          background: rgba(15, 23, 42, 0.6);
          padding: 0.35rem;
          border-radius: 12px;
          gap: 0.5rem;
        }
        .toggle-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all var(--transition-fast);
        }
        .toggle-btn:hover {
          color: var(--text-main);
        }
        .toggle-btn.active {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-main);
          box-shadow: var(--shadow-sm);
        }
        .toggle-btn.active-gov {
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(67, 56, 202, 0.4));
          color: var(--primary);
          border: 1px solid rgba(79, 70, 229, 0.3);
          box-shadow: var(--shadow-sm);
        }
        .login-form {
          display: flex;
          flex-direction: column;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.875rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .pt-2 { padding-top: 0.5rem; }
      `}</style>
    </div>
  );
}
