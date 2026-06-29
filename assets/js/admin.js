import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
const db = getFirestore();

// १. विथड्रॉल रिक्वेस्ट अप्रूव्ह करणे
window.approveWithdrawal = async (requestId, amount) => {
    // जर 10rs च्या वर असेल तरच एडमिनला अप्रूव्हलची गरज पडेल
    await updateDoc(doc(db, "withdrawals", requestId), {
        status: "completed",
        processedAt: new Date()
    });
    alert("Withdrawal Approved!");
};

// २. बँकिंग व्हेरिफिकेशन (Razorpay/Cashfree Payout API)
// येथे आपण १ रुपया पे-आउटचे लॉजिक टाकू
window.verifyBankAccount = async (bankDetails) => {
    // 1 रुपया पे-आउट API कॉल इथे करा
    console.log("Verifying bank account with 1 INR...");
};

