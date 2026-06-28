import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);

// Hidden Routing Logic (URL पाथ दिसणार नाही)
window.renderPage = (page) => {
    const root = document.getElementById('root');
    // AJAX ने पेज लोड करणे (path न बदलता)
    fetch(`${page}.html`)
        .then(res => res.text())
        .then(html => root.innerHTML = html);
};

// Locking System
window.verifyAccess = (userStatus) => {
    if(userStatus !== 'VIP') {
        alert("🔒 Account Locked! Activation Fee Required.");
        return false;
    }
    return true;
};
