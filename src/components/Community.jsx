import { useEffect, useState } from 'react';
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
import { useAuth } from '../contexts/AuthContext';
import { listenToGroups, createGroup, listenToMessages, sendMessage, deleteGroup } from '../services/firestore';

const Community = () => {
  const [activeChannel, setActiveChannel] = useState(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [groups, setGroups] = useState([]);
  const { currentUser } = useAuth();

  // Temporarily disabled Firestore listeners to fix loading
  // useEffect(() => {
  //   const unsub = listenToGroups((g) => {
  //     setGroups(g);
  //     if (!activeChannel && g.length > 0) setActiveChannel(g[0].id);
  //   });
  //   return () => unsub && unsub();
  // }, []);

  // Temporarily disabled Firestore listeners to fix loading
  // useEffect(() => {
  //   if (!activeChannel) return;
  //   const unsub = listenToMessages(activeChannel, (msgs) => {
  //     setMessages(msgs);
  //   });
  //   return () => unsub && unsub();
  // }, [activeChannel]);

  const handleCreateGroup = async () => {
    if (!currentUser) {
      alert('Please login to create a group');
      return;
    }
    const name = newGroupName.trim();
    if (!name) {
      alert('Please enter a group name');
      return;
    }
    try {
      const id = await createGroup({ name, description: newGroupDescription.trim(), ownerUid: currentUser.uid });
      setShowCreateGroup(false);
      setNewGroupName('');
      setNewGroupDescription('');
      setActiveChannel(id);
    } catch (e) {
      console.error('Failed to create group', e);
      alert('Failed to create group. Please try again.');
    }
  };

  const handleSendMessage = async () => {
    if (!currentUser || !activeChannel) return;
    if (newMessage.trim()) {
      await sendMessage({
        groupId: activeChannel,
        uid: currentUser.uid,
        user: currentUser.email,
        avatar: '🌱',
        text: newMessage.trim(),
      });
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
              <span>{groups.find(g => g.id === activeChannel)?.name || '...'}</span>
            </div>
            <div className="chat-controls">
              <button className="control-btn">
                <Mic size={16} />
              </button>
              <button className="control-btn">
                <Headphones size={16} />
              </button>
              {activeChannel && (
                <>
                  <button
                    className="control-btn"
                    title="Invite friends"
                    onClick={() => {
                      const invite = `${window.location.origin}?group=${activeChannel}`;
                      navigator.clipboard.writeText(invite);
                      alert('Invite link copied to clipboard!');
                    }}
                  >
                    Invite
                  </button>
                  {currentUser && groups.find(g => g.id === activeChannel)?.ownerUid === currentUser.uid && (
                    <button
                      className="control-btn"
                      title="Delete group"
                      onClick={async () => {
                        if (confirm('Delete this group? This cannot be undone.')) {
                          await deleteGroup(activeChannel);
                          setActiveChannel(null);
                        }
                      }}
                    >
                      Delete
                    </button>
                  )}
                </>
              )}
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
                    {/* createdAt is serverTimestamp; show HH:MM if available */}
                    <span className="message-time">{message.createdAt?.toDate ? message.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                  </div>
                  <div className="message-text">{message.message}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="message-input">
            <input
              type="text"
              placeholder={`Message #${groups.find(g => g.id === activeChannel)?.name || ''}`}
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
