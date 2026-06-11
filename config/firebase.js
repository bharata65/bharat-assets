// ==========================================================================
// BHARAT DIGITAL ASSETS - CLOUD CONNECTION & ACTIVE SESSION INITIALIZER v4.3
// ==========================================================================

// Central Database Configuration Parameters Matrix
const firebaseConfig = {
    apiKey: "AIzaSyCka8HNQd8kDA8uLP6hNMjgjF70d3wKXbU",
    authDomain: "bharat-digital-assets.firebaseapp.com",
    projectId: "bharat-digital-assets",
    storageBucket: "bharat-digital-assets.firebasestorage.app",
    messagingSenderId: "451769882363",
    appId: "1:451769882363:web:f80db52e495d8456d5425e"
};

// Start Cloud Database Production Instances Guard Pipeline
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

// Global Core Reference Handle for Firestore Ledger Sync
const db = firebase.firestore();

// Application Runtime Active Key States (Locks user sessions in memory)
let currentUserMobile = ""; // Stores logged-in phone vector
let globalUserDataObj = null; // Holds validated user document structure
let signatureBase64 = "";    // Holds memory representation of digital signature

// Boot Check Handshake Tracker
console.log("BDA Security Node: Cloud connection successfully established with centralized cluster.");
