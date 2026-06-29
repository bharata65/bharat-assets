// ==========================================
// 1. GLOBAL ERROR TRACKER (Silent Errors पकडण्यासाठी)
// ==========================================
window.onerror = function(message, source, lineno, colno, error) {
    alert("🔴 System Error: " + message + " (Line: " + lineno + ")");
    return true; 
};

// ==========================================
// 2. FIREBASE INITIALIZATION 
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

// ==========================================
// 3. ADVANCED UI TOAST (POPUP)
// ==========================================
window.showToast = (message, isSuccess = false) => {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-msg');
    
    if (!toast || !msg) { 
        alert(message); // Fallback 
        return; 
    }
    
    msg.innerText = message;
    toast.style.opacity = "1";
    toast.style.transform = "translate(-50%, 0)";
    toast.style.backgroundColor = isSuccess ? "rgba(22, 163, 74, 0.95)" : "rgba(220, 38, 38, 0.95)";

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translate(-50%, -20px)";
    }, 3000);
};

// ==========================================
// 4. REGISTRATION LOGIC
// ==========================================
window.registerUser = async () => {
    const name = document.getElementById('name')?.value;
    const num = document.getElementById('num')?.value;
    const pass = document.getElementById('pass')?.value;
    const cpass = document.getElementById('cpass')?.value;
    const agree = document.getElementById('agree')?.checked;

    // Validations
    if (!name || !num || !pass || !cpass) { window.showToast("⚠️ सर्व माहिती भरणे अनिवार्य आहे!"); return; }
    if (num.length !== 10) { window.showToast("⚠️ मोबाईल नंबर १० अंकीच असावा!"); return; }
    if (pass.length !== 4) { window.showToast("⚠️ पासवर्ड ४ अंकी PIN असावा!"); return; }
    if (pass !== cpass) { window.showToast("⚠️ दोन्ही पासवर्ड जुळत नाहीत!"); return; }
    if (!agree) { window.showToast("⚠️ कृपया Terms & Privacy Policy मान्य करा!"); return; }

    const regBtn = document.getElementById("reg-btn");
    const originalContent = regBtn.innerHTML;
    
    // Loading Animation
    regBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Processing...
    `;
    regBtn.disabled = true;
    regBtn.classList.add("opacity-80");

    try {
        await addDoc(collection(db, "users"), {
            name: name,
            number: num,
            password: pass,
            userId: Math.floor(100000 + Math.random() * 900000), 
            status: "standard",
            balance: 0,
            createdAt: new Date()
        });

        window.showToast("✅ Account Created Successfully!", true);
        
        // Redirect to Dashboard
        setTimeout(() => { 
            window.location.href = "user/dashboard.html"; 
        }, 1500);

    } catch (error) {
        console.error("Firebase Error: ", error);
        window.showToast("⚠️ Error: " + error.message); // Exact error दिसेल
        regBtn.innerHTML = originalContent;
        regBtn.disabled = false;
        regBtn.classList.remove("opacity-80");
    }
};

// ==========================================
// 5. LOGIN LOGIC
// ==========================================
window.loginUser = async () => {
    const num = document.getElementById('login-num')?.value;
    const pass = document.getElementById('login-pass')?.value;

    if (!num || !pass) { window.showToast("⚠️ मोबाईल नंबर आणि पिन टाका!"); return; }

    const loginBtn = document.getElementById("login-btn");
    const originalContent = loginBtn.innerHTML;
    
    // Loading Animation
    loginBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Verifying...
    `;
    loginBtn.disabled = true;
    loginBtn.classList.add("opacity-80");

    try {
        const q = query(collection(db, "users"), where("number", "==", num), where("password", "==", pass));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            window.showToast("✅ Login Successful!", true);
            setTimeout(() => { window.location.href = "user/dashboard.html"; }, 1500);
        } else {
            window.showToast("⚠️ चुकीचा नंबर किंवा पिन!");
            loginBtn.innerHTML = originalContent;
            loginBtn.disabled = false;
            loginBtn.classList.remove("opacity-80");
        }
    } catch (error) {
        console.error("Login Error: ", error);
        window.showToast("⚠️ Error: " + error.message);
        loginBtn.innerHTML = originalContent;
        loginBtn.disabled = false;
        loginBtn.classList.remove("opacity-80");
    }
};
