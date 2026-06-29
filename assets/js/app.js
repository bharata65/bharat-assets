import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { firebaseConfig } from "../../config.js"; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Advanced UI Popup Function
window.showToast = (message, isSuccess = false) => {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-msg');
    
    msg.innerText = message;
    
    // यशासाठी हिरवा रंग, एररसाठी लाल रंग
    if(isSuccess) {
        toast.classList.replace('bg-red-600/90', 'bg-green-600/90');
    } else {
        toast.classList.replace('bg-green-600/90', 'bg-red-600/90');
    }

    toast.classList.add('toast-show');
    
    // ३ सेकंदांनी पॉपअप आपोआप गायब होईल
    setTimeout(() => {
        toast.classList.remove('toast-show');
    }, 3000);
};

window.registerUser = async () => {
    const name = document.getElementById('name').value;
    const num = document.getElementById('num').value;
    const pass = document.getElementById('pass').value;
    const cpass = document.getElementById('cpass').value;
    const agree = document.getElementById('agree').checked;

    // Custom Error Popups
    if (!name || !num || !pass) { showToast("⚠️ सर्व माहिती भरणे अनिवार्य आहे!"); return; }
    if (num.length !== 10) { showToast("⚠️ मोबाईल नंबर १० अंकीच असावा!"); return; }
    if (pass.length !== 4) { showToast("⚠️ पासवर्ड ४ अंकी PIN असावा!"); return; }
    if (pass !== cpass) { showToast("⚠️ दोन्ही पासवर्ड जुळत नाहीत!"); return; }
    if (!agree) { showToast("⚠️ कृपया Terms & Conditions मान्य करा!"); return; }

    const btn = document.getElementById("reg-btn");
    const originalText = btn.innerText;
    btn.innerText = "Processing...";
    btn.disabled = true;

    try {
        await addDoc(collection(db, "users"), {
            name: name,
            number: num,
            password: pass,
            userId: Math.floor(100000 + Math.random() * 900000), 
            status: "standard",
            balance: 0
        });

        showToast("✅ Account Created Successfully!", true);
        
        // २ सेकंद थांबून Dashboard वर रिडायरेक्ट करेल
        setTimeout(() => {
            window.location.href = "user/dashboard.html"; 
        }, 2000);

    } catch (error) {
        console.error("Firebase Error: ", error);
        showToast("⚠️ नेटवर्क एरर! पुन्हा प्रयत्न करा.");
        btn.innerText = originalText;
        btn.disabled = false;
    }
};
