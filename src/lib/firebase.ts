import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// ---------------------------------------------------------------------------
// Firebase configuration
// Replace the placeholder apiKey with your real Web API key from the
// Firebase console (Project settings > General > Your apps > Web app).
// ---------------------------------------------------------------------------
export const firebaseConfig = {
  apiKey: "AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "bharat-shares-65.firebaseapp.com",
  projectId: "bharat-shares-65",
  storageBucket: "bharat-shares-65.appspot.com",
  messagingSenderId: "360599684784",
  appId: "1:360599684784:web:8e3d8f99c8f2549d4791b7",
}

const app = initializeApp(firebaseConfig)

// Firestore database instance used across the app.
export const db = getFirestore(app)

export default app
