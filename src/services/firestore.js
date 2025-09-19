import { db } from '../firebase/config';
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

export async function createUserProfile({ uid, email, displayName }) {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      email,
      displayName: displayName || email.split('@')[0],
      createdAt: serverTimestamp(),
      level: 1,
      experience: 0,
      maxExperience: 1000,
      ecoPoints: 0,
      treesPlanted: 0,
      quizzesCompleted: 0,
      badges: [],
    });
  }
  return userRef;
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export async function updateUserProgress(uid, updates) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, updates);
}

export async function incrementProgressOnCorrect(uid) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ecoPoints: increment(10),
    experience: increment(10),
  });
}

export async function finalizeQuiz(uid, { scoreIncrement = 0 } = {}) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    quizzesCompleted: increment(1),
    ecoPoints: increment(scoreIncrement),
  });
}

export function listenToUserProfile(uid, callback) {
  const userRef = doc(db, 'users', uid);
  const unsubscribe = onSnapshot(userRef, (snap) => {
    if (snap.exists()) callback(snap.data());
  }, async (error) => {
    console.error('listenToUserProfile error; falling back to getDoc', error);
    try {
      const snap = await getDoc(userRef);
      if (snap.exists()) callback(snap.data());
    } catch (e) {
      console.error('getDoc fallback failed', e);
    }
  });
  return unsubscribe;
}

// Community: groups and messages
export function listenToGroups(callback) {
  const groupsCol = collection(db, 'groups');
  const q = query(groupsCol, orderBy('createdAt', 'asc'));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const groups = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(groups);
  }, async (error) => {
    console.error('listenToGroups error; falling back to getDocs', error);
    try {
      const snap = await getDocs(q);
      const groups = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      callback(groups);
    } catch (e) {
      console.error('getDocs fallback failed', e);
    }
  });
  return unsubscribe;
}

export async function createGroup({ name, description, ownerUid }) {
  const groupsCol = collection(db, 'groups');
  const docRef = await addDoc(groupsCol, {
    name,
    description: description || '',
    ownerUid,
    createdAt: serverTimestamp(),
    members: 1,
    online: 1,
    icon: '🌍',
  });
  return docRef.id;
}

export async function deleteGroup(groupId) {
  await deleteDoc(doc(db, 'groups', groupId));
}

export function listenToMessages(groupId, callback) {
  const messagesCol = collection(db, 'groups', groupId, 'messages');
  const q = query(messagesCol, orderBy('createdAt', 'asc'));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(messages);
  }, async (error) => {
    console.error('listenToMessages error; falling back to getDocs', error);
    try {
      const snap = await getDocs(q);
      const messages = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      callback(messages);
    } catch (e) {
      console.error('getDocs messages fallback failed', e);
    }
  });
  return unsubscribe;
}

export async function sendMessage({ groupId, uid, user, avatar, text }) {
  const messagesCol = collection(db, 'groups', groupId, 'messages');
  await addDoc(messagesCol, {
    uid,
    user,
    avatar: avatar || '🌱',
    message: text,
    createdAt: serverTimestamp(),
  });
}


