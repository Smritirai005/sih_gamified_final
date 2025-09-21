import { useState, useEffect } from 'react'
import { 
  Leaf, 
  TreePine, 
  Recycle, 
  Sun, 
  Droplets, 
  Wind, 
  Mountain, 
  Heart,
  Play,
  Users,
  Trophy,
  Star,
  LogOut,
  User,
  Gamepad2,
  Brain,
  Target,
  Zap,
  Award,
  Crown,
  Home,
  Clock,
  MessageCircle
} from 'lucide-react'
import { useAuth } from './contexts/AuthContext'
import AuthModal from './components/AuthModal'
import ProgressBar from './components/ProgressBar'
import Badge from './components/Badge'
import QuizCard from './components/QuizCard'
import Leaderboard from './components/Leaderboard'
import ScenicBackground from './components/ScenicBackground'
import Community from './components/Community'
import Dashboard from './components/Dashboard'
import PixelatedTree from './components/PixelatedTree'
import OfflineIndicator from './components/OfflineIndicator'
import QuizCompletion from './components/QuizCompletion'
import Chatbot from './components/Chatbot'
import './App.css'
import './components/GameComponents.css'
import './components/Community.css'
import './components/Chatbot.css'
import { listenToUserProfile, incrementProgressOnCorrect, finalizeQuiz } from './services/firestore'

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [userProgress, setUserProgress] = useState({
    level: 1,
    experience: 0,
    maxExperience: 1000,
    ecoPoints: 0,
    treesPlanted: 0,
    quizzesCompleted: 0,
    badgesEarned: 0
  })
  const [showQuiz, setShowQuiz] = useState(false)
  const [showQuizCompletion, setShowQuizCompletion] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizLevel, setQuizLevel] = useState(1)
  const { currentUser, logout } = useAuth()

  useEffect(() => {
    if (!currentUser) return;
    const unsub = listenToUserProfile(currentUser.uid, (profile) => {
      setUserProgress((prev) => ({
        ...prev,
        level: profile.level || 1,
        experience: profile.experience || 0,
        maxExperience: profile.maxExperience || 1000,
        ecoPoints: profile.ecoPoints || 0,
        treesPlanted: profile.treesPlanted || 0,
        quizzesCompleted: profile.quizzesCompleted || 0,
      }))
    })
    return () => unsub && unsub()
  }, [currentUser])

  // Sample quiz questions
  const quizQuestions = [
    {
      question: "What is the most effective way to reduce your carbon footprint?",
      options: ["Drive a car", "Use public transportation", "Fly frequently", "Leave lights on"],
      correctAnswer: "Use public transportation"
    },
    {
      question: "How long does it take for a plastic bottle to decompose?",
      options: ["1 year", "10 years", "450 years", "1000 years"],
      correctAnswer: "450 years"
    },
    {
      question: "Which of these is a renewable energy source?",
      options: ["Coal", "Natural gas", "Solar power", "Oil"],
      correctAnswer: "Solar power"
    },
    {
      question: "What percentage of Earth's water is freshwater?",
      options: ["3%", "25%", "50%", "75%"],
      correctAnswer: "3%"
    },
    {
      question: "Which activity saves the most water?",
      options: ["Taking long showers", "Washing dishes by hand", "Using a dishwasher", "Watering plants daily"],
      correctAnswer: "Using a dishwasher"
    }
  ]

  const ecoFeatures = [
    { 
      icon: <Target size={40} />, 
      title: "Pollutants Buster", 
      description: "Environmental Cleanup - Fight pollution and restore ecosystems",
      link: "https://yrzx7z.csb.app/"
    },
    { 
      icon: <Recycle size={40} />, 
      title: "Eco Crush", 
      description: "Recycling Challenge - Master the art of waste sorting and recycling",
      link: "https://eco-crush.vercel.app/"
    },
    { 
      icon: <Droplets size={40} />, 
      title: "Eco Learn", 
      description: "Water Conservation Game - Learn about water saving techniques",
      link: "https://eco-word-whiz.vercel.app/"
    },
    { 
      icon: <Wind size={40} />, 
      title: "EcoPuzzle", 
      description: "Clean Energy Puzzle - Solve puzzles while learning about renewable energy",
      link: "https://ecopuzzle-o2uw.vercel.app/"
    },
    { 
      icon: <Mountain size={40} />, 
      title: "Eco Escape", 
      description: "Adventure Quest - Escape environmental challenges in this thrilling adventure",
      link: "https://eco-escape-quest.vercel.app/"
    }
  ]

  const gameStats = [
    { number: userProgress.treesPlanted, label: "Trees Planted", icon: <TreePine size={24} />, progress: 12, max: 50 },
    { number: "850", label: "CO2 Saved (kg)", icon: <Wind size={24} />, progress: 850, max: 1000 },
    { number: "2,100", label: "Water Saved (L)", icon: <Droplets size={24} />, progress: 2100, max: 5000 },
    { number: userProgress.quizzesCompleted, label: "Quizzes Completed", icon: <Brain size={24} />, progress: 8, max: 20 }
  ]

  const userBadges = [
    { type: 'eco-warrior', title: 'Eco Warrior', description: 'Complete your first quiz', earned: true },
    { type: 'tree-planter', title: 'Tree Planter', description: 'Plant 10 virtual trees', earned: userProgress.treesPlanted >= 10 },
    { type: 'recycling-champ', title: 'Recycling Champ', description: 'Score 100% on recycling quiz', earned: false },
    { type: 'water-saver', title: 'Water Saver', description: 'Save 1000L of water', earned: false },
    { type: 'nature-lover', title: 'Nature Lover', description: 'Complete 5 environmental challenges', earned: userProgress.quizzesCompleted >= 5 },
    { type: 'eco-master', title: 'Eco Master', description: 'Reach level 10', earned: userProgress.level >= 10 }
  ]

  const handleQuizAnswer = (isCorrect, answer) => {
    if (isCorrect) {
      setQuizScore(prev => prev + 10)
      if (currentUser) {
        incrementProgressOnCorrect(currentUser.uid)
      } else {
        setUserProgress(prev => ({
          ...prev,
          ecoPoints: prev.ecoPoints + 10,
          experience: prev.experience + 10
        }))
      }
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        // Quiz completed - show completion screen
        setShowQuiz(false)
        setShowQuizCompletion(true)
        
        // Update user progress
        if (currentUser) {
          finalizeQuiz(currentUser.uid, { scoreIncrement: quizScore })
        } else {
          setUserProgress(prev => ({
            ...prev,
            quizzesCompleted: prev.quizzesCompleted + 1
          }))
        }
      }
    }, 2000)
  }

  const startQuiz = () => {
    setShowQuiz(true)
    setShowQuizCompletion(false)
    setCurrentQuestion(0)
    setQuizScore(0)
    // Level scales with quizzesCompleted for now
    setQuizLevel(Math.min(3, Math.floor((userProgress.quizzesCompleted || 0) / 3) + 1))
  }

  const handleQuizRestart = () => {
    setShowQuizCompletion(false)
    startQuiz()
  }

  const handleQuizNextLevel = () => {
    setShowQuizCompletion(false)
    setActiveSection('home')
  }

  return (
    <div className="app">
      {/* Scenic Background */}
      <ScenicBackground />
      <OfflineIndicator />
      
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <PixelatedTree size={32} />
            <h1>EcoGame</h1>
          </div>
          <nav className="nav">
            <button 
              className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => setActiveSection('home')}
            >
              <Home size={18} />
              Home
            </button>
            <button 
              className={`nav-btn ${activeSection === 'games' ? 'active' : ''}`}
              onClick={() => setActiveSection('games')}
            >
              <Gamepad2 size={18} />
              Games
            </button>
            <button 
              className={`nav-btn ${activeSection === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveSection('quiz')}
            >
              <Brain size={18} />
              Quiz
            </button>
            <button 
              className={`nav-btn ${activeSection === 'leaderboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('leaderboard')}
            >
              <Trophy size={18} />
              Leaderboard
            </button>
            <button 
              className={`nav-btn ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              <User size={18} />
              Dashboard
            </button>
            <button 
              className={`nav-btn ${activeSection === 'community' ? 'active' : ''}`}
              onClick={() => setActiveSection('community')}
            >
              <Users size={18} />
              Community
            </button>
            <button 
              className="nav-btn chatbot-btn"
              onClick={() => setShowChatbot(true)}
              title="Eco Assistant"
            >
              <MessageCircle size={18} />
              AI Assistant
            </button>
            {currentUser ? (
              <div className="user-menu">
                <div className="user-info">
                  <div className="user-avatar alt" title={currentUser.email}>
                    {currentUser.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="user-level">
                    <Crown size={16} />
                  </div>
                </div>
                <button className="auth-btn" onClick={logout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <button className="auth-btn" onClick={() => setShowAuthModal(true)}>
                Login
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {activeSection === 'home' && (
          <>
            {/* Hero Section */}
            <section className="hero">
              <div className="hero-content">
                <div className="hero-text">
                  <h1>EcoGame - Environmental Survival</h1>
                  <p className="hero-description">
                    Master environmental challenges in this pixelated world. 
                    Build sustainable ecosystems, complete quests, and compete with other players. 
                    Every action impacts the virtual environment. Level up your eco-skills and become the ultimate environmental champion.
                  </p>
                  <div className="hero-buttons">
                    <button className="primary-btn" onClick={() => setActiveSection('games')}>
                      <Play size={16} />
                      Start Game
                    </button>
                    <button className="secondary-btn" onClick={() => setActiveSection('quiz')}>
                      <Brain size={16} />
                      Take Quiz
                    </button>
                  </div>
                </div>
                <div className="hero-visual">
                  {/* Pixel backdrop is now handled by ScenicBackground component */}
                </div>
              </div>
            </section>

            {/* User Progress Section */}
            {currentUser && (
              <section className="progress-section">
                <div className="section-header">
                  <h2>Your Eco Journey</h2>
                  <p>Track your progress and earn badges!</p>
                </div>
                <div className="progress-dashboard">
                  <div className="level-card game-card">
                    <div className="level-info">
                      <Crown size={32} className="eco-icon" />
      <div>
                        <h3>Level {userProgress.level}</h3>
                        <p>Eco Warrior</p>
                      </div>
                    </div>
                    <ProgressBar 
                      current={userProgress.experience} 
                      max={userProgress.maxExperience} 
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
                        <ProgressBar 
                          current={stat.progress} 
                          max={stat.max} 
                          label="" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Features Section */}
            <section className="features-section">
              <div className="section-header">
                <h2>Environmental Games & Activities</h2>
                <p>Learn about the environment through fun, interactive games!</p>
              </div>
              <div className="features-grid">
                {ecoFeatures.map((feature, index) => (
                  <div key={index} className="feature-card game-card bounce-in">
                    <div className="feature-icon eco-icon">
                      {feature.icon}
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                    <button 
                      className="feature-btn"
                      onClick={() => {
                        if (feature.link) {
                          try {
                            // For CodeSandbox links, try to handle the manifest issue
                            if (feature.link.includes('csb.app')) {
                              // Open in same tab to avoid manifest issues
                              window.location.href = feature.link;
                            } else {
                              window.open(feature.link, '_blank');
                            }
                          } catch (error) {
                            console.error('Error opening game:', error);
                            alert('Unable to open game. Please try again.');
                          }
                        } else {
                          alert('Game coming soon!');
                        }
                      }}
                    >
                      <Play size={16} />
                      Play Now
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Badges Section */}
            {currentUser && (
              <section className="badges-section">
                <div className="section-header">
                  <h2>Your Achievements</h2>
                  <p>Collect badges by completing environmental challenges!</p>
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
              </section>
            )}
          </>
        )}

        {activeSection === 'quiz' && (
          <section className="quiz-section">
            <div className="section-header">
              <h2>Environmental Knowledge Quiz</h2>
              <p>Test your eco-knowledge and earn points!</p>
            </div>
            {showQuizCompletion ? (
              <QuizCompletion
                score={quizScore / 10}
                totalQuestions={quizQuestions.length}
                level={quizLevel}
                onRestart={handleQuizRestart}
                onNextLevel={handleQuizNextLevel}
                userProgress={userProgress}
              />
            ) : showQuiz ? (
              <QuizCard
                question={quizQuestions[currentQuestion].question}
                options={quizQuestions[currentQuestion].options}
                correctAnswer={quizQuestions[currentQuestion].correctAnswer}
                onAnswer={handleQuizAnswer}
                questionNumber={currentQuestion + 1}
                totalQuestions={quizQuestions.length}
                level={quizLevel}
              />
            ) : (
              <div className="quiz-start game-card">
                <Brain size={64} className="eco-icon" />
                <h3>Ready to Test Your Eco Knowledge?</h3>
                <p>Answer {quizQuestions.length} questions about the environment and earn eco-points!</p>
                <div className="quiz-info">
                  <div className="info-item">
                    <Target size={20} />
                    <span>{quizQuestions.length} Questions</span>
                  </div>
                  <div className="info-item">
                    <Zap size={20} />
                    <span>10 Points per Correct Answer</span>
                  </div>
                  <div className="info-item">
                    <Clock size={20} />
                    <span>30 Seconds per Question</span>
                  </div>
                </div>
                <button className="primary-btn large" onClick={startQuiz}>
                  <Play size={20} />
                  Start Quiz
                </button>
              </div>
            )}
          </section>
        )}

        {activeSection === 'leaderboard' && (
          <section className="leaderboard-section">
            <Leaderboard currentUser={currentUser} />
          </section>
        )}

        {activeSection === 'dashboard' && (
          <Dashboard />
        )}

        {activeSection === 'community' && (
          <Community />
        )}

        {activeSection === 'games' && (
          <section className="games-section">
            <div className="section-header">
              <h2>Environmental Games</h2>
              <p>Play fun games while learning about the environment!</p>
            </div>
            <div className="games-grid">
              {ecoFeatures.map((game, index) => (
                <div key={index} className="game-card-large game-card">
                  <div className="game-header">
                    <div className="game-icon eco-icon">
                      {game.icon}
                    </div>
                    <div className="game-info">
                      <h3>{game.title}</h3>
                      <p>{game.description}</p>
                    </div>
      </div>
                  <div className="game-actions">
                    <button 
                      className="primary-btn"
                      onClick={() => {
                        if (game.link) {
                          try {
                            // For CodeSandbox links, try to handle the manifest issue
                            if (game.link.includes('csb.app')) {
                              // Open in same tab to avoid manifest issues
                              window.location.href = game.link;
                            } else {
                              window.open(game.link, '_blank');
                            }
                          } catch (error) {
                            console.error('Error opening game:', error);
                            alert('Unable to open game. Please try again.');
                          }
                        } else {
                          alert('Game coming soon!');
                        }
                      }}
                    >
                      <Play size={20} />
                      Play Game
                    </button>
                    <div className="game-stats">
                      <span>⭐ 4.8/5</span>
                      <span>👥 1.2k players</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Leaf className="eco-icon" size={24} />
            <span>EcoGame</span>
          </div>
          <p>&copy; 2024 EcoGame. Making the world greener, one game at a time.</p>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* Chatbot Modal */}
      <Chatbot 
        isOpen={showChatbot} 
        onClose={() => setShowChatbot(false)}
        userProgress={userProgress}
      />
      </div>
  )
}

export default App
