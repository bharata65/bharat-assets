// ==========================================================================
// BHARAT DIGITAL ASSETS - ENTERPRISE BOTTOM FLOATING NAVIGATION DOCK v4.3
// ==========================================================================

const NavigationComponent = {
    // मुख्य नेव्हिगेशन पट्टीचा HTML लेआउट जनरेट करणे
    render: function() {
        return `
            <nav id="app-nav-dock" class="bottom-dock shadow-2xl transition-all duration-300">
                <button onclick="switchView('home')" class="flex flex-col items-center gap-1 text-blue-900 transition-all duration-200" id="nav-home">
                    <div class="w-10 h-6 flex items-center justify-center rounded-full transition-all" id="nav-bg-home">
                        <i class="fa-solid fa-wallet text-xl"></i>
                    </div>
                    <span class="text-[10px] font-black tracking-wider uppercase">Home</span>
                </button>

                <button onclick="switchView('shares')" class="flex flex-col items-center gap-1 text-slate-400 transition-all duration-200" id="nav-shares">
                    <div class="w-10 h-6 flex items-center justify-center rounded-full transition-all" id="nav-bg-shares">
                        <i class="fa-solid fa-chart-pie text-xl"></i>
                    </div>
                    <span class="text-[10px] font-black tracking-wider uppercase">Shares</span>
                </button>

                <button onclick="switchView('account')" class="flex flex-col items-center gap-1 text-slate-400 transition-all duration-200" id="nav-account">
                    <div class="w-10 h-6 flex items-center justify-center rounded-full transition-all" id="nav-bg-account">
                        <i class="fa-solid fa-user-shield text-xl"></i>
                    </div>
                    <span class="text-[10px] font-black tracking-wider uppercase">Account</span>
                </button>
            </nav>
        `;
    },
    
    // युझर ज्या स्क्रीनवर असेल, त्यानुसार खालचा आयकॉन हायलाईट करणे (State Matrix)
    updateActiveState: function(viewId) {
        const views = ['home', 'shares', 'account'];
        
        if (views.includes(viewId)) {
            views.forEach(v => {
                const buttonEl = document.getElementById(`nav-${v}`);
                const bgEl = document.getElementById(`nav-bg-${v}`);
                
                if (buttonEl && bgEl) {
                    if (v === viewId) {
                        // ॲक्टिव्ह आयकॉन डिझाईन (Premium Wealth Blue)
                        buttonEl.className = "flex flex-col items-center gap-1 text-blue-900 scale-105 font-bold transition-all duration-200";
                        bgEl.classList.add('bg-blue-50/80', 'px-3');
                    } else {
                        // इन-ॲक्टिव्ह आयकॉन डिझाईन (Slate Muted)
                        buttonEl.className = "flex flex-col items-center gap-1 text-slate-400 active:scale-95 transition-all duration-200";
                        bgEl.className = "w-10 h-6 flex items-center justify-center rounded-full transition-all";
                    }
                }
            });
        }
    }
};

console.log("BDA Components Hub: Bottom dock navigation renderer loaded.");
