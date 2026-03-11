import { useState } from 'react';
import { MapPin } from 'lucide-react';

export default function LocationSelector() {
  const [state, setState] = useState('Rajasthan');
  const [city, setCity] = useState('Jaipur');

  const states = ['Rajasthan', 'Maharashtra', 'Karnataka', 'Delhi'];
  const citiesByState = {
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
    'Karnataka': ['Bengaluru', 'Mysuru'],
    'Delhi': ['New Delhi', 'South Delhi']
  };

  return (
    <div className="location-selector">
      <MapPin size={18} className="text-muted" />
      
      <select 
        className="glass-select" 
        value={state} 
        onChange={(e) => {
          setState(e.target.value);
          setCity(citiesByState[e.target.value][0]);
        }}
      >
        {states.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      
      <span className="text-muted" style={{ padding: '0 0.25rem' }}>/</span>
      
      <select 
        className="glass-select" 
        value={city} 
        onChange={(e) => setCity(e.target.value)}
      >
        {citiesByState[state]?.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <style>{`
        .location-selector {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(15, 23, 42, 0.4);
          padding: 0.5rem 1rem;
          border-radius: 999px;
          border: 1px solid var(--border-glass);
          margin-left: 1.5rem;
          margin-right: auto;
        }
        .glass-select {
          background: transparent;
          color: var(--text-main);
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
          padding-right: 0.5rem;
        }
        .glass-select option {
          background: var(--bg-dark);
          color: var(--text-main);
        }
        @media (max-width: 768px) {
           .location-selector { margin: 1rem 0; width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
}
