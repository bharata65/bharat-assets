// ==========================================================================
// BHARAT DIGITAL ASSETS - INSTITUTIONAL ONBOARDING REGISTER PANEL v4.3
// ==========================================================================

const RegisterView = {
    render: function() {
        return `
            <div id="view-register" class="view-panel active p-5 flex flex-col justify-center min-h-screen bg-slate-50/50 pb-16">
                <div class="w-full space-y-6 animate-fade-in">
                    
                    <div class="text-center">
                        <div class="w-16 h-16 bg-blue-900 rounded-2xl mx-auto flex items-center justify-center shadow-xl shadow-blue-900/10 mb-3 border border-blue-800">
                            <i class="fa-solid fa-building-columns text-white text-2xl"></i>
                        </div>
                        <h1 class="text-2xl font-black text-blue-950 tracking-tight">Bharat Digital Assets</h1>
                        <p class="text-xs text-slate-400 font-medium mt-1">Institutional Micro-Asset Management Platform</p>
                    </div>

                    <div class="space-y-4 bg-white border border-slate-100 rounded-[2rem] p-5 shadow-xl shadow-slate-100/60">
                        
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Full Name (As per Aadhar)</label>
                            <input type="text" id="reg-name" placeholder="Enter your full name" class="bda-input">
                        </div>
                        
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Mobile Number</label>
                            <input type="tel" id="reg-phone" maxlength="10" placeholder="Enter 10 digit number" class="bda-input" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                        </div>
                        
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                            <input type="email" id="reg-email" placeholder="name@domain.com" class="bda-input">
                        </div>
                        
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">4-Digit PIN</label>
                                <input type="password" id="reg-pin" maxlength="4" placeholder="••••" inputmode="numeric" class="bda-input text-center text-lg font-bold tracking-widest" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                            </div>
                            <div>
                                <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Confirm PIN</label>
                                <input type="password" id="reg-cpin" maxlength="4" placeholder="••••" inputmode="numeric" class="bda-input text-center text-lg font-bold tracking-widest" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                            </div>
                        </div>
                        
                        <div class="pt-2">
                            <button onclick="handleAdvancedRegistration()" class="w-full py-4 bg-blue-900 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-900/20 active:scale-[0.96] transition duration-200 flex items-center justify-center gap-2">
                                <i class="fa-solid fa-shield-halved text-xs"></i> Initialize Secure Onboarding
                            </button>
                        </div>
                        
                        <div class="text-center pt-2 border-t border-slate-50">
                            <p class="text-xs text-slate-400 font-medium">Already a registered entity? <button onclick="switchView('login')" class="text-blue-900 font-black underline focus:outline-none ml-1">Login Center</button></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};
