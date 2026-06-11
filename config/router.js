// ==========================================================================
// BHARAT DIGITAL ASSETS - MASTER ROUTER & COUPLING ENGINE v4.4 (FINAL)
// ==========================================================================

let currentUserMobile = "";
let globalUserDataObj = null;

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('view-target-container');
    if (container) {
        // सर्व व्ह्यूज सिस्टीममध्ये इंजेक्ट करणे
        container.innerHTML = 
            RegisterView.render() + LoginView.render() + KYCView.render() + 
            AgreementView.render() + SignatureView.render() + HomeView.render() + 
            SharesView.render() + AccountView.render() + CertificateView.render() + 
            AdminView.render();
    }
        
    const navContainer = document.getElementById('nav-target-container');
    if (navContainer) navContainer.innerHTML = NavigationComponent.render();
    
    // सुरुवातीला खालची नॅव्हिगेशन पट्टी आणि सर्व पॉपअप्स पूर्णपणे हायड (Lock) करणे
    const dock = document.getElementById('app-nav-dock');
    if (dock) dock.style.display = 'none'; 
    
    // सर्वात आधी थेट रजिस्ट्रेशन स्क्रीन ओपन करणे
    switchView('register');
    
    setTimeout(() => {
        const splash = document.getElementById('app-splash-screen');
        if (splash) splash.style.display = "none";
    }, 600);
});

// कडक कस्टम एलर्ट बॉक्स
function triggerAlert(title, message, statusType) {
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
    box.classList.remove('hidden');
    box.style.display = "flex";
}

function closeCustomAlert() { 
    const box = document.getElementById('custom-alert-box');
    if (box) {
        box.classList.add('hidden'); 
        box.style.display = "none";
    }
}

// मोबाईल स्क्रीन आणि स्क्रोलिंग लॉक करणारे मुख्य इंजिन (Strict Single-Screen Display Switcher)
function switchView(viewId) {
    // डोममधील इतर सर्व स्क्रीन पूर्णपणे बंद आणि ब्लॉक करणे (जेणेकरून पेज स्क्रोल होणार नाही)
    document.querySelectorAll('.view-panel').forEach(p => {
        p.style.display = "none";
        p.classList.remove('active');
    });
    
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
        target.style.display = "flex"; 
        target.classList.add('active');
        window.scrollTo(0, 0); // स्क्रीन नेहमी टॉपला लॉक ठेवणे
    }
    
    // नियम: फक्त home, shares, आणि account स्क्रीनवरच खालची नॅव्हिगेशन बार दिसणार!
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
    
    if (viewId === 'shares' && typeof renderUserAcquiredShares === 'function') { renderUserAcquiredShares(); }
    if (viewId === 'account' && typeof hydrateUserSession === 'function') { hydrateUserSession(); }
    if (viewId === 'admin' && typeof syncAdminMasterLedger === 'function') { syncAdminMasterLedger(); }
}

// १. नवीन युझर रजिस्ट्रेशन ॲक्शन ट्रिगर (Step 1 -> Step 2 KYC)
function handleAdvancedRegistration() {
    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pin = document.getElementById('reg-pin').value.trim();
    const cpin = document.getElementById('reg-cpin').value.trim();

    if (!name || name.length < 3) { return triggerAlert("Validation Error", "कृपया तुमचे पूर्ण नाव टाका.", "error"); }
    if (phone.length !== 10 || isNaN(phone)) { return triggerAlert("Validation Error", "कृपया १०-अंकी मोबाईल नंबर अचूक टाका.", "error"); }
    if (!email.includes("@") || !email.includes(".")) { return triggerAlert("Validation Error", "ईमेल आयडी चुकीचा आहे.", "error"); }
    if (pin.length !== 4 || pin !== cpin) { return triggerAlert("Validation Error", "४-अंकी सिक्युरिटी पिन मॅच होत नाहीये.", "error"); }

    currentUserMobile = phone;

    db.collection("users").doc(currentUserMobile).get().then((doc) => {
        if (doc.exists) {
            triggerAlert("Account Exists", "या नंबरवर आधीच अकाऊंट आहे. लॉगिन सेंटरवर जा.", "info");
            switchView('login');
        } else {
            // तात्पुरता डेटा ऑब्जेक्ट बनवणे आणि केवायसी वर जाणे
            globalUserDataObj = { name, phone, email, pin, isPaid: false, utrCode: "", registrationDate: new Date().toISOString().split('T')[0] };
            switchView('kyc'); 
        }
    }).catch(err => triggerAlert("System Error", err.message, "error"));
}

