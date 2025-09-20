import { useEffect, useState } from 'react';
import { Crown, TreePine, Droplets, Wind, Brain, User, Play, ExternalLink, Target, BookOpen, Award, Sun, Recycle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { listenToUserProfile } from '../services/firestore';
import ProgressBar from './ProgressBar';
import Badge from './Badge';
import './Dashboard.css';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    const unsub = listenToUserProfile(currentUser.uid, setProfile);
    return () => unsub && unsub();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="game-card" style={{ textAlign: 'center' }}>
        <User size={32} className="eco-icon" />
        <h3>Please login to view your dashboard</h3>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="game-card" style={{ textAlign: 'center' }}>
        <h3>Loading your progress...</h3>
      </div>
    );
  }

  const gameStats = [
    { number: profile.treesPlanted || 0, label: 'Trees Planted', icon: <TreePine size={24} />, progress: profile.treesPlanted || 0, max: 50 },
    { number: profile.ecoPoints || 0, label: 'Eco Points', icon: <Wind size={24} />, progress: profile.ecoPoints || 0, max: Math.max(1000, profile.ecoPoints || 0) },
    { number: profile.quizzesCompleted || 0, label: 'Quizzes Completed', icon: <Brain size={24} />, progress: profile.quizzesCompleted || 0, max: 100 },
  ];

  const userBadges = (profile.badges || []).map((b) => ({
    type: b,
    title: b,
    description: 'Achievement earned',
    earned: true,
  }));

  // Mock quiz results for demonstration
  const quizResults = [
    { topic: 'Climate Change', score: 85, date: '2024-01-15', questions: 10, correct: 8 },
    { topic: 'Renewable Energy', score: 92, date: '2024-01-12', questions: 8, correct: 7 },
    { topic: 'Ocean Conservation', score: 78, date: '2024-01-10', questions: 12, correct: 9 },
    { topic: 'Biodiversity', score: 88, date: '2024-01-08', questions: 9, correct: 8 },
  ];

  const environmentalRoadmap = [
    { 
      id: 1, 
      title: 'Climate Science Basics', 
      description: 'Understanding greenhouse gases, global warming, and climate patterns',
      status: 'completed',
      icon: <Brain size={20} />
    },
    { 
      id: 2, 
      title: 'Renewable Energy Systems', 
      description: 'Solar, wind, hydro, and geothermal energy technologies',
      status: 'completed',
      icon: <Sun size={20} />
    },
    { 
      id: 3, 
      title: 'Ocean Conservation', 
      description: 'Marine ecosystems, plastic pollution, and sustainable fishing',
      status: 'in-progress',
      icon: <Droplets size={20} />
    },
    { 
      id: 4, 
      title: 'Biodiversity Protection', 
      description: 'Species conservation, habitat restoration, and ecosystem balance',
      status: 'pending',
      icon: <TreePine size={20} />
    },
    { 
      id: 5, 
      title: 'Sustainable Living', 
      description: 'Zero waste, circular economy, and green lifestyle choices',
      status: 'pending',
      icon: <Recycle size={20} />
    },
  ];


  return (
    <section className="progress-section">
      <div className="section-header">
        <h2>Your Dashboard</h2>
        <p>See your eco journey across games and quizzes</p>
      </div>
      <div className="progress-dashboard">
        <div className="level-card game-card">
          <div className="level-info">
            <Crown size={32} className="eco-icon" />
            <div>
              <h3>Level {profile.level || 1}</h3>
              <p>{profile.displayName || currentUser.email}</p>
            </div>
          </div>
          <ProgressBar
            current={profile.experience || 0}
            max={profile.maxExperience || 1000}
            label="Experience"
            showStars={true}
          />
        </div>

        <div className="stats-grid">
          {gameStats.map((stat, index) => (
            <div key={index} className="stat-card game-card">
              <div className="stat-icon eco-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <ProgressBar current={stat.progress} max={stat.max} label="" />
            </div>
          ))}
        </div>

        <div className="game-card" style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
            <div className="user-avatar" style={{ width: 40, height: 40 }}>
              {(profile.displayName || currentUser.email)?.[0]?.toUpperCase()}
            </div>
            <div>
              <div style={{ fontFamily: 'Press Start 2P, monospace', color: '#fff', textShadow: '2px 2px 0 #000' }}>
                {profile.displayName || currentUser.email}
              </div>
              <div style={{ fontSize: 12, color: '#b4d7b0' }}>Eco points: {profile.ecoPoints || 0} • Quizzes: {profile.quizzesCompleted || 0}</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#b4d7b0' }}>Member since: {profile.createdAt?.toDate ? profile.createdAt.toDate().toLocaleDateString() : '—'}</div>
        </div>
      </div>

      {userBadges.length > 0 && (
        <div className="badges-section">
          <div className="section-header">
            <h2>Your Achievements</h2>
          </div>
          <div className="badges-grid">
            {userBadges.map((badge, index) => (
              <Badge
                key={index}
                type={badge.type}
                title={badge.title}
                description={badge.description}
                earned={badge.earned}
                animated={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quiz Results Section */}
      <div className="quiz-results-section">
        <div className="section-header">
          <h2>Quiz Results</h2>
          <p>Your recent quiz performance</p>
        </div>
        <div className="quiz-results-grid">
          {quizResults.map((result, index) => (
            <div key={index} className="quiz-result-card game-card">
              <div className="quiz-header">
                <Brain size={20} className="eco-icon" />
                <div>
                  <h4>{result.topic}</h4>
                  <p>{result.date}</p>
                </div>
                <div className="quiz-score">
                  <span className="score-number">{result.score}%</span>
                </div>
              </div>
              <div className="quiz-details">
                <div className="quiz-stats">
                  <span>{result.correct}/{result.questions} correct</span>
                  <ProgressBar 
                    current={result.score} 
                    max={100} 
                    label="" 
                    color={result.score >= 80 ? '#4CAF50' : result.score >= 60 ? '#FF9800' : '#F44336'}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Learning Roadmap */}
      <div className="roadmap-section">
        <div className="section-header">
          <h2>Environmental Learning Roadmap</h2>
          <p>Your journey to becoming an eco-expert</p>
        </div>
        <div className="roadmap-container">
          {environmentalRoadmap.map((item, index) => (
            <div key={item.id} className={`roadmap-item ${item.status}`}>
              <div className="roadmap-icon">
                {item.status === 'completed' ? <Award size={20} /> : item.icon}
              </div>
              <div className="roadmap-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className="roadmap-status">
                  <span className={`status-badge ${item.status}`}>
                    {item.status === 'completed' ? '✓ Completed' : 
                     item.status === 'in-progress' ? '🔄 In Progress' : '⏳ Pending'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}


