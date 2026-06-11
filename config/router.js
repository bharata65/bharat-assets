// ==========================================================================
// BHARAT DIGITAL ASSETS - ENTERPRISE ROUTER & DISPATCH ENGINE v5.0 (ENGLISH)
// ==========================================================================

window.currentUserMobile = "";
window.globalUserDataObj = null;

window.addEventListener('load', () => {
    console.log("BDA Core Pipeline: Initializing Master Handshake.");
    
    const container = document.getElementById('view-target-container');
    const navContainer = document.getElementById('nav-target-container');
    
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
    
    // NAVIGATION DOCK RULES: Hided until successful authorization profile is loaded
    const dock = document.getElementById('app-nav-dock');
    if (dock) dock.style.display = 'none'; 
    
    // Globally expose the chatbot floating trigger button right from onboarding step 1
    exposeGlobalChatbotTrigger(true);
    
    switchView('register');
    
    setTimeout(() => {
        const splash = document.getElementById('app-splash-screen');
        if (splash) {
            splash.style.opacity = "0";
            setTimeout(() => { splash.style.display = "none"; }, 300);
        }
    }, 600);
});

// Standard Institutional Notification Engine
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
    if (box) { box.style.display = "none"; box.classList.add('hidden'); }
};

// Strict Mobile Locking View Screen Engine
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
        // Lower icons visibility rules: Only displayed for Authorized Home ecosystem view tabs
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

// Helper to handle chatbot button placement on non-authorized screens
function exposeGlobalChatbotTrigger(shouldShow) {
    let btn = document.getElementById('global-onboarding-chat-trigger');
    if (!btn && shouldShow) {
        btn = document.createElement('button');
        btn.id = 'global-onboarding-chat-trigger';
        btn.className = "fixed bottom-4 right-4 w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-2xl z-[45] border border-slate-800 active:scale-95 transition-all";
        btn.innerHTML = `<i class="fa-solid fa-headset text-base"></i><span class="w-2 h-2 bg-emerald-500 rounded-full absolute top-1 right-1 animate-pulse"></span>`;
        btn.onclick = () => { if (typeof openChatbot === 'function') openChatbot(); };
        document.body.appendChild(btn);
    }
    if (btn) {
        btn.style.display = shouldShow ? 'flex' : 'none';
    }
}

// Onboarding Registration Handshake Logic
window.handleAdvancedRegistration = function() {
    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pin = document.getElementById('reg-pin').value.trim();
    const cpin = document.getElementById('reg-cpin').value.trim();

    if (!name || name.length < 3) return triggerAlert("Validation Error", "Please provide your full registration name.", "error");
    if (phone.length !== 10 || isNaN(phone)) return triggerAlert("Validation Error", "Please input an authentic 10-digit mobile number.", "error");
    if (!email.includes("@") || !email.includes(".")) return triggerAlert("Validation Error", "Invalid organizational email structure.", "error");
    if (pin.length !== 4 || pin !== cpin) return triggerAlert("Validation Error", "Security 4-Digit access PIN parameters do not match.", "error");

    window.currentUserMobile = phone;

    db.collection("users").doc(window.currentUserMobile).get().then((doc) => {
        if (doc.exists) {
            triggerAlert("Account Exists", "This node vector is already registered. Routing to Login Panel.", "info");
            switchView('login');
        } else {
            window.globalUserDataObj = { name, phone, email, pin, isPaid: false, bankLinked: false, utrCode: "", registrationDate: new Date().toISOString().split('T')[0] };
            switchView('kyc'); 
        }
    }).catch(err => triggerAlert("System Error", err.message, "error"));
};

// Vault Authentication Credentials Logic
window.handleDirectLogin = function() {
    const phone = document.getElementById('login-phone').value.trim();
    const pin = document.getElementById('login-pin').value.trim();

    if (phone.length !== 10 || isNaN(phone)) return triggerAlert("Security Error", "Please supply your registered 10-digit credentials.", "error");
    if (pin.length !== 4 || isNaN(pin)) return triggerAlert("Security Error", "Verification PIN constraint requires 4 digits.", "error");

    window.currentUserMobile = phone;
    
    // Master Administrative Authentication Bypass Hook
    if (phone === "9999999999" && pin === "0000") { 
        window.globalUserDataObj = { name: "Master Admin Team", phone: "9999999999", isAdmin: true };
        triggerAlert("Access Cleared", "Administrative verification token authorized. Loading ledger nodes.", "success");
        exposeGlobalChatbotTrigger(false);
        setTimeout(() => { switchView('admin'); }, 600);
        return; 
    }

    db.collection("users").doc(window.currentUserMobile).get().then((doc) => {
        if (doc.exists) {
            const data = doc.data();
            if (data.pin === pin) { 
                window.globalUserDataObj = data; 
                triggerAlert("Authorized", "Authentication handshake successful.", "success");
                exposeGlobalChatbotTrigger(false); // Use dashboard integrated launcher instead
                
                setTimeout(() => { 
                    if (!data.bankLinked) {
                        // Forward user immediately to step 5 setup if settlement data is completely blank
                        switchView('signature'); 
                    } else {
                        switchView('home'); 
                    }
                }, 600);
            } else { triggerAlert("Security Error", "The access verification PIN configuration is invalid.", "error"); }
        } else {
            triggerAlert("Record Missing", "No account registered with this profile node line.", "info");
            switchView('register');
        }
    }).catch(err => triggerAlert("Sync Failure", err.message, "error"));
};

window.submitKYC = function() {
    const dob = document.getElementById('kyc-dob').value;
    const edu = document.getElementById('kyc-edu').value;
    if(!dob) return triggerAlert("KYC Input", "Please map your actual Date of Birth.", "error");
    
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

window.navigateToSignature = function() { 
    switchView('signature'); 
    setTimeout(() => { if (typeof initSignatureEngine === 'function') initSignatureEngine(); }, 350); 
};
