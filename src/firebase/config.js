import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

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

// Initialize Cloud Firestore with reliable transport for restricted networks
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});

export default app;

