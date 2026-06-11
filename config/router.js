// ==========================================================================
// BHARAT DIGITAL ASSETS - MASTER PERSISTENT CORE FRAMEWORK ENGINE v6.5
// ==========================================================================

window.currentUserMobile = "";
window.globalUserDataObj = null;

window.addEventListener('load', () => {
    const container = document.getElementById('view-target-container');
    const navContainer = document.getElementById('nav-target-container');
    
    if (container) {
        container.innerHTML = 
            RegisterView.render() + LoginView.render() + KYCView.render() + 
            AgreementView.render() + SignatureView.render() + HomeView.render() + 
            SharesView.render() + AccountView.render() + CertificateView.render() + 
            AdminView.render();
    }
    if (navContainer && typeof NavigationComponent !== 'undefined') {
        navContainer.innerHTML = NavigationComponent.render();
    }

    // Force hide navigation dock layout strictly on load trigger
    const dock = document.getElementById('app-nav-dock');
    if (dock) dock.style.setProperty('display', 'none', 'important');

    // CHECK PERSISTENT USER DATA MATRIX LOCK
    const savedMobile = localStorage.getItem('bda_active_mobile');
    if (savedMobile) {
        window.currentUserMobile = savedMobile;
        db.collection("users").doc(savedMobile).get().then((doc) => {
            if (doc.exists) {
                window.globalUserDataObj = doc.data();
                exposeGlobalChatbotTrigger(false);
                switchView('home');
            } else {
                localStorage.removeItem('bda_active_mobile');
                switchView('register');
                exposeGlobalChatbotTrigger(true);
            }
            hideAppLoaderSplash();
        }).catch(() => { switchView('register'); exposeGlobalChatbotTrigger(true); hideAppLoaderSplash(); });
    } else {
        switchView('register');
        exposeGlobalChatbotTrigger(true);
        hideAppLoaderSplash();
    }
});

function hideAppLoaderSplash() {
    const splash = document.getElementById('app-splash-screen');
    if (splash) { splash.style.opacity = "0"; setTimeout(() => { splash.style.display = "none"; }, 300); }
}

// Fixed Global Alert Popup Management Engine
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
    } else {
        wrapper.className = "w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-xl shadow-inner";
        wrapper.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
    }
    box.style.setProperty('display', 'flex', 'important');
    box.classList.remove('hidden');
};

window.closeCustomAlert = function() {
    const box = document.getElementById('custom-alert-box');
    if (box) {
        box.classList.add('hidden');
        box.style.setProperty('display', 'none', 'important');
    }
};

// Strict Display Engine View Matrix Mapping
window.switchView = function(viewId) {
    document.querySelectorAll('.view-panel').forEach(p => {
        p.style.setProperty('display', 'none', 'important');
        p.classList.remove('active');
    });
    
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
        target.style.setProperty('display', 'flex', 'important');
        target.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    // Bottom Dock Visibility Mapping Layer
    const dock = document.getElementById('app-nav-dock');
    if (dock) {
        if (viewId === 'home' || viewId === 'shares' || viewId === 'account') {
            dock.style.setProperty('display', 'flex', 'important');
            dock.classList.remove('hidden');
        } else {
            dock.style.setProperty('display', 'none', 'important');
            dock.classList.add('hidden');
        }
    }
    
    if (typeof NavigationComponent !== 'undefined' && document.getElementById('app-nav-dock')) {
        NavigationComponent.updateActiveState(viewId);
    }

    if (viewId === 'home' && typeof updateDashboardDisplayValues === 'function') updateDashboardDisplayValues();
    if (viewId === 'shares' && typeof renderUserAcquiredShares === 'function') renderUserAcquiredShares();
    if (viewId === 'account' && typeof hydrateUserSession === 'function') hydrateUserSession();
    if (viewId === 'admin' && typeof syncAdminMasterLedger === 'function') syncAdminMasterLedger();
};

function exposeGlobalChatbotTrigger(shouldShow) {
    let btn = document.getElementById('global-onboarding-chat-trigger');
    if (!btn && shouldShow) {
        btn = document.createElement('button'); btn.id = 'global-onboarding-chat-trigger';
        btn.className = "fixed bottom-6 right-6 w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-2xl z-[48] border border-slate-800 active:scale-95 transition-all";
        btn.innerHTML = `<i class="fa-solid fa-headset text-base"></i><span class="w-2 h-2 bg-emerald-500 rounded-full absolute top-1 right-1 animate-pulse"></span>`;
        btn.onclick = () => { if (typeof openChatbot === 'function') openChatbot(); };
        document.body.appendChild(btn);
    }
    if (btn) btn.style.display = shouldShow ? 'flex' : 'none';
}

window.handleAdvancedRegistration = function() {
    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pin = document.getElementById('reg-pin').value.trim();
    const cpin = document.getElementById('reg-cpin').value.trim();

    if (!name || name.length < 3) return triggerAlert("Validation Error", "Please provide your full registration name.", "error");
    if (phone.length !== 10 || isNaN(phone)) return triggerAlert("Validation Error", "Please input an authentic 10-digit mobile number.", "error");
    if (!email.includes("@")) return triggerAlert("Validation Error", "Invalid email structure syntax.", "error");
    if (pin.length !== 4 || pin !== cpin) return triggerAlert("Validation Error", "Security 4-Digit access PIN parameters mismatch.", "error");

    window.currentUserMobile = phone;
    db.collection("users").doc(window.currentUserMobile).get().then((doc) => {
        if (doc.exists) {
            triggerAlert("Account Exists", "This mobile line is already registered. Routing to Login.", "error");
            switchView('login');
        } else {
            window.globalUserDataObj = { name, phone, email, pin, isPaid: false, bankLinked: false, sharesCount: 1, utrCode: "", registrationDate: new Date().toISOString().split('T')[0] };
            switchView('kyc'); 
        }
    });
};

window.handleDirectLogin = function() {
    const phone = document.getElementById('login-phone').value.trim();
    const pin = document.getElementById('login-pin').value.trim();
    window.currentUserMobile = phone;
    
    if (phone === "9999999999" && pin === "0000") { 
        window.globalUserDataObj = { name: "Master Admin Team", phone: "9999999999", isAdmin: true };
        exposeGlobalChatbotTrigger(false); switchView('admin'); return; 
    }

    db.collection("users").doc(window.currentUserMobile).get().then((doc) => {
        if (doc.exists && doc.data().pin === pin) {
            window.globalUserDataObj = doc.data();
            localStorage.setItem('bda_active_mobile', phone);
            exposeGlobalChatbotTrigger(false);
            switchView('home');
        } else { triggerAlert("Security Error", "Invalid authentication credentials mapped.", "error"); }
    });
};

window.submitKYC = function() {
    const dob = document.getElementById('kyc-dob').value;
    if(!dob) return triggerAlert("KYC Input", "Please map your actual Date of Birth.", "error");
    window.globalUserDataObj.dob = dob; switchView('agreement');
};

window.navigateToSignature = function() { switchView('signature'); setTimeout(() => { if (typeof initSignatureEngine === 'function') initSignatureEngine(); }, 350); };
