import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { firebaseConfig } from "../../config.js"; 

// 1. Firebase Initialization
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// 2. ADVANCED UI TOAST (POPUP) FUNCTION
// ==========================================
window.showToast = (message, isSuccess = false) => {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-msg');
    
    if (!toast || !msg) return; // जर पेजवर टोस्ट नसेल तर एरर येऊ नये
    
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

// ==========================================
// 3. REGISTRATION LOGIC
// ==========================================
window.registerUser = async () => {
    const name = document.getElementById('name').value;
    const num = document.getElementById('num').value;
    const pass = document.getElementById('pass').value;
    const cpass = document.getElementById('cpass').value;
    const agree = document.getElementById('agree').checked;

    // Strict Validations
    if (!name || !num || !pass) { window.showToast("⚠️ सर्व माहिती भरणे अनिवार्य आहे!"); return; }
    if (num.length !== 10) { window.showToast("⚠️ मोबाईल नंबर १० अंकीच असावा!"); return; }
    if (pass.length !== 4) { window.showToast("⚠️ पासवर्ड ४ अंकी PIN असावा!"); return; }
    if (pass !== cpass) { window.showToast("⚠️ दोन्ही पासवर्ड जुळत नाहीत!"); return; }
    if (!agree) { window.showToast("⚠️ कृपया Terms & Privacy Policy मान्य करा!"); return; }

    const regBtn = document.getElementById("reg-btn");
    const originalText = regBtn.innerText;
    regBtn.innerText = "Processing...";
    regBtn.disabled = true;

    try {
        // Firebase मध्ये डेटा सेव्ह करणे
        await addDoc(collection(db, "users"), {
            name: name,
            number: num,
            password: pass,
            userId: Math.floor(100000 + Math.random() * 900000), // 6-Digit Unique ID
            status: "standard",
            balance: 0,
            createdAt: new Date()
        });

        window.showToast("✅ Account Created Successfully!", true);
        
        // २ सेकंद थांबून थेट Login पेजवर पाठवणे
        setTimeout(() => { 
            window.location.href = "login.html"; 
        }, 2000);

    } catch (error) {
        console.error("Firebase Error: ", error);
        window.showToast("⚠️ नेटवर्क एरर! पुन्हा प्रयत्न करा.");
        regBtn.innerText = originalText;
        regBtn.disabled = false;
    }
};

// ==========================================
// 4. LOGIN LOGIC
// ==========================================
window.loginUser = async () => {
    const num = document.getElementById('login-num').value;
    const pass = document.getElementById('login-pass').value;

    if (!num || !pass) { window.showToast("⚠️ मोबाईल नंबर आणि पिन टाका!"); return; }

    const loginBtn = document.getElementById("login-btn");
    const originalText = loginBtn.innerText;
    loginBtn.innerText = "Verifying...";
    loginBtn.disabled = true;

    try {
        // Firebase मधून नंबर आणि पासवर्ड मॅच करणे
        const q = query(collection(db, "users"), where("number", "==", num), where("password", "==", pass));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            window.showToast("✅ Login Successful!", true);
            
            // यशस्वी झाल्यावर Dashboard वर पाठवणे
            setTimeout(() => { 
                window.location.href = "user/dashboard.html"; 
            }, 1500);
        } else {
            window.showToast("⚠️ चुकीचा नंबर किंवा पिन!");
            loginBtn.innerText = originalText;
            loginBtn.disabled = false;
        }
    } catch (error) {
        console.error("Login Error: ", error);
        window.showToast("⚠️ सर्व्हर एरर! पुन्हा प्रयत्न करा.");
        loginBtn.innerText = originalText;
        loginBtn.disabled = false;
    }
};
