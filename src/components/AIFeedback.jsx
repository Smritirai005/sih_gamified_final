import React from 'react';
import './AIFeedback.css';

const AIFeedback = ({ analysisData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="ai-feedback-container loading">
        <div className="ai-feedback-loading">
          <div className="spinner"></div>
          <p>AI is analyzing your results...</p>
        </div>
      </div>
    );
  }

  // Default data if analysisData is missing or incomplete
  const defaultData = {
    analysis: "Your performance shows a good understanding of the topic. Keep practicing to improve further!",
    feedback: "Focus on understanding the core concepts and applying them to real-world scenarios.",
    strengths: ["Good basic knowledge", "Willingness to learn"],
    weaknesses: ["Need more practice with complex concepts", "Could benefit from additional study materials"],
    resources: [
      {
        title: "Environmental Science Basics",
        description: "A comprehensive guide to environmental science fundamentals",
        url: "https://www.nationalgeographic.org/encyclopedia/environmental-science/",
        type: "documentation"
      },
      {
        title: "Understanding Sustainability",
        description: "Learn about sustainable practices and their importance",
        url: "https://www.youtube.com/watch?v=_5r4loXPyx8",
        type: "video"
      }
    ]
  };

  // Use provided data or fallback to defaults
  const data = analysisData || defaultData;
  const { 
    analysis = defaultData.analysis, 
    feedback = defaultData.feedback, 
    strengths = defaultData.strengths, 
    weaknesses = defaultData.weaknesses, 
    resources = defaultData.resources 
  } = data;

  // Calculate some analytical stats for display
  const calculateStats = () => {
    // These would normally come from actual quiz data
    // For now we'll use mock data
    return {
      score: Math.floor(Math.random() * 41) + 60, // Score between 60-100
      timeSpent: Math.floor(Math.random() * 10) + 5, // 5-15 minutes
      accuracy: Math.floor(Math.random() * 31) + 70, // 70-100%
      completionRate: 100 // Always 100% for completed quizzes
    };
  };

  const stats = calculateStats();

  return (
    <div className="ai-feedback-container">
      <div className="ai-feedback-header">
        <h2>AI Analysis & Feedback</h2>
        <p className="ai-feedback-subtitle">Personalized insights to help you improve</p>
      </div>
      
      <div className="ai-stats-grid">
        <div className="ai-stat-card">
          <div className="stat-label">Score</div>
          <div className="stat-value">{stats.score}%</div>
          <div className="stat-subtext">Overall Performance</div>
        </div>
        <div className="ai-stat-card">
          <div className="stat-label">Time</div>
          <div className="stat-value">{stats.timeSpent}m</div>
          <div className="stat-subtext">Quiz Duration</div>
        </div>
        <div className="ai-stat-card">
          <div className="stat-label">Accuracy</div>
          <div className="stat-value">{stats.accuracy}%</div>
          <div className="stat-subtext">Correct Answers</div>
        </div>
        <div className="ai-stat-card">
          <div className="stat-label">Completion</div>
          <div className="stat-value">{stats.completionRate}%</div>
          <div className="stat-subtext">Questions Answered</div>
        </div>
      </div>
      
      <div className="ai-feedback-section analysis-section">
        <div className="section-header">
          <span className="section-icon">📊</span>
          <h3>Performance Analysis</h3>
        </div>
        <p>{analysis}</p>
      </div>
      
      <div className="ai-feedback-section feedback-section">
        <div className="section-header">
          <span className="section-icon">💡</span>
          <h3>Personalized Feedback</h3>
        </div>
        <p>{feedback}</p>
      </div>
      
      <div className="ai-feedback-columns">
        <div className="ai-feedback-column strengths-column">
          <div className="section-header">
            <span className="section-icon">✅</span>
            <h3>Strengths</h3>
          </div>
          <ul className="strengths-list">
            {strengths.map((strength, index) => (
              <li key={`strength-${index}`}>{strength}</li>
            ))}
          </ul>
        </div>
        
        <div className="ai-feedback-column improve-column">
          <div className="section-header">
            <span className="section-icon">🔍</span>
            <h3>Areas to Improve</h3>
          </div>
          <ul className="improve-list">
            {weaknesses.map((weakness, index) => (
              <li key={`weakness-${index}`}>{weakness}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="ai-feedback-section resources-section">
        <div className="section-header">
          <span className="section-icon">📚</span>
          <h3>Recommended Resources</h3>
        </div>
        <div className="ai-resources-list">
          {resources.map((resource, index) => (
            <div className="ai-resource-card" key={`resource-${index}`}>
              <div className="ai-resource-type">
                {resource.type === 'video' ? (
                  <span className="resource-icon video">📹</span>
                ) : (
                  <span className="resource-icon doc">📄</span>
                )}
              </div>
              <div className="ai-resource-content">
                <h4>{resource.title}</h4>
                <p>{resource.description}</p>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  {resource.type === 'video' ? 'Watch Video' : 'View Documentation'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIFeedback;