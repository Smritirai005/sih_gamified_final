import { useState } from 'react';
import { 
  Users, 
  Plus, 
  MessageCircle, 
  Settings, 
  Crown, 
  Shield,
  Hash,
  Mic,
  MicOff,
  Headphones,
  VolumeX
} from 'lucide-react';

const Community = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, user: 'EcoWarrior123', message: 'Just completed the recycling challenge! 🌱', time: '2:30 PM', avatar: '🦋' },
    { id: 2, user: 'GreenThumb', message: 'Anyone want to join our tree planting event this weekend?', time: '2:32 PM', avatar: '🌳' },
    { id: 3, user: 'OceanGuardian', message: 'The ocean cleanup was amazing! We collected 50kg of plastic', time: '2:35 PM', avatar: '🐠' },
    { id: 4, user: 'ClimateHero', message: 'Check out this new documentary about renewable energy', time: '2:40 PM', avatar: '⚡' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const groups = [
    { id: 'general', name: 'General', icon: '🌍', members: 1247, online: 89 },
    { id: 'recycling', name: 'Recycling Heroes', icon: '♻️', members: 456, online: 23 },
    { id: 'gardening', name: 'Garden Masters', icon: '🌱', members: 789, online: 45 },
    { id: 'ocean', name: 'Ocean Guardians', icon: '🌊', members: 234, online: 12 },
    { id: 'energy', name: 'Clean Energy', icon: '⚡', members: 345, online: 18 },
    { id: 'wildlife', name: 'Wildlife Protection', icon: '🦋', members: 567, online: 34 }
  ];

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      // In a real app, this would create a new group
      console.log('Creating group:', newGroupName, newGroupDescription);
      setShowCreateGroup(false);
      setNewGroupName('');
      setNewGroupDescription('');
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '🌱'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="community-section">
      <div className="community-header">
        <h2>Community Hub</h2>
        <p>Connect with fellow environmental enthusiasts!</p>
      </div>

      <div className="community-layout">
        {/* Sidebar with groups */}
        <div className="groups-sidebar">
          <div className="sidebar-header">
            <h3>Groups</h3>
            <button 
              className="create-group-btn"
              onClick={() => setShowCreateGroup(true)}
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="groups-list">
            {groups.map(group => (
              <div 
                key={group.id}
                className={`group-item ${activeChannel === group.id ? 'active' : ''}`}
                onClick={() => setActiveChannel(group.id)}
              >
                <div className="group-icon">{group.icon}</div>
                <div className="group-info">
                  <div className="group-name">{group.name}</div>
                  <div className="group-stats">
                    <span className="online">{group.online} online</span>
                    <span className="members">{group.members} members</span>
                  </div>
                </div>
                {group.id === 'general' && <Crown size={14} className="crown-icon" />}
              </div>
            ))}
          </div>
        </div>

        {/* Main chat area */}
        <div className="chat-area">
          <div className="chat-header">
            <div className="channel-info">
              <Hash size={20} />
              <span>{groups.find(g => g.id === activeChannel)?.name}</span>
            </div>
            <div className="chat-controls">
              <button className="control-btn">
                <Mic size={16} />
              </button>
              <button className="control-btn">
                <Headphones size={16} />
              </button>
              <button className="control-btn">
                <Settings size={16} />
              </button>
            </div>
          </div>

          <div className="messages-container">
            {messages.map(message => (
              <div key={message.id} className="message">
                <div className="message-avatar">{message.avatar}</div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-user">{message.user}</span>
                    <span className="message-time">{message.time}</span>
                  </div>
                  <div className="message-text">{message.message}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="message-input">
            <input
              type="text"
              placeholder={`Message #${groups.find(g => g.id === activeChannel)?.name}`}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="send-btn">
              <MessageCircle size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="modal-overlay">
          <div className="create-group-modal">
            <h3>Create New Group</h3>
            <div className="form-group">
              <label>Group Name</label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                placeholder="Describe your group's purpose"
                rows={3}
              />
            </div>
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowCreateGroup(false)}
              >
                Cancel
              </button>
              <button 
                className="create-btn"
                onClick={handleCreateGroup}
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;
