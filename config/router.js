// ==========================================================================
// BHARAT DIGITAL ASSETS - MASTER ENTERPRISE VIEW ROUTER & GUARD ENGINE v4.3
// ==========================================================================

window.addEventListener('DOMContentLoaded', () => {
    // ॲप सुरू होताच सर्व स्क्रीन मॉड्युलरली फ्रेममध्ये इंजेक्ट करणे
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
    
    // सुरुवातीला नॅव्हिगेशन पट्टी पूर्णपणे लपवून ठेवणे (Strict Security Lock)
    const dock = document.getElementById('app-nav-dock');
    if (dock) dock.classList.add('hidden');
    
    // सिस्टीम बाय-फॉल्ट पहिल्या स्क्रीनवर (Register View) ट्रिगर करणे
    switchView('register');
    
    // प्रगत बँकिंग स्प्लॅश स्क्रीनला ६००ms नंतर बंद करणे
    setTimeout(() => {
        const splash = document.getElementById('app-splash-screen');
        if (splash) splash.style.display = "none";
    }, 600);
});

// प्रगत सानुकूल बँक ॲप अलर्ट सिस्टीम (Custom Notification Popups UI)
function triggerAlert(title, message, statusType) {
    const box = document.getElementById('custom-alert-box');
    const wrapper = document.getElementById('alert-icon-wrapper');
    const tEl = document.getElementById('alert-title-text');
    const mEl = document.getElementById('alert-msg-text');
    
    if (!box || !wrapper || !tEl || !mEl) return;
    tEl.innerText = title; 
    mEl.innerText = message;
    
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

// मास्टर राऊटर व्ह्यू स्विचर इंजिन (Strict Class Mapping Layer)
function switchView(viewId) {
    // सुरक्षा कवच: युझर सत्र रिकामे असल्यास अंतर्गत कोर पेजेस लॉक करणे
    if (!globalUserDataObj && viewId !== 'register' && viewId !== 'login' && viewId !== 'kyc' && viewId !== 'agreement' && viewId !== 'signature' && viewId !== 'admin') {
        console.error("BDA Routing Shield: Unauthorized Navigation Intercepted.");
        return;
    }
    
    // सर्व वर्तमान चालू असणाऱ्या स्क्रीन बंद करणे
    document.querySelectorAll('.view-panel').forEach(p => {
        p.style.display = "none";
        p.classList.remove('active');
    });
    
    // लक्ष्यित व्ह्यू स्क्रीन सुरक्षित चालू करणे
    const target = document.getElementById(`view-${viewId}`);
    if (target) {
        target.style.display = "block";
        target.classList.add('active');
    }
    
    // खालच्या नॅव्हिगेशन पट्टीची स्थिती अचूक बदलणे
    if (typeof NavigationComponent !== 'undefined' && document.getElementById('app-nav-dock')) {
        NavigationComponent.updateActiveState(viewId);
    }
    
    // अंतर्गत पेजेस उघडल्यास त्यातील लाईव्ह डेटा सिस्टीम पुन्हा लोड करणे
    if (viewId === 'shares' && typeof renderUserAcquiredShares === 'function') { renderUserAcquiredShares(); }
    if (viewId === 'account' && typeof hydrateUserSession === 'function') { hydrateUserSession(); }
}

// संपूर्ण सुरक्षित ॲप्लिकेशन अनलॉक करून युझर डॅशबोर्ड उघडणे
function unlockSecureApplication() {
    const dock = document.getElementById('app-nav-dock');
    if (dock) dock.classList.remove('hidden'); // नॅव्हिगेशन डॉक सुरू करणे
    if (typeof hydrateUserSession === 'function') hydrateUserSession();
    switchView('home'); // थेट होम वर घेऊन जाणे
}
