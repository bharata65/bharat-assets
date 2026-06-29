import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

// 1. Submit UTR and save to Deposits Collection
window.submitUTR = async () => {
    const utr = document.getElementById('utr-input')?.value;
    const amount = localStorage.getItem("lastAmount") || "200";
    const userId = localStorage.getItem("bharatUserSession");

    if (!utr || utr.length < 9) {
        alert("Please enter a valid 12-digit UTR number");
        return;
    }

    try {
        await addDoc(collection(db, "deposits"), {
            userId: userId,
            amount: parseInt(amount),
            utr: utr,
            status: "Processing",
            timestamp: new Date()
        });
        alert("Payment Submitted! Admin will verify soon.");
        window.location.href = "deposit-history.html";
    } catch (e) {
        alert("Error saving transaction. Try again.");
    }
};

// 2. Load User's Deposit History
window.loadDepositHistory = async () => {
    const container = document.getElementById("history-container");
    if (!container) return;

    const userId = localStorage.getItem("bharatUserSession");
    const q = query(collection(db, "deposits"), where("userId", "==", userId), orderBy("timestamp", "desc"));
    
    const querySnapshot = await getDocs(q);
    container.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const d = doc.data();
        container.innerHTML += `
            <div class="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm border border-gray-100">
                <div>
                    <p class="font-bold text-gray-800">₹${d.amount}</p>
                    <p class="text-[10px] text-gray-400">${d.timestamp.toDate().toLocaleString()}</p>
                </div>
                <span class="px-3 py-1 rounded-full text-[10px] uppercase font-bold 
                    ${d.status === 'Processing' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}">
                    ${d.status}
                </span>
            </div>
        `;
    });
};

// 3. Admin: Fetch All Deposit Requests for Admin Panel
window.loadAdminDeposits = async () => {
    const adminTable = document.getElementById("admin-deposit-table");
    if (!adminTable) return;

    const querySnapshot = await getDocs(collection(db, "deposits"));
    adminTable.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const d = doc.data();
        adminTable.innerHTML += `
            <tr class="border-b">
                <td class="p-3">${d.amount}</td>
                <td class="p-3">${d.utr}</td>
                <td class="p-3">${d.status}</td>
                <td class="p-3"><button onclick="approveDeposit('${doc.id}')" class="bg-green-500 text-white px-2 py-1 rounded">Approve</button></td>
            </tr>
        `;
    });
};
