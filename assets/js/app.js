// ==========================================
// 1. GLOBAL ERROR TRACKER
// ==========================================
window.onerror = function(message, source, lineno, colno, error) {
    console.error("System Error: ", message);
    return true; 
};

// ==========================================
// 2. AUTO-LOGIN CHECK (Persistent Session)
// ==========================================
const userSession = localStorage.getItem("bharatUserSession");
const currentPath = window.location.pathname;

// जर युजर लॉग इन असेल आणि तो Login/Register पेजवर असेल, तर थेट डॅशबोर्डवर पाठवा
if (userSession && (currentPath.endsWith("index.html") || currentPath.endsWith("login.html") || currentPath === "/" || currentPath.endsWith("/"))) {
    window.location.replace("user/dashboard.html");
}

// ==========================================
// 3. FIREBASE INITIALIZATION 
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
// 4. ADVANCED UI TOAST (ENGLISH ONLY)
// ==========================================
window.showToast = (message, isSuccess = false) => {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-msg');
    
    if (!toast || !msg) return; 
    
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
// 5. REGISTRATION LOGIC
// ==========================================
window.registerUser = async () => {
    const name = document.getElementById('name')?.value.trim();
    const num = document.getElementById('num')?.value.trim();
    const pass = document.getElementById('pass')?.value.trim();
    const cpass = document.getElementById('cpass')?.value.trim();
    const agree = document.getElementById('agree')?.checked;

    if (!name || !num || !pass || !cpass) { window.showToast("⚠️ Please fill in all details!"); return; }
    if (num.length !== 10) { window.showToast("⚠️ Mobile number must be 10 digits!"); return; }
    if (pass.length !== 4) { window.showToast("⚠️ PIN must be exactly 4 digits!"); return; }
    if (pass !== cpass) { window.showToast("⚠️ Passwords do not match!"); return; }
    if (!agree) { window.showToast("⚠️ Please agree to the Terms & Privacy Policy!"); return; }

    const regBtn = document.getElementById("reg-btn");
    const originalContent = regBtn.innerHTML;
    
    regBtn.innerHTML = `Processing...`;
    regBtn.disabled = true;

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
        
        // Session Save करा आणि Redirect करा
        localStorage.setItem("bharatUserSession", num);
        
        setTimeout(() => { 
            window.location.href = "user/dashboard.html"; 
        }, 1500);

    } catch (error) {
        window.showToast("⚠️ Server Error: Please try again.");
        regBtn.innerHTML = originalContent;
        regBtn.disabled = false;
    }
};

// ==========================================
// 6. LOGIN LOGIC
// ==========================================
window.loginUser = async () => {
    const num = document.getElementById('login-num')?.value.trim();
    const pass = document.getElementById('login-pass')?.value.trim();

    if (!num || !pass) { window.showToast("⚠️ Please enter Mobile Number and PIN!"); return; }

    const loginBtn = document.getElementById("login-btn");
    const originalContent = loginBtn.innerHTML;
    
    loginBtn.innerHTML = `Verifying...`;
    loginBtn.disabled = true;

    try {
        const q = query(collection(db, "users"), where("number", "==", num), where("password", "==", pass));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            window.showToast("✅ Login Successful!", true);
            
            // Session Save करा (Auto-login साठी)
            localStorage.setItem("bharatUserSession", num);
            
            setTimeout(() => { window.location.href = "user/dashboard.html"; }, 1000);
        } else {
            window.showToast("⚠️ Invalid Mobile Number or PIN!");
            loginBtn.innerHTML = originalContent;
            loginBtn.disabled = false;
        }
    } catch (error) {
        window.showToast("⚠️ Network Error! Please try again.");
        loginBtn.innerHTML = originalContent;
        loginBtn.disabled = false;
    }
};
