import { useState, useEffect } from 'react';
import { Star, Trophy, Zap, Heart, Shield, Crown } from 'lucide-react';

const badgeIcons = {
  'eco-warrior': <Shield size={20} />,
  'tree-planter': <Star size={20} />,
  'recycling-champ': <Trophy size={20} />,
  'water-saver': <Zap size={20} />,
  'nature-lover': <Heart size={20} />,
  'eco-master': <Crown size={20} />
};

const badgeColors = {
  'eco-warrior': 'linear-gradient(135deg, #4ade80, #22c55e)',
  'tree-planter': 'linear-gradient(135deg, #84cc16, #65a30d)',
  'recycling-champ': 'linear-gradient(135deg, #f59e0b, #d97706)',
  'water-saver': 'linear-gradient(135deg, #06b6d4, #0891b2)',
  'nature-lover': 'linear-gradient(135deg, #ec4899, #db2777)',
  'eco-master': 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
};

export default function Badge({ type, title, description, earned = false, animated = false }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animated && earned) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animated, earned]);

  return (
    <div 
      className={`badge-container ${earned ? 'earned' : 'locked'} ${isVisible ? 'visible' : ''}`}
      style={{ 
        background: earned ? badgeColors[type] : 'linear-gradient(135deg, #9ca3af, #6b7280)',
        opacity: earned ? 1 : 0.6
      }}
    >
      <div className="badge-icon">
        {badgeIcons[type]}
      </div>
      <div className="badge-content">
        <h4 className="badge-title">{title}</h4>
        <p className="badge-description">{description}</p>
      </div>
      {earned && (
        <div className="badge-sparkle">
          <Star size={12} />
        </div>
      )}
    </div>
  );
}

