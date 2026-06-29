import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { firebaseConfig } from "../../config.js"; 

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Toast UI Function
const showToast = (message, isSuccess = false) => {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-msg');
    
    if(!toast || !msg) return; // पेजवर toast नसेल तर एरर येऊ नये म्हणून
    
    msg.innerText = message;
    if(isSuccess) {
        toast.classList.replace('bg-red-600/90', 'bg-green-600/90');
    } else {
        toast.classList.replace('bg-green-600/90', 'bg-red-600/90');
    }

    toast.classList.add('toast-show');
    setTimeout(() => toast.classList.remove('toast-show'), 3000);
};

// ==========================================
// REGISTRATION LOGIC
// ==========================================
const regBtn = document.getElementById("reg-btn");
if (regBtn) {
    regBtn.addEventListener("click", async () => {
        const name = document.getElementById('name').value;
        const num = document.getElementById('num').value;
        const pass = document.getElementById('pass').value;
        const cpass = document.getElementById('cpass').value;
        const agree = document.getElementById('agree').checked;

        if (!name || !num || !pass) { showToast("⚠️ सर्व माहिती भरणे अनिवार्य आहे!"); return; }
        if (num.length !== 10) { showToast("⚠️ मोबाईल नंबर १० अंकीच असावा!"); return; }
        if (pass.length !== 4) { showToast("⚠️ पासवर्ड ४ अंकी PIN असावा!"); return; }
        if (pass !== cpass) { showToast("⚠️ दोन्ही पासवर्ड जुळत नाहीत!"); return; }
        if (!agree) { showToast("⚠️ कृपया Terms & Conditions मान्य करा!"); return; }

        const originalText = regBtn.innerText;
        regBtn.innerText = "Processing...";
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

            showToast("✅ Account Created Successfully!", true);
            setTimeout(() => { window.location.href = "login.html"; }, 2000);

        } catch (error) {
            console.error("Firebase Error: ", error);
            showToast("⚠️ नेटवर्क एरर! पुन्हा प्रयत्न करा.");
            regBtn.innerText = originalText;
            regBtn.disabled = false;
        }
    });
}

// ==========================================
// LOGIN LOGIC
// ==========================================
const loginBtn = document.getElementById("login-btn");
if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
        const num = document.getElementById('login-num').value;
        const pass = document.getElementById('login-pass').value;

        if (!num || !pass) { showToast("⚠️ मोबाईल नंबर आणि पिन टाका!"); return; }

        const originalText = loginBtn.innerText;
        loginBtn.innerText = "Verifying...";
        loginBtn.disabled = true;

        try {
            const q = query(collection(db, "users"), where("number", "==", num), where("password", "==", pass));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                showToast("✅ Login Successful!", true);
                setTimeout(() => { window.location.href = "user/dashboard.html"; }, 1500);
            } else {
                showToast("⚠️ चुकीचा नंबर किंवा पिन!");
                loginBtn.innerText = originalText;
                loginBtn.disabled = false;
            }
        } catch (error) {
            console.error("Login Error: ", error);
            showToast("⚠️ सर्व्हर एरर! पुन्हा प्रयत्न करा.");
            loginBtn.innerText = originalText;
            loginBtn.disabled = false;
        }
    });
}
