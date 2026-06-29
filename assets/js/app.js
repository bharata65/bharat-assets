import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCkA8HNQd8kDA8uLP6hNWgkjF78d3wKXbU",
    authDomain: "bharat-digital-assets.firebaseapp.com",
    projectId: "bharat-digital-assets",
    storageBucket: "bharat-digital-assets.appspot.com",
    messagingSenderId: "451769882363",
    appId: "1:451769882363:web:f88db52e495d8456d5425e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// शेअर्स लोड करा
window.loadShares = async () => {
    const list = document.getElementById("shares-list");
    if (!list) return;
    
    const querySnapshot = await getDocs(collection(db, "shares"));
    list.innerHTML = "";
    
    querySnapshot.forEach((doc) => {
        const s = doc.data();
        list.innerHTML += `
            <div class="glass-card flex justify-between items-center">
                <div><h4 class="font-bold">${s.name}</h4><p class="text-sm text-green-400">Returns: ${s.returns}</p></div>
                <button onclick="buyShare('${s.name}', ${s.price})" class="bg-blue-600 px-4 py-2 rounded-lg font-bold">Buy</button>
            </div>
        `;
    });
};

// शेअर्स खरेदी करा
window.buyShare = async (name, price) => {
    alert("Buying " + name + " for ₹" + price);
    // इथं युजरच्या डेटाबेसमध्ये शेअर्स ॲड करा
};

// PWA Install Script
window.addEventListener('beforeinstallprompt', (e) => {
    const btn = document.getElementById('install-btn');
    btn.classList.remove('hidden');
    btn.onclick = () => e.prompt();
});

// पेज लोड झाल्यावर शेअर्स लोड करा
if(window.location.pathname.includes("dashboard.html")) {
    window.loadShares();
}
