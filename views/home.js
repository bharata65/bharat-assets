// ==========================================================================
// BHARAT DIGITAL ASSETS - CORE DASHBOARD ENGINE v7.5 (STABLE FIXED)
// ==========================================================================

const HomeView = {
    render: function() {
        return `
            <div id="view-home" class="view-panel space-y-5 bg-slate-50/40" style="display: none; width: 100%;">
                
                <div class="flex justify-between items-center bg-slate-950 text-white p-5 -mx-5 -mt-5 rounded-b-[2.25rem] shadow-xl">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center font-black text-xs text-blue-400">BDA</div>
                        <div>
                            <p class="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Authenticated Node</p>
                            <h3 id="dash-user-name" class="font-black text-sm tracking-tight text-slate-200">-</h3>
                        </div>
                    </div>
                    <button onclick="openFullPageChatbot()" class="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-300 active:scale-95 transition">
                        <i class="fa-solid fa-headset text-sm"></i>
                    </button>
                </div>

                <div class="bda-gradient-card text-white p-6 space-y-4 relative overflow-hidden">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="text-[9px] text-blue-300 uppercase tracking-widest font-black">Consolidated Portfolio Balance</span>
                            <h2 class="text-3xl font-black mt-1 tracking-tight font-mono" id="dash-display-total-value">₹200.00</h2>
                        </div>
                        <div class="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-black uppercase font-mono shadow-xs" id="dash-display-shares-count">1 Share Unit</div>
                    </div>

                    <div id="shares-quantity-selector-block" class="bg-white/10 border border-white/10 p-3 rounded-2xl flex items-center justify-between shadow-xs">
                        <span class="text-xs font-bold text-slate-200">Modify Share Units:</span>
                        <div class="flex items-center gap-3">
                            <button onclick="adjustSharesQuantityCounter(-1)" class="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center font-black text-sm transition focus:outline-none shadow-xs">-</button>
                            <span id="shares-quantity-input-display" class="font-mono font-black text-base w-6 text-center text-white">1</span>
                            <button onclick="adjustSharesQuantityCounter(1)" class="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center font-black text-sm transition focus:outline-none shadow-xs">+</button>
                        </div>
                    </div>
                    
                    <div class="pt-3 border-t border-white/10 flex justify-between items-center z-10 relative">
                        <div>
                            <p class="text-[8px] text-slate-400 uppercase font-bold">Verification Index</p>
                            <p id="deposit-status" class="text-xs font-black text-amber-400 mt-0.5 uppercase tracking-tight">Awaiting Capital</p>
                        </div>
                        <button id="btn-pay-modal" onclick="openPaymentGateway()" class="px-5 py-2.5 bg-white text-slate-950 font-black rounded-xl text-xs active:scale-95 transition shadow-md">Deposit Unit</button>
                    </div>
                </div>

                <div class="space-y-3">
                    <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-wider">Secure Document Vault</h4>
                    
                    <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-lg shadow-inner"><i class="fa-solid fa-file-pdf"></i></div>
                            <div>
                                <p class="text-xs font-black text-slate-800">Executed Risk Agreement</p>
                                <p class="text-[9px] font-bold text-slate-400 font-mono mt-0.5">SIGNED LIQUIDITY CHARTER BOND</p>
                            </div>
                        </div>
                        <button onclick="downloadExecutedAgreementPDF()" class="w-9 h-9 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 flex items-center justify-center active:bg-slate-100 transition"><i class="fa-solid fa-download text-xs"></i></button>
                    </div>

                    <div class="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-lg shadow-inner"><i class="fa-solid fa-award"></i></div>
                            <div>
                                <p class="text-xs font-black text-slate-800">Ownership Certificate</p>
                                <p id="cert-subtext" class="text-[9px] font-bold text-slate-400 font-mono mt-0.5">AWAITING CLEARANCE LIFECYCLE</p>
                            </div>
                        </div>
                        <button id="btn-download-cert" onclick="downloadAssetCertificate()" disabled class="w-9 h-9 bg-slate-100 rounded-xl text-slate-300 flex items-center justify-center cursor-not-allowed transition"><i class="fa-solid fa-download text-xs"></i></button>
                    </div>
                </div>
            </div>
        `;
    }
};

window.updateDashboardDisplayValues = function() {
    if (!window.globalUserDataObj) return;
    const u = window.globalUserDataObj;
    const count = u.sharesCount || 1;
    
    const dName = document.getElementById('dash-user-name');
    const qDisp = document.getElementById('shares-quantity-input-display');
    const cDisp = document.getElementById('dash-display-shares-count');
    const vDisp = document.getElementById('dash-display-total-value');
    
    if(dName) dName.innerText = u.name;
    if(qDisp) qDisp.innerText = count;
    if(cDisp) cDisp.innerText = `${count} Share Unit${count > 1 ? 's' : ''}`;
    if(vDisp) vDisp.innerText = `₹${(count * 200).toFixed(2)}`;
    
    const dStatus = document.getElementById('deposit-status');
    const dBtn = document.getElementById('btn-download-cert');
    const dSubtext = document.getElementById('cert-subtext');
    const qSelector = document.getElementById('shares-quantity-selector-block');

    if (u.isPaid && dStatus) {
        dStatus.className = "text-xs font-black text-emerald-500 mt-0.5 uppercase tracking-tight";
        dStatus.innerText = "LEDGER VERIFIED";
        if(dBtn) {
            dBtn.disabled = false;
            dBtn.className = "w-9 h-9 bg-amber-50 border border-amber-200 rounded-xl text-amber-600 flex items-center justify-center active:bg-amber-100 transition shadow-xs";
        }
        if(dSubtext) dSubtext.innerText = "OFFICIAL ASSET CERTIFICATE ACTIVE";
        if(qSelector) qSelector.style.setProperty('display', 'none', 'important');
    }
};

window.adjustSharesQuantityCounter = function(delta) {
    if (!window.globalUserDataObj || window.globalUserDataObj.isPaid) return;
    let count = window.globalUserDataObj.sharesCount || 1; count += delta;
    if (count < 1) count = 1; if (count > 50) count = 50;
    
    window.globalUserDataObj.sharesCount = count;
    window.updateDashboardDisplayValues();
    
    db.collection("users").doc(window.currentUserMobile).update({ sharesCount: count }).catch(e => console.log(e));
};
