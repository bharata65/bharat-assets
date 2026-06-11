// ==========================================================================
// BHARAT DIGITAL ASSETS - MASTER PERSISTENT FIXED COMPONENT DECK ELEMENT
// ==========================================================================

const NavigationComponent = {
    render: function() {
        return `
            <nav id="app-nav-dock" class="bottom-dock shadow-2xl" style="display: none;">
                <button onclick="switchView('home')" class="flex flex-col items-center gap-1 text-blue-900 transition-all shadow-none" id="nav-home">
                    <div class="w-10 h-6 flex items-center justify-center rounded-full transition-all" id="nav-bg-home">
                        <i class="fa-solid fa-wallet text-lg"></i>
                    </div>
                    <span class="text-[9px] font-black tracking-wider uppercase">Home</span>
                </button>

                <button onclick="switchView('shares')" class="flex flex-col items-center gap-1 text-slate-400 transition-all shadow-none" id="nav-shares">
                    <div class="w-10 h-6 flex items-center justify-center rounded-full transition-all" id="nav-bg-shares">
                        <i class="fa-solid fa-chart-pie text-lg"></i>
                    </div>
                    <span class="text-[9px] font-black tracking-wider uppercase">Shares</span>
                </button>

                <button onclick="switchView('account')" class="flex flex-col items-center gap-1 text-slate-400 transition-all shadow-none" id="nav-account">
                    <div class="w-10 h-6 flex items-center justify-center rounded-full transition-all" id="nav-bg-account">
                        <i class="fa-solid fa-user-shield text-lg"></i>
                    </div>
                    <span class="text-[9px] font-black tracking-wider uppercase">Account</span>
                </button>
            </nav>
        `;
    },
    
    updateActiveState: function(viewId) {
        const routes = ['home', 'shares', 'account'];
        if (routes.includes(viewId)) {
            routes.forEach(r => {
                const buttonElement = document.getElementById(`nav-${r}`);
                const backgroundHighlight = document.getElementById(`nav-bg-${r}`);
                if (buttonElement && backgroundHighlight) {
                    if (r === viewId) {
                        buttonElement.className = "flex flex-col items-center gap-1 text-blue-900 scale-105 font-bold transition-all shadow-none";
                        backgroundHighlight.className = "w-10 h-6 flex items-center justify-center rounded-full transition-all bg-blue-50/80 px-3";
                    } else {
                        buttonElement.className = "flex flex-col items-center gap-1 text-slate-400 transition-all shadow-none";
                        backgroundHighlight.className = "w-10 h-6 flex items-center justify-center rounded-full transition-all";
                    }
                }
            });
        }
    }
};
