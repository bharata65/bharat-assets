// ==========================================================================
// BHARAT DIGITAL ASSETS - INSTITUTIONAL ACCOUNT CENTER & BANK BINDER v4.3
// ==========================================================================

const AccountView = {
    // स्क्रीन ७: अकाऊंट सेंटर पॅनेलचा स्वतंत्र लेआउट रेंडर करणे
    render: function() {
        return `
            <div id="view-account" class="view-panel p-5 space-y-5 pb-24 bg-slate-50/40" style="display: none;">
                
                <div class="space-y-1 animate-fade-in">
                    <h2 class="text-xl font-black text-blue-950 tracking-tight">Account Center</h2>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Manage your institutional nodes and settlement cards</p>
                </div>

                <div class="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 space-y-4 animate-fade-in [animation-delay:0.05s]">
                    <div class="flex justify-between items-center border-b border-slate-50 pb-2.5">
                        <h4 class="text-[10px] font-black text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                            <i class="fa-solid fa-building-columns text-xs"></i> Linked Settlement Bank
                        </h4>
                        <span class="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100/30 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">Gateway Verified</span>
                    </div>
                    
                    <div id="bank-display-block" class="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200 text-center transition-all duration-300">
                        <p class="text-xs text-slate-400 font-medium">No active settlement bank account linked yet.</p>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 space-y-3.5 animate-fade-in [animation-delay:0.1s]">
                    <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-wider">Member Security Metrics</h4>
                    
                    <div class="flex justify-between items-center text-xs py-2 border-b border-slate-50">
                        <span class="text-slate-400 font-medium">Profile Entity Name</span>
                        <span id="acc-name" class="font-black text-slate-800 uppercase tracking-tight">-</span>
                    </div>
                    
                    <div class="flex justify-between items-center text-xs py-2 border-b border-slate-50">
                        <span class="text-slate-400 font-medium">Mobile Communication Node</span>
                        <span id="acc-phone" class="font-bold text-slate-800 font-mono">-</span>
                    </div>
                    
                    <div class="flex justify-between items-center text-xs py-2">
                        <span class="text-slate-400 font-medium">Email Security Hub</span>
                        <span id="acc-email" class="font-bold text-slate-600 font-sans break-all max-w-[60%] text-right">-</span>
                    </div>
                </div>

                <div class="pt-2 animate-fade-in [animation-delay:0.15s]">
                    <button onclick="window.location.reload()" class="w-full py-3.5 bg-slate-100 text-red-600 border border-slate-200/80 font-black rounded-2xl text-xs uppercase tracking-wider shadow-sm active:bg-red-50 active:text-red-700 active:border-red-200 transition duration-150 flex items-center justify-center gap-1.5">
                        <i class="fa-solid fa-power-off text-xs"></i> Terminate Active Vault Session
                    </button>
                </div>
            </div>
        `;
    }
};

// ग्लोबल स्कोपमध्ये युझरचा डेटा आणि बँक डॅशबोर्ड रिअल-टाईम सिंक करण्याचे लॉजिक उघड करणे (router.js मधून चालवण्यासाठी)
window.hydrateUserSession = function() {
    if (!globalUserDataObj) return;
    
    // १. युझरचा टेक्स्ट डेटा नोड्स हायड्रेट करणे
    const dName = document.getElementById('dash-user-name');
    const aName = document.getElementById('acc-name');
    const aPhone = document.getElementById('acc-phone');
    const aEmail = document.getElementById('acc-email');
    
    if (dName) dName.innerText = globalUserDataObj.name;
    if (aName) aName.innerText = globalUserDataObj.name;
    if (aPhone) aPhone.innerText = globalUserDataObj.phone;
    if (aEmail) aEmail.innerText = globalUserDataObj.email;
    
    // २. लिंक केलेल्या बँक खात्याचा प्रगत व्हिज्युअल लूक रेंडर करणे
    const bankBlock = document.getElementById('bank-display-block');
    if (globalUserDataObj.bankDetails && bankBlock) {
        bankBlock.className = "bg-gradient-to-br from-slate-900 to-blue-950 p-5 rounded-2xl border border-slate-800 text-left text-white space-y-4 relative overflow-hidden shadow-lg shadow-blue-950/20 animate-fade-in";
        bankBlock.innerHTML = `
            <div class="absolute -right-6 -bottom-6 text-white/5 text-7xl font-black select-none pointer-events-none"><i class="fa-solid fa-building-columns"></i></div>
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-[10px] text-blue-300 font-mono tracking-widest uppercase font-bold">Settlement Wire</p>
                    <h4 class="font-black text-sm tracking-tight text-slate-100 mt-0.5">${globalUserDataObj.bankDetails.bankName}</h4>
                </div>
                <i class="fa-brands fa-cc-visa text-xl text-white/40"></i>
            </div>
            <div class="pt-2">
                <p class="text-[9px] text-slate-500 font-mono tracking-wider uppercase font-bold">Account Registry Number</p>
                <p class="text-base font-bold font-mono tracking-widest text-slate-200 mt-0.5">•••• •••• •••• ${globalUserDataObj.bankDetails.account.slice(-4)}</p>
            </div>
            <div class="flex justify-between items-center pt-1 text-[10px] font-mono text-slate-400">
                <div><p class="text-[8px] text-slate-600 font-sans uppercase font-black">Holder Identification</p><p class="font-bold text-slate-300 uppercase tracking-tight">${globalUserDataObj.bankDetails.holder}</p></div>
                <div class="text-right"><p class="text-[8px] text-slate-600 font-sans uppercase font-black">IFSC Node</p><p class="font-black text-blue-400 tracking-wider">${globalUserDataObj.bankDetails.ifsc}</p></div>
            </div>
        `;
    }
};

console.log("BDA Views Hub: Institutional account center & profiling variables compiled.");
