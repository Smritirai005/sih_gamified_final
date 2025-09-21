import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Leaf, TreePine, Recycle, Droplets, Wind, Sun } from 'lucide-react';
import './Chatbot.css';

const Chatbot = ({ isOpen, onClose, userProgress }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Eco Assistant 🌱. I can help you with environmental tips, quiz preparation, and eco-friendly advice. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getEcoIcon = (topic) => {
    const icons = {
      'tree': <TreePine size={20} />,
      'water': <Droplets size={20} />,
      'energy': <Sun size={20} />,
      'recycle': <Recycle size={20} />,
      'wind': <Wind size={20} />,
      'general': <Leaf size={20} />
    };
    return icons[topic] || icons.general;
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Environmental tips based on user progress
    if (message.includes('tip') || message.includes('advice') || message.includes('help')) {
      const tips = [
        "💡 Try using a reusable water bottle instead of plastic ones - it can save hundreds of bottles per year!",
        "🌱 Plant native flowers in your garden to support local pollinators and biodiversity.",
        "⚡ Unplug electronics when not in use - they still consume energy even when turned off!",
        "🚲 Consider biking or walking for short trips instead of driving - great for your health and the planet!",
        "♻️ Start a compost bin for food scraps - it reduces waste and creates nutrient-rich soil for plants.",
        "🌊 Take shorter showers to conserve water - every minute counts!",
        "🛒 Bring reusable bags when shopping to reduce plastic waste.",
        "🌞 Open curtains during the day to use natural light instead of turning on lights."
      ];
      return tips[Math.floor(Math.random() * tips.length)];
    }

    // Quiz-related responses
    if (message.includes('quiz') || message.includes('test') || message.includes('question')) {
      return `🧠 Great! I see you've completed ${userProgress?.quizzesCompleted || 0} quizzes. Here are some study tips:
      
• Review environmental science basics
• Learn about renewable energy sources
• Study water conservation methods
• Understand recycling processes
• Practice with sample questions

Ready to test your knowledge? Head to the Quiz section!`;
    }

    // Progress-related responses
    if (message.includes('progress') || message.includes('level') || message.includes('achievement')) {
      return `📊 Your Eco Journey Progress:
      
🏆 Level: ${userProgress?.level || 1}
🌳 Trees Planted: ${userProgress?.treesPlanted || 0}
🧠 Quizzes Completed: ${userProgress?.quizzesCompleted || 0}
⭐ Eco Points: ${userProgress?.ecoPoints || 0}

Keep up the great work! Every small action makes a difference! 🌍`;
    }

    // Specific environmental topics
    if (message.includes('climate') || message.includes('global warming')) {
      return `🌍 Climate change is one of our biggest challenges! Here's how you can help:
      
• Reduce your carbon footprint by using public transport
• Support renewable energy sources
• Eat more plant-based meals
• Reduce, reuse, and recycle
• Plant trees and support reforestation efforts
• Educate others about climate action

Remember: Small actions by many people create big change! 💪`;
    }

    if (message.includes('pollution') || message.includes('air quality')) {
      return `🌬️ Air pollution affects everyone! Here are ways to help:
      
• Use public transportation or carpool
• Support clean energy initiatives
• Plant trees and maintain green spaces
• Reduce energy consumption at home
• Support policies that reduce emissions
• Choose eco-friendly products

Clean air is essential for our health and the planet! 🌱`;
    }

    if (message.includes('water') || message.includes('conservation')) {
      return `💧 Water is precious! Here are conservation tips:
      
• Fix leaks immediately
• Take shorter showers
• Use a rain barrel for gardening
• Water plants in the morning or evening
• Use a dishwasher instead of hand washing
• Choose drought-resistant plants
• Turn off the tap while brushing teeth

Every drop counts! 🌊`;
    }

    if (message.includes('recycle') || message.includes('waste')) {
      return `♻️ Recycling is important, but reducing waste is even better!
      
• Follow the 3 R's: Reduce, Reuse, Recycle
• Learn your local recycling rules
• Compost organic waste
• Buy products with minimal packaging
• Repair items instead of replacing them
• Donate items you no longer need
• Choose reusable over disposable

Let's work towards zero waste! 🎯`;
    }

    // Energy-related responses
    if (message.includes('energy') || message.includes('electricity') || message.includes('power')) {
      return `⚡ Energy conservation saves money and the planet!
      
• Use LED light bulbs
• Unplug devices when not in use
• Set your thermostat efficiently
• Use natural light when possible
• Support renewable energy
• Insulate your home properly
• Choose energy-efficient appliances

Clean energy is the future! 🌞`;
    }

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `Hello! 👋 I'm here to help you on your environmental journey! 

I can provide tips on:
🌱 Sustainable living
🧠 Quiz preparation
📊 Progress tracking
🌍 Climate action
♻️ Waste reduction
💧 Water conservation
⚡ Energy efficiency

What would you like to learn about today?`;
    }

    // Default response
    const defaultResponses = [
      "That's interesting! Can you tell me more about what specific environmental topic you'd like to explore?",
      "I'd love to help! Are you looking for tips on sustainable living, quiz preparation, or something else?",
      "Great question! I can help with environmental advice, study tips, or information about your eco progress.",
      "I'm here to help with all things environmental! What specific area interests you most?",
      "Let's explore that together! I can provide tips on reducing your environmental impact or help with quiz topics."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-container">
        <div className="chatbot-header">
          <div className="chatbot-title">
            <Bot size={24} className="bot-icon" />
            <div>
              <h3>Eco Assistant</h3>
              <p>Your environmental guide</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-avatar">
                {message.sender === 'bot' ? (
                  <Bot size={20} className="bot-avatar" />
                ) : (
                  <User size={20} className="user-avatar" />
                )}
              </div>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">
                <Bot size={20} className="bot-avatar" />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input">
          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about environmental tips, quiz help, or your progress..."
              className="message-input"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="send-btn"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
