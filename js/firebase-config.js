import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCbIlBvIUi7dxKNZ4E6uqJOl51T4UDKpnI",
  authDomain: "bharatshares-4a126.firebaseapp.com",
  projectId: "bharatshares-4a126",
  storageBucket: "bharatshares-4a126.firebasestorage.app",
  messagingSenderId: "658412327508",
  appId: "1:658412327508:web:212fd41fd2e1dfbdb853c1",
  measurementId: "G-9KDCMFJQ3S"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
