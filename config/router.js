// ==========================================================================
// BHARAT DIGITAL ASSETS - MAIN ROUTER MATRIX OPERATIONAL ENGINE v7.0
// ==========================================================================

window.currentUserMobile = "";
window.globalUserDataObj = null;

window.addEventListener('load', () => {
    const mainViewTarget = document.getElementById('view-target-container');
    const bottomNavTarget = document.getElementById('nav-target-container');
    
    if (mainViewTarget) {
        mainViewTarget.innerHTML = 
            RegisterView.render() + LoginView.render() + KYCView.render() + 
            AgreementView.render() + SignatureView.render() + HomeView.render() + 
            SharesView.render() + AccountView.render() + CertificateView.render() + 
            AdminView.render();
    }
    if (bottomNavTarget && typeof NavigationComponent !== 'undefined') {
        bottomNavTarget.innerHTML = NavigationComponent.render();
    }

    const navigationDockInstance = document.getElementById('app-nav-dock');
    if (navigationDockInstance) navigationDockInstance.style.setProperty('display', 'none', 'important');

    const cachedUserMobileKey = localStorage.getItem('bda_active_mobile');
    if (cachedUserMobileKey) {
        window.currentUserMobile = cachedUserMobileKey;
        db.collection("users").doc(cachedUserMobileKey).get().then((doc) => {
            if (doc.exists) {
                window.globalUserDataObj = doc.data();
                switchView('home');
            } else {
                localStorage.removeItem('bda_active_mobile');
                switchView('register');
            }
            disableSystemLoadingSplash();
        }).catch(() => { switchView('register'); disableSystemLoadingSplash(); });
    } else {
        switchView('register');
        disableSystemLoadingSplash();
    }
});

function disableSystemLoadingSplash() {
    const splash = document.getElementById('app-splash-screen');
    if (splash) { splash.style.opacity = "0"; setTimeout(() => { splash.style.display = "none"; }, 300); }
}

window.triggerAlert = function(titleStr, messageStr, statusType) {
    const box = document.getElementById('custom-alert-box');
    const iconWrapper = document.getElementById('alert-icon-wrapper');
    const headerEl = document.getElementById('alert-title-text');
    const msgEl = document.getElementById('alert-msg-text');
    
    if (!box || !iconWrapper || !headerEl || !msgEl) return;
    headerEl.innerText = titleStr; msgEl.innerText = messageStr;
    
    if (statusType === 'success') {
        iconWrapper.className = "w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl shadow-inner";
        iconWrapper.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    } else {
        iconWrapper.className = "w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-xl shadow-inner";
        iconWrapper.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
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

window.switchView = function(targetViewUniqueId) {
    document.querySelectorAll('.view-panel').forEach(viewNode => {
        viewNode.style.setProperty('display', 'none', 'important');
        viewNode.classList.remove('active');
    });
    
    const operationalTargetView = document.getElementById(`view-${targetViewUniqueId}`);
    if (operationalTargetView) {
        operationalTargetView.style.setProperty('display', 'flex', 'important');
        operationalTargetView.classList.add('active');
        
        // Dynamic scroll reset sequence
        const scrollBox = document.getElementById('view-target-container');
        if(scrollBox) scrollBox.scrollTop = 0;
    }
    
    const dockContainer = document.getElementById('app-nav-dock');
    if (dockContainer) {
        if (['home', 'shares', 'account'].includes(targetViewUniqueId)) {
            dockContainer.style.setProperty('display', 'flex', 'important');
            dockContainer.classList.remove('hidden');
        } else {
            dockContainer.style.setProperty('display', 'none', 'important');
            dockContainer.classList.add('hidden');
        }
    }
    
    if (typeof NavigationComponent !== 'undefined' && document.getElementById('app-nav-dock')) {
        NavigationComponent.updateActiveState(targetViewUniqueId);
    }

    if (targetViewUniqueId === 'home' && typeof updateDashboardDisplayValues === 'function') updateDashboardDisplayValues();
    if (targetViewUniqueId === 'shares' && typeof renderUserAcquiredShares === 'function') renderUserAcquiredShares();
    if (targetViewUniqueId === 'account' && typeof hydrateUserSession === 'function') hydrateUserSession();
    if (targetViewUniqueId === 'admin' && typeof syncAdminMasterLedger === 'function') syncAdminMasterLedger();
};

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
        switchView('admin'); return; 
    }

    db.collection("users").doc(window.currentUserMobile).get().then((doc) => {
        if (doc.exists && doc.data().pin === pin) {
            window.globalUserDataObj = doc.data();
            localStorage.setItem('bda_active_mobile', phone);
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
