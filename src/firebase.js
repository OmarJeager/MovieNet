// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // For authentication
import { getAnalytics } from "firebase/analytics"; // Optional, for analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFSZ3ZfyogCRQBxWtgwYYEn2i779UlcCg",
  authDomain: "movie-app-b650a.firebaseapp.com",
  projectId: "movie-app-b650a",
  storageBucket: "movie-app-b650a.firebasestorage.app",
  messagingSenderId: "23306522631",
  appId: "1:23306522631:web:0a70cc93abb43c0a235aa2", // Your appId
  measurementId: "G-QW7TKTBTH7" // Optional, for analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const analytics = getAnalytics(app); // Optional: For Google Analytics

export { auth };
