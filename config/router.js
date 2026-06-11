// ==========================================================================
// BHARAT DIGITAL ASSETS - UNIVERSAL GLOBAL ROUTER & ROUTE ENGINE v4.5
// ==========================================================================

// जागतिक स्तरावर युझर डेटा आणि मोबाईल स्टेट डिफाईन करणे
window.currentUserMobile = "";
window.globalUserDataObj = null;

// १. सर्व फाइल्स लोड झाल्यावर सिस्टीम सुरू करण्याचे इंजिन
window.addEventListener('load', () => {
    console.log("BDA Router Handshake: DOM and Assets fully mapped.");
    
    const container = document.getElementById('view-target-container');
    const navContainer = document.getElementById('nav-target-container');
    
    // सुरक्षित इन्जेक्शन पाईपलाईन - कोणतीही फाईल मिसिंग असल्यास क्रॅश रोखणे
    if (container) {
        let compiledHTML = "";
        if (typeof RegisterView !== 'undefined') compiledHTML += RegisterView.render();
        if (typeof LoginView !== 'undefined') compiledHTML += LoginView.render();
        if (typeof KYCView !== 'undefined') compiledHTML += KYCView.render();
        if (typeof AgreementView !== 'undefined') compiledHTML += AgreementView.render();
        if (typeof SignatureView !== 'undefined') compiledHTML += SignatureView.render();
        if (typeof HomeView !== 'undefined') compiledHTML += HomeView.render();
        if (typeof SharesView !== 'undefined') compiledHTML += SharesView.render();
        if (typeof AccountView !== 'undefined') compiledHTML += AccountView.render();
        if (typeof CertificateView !== 'undefined') compiledHTML += CertificateView.render();
        if (typeof AdminView !== 'undefined') compiledHTML += AdminView.render();
        
        container.innerHTML = compiledHTML;
    }
        
    if (navContainer && typeof NavigationComponent !== 'undefined') {
        navContainer.innerHTML = NavigationComponent.render();
    }
    
    // सुरुवातीला नेव्हिगेशन पूर्ण हायड ठेवणे
    const dock = document.getElementById('app-nav-dock');
    if (dock) dock.style.display = 'none'; 
    
    // थेट पहिल्या व्ह्यूवर (Register) ट्रिगर करणे
    switchView('register');
    
    // लोडिंग स्क्रीन (Splash) १००% बंद करणे
    setTimeout(() => {
        const splash = document.getElementById('app-splash-screen');
        if (splash) {
            splash.style.opacity = "0";
            setTimeout(() => { splash.style.display = "none"; }, 300);
        }
    }, 800);
});

// २. बँकिंग कस्टम अलर्ट सिस्टीम
window.triggerAlert = function(title, message, statusType) {
    const box = document.getElementById('custom-alert-box');
    const wrapper = document.getElementById('alert-icon-wrapper');
    const tEl = document.getElementById('alert-title-text');
    const mEl = document.getElementById('alert-msg-text');
    
    if (!box || !wrapper || !tEl || !mEl) return;
    tEl.innerText = title; mEl.innerText = message;
    
    if (statusType === 'success') {
        wrapper.className = "w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl shadow-inner";
        wrapper.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    } else if (statusType === 'error') {
        wrapper.className = "w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-xl shadow-inner";
        wrapper.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
    } else {
        wrapper.className = "w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-xl shadow-inner";
        wrapper.innerHTML = `<i class="fa-solid fa-circle-info"></i>`;
    }
    box.style.display = "flex";
    box.classList.remove('hidden');
};

window.closeCustomAlert = function() { 
    const box = document.getElementById('custom-alert-box');
    if (box) {
        box.style.display = "none";
        box.classList.add('hidden'); 
    }
};

// ३. प्रगत व्ह्यू स्विचर (Strict Single Pane Screen Locker)
window.switchView = function(viewId) {
    document.querySelectorAll('.view-panel').forEach(p => {
        p.style.display = "none";
        p.classList.remove('active');
    });
    
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
        target.style.display = "flex"; 
        target.classList.add('active');
        window.scrollTo(0, 0); 
    }
    
    const dock = document.getElementById('app-nav-dock');
    if (dock) {
        if (viewId === 'home' || viewId === 'shares' || viewId === 'account') {
            dock.style.display = 'flex';
            dock.classList.remove('hidden');
        } else {
            dock.style.display = 'none';
            dock.classList.add('hidden');
        }
    }
    
    if (typeof NavigationComponent !== 'undefined' && document.getElementById('app-nav-dock')) {
        NavigationComponent.updateActiveState(viewId);
    }
    
    if (viewId === 'shares' && typeof renderUserAcquiredShares === 'function') renderUserAcquiredShares();
    if (viewId === 'account' && typeof hydrateUserSession === 'function') hydrateUserSession();
    if (viewId === 'admin' && typeof syncAdminMasterLedger === 'function') syncAdminMasterLedger();
};

