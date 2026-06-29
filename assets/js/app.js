// ==========================================
// 3. REGISTRATION LOGIC (With Loading Animation)
// ==========================================
window.registerUser = async () => {
    const name = document.getElementById('name').value;
    const num = document.getElementById('num').value;
    const pass = document.getElementById('pass').value;
    const cpass = document.getElementById('cpass').value;
    const agree = document.getElementById('agree').checked;

    if (!name || !num || !pass) { window.showToast("⚠️ सर्व माहिती भरणे अनिवार्य आहे!"); return; }
    if (num.length !== 10) { window.showToast("⚠️ मोबाईल नंबर १० अंकीच असावा!"); return; }
    if (pass.length !== 4) { window.showToast("⚠️ पासवर्ड ४ अंकी PIN असावा!"); return; }
    if (pass !== cpass) { window.showToast("⚠️ दोन्ही पासवर्ड जुळत नाहीत!"); return; }
    if (!agree) { window.showToast("⚠️ कृपया Terms & Privacy Policy मान्य करा!"); return; }

    const regBtn = document.getElementById("reg-btn");
    const originalContent = regBtn.innerHTML; // मूळ 'Continue' टेक्स्ट सेव्ह केला
    
    // 🌀 Advanced SVG Loading Animation
    regBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> 
        Processing...
    `;
    regBtn.disabled = true;
    regBtn.classList.add("cursor-not-allowed", "opacity-80");

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
        
        // 🚀 थेट Home Page (Dashboard) वर रिडायरेक्ट!
        setTimeout(() => { 
            window.location.href = "user/dashboard.html"; 
        }, 1500);

    } catch (error) {
        console.error("Firebase Error: ", error);
        window.showToast("⚠️ एरर! फायरबेस रूल्स चेक करा.");
        
        // जर काही एरर आली तर पुन्हा जुने बटण दिसेल
        regBtn.innerHTML = originalContent;
        regBtn.disabled = false;
        regBtn.classList.remove("cursor-not-allowed", "opacity-80");
    }
};

// ==========================================
// 4. LOGIN LOGIC (With Loading Animation)
// ==========================================
window.loginUser = async () => {
    const num = document.getElementById('login-num').value;
    const pass = document.getElementById('login-pass').value;

    if (!num || !pass) { window.showToast("⚠️ मोबाईल नंबर आणि पिन टाका!"); return; }

    const loginBtn = document.getElementById("login-btn");
    const originalContent = loginBtn.innerHTML;
    
    // 🌀 Loading Animation
    loginBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> 
        Verifying...
    `;
    loginBtn.disabled = true;
    loginBtn.classList.add("cursor-not-allowed", "opacity-80");

    try {
        const q = query(collection(db, "users"), where("number", "==", num), where("password", "==", pass));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            window.showToast("✅ Login Successful!", true);
            
            // 🚀 Home Page वर रिडायरेक्ट
            setTimeout(() => { 
                window.location.href = "user/dashboard.html"; 
            }, 1000);
        } else {
            window.showToast("⚠️ चुकीचा नंबर किंवा पिन!");
            loginBtn.innerHTML = originalContent;
            loginBtn.disabled = false;
            loginBtn.classList.remove("cursor-not-allowed", "opacity-80");
        }
    } catch (error) {
        console.error("Login Error: ", error);
        window.showToast("⚠️ सर्व्हर एरर! पुन्हा प्रयत्न करा.");
        loginBtn.innerHTML = originalContent;
        loginBtn.disabled = false;
        loginBtn.classList.remove("cursor-not-allowed", "opacity-80");
    }
};
