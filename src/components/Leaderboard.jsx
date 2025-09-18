import { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Crown, Star, TrendingUp } from 'lucide-react';

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

export default function Leaderboard({ currentUser }) {
  const [leaderboard, setLeaderboard] = useState(mockLeaderboard);
  const [timeframe, setTimeframe] = useState('all-time');
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    // Simulate finding user rank
    if (currentUser) {
      const rank = leaderboard.findIndex(user => user.name === currentUser.displayName) + 1;
      setUserRank(rank || leaderboard.length + 1);
    }
  }, [currentUser, leaderboard]);

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
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <div className="leaderboard-title">
          <Trophy size={32} className="eco-icon" />
          <h2>Eco Champions Leaderboard</h2>
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
      </div>

      {currentUser && userRank && (
        <div className="user-rank-card eco-card">
          <div className="user-rank-info">
            <div className="user-rank-icon">
              <TrendingUp size={24} />
            </div>
            <div className="user-rank-details">
              <h3>Your Rank</h3>
              <p>You're #{userRank} on the leaderboard!</p>
            </div>
          </div>
          <div className="user-rank-badge">
            <span className="rank-badge">#{userRank}</span>
          </div>
        </div>
      )}

      <div className="leaderboard-list">
        {leaderboard.map((user, index) => (
          <div key={user.id} className={getRankClass(index + 1)}>
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
  );
}

