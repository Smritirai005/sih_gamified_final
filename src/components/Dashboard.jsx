import { useEffect, useState } from 'react';
import { Crown, TreePine, Droplets, Wind, Brain, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { listenToUserProfile } from '../services/firestore';
import ProgressBar from './ProgressBar';
import Badge from './Badge';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);

  // Temporarily disabled Firestore listeners to fix loading
  // useEffect(() => {
  //   if (!currentUser) return;
  //   const unsub = listenToUserProfile(currentUser.uid, setProfile);
  //   return () => unsub && unsub();
  // }, [currentUser]);

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
    </section>
  );
}