// २. युझर आणि मास्टर ॲडमीन लॉगिन सिस्टीम
function handleDirectLogin() {
    const phone = document.getElementById('login-phone').value.trim();
    const pin = document.getElementById('login-pin').value.trim();

    if (phone.length !== 10 || isNaN(phone)) { return triggerAlert("Security Error", "कृपया योग्य १०-अंकी नंबर टाका.", "error"); }
    if (pin.length !== 4 || isNaN(pin)) { return triggerAlert("Security Error", "पिन ४-अंकी असणे बंधनकारक आहे.", "error"); }

    currentUserMobile = phone;
    
    // कडक गुप्त कोड: मास्टर ॲडमिन डॅशबोर्ड उघडणे
    if (phone === "9999999999" && pin === "0000") { 
        globalUserDataObj = { name: "Master Admin Team", phone: "9999999999", isAdmin: true };
        triggerAlert("Access Granted", "मास्टर लेजर क्लिअरन्स स्वीकृत! ॲडमिन डेस्क सुरू होत आहे.", "success");
        setTimeout(() => { switchView('admin'); }, 600);
        return; 
    }

    db.collection("users").doc(currentUserMobile).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            if (data.pin === pin) { 
                globalUserDataObj = data; 
                triggerAlert("Success", "लॉगिन यशस्वी झाले!", "success");
                setTimeout(() => { switchView('home'); }, 600);
            } else { triggerAlert("Security Error", "तुमचा सिक्युरिटी पिन चुकीचा आहे.", "error"); }
        } else {
            triggerAlert("Not Found", "या नंबरवर अकाऊंट नाही, कृपया नवीन रजिस्ट्रेशन करा.", "info");
            switchView('register');
        }
    }).catch(err => triggerAlert("Sync Error", err.message, "error"));
}

// ३. केवायसी सबमिट करून एग्रीमेंटवर जाणे
function submitKYC() {
    const dob = document.getElementById('kyc-dob').value;
    const edu = document.getElementById('kyc-edu').value;
    if(!dob) { return triggerAlert("KYC Input", "कृपया तुमची जन्मतारीख सिलेक्ट करा.", "error"); }
    
    globalUserDataObj.education = edu; 
    globalUserDataObj.dob = dob;
    
    const nameSpan = document.getElementById('pdf-insert-name'); 
    const dateSpan = document.getElementById('pdf-insert-date');
    if(nameSpan) nameSpan.innerText = globalUserDataObj.name; 
    if(dateSpan) dateSpan.innerText = globalUserDataObj.registrationDate;
    
    switchView('agreement');
}

// ४. सिग्नेचर पॅनेलवर जाणे
function navigateToSignature() { 
    switchView('signature'); 
    setTimeout(() => {
        if (typeof initSignatureEngine === 'function') { initSignatureEngine(); }
    }, 350); 
}

// ५. सही आणि डेटा फायरबेसमध्ये सेव्ह करणे (Finalize Onboarding)
function generateAndSaveAgreement() {
    const canvas = document.getElementById('signature-canvas');
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL();
    globalUserDataObj.signatureUrl = dataUrl;

    // डेटा फायरबेस क्लाउडवर परमनंट सेव्ह करणे
    db.collection("users").doc(currentUserMobile).set(globalUserDataObj).then(() => {
        triggerAlert("Onboarding Complete", "तुमचा प्रोफाइल डेटा आणि डिजिटल स्वाक्षरी सुरक्षित जतन झाली आहे!", "success");
        setTimeout(() => { switchView('home'); }, 1000);
    }).catch(err => triggerAlert("Database Error", err.message, "error"));
}
