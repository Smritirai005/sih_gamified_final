// Local storage service to replace Firestore when it's disabled
class LocalStorageService {
  constructor() {
    this.storageKey = 'ecogame_data';
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {
        users: {},
        groups: [],
        messages: {}
      };
    } catch (error) {
      console.error('Failed to load local data:', error);
      return {
        users: {},
        groups: [],
        messages: {}
      };
    }
  }

  saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (error) {
      console.error('Failed to save local data:', error);
    }
  }

  // User profile operations
  async createUserProfile({ uid, email, displayName }) {
    const userData = {
      email,
      displayName: displayName || email.split('@')[0],
      createdAt: new Date().toISOString(),
      level: 1,
      experience: 0,
      maxExperience: 1000,
      ecoPoints: 0,
      treesPlanted: 0,
      quizzesCompleted: 0,
      badges: [],
    };
    
    this.data.users[uid] = userData;
    this.saveData();
    return { id: uid };
  }

  async getUserProfile(uid) {
    return this.data.users[uid] || null;
  }

  async updateUserProgress(uid, updates) {
    if (this.data.users[uid]) {
      this.data.users[uid] = { ...this.data.users[uid], ...updates };
      this.saveData();
    }
  }

  async incrementProgressOnCorrect(uid) {
    if (this.data.users[uid]) {
      this.data.users[uid].ecoPoints = (this.data.users[uid].ecoPoints || 0) + 10;
      this.data.users[uid].experience = (this.data.users[uid].experience || 0) + 10;
      this.saveData();
    }
  }

  async finalizeQuiz(uid, { scoreIncrement = 0 } = {}) {
    if (this.data.users[uid]) {
      this.data.users[uid].quizzesCompleted = (this.data.users[uid].quizzesCompleted || 0) + 1;
      this.data.users[uid].ecoPoints = (this.data.users[uid].ecoPoints || 0) + scoreIncrement;
      this.saveData();
    }
  }

  // Listeners (simulate with immediate callbacks)
  listenToUserProfile(uid, callback) {
    const userData = this.data.users[uid];
    if (userData) {
      callback(userData);
    } else {
      // Create default user data
      const defaultData = {
        email: 'user@example.com',
        displayName: 'User',
        level: 1,
        experience: 0,
        maxExperience: 1000,
        ecoPoints: 0,
        treesPlanted: 0,
        quizzesCompleted: 0,
        badges: [],
      };
      callback(defaultData);
    }
    return () => {}; // Return empty unsubscribe function
  }

  // Community operations
  listenToGroups(callback) {
    callback(this.data.groups);
    return () => {};
  }

  async createGroup({ name, description, ownerUid }) {
    const groupId = Date.now().toString();
    const group = {
      id: groupId,
      name,
      description: description || '',
      ownerUid,
      createdAt: new Date().toISOString(),
      members: 1,
      online: 1,
      icon: '🌍',
    };
    
    this.data.groups.push(group);
    this.data.messages[groupId] = [];
    this.saveData();
    return groupId;
  }

  async deleteGroup(groupId) {
    this.data.groups = this.data.groups.filter(g => g.id !== groupId);
    delete this.data.messages[groupId];
    this.saveData();
  }

  listenToMessages(groupId, callback) {
    const messages = this.data.messages[groupId] || [];
    callback(messages);
    return () => {};
  }

  async sendMessage({ groupId, uid, user, avatar, text }) {
    if (!this.data.messages[groupId]) {
      this.data.messages[groupId] = [];
    }
    
    const message = {
      id: Date.now().toString(),
      uid,
      user,
      avatar: avatar || '🌱',
      message: text,
      createdAt: new Date().toISOString(),
    };
    
    this.data.messages[groupId].push(message);
    this.saveData();
  }
}

// Create singleton instance
const localStorageService = new LocalStorageService();

export default localStorageService;
