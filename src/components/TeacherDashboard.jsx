import { useEffect, useState } from 'react';
import { Crown, Sword, ExternalLink, BookOpen, Users, Target, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { listenToUserProfile } from '../services/firestore';
import './Dashboard.css';

export default function TeacherDashboard() {
  const { currentUser, userRole } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!currentUser) return;
    const unsub = listenToUserProfile(currentUser.uid, setProfile);
    return () => unsub && unsub();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="game-card" style={{ textAlign: 'center' }}>
        <h3>Please login to access teacher dashboard</h3>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="game-card" style={{ textAlign: 'center' }}>
        <h3>Loading your teacher dashboard...</h3>
      </div>
    );
  }

  const teacherFeatures = [
    {
      icon: <Sword size={40} />,
      title: "Eco Quest",
      description: "Access the main educational platform for managing student activities and progress",
      link: "https://school-arena-quest.vercel.app",
      primary: true
    },
    {
      icon: <BookOpen size={40} />,
      title: "Curriculum Management",
      description: "Create and manage environmental education curriculum (Coming Soon)",
      link: null,
      primary: false
    },
    {
      icon: <Users size={40} />,
      title: "Student Analytics",
      description: "Monitor student progress and performance (Coming Soon)",
      link: null,
      primary: false
    },
    {
      icon: <Target size={40} />,
      title: "Assessment Tools",
      description: "Create and manage quizzes and assessments (Coming Soon)",
      link: null,
      primary: false
    }
  ];

  return (
    <section className="progress-section">
      <div className="section-header">
        <h2>Teacher Dashboard</h2>
        <p>Welcome to your educational management center</p>
      </div>

      <div className="progress-dashboard">
        <div className="level-card game-card">
          <div className="level-info">
            <Crown size={32} className="eco-icon" />
            <div>
              <h3>Teacher Profile</h3>
              <p>{profile.displayName || currentUser.email}</p>
              <p className="user-role">👨‍🏫 Teacher</p>
            </div>
          </div>
          <div className="teacher-stats">
            <div className="stat-item">
              <span className="stat-number">Active</span>
              <span className="stat-label">Status</span>
            </div>
          </div>
        </div>

        <div className="teacher-features-section">
          <div className="section-header">
            <h2>Teacher Tools & Resources</h2>
            <p>Access your educational management tools</p>
          </div>
          
          <div className="teacher-features-grid">
            {teacherFeatures.map((feature, index) => (
              <div key={index} className={`teacher-feature-card game-card ${feature.primary ? 'primary-feature' : ''}`}>
                <div className="feature-icon eco-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <button 
                  className={`feature-btn ${feature.primary ? 'primary-btn' : 'secondary-btn'}`}
                  onClick={() => {
                    if (feature.link) {
                      window.open(feature.link, '_blank');
                    } else {
                      alert('This feature is coming soon!');
                    }
                  }}
                  disabled={!feature.link}
                >
                  {feature.link ? (
                    <>
                      <ExternalLink size={16} />
                      {feature.primary ? 'Access Eco Quest' : 'Open Tool'}
                    </>
                  ) : (
                    <>
                      <Award size={16} />
                      Coming Soon
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="teacher-info-card game-card">
          <div className="teacher-info-header">
            <h3>Teacher Information</h3>
          </div>
          <div className="teacher-info-content">
            <div className="info-item">
              <span className="info-label">Role:</span>
              <span className="info-value">Environmental Education Teacher</span>
            </div>
            <div className="info-item">
              <span className="info-label">Access Level:</span>
              <span className="info-value">Full Platform Access</span>
            </div>
            <div className="info-item">
              <span className="info-label">Primary Platform:</span>
              <span className="info-value">Eco Quest Educational System</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since:</span>
              <span className="info-value">
                {profile.createdAt?.toDate ? profile.createdAt.toDate().toLocaleDateString() : '—'}
              </span>
            </div>
          </div>
        </div>

        <div className="teacher-redirect-notice game-card">
          <div className="notice-content">
            <Sword size={48} className="eco-icon" />
            <h3>Ready to Start Teaching?</h3>
            <p>Click the Eco Quest button above to access the main educational platform where you can manage your students and create engaging environmental learning experiences.</p>
            <button 
              className="primary-btn large"
              onClick={() => window.open('https://school-arena-quest.vercel.app', '_blank')}
            >
              <Sword size={20} />
              Launch Eco Quest
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
