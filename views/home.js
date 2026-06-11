// ==========================================================================
// BHARAT DIGITAL ASSETS - MASTER ACCOUNT PORTFOLIO CORE DASHBOARD v4.3
// ==========================================================================

const HomeView = {
    // स्क्रीन ५: मुख्य फायनान्शियल डॅशबोर्ड पॅनेलचा लेआउट रेंडर करणे
    render: function() {
        return `
            <div id="view-home" class="view-panel p-5 space-y-6 pb-28 bg-slate-50/40" style="display: none;">
                
                <div class="flex justify-between items-center bg-slate-950 text-white p-5 -mx-5 -mt-5 rounded-b-[2.25rem] shadow-xl border-b border-slate-800 animate-fade-in">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center font-black text-xs text-blue-400 border border-blue-900/50 shadow-inner">
                            BDA
                        </div>
                        <div>
                            <p class="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Authorized Entity</p>
                            <h3 id="dash-user-name" class="font-black text-sm tracking-tight text-slate-200">Syncing Master Node...</h3>
                        </div>
                    </div>
                    
                    <button onclick="openChatbot()" class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 text-slate-300 relative active:scale-95 transition">
                        <i class="fa-solid fa-headset text-sm"></i>
                        <span class="w-2 h-2 bg-emerald-500 rounded-full absolute top-1.5 right-1.5 animate-ping"></span>
                        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full absolute top-1.5 right-1.5"></span>
                    </button>
                </div>

                <div class="bda-gradient-card text-white p-6 space-y-6 relative overflow-hidden animate-fade-in [animation-delay:0.1s]">
                    <div class="absolute -right-8 -bottom-8 text-slate-900/20 text-9xl font-black select-none pointer-events-none">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="text-[9px] text-blue-300 uppercase tracking-widest font-black">Consolidated Micro-Share Balance</span>
                            <h2 class="text-3xl font-black mt-1 tracking-tight font-mono">₹200.00</h2>
                        </div>
                        <div class="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[9px] font-black uppercase tracking-wider text-blue-200">
                            Node Key: 1A
                        </div>
                    </div>
                    
                    <div class="pt-4 border-t border-white/10 flex justify-between items-center z-10 relative">
                        <div>
                            <p class="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Yield Liquidity Status</p>
                            <p id="deposit-status" class="text-xs font-black text-amber-400 flex items-center gap-1.5 mt-0.5">
                                <i class="fa-solid fa-circle-notch animate-spin text-[10px]"></i> Awaiting Settlement Deposit
                            </p>
                        </div>
                        <button id="btn-pay-modal" onclick="openPaymentGateway()" class="px-4 py-3 bg-white text-slate-950 font-black rounded-xl shadow-lg text-xs tracking-tight active:scale-95 transition duration-150">
                            Invest & Lock Unit
                        </button>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/70 space-y-4 animate-fade-in [animation-delay:0.2s]">
                    <div class="flex justify-between items-center">
                        <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-wider">Asset Growth Vector Matrix (Live)</h4>
                        <span class="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                            <i class="fa-solid fa-caret-up"></i> Optimal Optimization
                        </span>
                    </div>
                    <div class="w-full h-24 flex items-end gap-2.5 pt-4 border-b border-l border-slate-100 px-1 relative">
                        <div class="w-full bg-slate-50 border border-slate-100 rounded-t-lg h-[25%] transition-all duration-500"></div>
                        <div class="w-full bg-slate-50 border border-slate-100 rounded-t-lg h-[40%] transition-all duration-500"></div>
                        <div class="w-full bg-slate-50 border border-slate-100 rounded-t-lg h-[35%] transition-all duration-500"></div>
                        <div class="w-full bg-blue-900/10 border border-blue-900/5 rounded-t-lg h-[55%] transition-all duration-500"></div>
                        <div class="w-full bg-blue-900/30 border border-blue-900/10 rounded-t-lg h-[70%] transition-all duration-500"></div>
                        <div class="w-full bg-blue-900 rounded-t-lg h-[95%] animate-pulse shadow-md shadow-blue-900/20"></div>
                    </div>
                </div>

                <div class="space-y-3 animate-fade-in [animation-delay:0.3s]">
                    <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-wider">Secure Document Vault</h4>
                    
                    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/40 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-red-50 text-red-600 rounded-xl border border-red-100/50 flex items-center justify-center text-lg shadow-inner">
                                <i class="fa-solid fa-file-pdf"></i>
                            </div>
                            <div>
                                <p class="text-xs font-black text-slate-800">Executed Deposit Agreement</p>
                                <p class="text-[9px] font-medium text-slate-400 font-sans mt-0.5">Signed Stamp Paper Blueprint</p>
                            </div>
                        </div>
                        <button onclick="downloadStoredAgreement()" class="w-9 h-9 bg-slate-50 border border-slate-200/60 rounded-xl text-slate-500 flex items-center justify-center active:bg-slate-100 transition"><i class="fa-solid fa-download text-xs"></i></button>
                    </div>

                    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-md shadow-slate-100/40 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl border border-amber-100/50 flex items-center justify-center text-lg shadow-inner">
                                <i class="fa-solid fa-award"></i>
                            </div>
                            <div>
                                <p class="text-xs font-black text-slate-800">Asset Ownership Certificate</p>
                                <p id="cert-subtext" class="text-[9px] font-medium text-slate-400 font-sans mt-0.5">Locked until Administrative Ledger Approval</p>
                            </div>
                        </div>
                        <button id="btn-download-cert" onclick="downloadAssetCertificate()" disabled class="w-9 h-9 bg-slate-100 rounded-xl text-slate-300 flex items-center justify-center cursor-not-allowed transition"><i class="fa-solid fa-download text-xs"></i></button>
                    </div>
                </div>

                <div id="chatbot-drawer" class="hidden fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-end justify-center" style="display: none;">
                    <div class="bg-white w-full max-w-md h-[78vh] rounded-t-[2.5rem] flex flex-col justify-between overflow-hidden shadow-2xl border-t border-slate-100 animate-slide-up">
                        
                        <div class="bg-slate-950 text-white p-5 flex justify-between items-center border-b border-slate-800 shadow-md">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 bg-blue-950 rounded-xl flex items-center justify-center text-sm text-blue-400 border border-blue-900/40 shadow-inner">
                                    <i class="fa-solid fa-robot"></i>
                                </div>
                                <div>
                                    <h4 class="text-xs font-black tracking-tight text-slate-200">BDA Automated Helpdesk</h4>
                                    <span class="text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                                        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Desk Support Active
                                    </span>
                                </div>
                            </div>
                            <button onclick="closeChatbot()" class="w-8 h-8 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 active:scale-95 transition"><i class="fa-solid fa-xmark text-sm"></i></button>
                        </div>
                        
                        <div id="chat-stream-box" class="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 text-[11px]">
                            <div class="flex items-start gap-2 max-w-[85%] animate-fade-in">
                                <div class="bg-white border border-slate-100 p-3.5 rounded-2xl rounded-tl-none shadow-xs text-slate-800 font-bold leading-relaxed">
                                    नमस्कार, मी भारत डिजिटल असेट्स चा कस्टमर केअर बॉट आहे. मी तुमची काय मदत करू शकतो? खालील पर्यायांवर क्लिक करा:
                                </div>
                            </div>
                        </div>
                        
                        <div class="p-4 bg-white border-t border-slate-100 flex flex-col gap-2.5 shadow-xl">
                            <button onclick="triggerBotReply(1)" class="w-full px-4 py-3 bg-slate-50 hover:bg-blue-50/40 text-slate-700 font-bold rounded-xl text-left border border-slate-200/60 active:scale-[0.99] transition text-xs">₹1000 रिटर्न कधी मिळणार?</button>
                            <button onclick="triggerBotReply(2)" class="w-full px-4 py-3 bg-slate-50 hover:bg-blue-50/40 text-slate-700 font-bold rounded-xl text-left border border-slate-200/60 active:scale-[0.99] transition text-xs">माझे पैसे बुडतील का?</button>
                            <button onclick="triggerBotReply(3)" class="w-full px-4 py-3 bg-slate-50 hover:bg-blue-50/40 text-slate-700 font-bold rounded-xl text-left border border-slate-200/60 active:scale-[0.99] transition text-xs">ॲग्रीमेंट डाऊनलोड होत नाहीये</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

console.log("BDA Views Hub: Corporate financial dashboard template mounted.");

