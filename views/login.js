// ==========================================================================
// BHARAT DIGITAL ASSETS - SECURED VAULT ACCESS LOGIN PANEL v4.3
// ==========================================================================

const LoginView = {
    // स्क्रीन १बी: लॉगिन पॅनेलचा स्वतंत्र लेआउट रेंडर करणे
    render: function() {
        return `
            <div id="view-login" class="view-panel p-5 flex flex-col justify-center min-h-screen bg-slate-50/50 pb-16" style="display: none;">
                <div id="panel-login-sub" class="w-full space-y-6 animate-fade-in">
                    
                    <div class="text-center">
                        <div class="w-16 h-16 bg-slate-950 rounded-2xl mx-auto flex items-center justify-center shadow-xl shadow-slate-950/10 mb-3 border border-slate-800">
                            <i class="fa-solid fa-fingerprint text-white text-2xl animate-pulse"></i>
                        </div>
                        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Vault Access Centre</h1>
                        <p class="text-xs text-slate-400 font-medium mt-1">Unlock Institutional Share Node Portfolio</p>
                    </div>

                    <div class="space-y-4 bg-white border border-slate-100 rounded-[2rem] p-5 shadow-xl shadow-slate-100/60">
                        
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Registered Mobile Number</label>
                            <input type="tel" id="login-phone" maxlength="10" placeholder="Enter 10 digit number" class="bda-input" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                        </div>
                        
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Secure 4-Digit Security PIN</label>
                            <input type="password" id="login-pin" maxlength="4" placeholder="••••" inputmode="numeric" class="bda-input text-center text-xl font-bold tracking-widest" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                        </div>
                        
                        <div class="pt-2">
                            <button onclick="handleDirectLogin()" class="w-full py-4 bg-slate-950 text-white rounded-2xl font-bold text-sm shadow-lg shadow-slate-950/20 active:scale-[0.96] transition duration-200 flex items-center justify-center gap-2">
                                <i class="fa-solid fa-key text-xs text-slate-400"></i> Unlock Asset Account
                            </button>
                        </div>
                        
                        <div class="text-center pt-2 border-t border-slate-50">
                            <p class="text-xs text-slate-400 font-medium">New asset member? <button onclick="toggleAuthPanels('register'); switchView('register')" class="text-slate-950 font-black underline focus:outline-none ml-1">Create Node Portfolio</button></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

console.log("BDA Views Hub: Discrete login vault view template registered.");
