import { useState, useEffect } from 'react';
import { Brain, Play, Target, Clock, Zap, ArrowLeft, RefreshCw, BookOpen } from 'lucide-react';
import QuizCard from './QuizCard';
import QuizCompletion from './QuizCompletion';
import aiService from '../services/aiService';
import { useAuth } from '../contexts/AuthContext';
import { incrementProgressOnCorrect, finalizeQuiz } from '../services/firestore';

export default function EnhancedQuiz() {
  const [quizState, setQuizState] = useState('topic-selection'); // 'topic-selection', 'quiz', 'completion'
  const [selectedTopic, setSelectedTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizResults, setQuizResults] = useState([]);
  
  const { currentUser } = useAuth();
  const availableTopics = aiService.getAvailableTopics();

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setQuizState('quiz');
    generateQuestions(topic, difficulty, questionCount);
  };

  const generateQuestions = async (topic, difficulty, count) => {
    setLoading(true);
    setError('');
    
    try {
      const generatedQuestions = await aiService.generateQuizQuestions(topic, difficulty, count);
      setQuestions(generatedQuestions);
      setCurrentQuestion(0);
      setQuizScore(0);
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
      console.error('Error generating questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizAnswer = (isCorrect, answer) => {
    // Track the result for this question
    const currentQ = questions[currentQuestion];
    setQuizResults(prev => [...prev, {
      question: currentQ.question,
      userAnswer: answer,
      correctAnswer: currentQ.correctAnswer,
      isCorrect: isCorrect,
      explanation: currentQ.explanation
    }]);
    
    if (isCorrect) {
      setQuizScore(prev => prev + 10);
      if (currentUser) {
        incrementProgressOnCorrect(currentUser.uid);
      }
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        // Quiz completed
        setQuizState('completion');
        
        // Update user progress
        if (currentUser) {
          finalizeQuiz(currentUser.uid, { scoreIncrement: quizScore });
        }
      }
    }, 2000);
  };

  const handleRestart = () => {
    setQuizState('topic-selection');
    setSelectedTopic('');
    setQuestions([]);
    setCurrentQuestion(0);
    setQuizScore(0);
    setQuizResults([]);
    setError('');
  };

  const handleNewQuiz = () => {
    setQuizState('topic-selection');
    setSelectedTopic('');
    setQuestions([]);
    setCurrentQuestion(0);
    setQuizScore(0);
    setQuizResults([]);
    setError('');
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#FF9800';
    }
  };

  if (quizState === 'topic-selection') {
    return (
      <section className="quiz-section">
        <div className="section-header">
          <h2>Environmental Knowledge Quiz</h2>
          <p>Choose a topic and test your eco-knowledge with AI-generated questions!</p>
        </div>

        <div className="quiz-setup game-card">
          <div className="quiz-setup-header">
            <Brain size={48} className="eco-icon" />
            <h3>Quiz Configuration</h3>
            <p>Select your preferred topic and settings</p>
          </div>

          <div className="quiz-options">
            <div className="quiz-option-group">
              <label className="quiz-label">
                <BookOpen size={20} />
                Topic
              </label>
              <select 
                value={selectedTopic} 
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="quiz-select"
              >
                <option value="">Select a topic...</option>
                {availableTopics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            <div className="quiz-option-group">
              <label className="quiz-label">
                <Target size={20} />
                Difficulty
              </label>
              <div className="difficulty-buttons">
                {['easy', 'medium', 'hard'].map(level => (
                  <button
                    key={level}
                    className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
                    onClick={() => setDifficulty(level)}
                    style={{ 
                      borderColor: getDifficultyColor(level),
                      backgroundColor: difficulty === level ? getDifficultyColor(level) : 'transparent'
                    }}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="quiz-option-group">
              <label className="quiz-label">
                <Clock size={20} />
                Number of Questions
              </label>
              <select 
                value={questionCount} 
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="quiz-select"
              >
                <option value={3}>3 Questions</option>
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
              </select>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="quiz-info">
            <div className="info-item">
              <Target size={20} />
              <span>{questionCount} Questions</span>
            </div>
            <div className="info-item">
              <Zap size={20} />
              <span>10 Points per Correct Answer</span>
            </div>
            <div className="info-item">
              <Clock size={20} />
              <span>20 Seconds per Question</span>
            </div>
          </div>

          <button 
            className="primary-btn large" 
            onClick={() => handleTopicSelect(selectedTopic)}
            disabled={!selectedTopic || loading}
          >
            {loading ? (
              <>
                <RefreshCw size={20} className="spinning" />
                Generating Questions...
              </>
            ) : (
              <>
                <Play size={20} />
                Start Quiz
              </>
            )}
          </button>
        </div>
      </section>
    );
  }

  if (quizState === 'quiz') {
    if (loading) {
      return (
        <section className="quiz-section">
          <div className="quiz-loading game-card">
            <RefreshCw size={64} className="eco-icon spinning" />
            <h3>Generating Questions...</h3>
            <p>Creating personalized quiz questions for you!</p>
          </div>
        </section>
      );
    }

    if (questions.length === 0) {
      return (
        <section className="quiz-section">
          <div className="quiz-error game-card">
            <Brain size={64} className="eco-icon" />
            <h3>No Questions Available</h3>
            <p>Failed to generate questions. Please try again.</p>
            <button className="primary-btn" onClick={handleRestart}>
              <ArrowLeft size={20} />
              Back to Topic Selection
            </button>
          </div>
        </section>
      );
    }

    return (
      <section className="quiz-section">
        <div className="quiz-header-info">
          <button className="back-btn" onClick={handleRestart}>
            <ArrowLeft size={20} />
            Back
          </button>
          <div className="quiz-meta">
            <span className="quiz-topic">{selectedTopic}</span>
            <span className="quiz-difficulty" style={{ color: getDifficultyColor(difficulty) }}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
        </div>

        <QuizCard
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          correctAnswer={questions[currentQuestion].correctAnswer}
          onAnswer={handleQuizAnswer}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          level={difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3}
          timeLimit={20}
        />
      </section>
    );
  }

  if (quizState === 'completion') {
    return (
      <QuizCompletion
        score={quizScore / 10}
        totalQuestions={questions.length}
        level={difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3}
        onRestart={handleNewQuiz}
        onNextLevel={() => setQuizState('topic-selection')}
        userProgress={{ ecoPoints: quizScore, quizzesCompleted: 1 }}
        quizResults={quizResults}
        quizTopic={selectedTopic}
      />
    );
  }

  return null;
}
