import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Star, Trophy } from 'lucide-react';

export default function QuizCard({ 
  question, 
  options, 
  correctAnswer, 
  onAnswer, 
  timeLimit = 20,
  questionNumber,
  totalQuestions,
  level = 1
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setTimeLeft(timeLimit);
  }, [question, options, correctAnswer, timeLimit]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const intervalMs = level >= 3 ? 600 : level === 2 ? 800 : 1000;
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), intervalMs);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(null);
    }
  }, [timeLeft, showResult]);

  const handleAnswer = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(correct, answer);
    }, 800);
  };

  const getOptionClass = (option) => {
    if (!showResult) return 'quiz-option';
    if (option === correctAnswer) return 'quiz-option correct';
    if (option === selectedAnswer && option !== correctAnswer) return 'quiz-option incorrect';
    return 'quiz-option disabled';
  };

  const getTimeColor = () => {
    if (timeLeft > 20) return 'var(--light-green)';
    if (timeLeft > 10) return 'var(--sunset-orange)';
    return '#ef4444';
  };

  return (
    <div className="quiz-card game-card">
      <div className="quiz-header">
        <div className="quiz-progress">
          <span className="quiz-number">Question {questionNumber}</span>
          <span className="quiz-total">of {totalQuestions}</span>
          <span className="quiz-total" style={{ marginLeft: 12 }}>| Level {level}</span>
        </div>
        <div className="quiz-timer" style={{ color: getTimeColor() }}>
          <Clock size={20} />
          <span>{timeLeft}s</span>
        </div>
      </div>

      <div className="quiz-question">
        <h3>{question}</h3>
      </div>

      <div className="quiz-options">
        {options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(option)}
            onClick={() => handleAnswer(option)}
            disabled={showResult}
          >
            <span className="option-letter">{String.fromCharCode(65 + index)}</span>
            <span className="option-text">{option}</span>
            {showResult && option === correctAnswer && (
              <CheckCircle size={20} className="option-icon correct-icon" />
            )}
            {showResult && option === selectedAnswer && option !== correctAnswer && (
              <XCircle size={20} className="option-icon incorrect-icon" />
            )}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`quiz-result ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="result-icon">
            {isCorrect ? <Trophy size={32} /> : <XCircle size={32} />}
          </div>
          <div className="result-text">
            <h4>{isCorrect ? 'Correct! 🎉' : 'Oops! Try Again'}</h4>
            <p>
              {isCorrect 
                ? 'Great job! You earned 10 eco-points!' 
                : `The correct answer was: ${correctAnswer}`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