// ४. ऑनबोर्डिंग नवीन नोंदणी (Registration) ॲक्शन लॉजिक
window.handleAdvancedRegistration = function() {
    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pin = document.getElementById('reg-pin').value.trim();
    const cpin = document.getElementById('reg-cpin').value.trim();

    if (!name || name.length < 3) return triggerAlert("Validation Error", "कृपया तुमचे पूर्ण नाव टाका.", "error");
    if (phone.length !== 10 || isNaN(phone)) return triggerAlert("Validation Error", "कृपया १०-अंकी मोबाईल नंबर अचूक टाका.", "error");
    if (!email.includes("@") || !email.includes(".")) return triggerAlert("Validation Error", "ईमेल आयडी चुकीचा आहे.", "error");
    if (pin.length !== 4 || pin !== cpin) return triggerAlert("Validation Error", "४-अंकी सिक्युरिटी पिन मॅच होत नाहीये.", "error");

    window.currentUserMobile = phone;

    db.collection("users").doc(window.currentUserMobile).get().then((doc) => {
        if (doc.exists) {
            triggerAlert("Account Exists", "या नंबरवर आधीच अकाऊंट आहे. लॉगिन सेंटरवर जा.", "info");
            switchView('login');
        } else {
            window.globalUserDataObj = { name, phone, email, pin, isPaid: false, utrCode: "", registrationDate: new Date().toISOString().split('T')[0] };
            switchView('kyc'); 
        }
    }).catch(err => triggerAlert("System Error", err.message, "error"));
};

// ५. युझर आणि मास्टर ॲडमीन लॉगिन सिस्टीम
window.handleDirectLogin = function() {
    const phone = document.getElementById('login-phone').value.trim();
    const pin = document.getElementById('login-pin').value.trim();

    if (phone.length !== 10 || isNaN(phone)) return triggerAlert("Security Error", "कृपया योग्य १०-अंकी नंबर टाका.", "error");
    if (pin.length !== 4 || isNaN(pin)) return triggerAlert("Security Error", "पिन ४-अंकी असणे बंधनकारक आहे.", "error");

    window.currentUserMobile = phone;
    
    if (phone === "9999999999" && pin === "0000") { 
        window.globalUserDataObj = { name: "Master Admin Team", phone: "9999999999", isAdmin: true };
        triggerAlert("Access Granted", "मास्टर लेजर क्लिअरन्स स्वीकृत! ॲडमिन डेस्क सुरू होत आहे.", "success");
        setTimeout(() => { switchView('admin'); }, 600);
        return; 
    }

    db.collection("users").doc(window.currentUserMobile).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            if (data.pin === pin) { 
                window.globalUserDataObj = data; 
                triggerAlert("Success", "लॉगिन यशस्वी झाले!", "success");
                setTimeout(() => { switchView('home'); }, 600);
            } else { triggerAlert("Security Error", "तुमचा सिक्युरिटी पिन चुकीचा आहे.", "error"); }
        } else {
            triggerAlert("Not Found", "या नंबरवर अकाऊंट नाही, कृपया नवीन नोंदणी करा.", "info");
            switchView('register');
        }
    }).catch(err => triggerAlert("Sync Error", err.message, "error"));
};

// ६. केवायसी सबमिशन
window.submitKYC = function() {
    const dob = document.getElementById('kyc-dob').value;
    const edu = document.getElementById('kyc-edu').value;
    if(!dob) return triggerAlert("KYC Input", "कृपया तुमची जन्मतारीख सिलेक्ट करा.", "error");
    
    window.globalUserDataObj.education = edu; 
    window.globalUserDataObj.dob = dob;
    
    setTimeout(() => {
        const nameSpan = document.getElementById('pdf-insert-name'); 
        const dateSpan = document.getElementById('pdf-insert-date');
        if(nameSpan) nameSpan.innerText = window.globalUserDataObj.name; 
        if(dateSpan) dateSpan.innerText = window.globalUserDataObj.registrationDate;
    }, 200);
    
    switchView('agreement');
};

// ७. नॅव्हिगेशन आणि स्वाक्षरी जतन करणे
window.navigateToSignature = function() { 
    switchView('signature'); 
    setTimeout(() => { if (typeof initSignatureEngine === 'function') initSignatureEngine(); }, 350); 
};

window.generateAndSaveAgreement = function() {
    const canvas = document.getElementById('signature-canvas');
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL();
    window.globalUserDataObj.signatureUrl = dataUrl;

    db.collection("users").doc(window.currentUserMobile).set(window.globalUserDataObj).then(() => {
        triggerAlert("Onboarding Complete", "तुमचा प्रोफाइल डेटा आणि डिजिटल स्वाक्षरी जतन झाली आहे!", "success");
        setTimeout(() => { switchView('home'); }, 1000);
    }).catch(err => triggerAlert("Database Error", err.message, "error"));
};

window.unlockSecureApplication = function() {
    const dock = document.getElementById('app-nav-dock');
    if (dock) dock.style.display = 'flex';
    if (typeof hydrateUserSession === 'function') hydrateUserSession();
    switchView('home');
};
