import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Bot } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import './EcoBuddy.css';

const SYSTEM_INSTRUCTION = `Your name is EcoBuddy 🌱 and you are a friendly, engaging, and educational AI assistant for a gamified environmental learning website for schools and colleges. You are represented as a fun avatar.
Your main role is to help users understand the website, its features, and all environmental topics. Always personalize responses using the user's name when available.

Website Features You Must Explain:
- Quizzes: Users earn Eco Points by answering questions.
- Achievements: Users earn badges for milestones.
- Games:
  - Eco Escape Quest: 5 rooms, earn Eco Points by solving tasks and extra uploads.
  - Eco Climbers: Snake and ladder–style game, earn Eco Points per level.
  - Eco Learn: 5 environmental modules (climate change, renewable energy, biodiversity, etc.), gain points by solving crossword puzzles.
  - Eco Crossword: Solve jigsaw puzzles to earn points.
  - Pollution Burster: Clash-of-Clans–style game, burst solutions for Eco Points.
  - Eco Crush: Candy-Crush–style game with 8 levels, earn Eco Points by sorting biodegradable (green bin) and non-biodegradable (blue bin) waste.

Environmental Topics You Must Cover:
- Environment Basics: Ecosystems, biodiversity, climate, natural resources.
- Pollution: Air, water, soil, noise, light pollution; causes, effects, solutions.
- Waste Management: Reduce, reuse, recycle, composting, e-waste, hazardous waste.
- Energy: Renewable (solar, wind, hydro, geothermal) and non-renewable (coal, oil, gas), energy conservation, carbon footprint.
- Water & Air Conservation: Importance, pollution, conservation methods.
- Wildlife & Nature Protection: Endangered species, forests, oceans, sustainable practices.
- Sustainability & Climate Change: Global warming, greenhouse gases, eco-friendly lifestyle tips.
- Fun Facts & Mini-Quizzes: True/false questions, riddles, tips for engagement.
- Daily Eco Challenges: Suggest actionable eco-friendly steps for users.

Rules & Behavior:
- Only answer questions related to the website, its features, or environmental topics. If asked unrelated questions, respond with only this message: "I'm here to help with the website and environmental topics only!"
- Keep answers friendly, simple, and engaging for students.
- Use emojis 🌱♻️🌍 when appropriate.
- Give short, crisp, informative, and insightful answers.
- Give answers in points. Do not use markdown like "**".
- Encourage exploration, learning, and participation in games, quizzes, and challenges.
- Give concise but detailed explanations with examples, numbers, or interesting facts when possible.
- Provide practical advice and hints if the user struggles.
- End conversations with a motivational, eco-positive message like: "Every small step makes a big difference! 🌍✨".`;

function EcoBuddy() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState(null);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat when component mounts
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBoieYApqFhuSGrmTeAcUumacQm63T6OoQ' });
        const chatInstance = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });
        setChat(chatInstance);
        
        // Add welcome message
        setMessages([{
          id: 1,
          sender: 'model',
          text: "Hi! I'm EcoBuddy 🌱. Ask me anything about our website or environmental topics. Let's make learning fun! 🌍",
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error("Failed to initialize the AI model.", error);
        setMessages([{
          id: 1,
          sender: 'model',
          text: "Oops! I'm having trouble connecting right now. Please try again later.",
          timestamp: new Date()
        }]);
      }
    };

    initializeChat();
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !chat) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    const botMessage = {
      id: Date.now() + 1,
      sender: 'model',
      text: '',
      timestamp: new Date(),
      isStreaming: true
    };

    setMessages(prev => [...prev, botMessage]);

    try {
      const responseStream = await chat.sendMessageStream({ message: inputMessage.trim() });
      
      let fullResponse = '';
      let firstChunk = true;
      
      for await (const chunk of responseStream) {
        const chunkText = chunk.text;
        fullResponse += chunkText;
        
        setMessages(prev => prev.map(msg => 
          msg.id === botMessage.id 
            ? { ...msg, text: fullResponse }
            : msg
        ));
        
        if (firstChunk) {
          firstChunk = false;
        }
      }

      // Mark streaming as complete
      setMessages(prev => prev.map(msg => 
        msg.id === botMessage.id 
          ? { ...msg, isStreaming: false }
          : msg
      ));

    } catch (error) {
      console.error('Error sending message:', error);
      console.error('Error details:', error.message);
      
      // Remove the streaming message and add error message
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== botMessage?.id);
        return [...filtered, {
          id: Date.now() + 1,
          sender: 'model',
          text: "Sorry, something went wrong. I couldn't get a response. Please try again!",
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button 
          className="ecobuddy-toggle-btn"
          onClick={() => setIsOpen(true)}
          title="Chat with EcoBuddy"
        >
          <MessageCircle size={24} />
          <span className="ecobuddy-pulse"></span>
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="ecobuddy-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="ecobuddy-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="ecobuddy-header">
              <img 
                src="https://em-content.zobj.net/source/samsung/380/seedling_1f331.png" 
                alt="EcoBuddy Avatar" 
                className="ecobuddy-avatar-img" 
              />
              <div className="ecobuddy-title">
                <h3>EcoBuddy 🌱</h3>
                <p>Your friendly guide to a greener world!</p>
              </div>
              <button 
                className="ecobuddy-close"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="ecobuddy-messages" ref={chatRef}>
              {messages.map((message) => (
                <div key={message.id} className={`ecobuddy-message ${message.sender}-message`}>
                  <div className="ecobuddy-text">
                    {message.text.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                    {message.isStreaming && <span className="ecobuddy-cursor">|</span>}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="ecobuddy-input-container">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask EcoBuddy a question..."
                className="ecobuddy-input"
                disabled={isLoading}
                rows={1}
              />
              <button 
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="ecobuddy-send-btn"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EcoBuddy;
