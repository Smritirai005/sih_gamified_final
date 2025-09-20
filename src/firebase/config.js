import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

// Your Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1IlGHbnqcDFdZ1mG5t4Ycilg7o04hZCk",
  authDomain: "sih-gamified-75d77.firebaseapp.com",
  projectId: "sih-gamified-75d77",
  storageBucket: "sih-gamified-75d77.firebasestorage.app",
  messagingSenderId: "756377391674",
  appId: "1:756377391674:web:5eed4f71a4003ac03a1b03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore with error handling for network issues
let db = null; // Start with disabled Firestore

// Check if we should enable Firestore (disable due to persistent 400 errors)
const shouldEnableFirestore = () => {
  // For now, disable Firestore completely due to persistent 400 errors
  // This can be re-enabled later when the network issues are resolved
  return false;
};

if (shouldEnableFirestore()) {
  try {
    // Try with experimental settings first
    db = initializeFirestore(app, {
      experimentalForceLongPolling: true,
      useFetchStreams: false,
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
    });
    console.log('Firestore initialized with experimental settings');
  } catch (error) {
    console.warn('Failed to initialize Firestore with experimental settings, trying standard config:', error);
    try {
      // Fallback to standard Firestore
      db = getFirestore(app);
      console.log('Firestore initialized with standard settings');
    } catch (fallbackError) {
      console.error('Failed to initialize Firestore completely:', fallbackError);
      db = null;
    }
  }
} else {
  console.log('Firestore disabled due to persistent network issues. Running in offline mode.');
}

export { db };

export default app;

