import { useEffect, useState } from 'react';
import { Crown, TreePine, Droplets, Wind, Brain, User, Play, ExternalLink, Target, BookOpen, Award, Sun, Recycle, Trophy, Medal, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { listenToUserProfile } from '../services/firestore';
import ProgressBar from './ProgressBar';
import Badge from './Badge';
import './Dashboard.css';

export default function Dashboard() {
  const { currentUser, userRole } = useAuth();
  const [profile, setProfile] = useState(null);
  const [timeframe, setTimeframe] = useState('all-time');

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

  const mockLeaderboard = [
    { id: 1, name: 'EcoMaster2024', score: 2450, level: 15, avatar: '🌱', badges: 8 },
    { id: 2, name: 'GreenWarrior', score: 2380, level: 14, avatar: '🌿', badges: 7 },
    { id: 3, name: 'TreePlanter', score: 2200, level: 13, avatar: '🌳', badges: 6 },
    { id: 4, name: 'OceanSaver', score: 2150, level: 12, avatar: '🌊', badges: 5 },
    { id: 5, name: 'RecycleKing', score: 2000, level: 11, avatar: '♻️', badges: 4 },
    { id: 6, name: 'NatureLover', score: 1850, level: 10, avatar: '🦋', badges: 3 },
    { id: 7, name: 'EcoExplorer', score: 1700, level: 9, avatar: '🐝', badges: 3 },
    { id: 8, name: 'GreenThumb', score: 1550, level: 8, avatar: '🌻', badges: 2 },
    { id: 9, name: 'EarthGuardian', score: 1400, level: 7, avatar: '🌍', badges: 2 },
    { id: 10, name: 'EcoNewbie', score: 1200, level: 6, avatar: '🌱', badges: 1 }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown size={24} className="text-yellow-500" />;
      case 2: return <Medal size={24} className="text-gray-400" />;
      case 3: return <Award size={24} className="text-amber-600" />;
      default: return <span className="rank-number">{rank}</span>;
    }
  };

  const getRankClass = (rank) => {
    switch (rank) {
      case 1: return 'leaderboard-item first-place';
      case 2: return 'leaderboard-item second-place';
      case 3: return 'leaderboard-item third-place';
      default: return 'leaderboard-item';
    }
  };



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
              <p className="user-role">{userRole === 'teacher' ? '👨‍🏫 Teacher' : '👨‍🎓 Student'}</p>
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

      {/* Eco Task Pathways Section */}
      <div className="eco-task-section">
        <div className="section-header">
          <h2>Green Action Pathways</h2>
          <p>Complete environmental challenges and earn rewards</p>
        </div>
        <div className="eco-task-card game-card">
          <div className="eco-task-header">
            <Target size={24} className="eco-icon" />
            <div className="eco-task-info">
              <h3>Environmental Task Pathways</h3>
              <p>Engage in structured environmental learning activities and track your progress through various eco-friendly challenges.</p>
            </div>
            <button 
              className="eco-task-btn primary-btn"
              onClick={() => window.open('https://eco-task-pathways.vercel.app', '_blank')}
            >
              <ExternalLink size={16} />
              Start Tasks
            </button>
          </div>
          <div className="eco-task-features">
            <div className="feature-item">
              <BookOpen size={16} />
              <span>Structured Learning Paths</span>
            </div>
            <div className="feature-item">
              <Award size={16} />
              <span>Progress Tracking</span>
            </div>
            <div className="feature-item">
              <Sun size={16} />
              <span>Environmental Challenges</span>
            </div>
          </div>
        </div>
      </div>

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

      {/* Leaderboard Section */}
      <div className="leaderboard-section">
        <div className="section-header">
          <h2>Eco Champions Leaderboard</h2>
          <p>See how you rank among eco-warriors worldwide</p>
        </div>
        
        <div className="leaderboard-filters">
          <button 
            className={`filter-btn ${timeframe === 'all-time' ? 'active' : ''}`}
            onClick={() => setTimeframe('all-time')}
          >
            All Time
          </button>
          <button 
            className={`filter-btn ${timeframe === 'monthly' ? 'active' : ''}`}
            onClick={() => setTimeframe('monthly')}
          >
            This Month
          </button>
          <button 
            className={`filter-btn ${timeframe === 'weekly' ? 'active' : ''}`}
            onClick={() => setTimeframe('weekly')}
          >
            This Week
          </button>
        </div>

        {currentUser && (
          <div className="user-rank-card game-card">
            <div className="user-rank-info">
              <div className="user-rank-icon">
                <TrendingUp size={24} />
              </div>
              <div className="user-rank-details">
                <h3>Your Rank</h3>
                <p>You're #{11} on the leaderboard!</p>
              </div>
            </div>
            <div className="user-rank-badge">
              <span className="rank-badge">#11</span>
            </div>
          </div>
        )}

        <div className="leaderboard-list">
          {mockLeaderboard.slice(0, 5).map((user, index) => (
            <div key={user.id} className={`${getRankClass(index + 1)} game-card`}>
              <div className="leaderboard-rank">
                {getRankIcon(index + 1)}
              </div>
              
              <div className="leaderboard-avatar">
                <span className="avatar-emoji">{user.avatar}</span>
              </div>
              
              <div className="leaderboard-info">
                <h4 className="player-name">{user.name}</h4>
                <div className="player-stats">
                  <span className="player-level">Level {user.level}</span>
                  <span className="player-badges">
                    <Star size={14} />
                    {user.badges} badges
                  </span>
                </div>
              </div>
              
              <div className="leaderboard-score">
                <span className="score-value">{user.score.toLocaleString()}</span>
                <span className="score-label">points</span>
              </div>
            </div>
          ))}
        </div>

        <div className="leaderboard-footer">
          <p>🏆 Compete with eco-warriors worldwide and climb the ranks!</p>
        </div>
      </div>

    </section>
  );
}


