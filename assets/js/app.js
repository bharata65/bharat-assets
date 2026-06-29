import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration
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

// 1. Global Loader Animation Logic
window.showLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.remove('hidden');
};

window.hideLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
};

// 2. Transaction Logic: Deposit Request
window.saveDepositRequest = async (amount) => {
    const userId = localStorage.getItem("bharatUserSession");
    if (!userId) return;

    window.showLoader();
    try {
        await addDoc(collection(db, "deposits"), {
            userId: userId,
            amount: amount,
            status: "Processing",
            timestamp: new Date()
        });
        window.location.href = "payment-gateway.html";
    } catch (e) {
        window.hideLoader();
        alert("Error processing request. Please try again.");
    }
};

// 3. Admin Panel: Fetch All Users & Bank Details
window.loadAdminUserData = async () => {
    const usersList = document.getElementById("user-table");
    if (!usersList) return;

    const querySnapshot = await getDocs(collection(db, "users"));
    usersList.innerHTML = "";
    
    querySnapshot.forEach((doc) => {
        const u = doc.data();
        usersList.innerHTML += `
            <tr class="border-b">
                <td class="p-3">${u.name}</td>
                <td class="p-3">${u.number}</td>
                <td class="p-3">${u.bankName || 'N/A'}</td>
                <td class="p-3"><button onclick="banUser('${doc.id}')" class="text-red-500 font-bold">Ban</button></td>
            </tr>
        `;
    });
};

// 4. Global Click Listener for Loader (सर्व क्लिकला लोडर मिळेल)
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' && !e.target.disabled && !e.target.onclick) {
        window.showLoader();
        setTimeout(() => window.hideLoader(), 1500);
    }
});

console.log("Bharat Share's Engine Loaded Successfully!");
