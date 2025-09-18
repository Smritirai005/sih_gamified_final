import { useState, useEffect } from 'react';
import { Star, Trophy, Target } from 'lucide-react';

export default function ProgressBar({ current, max, label, showStars = false }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const percentage = Math.min((current / max) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getProgressColor = () => {
    if (percentage >= 100) return 'linear-gradient(90deg, #ffd700, #ffed4e)';
    if (percentage >= 75) return 'linear-gradient(90deg, var(--light-green), var(--accent-green))';
    if (percentage >= 50) return 'linear-gradient(90deg, #ffa500, #ffb347)';
    return 'linear-gradient(90deg, #ff6b6b, #ff8e8e)';
  };

  const getStars = () => {
    const stars = Math.floor(percentage / 20);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <div className="progress-label">
          <Target size={16} />
          <span>{label}</span>
        </div>
        <div className="progress-stats">
          <span className="progress-current">{current}</span>
          <span className="progress-separator">/</span>
          <span className="progress-max">{max}</span>
          {showStars && (
            <div className="progress-stars">
              {getStars()}
            </div>
          )}
        </div>
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-bar"
          style={{ 
            width: `${animatedProgress}%`,
            background: getProgressColor()
          }}
        />
      </div>
      
      {percentage >= 100 && (
        <div className="progress-complete">
          <Trophy size={20} />
          <span>Level Complete! 🎉</span>
        </div>
      )}
    </div>
  );
}

