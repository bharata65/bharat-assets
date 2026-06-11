// ==========================================================================
// BHARAT DIGITAL ASSETS - MASTER ROUTER & OPERATIONS FLOW FIX v4.3.1
// ==========================================================================

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('view-target-container');
    if (container) {
        container.innerHTML = 
            RegisterView.render() + LoginView.render() + KYCView.render() + 
            AgreementView.render() + SignatureView.render() + HomeView.render() + 
            SharesView.render() + AccountView.render() + CertificateView.render() + 
            AdminView.render();
    }
        
    const navContainer = document.getElementById('nav-target-container');
    if (navContainer) navContainer.innerHTML = NavigationComponent.render();
    
    const dock = document.getElementById('app-nav-dock');
    if (dock) dock.classList.add('hidden'); // सुरुवातीला नॅव्हिगेशन पट्टी पूर्ण लॉक
    
    switchView('register');
    
    setTimeout(() => {
        const splash = document.getElementById('app-splash-screen');
        if (splash) splash.style.display = "none";
    }, 600);
});

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
}
function closeCustomAlert() { document.getElementById('custom-alert-box').classList.add('hidden'); }

// कडक व्ह्यू स्विचर इंजिन (Strict Display Classes Reset)
function switchView(viewId) {
    if (!globalUserDataObj && viewId !== 'register' && viewId !== 'login' && viewId !== 'kyc' && viewId !== 'agreement' && viewId !== 'signature' && viewId !== 'admin') {
        return;
    }
    
    // डोममधील सर्व व्ह्यूज पूर्णपणे गायब करणे (Hides browser bar shifts)
    document.querySelectorAll('.view-panel').forEach(p => {
        p.style.display = "none";
        p.classList.remove('active');
    });
    
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
        target.style.display = "flex"; // CSS flex सह उभं अलाइनमेंट घट्ट ठेवण्यासाठी
        target.classList.add('active');
    }
    
    // ऑनबोर्डिंग स्क्रीनवर खालचे आयकॉन लपवणे
    const dock = document.getElementById('app-nav-dock');
    if (dock) {
        if (viewId === 'register' || viewId === 'login' || viewId === 'kyc' || viewId === 'agreement' || viewId === 'signature' || viewId === 'admin') {
            dock.classList.add('hidden');
        } else {
            dock.classList.remove('hidden');
        }
    }
    
    if (typeof NavigationComponent !== 'undefined' && document.getElementById('app-nav-dock')) {
        NavigationComponent.updateActiveState(viewId);
    }
    
    if (viewId === 'shares' && typeof renderUserAcquiredShares === 'function') { renderUserAcquiredShares(); }
    if (viewId === 'account' && typeof hydrateUserSession === 'function') { hydrateUserSession(); }
}

// नवीन युझर रजिस्ट्रेशन ॲक्शन ट्रिगर (Step 1 -> Step 2 KYC)
function handleAdvancedRegistration() {
    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pin = document.getElementById('reg-pin').value.trim();
    const cpin = document.getElementById('reg-cpin').value.trim();

    if (!name || name.length < 3) { return triggerAlert("Entry Validation", "Please enter your valid complete full name.", "error"); }
    if (phone.length !== 10 || isNaN(phone)) { return triggerAlert("Entry Validation", "Please supply an operational 10-digit mobile number.", "error"); }
    if (!email.includes("@") || !email.includes(".")) { return triggerAlert("Entry Validation", "Email structure syntax mismatch.", "error"); }
    if (pin.length !== 4 || pin !== cpin) { return triggerAlert("Entry Validation", "4-digit security PIN nodes do not match.", "error"); }

    currentUserMobile = phone;

    db.collection("users").doc(currentUserMobile).get().then((doc) => {
        if (doc.exists) {
            triggerAlert("Entity Node Registered", "Account already exists with this number. Redirected to Login.", "info");
            switchView('login');
        } else {
            globalUserDataObj = { name, phone, email, pin, isPaid: false, utrCode: "", registrationDate: new Date().toISOString().split('T')[0] };
            switchView('kyc'); // आता विना अडथळा थेट स्क्रीन २ वर जाणार!
        }
    }).catch(err => triggerAlert("System Error", err.message, "error"));
}

// युझर आणि मास्टर ॲडमीनसाठी लॉगिन ट्रिगर
function handleDirectLogin() {
    const phone = document.getElementById('login-phone').value.trim();
    const pin = document.getElementById('login-pin').value.trim();

    if (phone.length !== 10 || isNaN(phone)) { return triggerAlert("Security Matrix Fail", "Please input an authentic registered 10-digit mobile number.", "error"); }
    if (pin.length !== 4 || isNaN(pin)) { return triggerAlert("Security Matrix Fail", "Login PIN parameters must match 4-digits standard.", "error"); }

    currentUserMobile = phone;
    
    // मास्टर ॲडमिन पॅनल उघडण्याचे गुपित लॉजिक
    if (phone === "9999999999" && pin === "0000") { 
        globalUserDataObj = { name: "Master Admin Team", phone: "9999999999", isAdmin: true };
        triggerAlert("Security Clearance", "Master administrative node recognized. Launching Ledger.", "success");
        setTimeout(() => { launchAdminModule(); }, 500);
        return; 
    }

    db.collection("users").doc(currentUserMobile).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            if (data.pin === pin) { 
                globalUserDataObj = data; 
                if (!globalUserDataObj.bankDetails) { openBankModal(); } else { unlockSecureApplication(); }
            } else { triggerAlert("Validation Error", "The access authentication verification PIN is incorrect.", "error"); }
        } else {
            triggerAlert("Account Missing", "No member account found with this number. Please register.", "info");
            switchView('register');
        }
    }).catch(err => triggerAlert("Sync Failure", err.message, "error"));
}

// बाकीचे सर्व फंक्शन जसेच्या तसे खाली राहतील...
function submitKYC() {
    const dob = document.getElementById('kyc-dob').value;
    const edu = document.getElementById('kyc-edu').value;
    if(!dob) { return triggerAlert("Identity Profile Matrix", "Date of Birth cannot remain vacant.", "error"); }
    globalUserDataObj.education = edu; globalUserDataObj.dob = dob;
    const nameSpan = document.getElementById('pdf-insert-name'); const dateSpan = document.getElementById('pdf-insert-date');
    if(nameSpan) nameSpan.innerText = globalUserDataObj.name; if(dateSpan) dateSpan.innerText = globalUserDataObj.registrationDate;
    switchView('agreement');
}
function navigateToSignature() { switchView('signature'); setTimeout(() => { initSignatureEngine(); }, 350); }
