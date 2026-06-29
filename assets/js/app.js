import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = { /* तुझा कॉन्फिग कोड इथे टाक */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// विथड्रॉल लॉजिक
window.initiateWithdraw = async () => {
    const amount = document.getElementById('dep-amount')?.value;
    
    // १ रुपया व्हेरिफिकेशन पॉपअप
    alert("30 seconds verification in progress...");
    
    // १२ रुपयांच्या वर असेल तर ॲडमिन कडे पाठवा
    if (amount > 12) {
        await addDoc(collection(db, "withdraw_requests"), {
            status: "pending",
            userId: localStorage.getItem("uid"),
            amount: amount
        });
        alert("Request sent for Approval!");
    } else {
        alert("Instant Withdrawal Initiated!");
    }
};

// ॲडमिन पॅनेल डेटा लोड
window.loadAdminData = async () => {
    const requests = await getDocs(collection(db, "withdraw_requests"));
    requests.forEach(doc => console.log(doc.data()));
};
