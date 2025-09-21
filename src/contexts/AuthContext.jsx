import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { createUserProfile, getUserProfile } from '../services/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, role = 'student') {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile({ uid: cred.user.uid, email: cred.user.email, displayName: cred.user.displayName, role });
    return cred;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function googleSignIn(role = 'student') {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await createUserProfile({ uid: cred.user.uid, email: cred.user.email, displayName: cred.user.displayName, role });
    return cred;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          // First, try to get existing profile
          const existingProfile = await getUserProfile(user.uid);
          if (!existingProfile) {
            // Only create profile if it doesn't exist
            await createUserProfile({ uid: user.uid, email: user.email, displayName: user.displayName, role: 'student' });
          }
          // Fetch user role from profile
          const profile = await getUserProfile(user.uid);
          setUserRole(profile?.role || 'student');
        } catch (e) {
          console.error('Profile ensure failed', e);
          setUserRole('student');
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout,
    googleSignIn
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

