import { createContext, useState, useContext } from 'react';

const IssueContext = createContext();

export function useIssues() {
  return useContext(IssueContext);
}

export function IssueProvider({ children }) {
  const [issues, setIssues] = useState([
    {
      id: 'ISS-1049',
      type: 'Road Damage',
      location: 'Main St & 4th Ave Intersection',
      description: 'A massive crater-like pothole has developed in the right lane causing vehicles to sharply swerve.',
      priorityScore: 98,
      keywords: ['crater', 'right lane', 'swerve', 'danger'],
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400',
      date: '10 mins ago',
      coordinates: [26.9150, 75.7900]
    },
    {
      id: 'ISS-1050',
      type: 'Heavy Traffic',
      location: 'Westlake Expressway Northbound',
      description: 'Traffic signals are completely out and flashing red, causing a massive gridlock spanning miles.',
      priorityScore: 92,
      keywords: ['signals out', 'flashing red', 'gridlock', 'miles'],
      image: 'https://images.unsplash.com/photo-1592864694464-585317ad54eb?auto=format&fit=crop&q=80&w=400',
      date: '25 mins ago',
      coordinates: [26.9200, 75.8000]
    },
    {
      id: 'ISS-1042',
      type: 'Water Clogging',
      location: 'Downtown Commerce District',
      description: 'Drainage seems blocked, about 2 feet of water on the sidewalk area making it impossible to pass.',
      priorityScore: 85,
      keywords: ['drainage blocked', '2 feet water', 'sidewalk'],
      image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=400',
      date: '1 hour ago',
      coordinates: [26.9180, 75.7700]
    }
  ]);

  const addIssue = (newIssue) => {
    // Basic NLP mock for priority score based on keywords in description
    const desc = newIssue.description.toLowerCase();
    let score = 40;
    let type = 'Other';
    const keywords = [];

    if (desc.includes('pothole') || desc.includes('crater') || desc.includes('road')) {
      score += 35;
      type = 'Road Damage';
      keywords.push('pothole', 'road damage');
    }
    if (desc.includes('traffic') || desc.includes('signal') || desc.includes('jam')) {
      score += 45;
      type = 'Heavy Traffic';
      keywords.push('traffic', 'congestion');
    }
    if (desc.includes('water') || desc.includes('drain') || desc.includes('flood')) {
      score += 40;
      type = 'Water Clogging';
      keywords.push('waterlogging', 'drainage');
    }
    
    // Slight randomization to feel natural
    score += Math.floor(Math.random() * 10);
    score = Math.min(score, 99);

    const fullIssue = {
      id: `ISS-${1050 + issues.length + 1}`,
      type,
      location: 'Jaipur (GPS Sourced)',
      description: newIssue.description,
      priorityScore: score,
      keywords: keywords.length > 0 ? keywords : ['user reported', 'pending analysis'],
      image: newIssue.image || 'https://images.unsplash.com/photo-1541888045618-ac665c71b3e8?auto=format&fit=crop&q=80&w=400',
      date: 'Just now',
      coordinates: [26.9124 + (Math.random() - 0.5) * 0.05, 75.7873 + (Math.random() - 0.5) * 0.05]
    };

    setIssues(prev => [fullIssue, ...prev]);
  };

  return (
    <IssueContext.Provider value={{ issues, addIssue }}>
      {children}
    </IssueContext.Provider>
  );
}
