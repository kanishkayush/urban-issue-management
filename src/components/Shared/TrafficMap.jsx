import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';

// Fix typical leaflet icon issue with Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const jaipurCenter = [26.9124, 75.7873];

const trafficIssues = [
  { id: 1, pos: [26.9150, 75.7900], text: 'Heavy Traffic (AI Flagged)', severity: 'critical' },
  { id: 2, pos: [26.9050, 75.7850], text: 'Pothole (Blocked Lane)', severity: 'moderate' },
  { id: 3, pos: [26.9200, 75.8000], text: 'Signal Failure (Gridlock)', severity: 'critical' },
  { id: 4, pos: [26.9180, 75.7700], text: 'Waterlogging (Slow Traffic)', severity: 'moderate' }
];

export default function TrafficMap({ height = '300px' }) {
  return (
    <div className="glass-panel map-card">
       <div className="card-header" style={{ padding: '1.5rem', paddingBottom: '0.5rem' }}>
        <h3>Live Traffic & Issue Map (Jaipur)</h3>
        <p className="text-muted text-sm">Real-time alerts via geospatial triangulation</p>
      </div>

      <div style={{ height, width: '100%', borderRadius: '0 0 16px 16px', overflow: 'hidden', zIndex: 1 }}>
        <MapContainer center={jaipurCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {trafficIssues.map(issue => (
            <CircleMarker 
              key={issue.id} 
              center={issue.pos} 
              radius={10}
              pathOptions={{ 
                fillColor: issue.severity === 'critical' ? 'var(--danger)' : 'var(--accent)',
                color: 'transparent',
                fillOpacity: 0.7
              }}
            >
              <Popup>
                <div style={{ background: 'var(--bg-dark)', color: 'var(--text-main)', padding: '5px' }}>
                  <strong>{issue.text}</strong>
                  <br /> Status: {issue.severity.toUpperCase()}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
