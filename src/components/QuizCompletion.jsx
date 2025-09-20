import { useState, useEffect } from 'react';
import { Trophy, Star, Target, Zap, Crown, ArrowRight, RotateCcw } from 'lucide-react';

export default function QuizCompletion({ 
  score, 
  totalQuestions, 
  level, 
  onRestart, 
  onNextLevel,
  userProgress 
}) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [newLevel, setNewLevel] = useState(level);

  useEffect(() => {
    setShowAnimation(true);
    setEarnedPoints(score);
    
    // Calculate if user leveled up
    const newLevelValue = Math.min(3, Math.floor((userProgress.quizzesCompleted + 1) / 3) + 1);
    setNewLevel(newLevelValue);
  }, [score, userProgress.quizzesCompleted]);

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfect = percentage === 100;
  const isGood = percentage >= 80;
  const leveledUp = newLevel > level;

  const getPerformanceMessage = () => {
    if (isPerfect) return "Perfect Score! 🌟";
    if (isGood) return "Excellent Work! 🎉";
    if (percentage >= 60) return "Good Job! 👍";
    return "Keep Learning! 💪";
  };

  const getPerformanceColor = () => {
    if (isPerfect) return "#FFD700";
    if (isGood) return "#4CAF50";
    if (percentage >= 60) return "#FF9800";
    return "#F44336";
  };

  return (
    <div className={`quiz-completion ${showAnimation ? 'animate-in' : ''}`}>
      <div className="completion-header">
        <div className="completion-icon">
          <Trophy size={64} style={{ color: getPerformanceColor() }} />
        </div>
        <h2>Quiz Complete!</h2>
        <p className="performance-message" style={{ color: getPerformanceColor() }}>
          {getPerformanceMessage()}
        </p>
      </div>

      <div className="completion-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Target size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-number">{score}/{totalQuestions}</div>
            <div className="stat-label">Correct Answers</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Star size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-number">{percentage}%</div>
            <div className="stat-label">Accuracy</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Zap size={24} />
          </div>
          <div className="stat-info">
            <div className="stat-number">+{earnedPoints}</div>
            <div className="stat-label">Eco Points</div>
          </div>
        </div>
      </div>

      {leveledUp && (
        <div className="level-up-notification">
          <div className="level-up-icon">
            <Crown size={32} />
          </div>
          <div className="level-up-content">
            <h3>Level Up! 🎉</h3>
            <p>You've reached Level {newLevel}!</p>
            <div className="level-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${((userProgress.quizzesCompleted + 1) % 3) * 33.33}%`,
                    backgroundColor: '#4CAF50'
                  }}
                ></div>
              </div>
              <span className="progress-text">
                {((userProgress.quizzesCompleted + 1) % 3)}/3 quizzes to next level
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="completion-actions">
        <button className="action-btn secondary" onClick={onRestart}>
          <RotateCcw size={20} />
          Retry Quiz
        </button>
        <button className="action-btn primary" onClick={onNextLevel}>
          Continue Learning
          <ArrowRight size={20} />
        </button>
      </div>

      <div className="completion-tips">
        <h4>💡 Eco Tips</h4>
        <ul>
          <li>Turn off lights when leaving a room</li>
          <li>Use reusable water bottles</li>
          <li>Walk or bike for short distances</li>
          <li>Recycle paper, plastic, and glass</li>
        </ul>
      </div>
    </div>
  );
}
