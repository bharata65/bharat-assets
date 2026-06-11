// ==========================================================================
// BHARAT DIGITAL ASSETS - CORE DASHBOARD MANAGEMENT GATEWAY MODULE v7.0
// ==========================================================================

const HomeView = {
    render: function() {
        return `
            <div id="view-home" class="view-panel space-y-5 bg-slate-50/40 pb-6" style="display: none; width: 100%;">
                
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
                            <span class="text-[9px] text-blue-300 uppercase tracking-widest font-black">Aggregated Asset Ledger</span>
                            <h2 class="text-3xl font-black mt-1 tracking-tight font-mono" id="dash-display-total-value">₹200.00</h2>
                        </div>
                        <div class="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-black uppercase font-mono" id="dash-display-shares-count">1 Share Unit</div>
                    </div>

                    <div id="shares-quantity-selector-block" class="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between">
                        <span class="text-[11px] font-bold text-slate-300">Adjust Shares Allocation:</span>
                        <div class="flex items-center gap-2">
                            <button onclick="adjustSharesQuantityCounter(-1)" class="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center font-black transition">-</button>
                            <span id="shares-quantity-input-display" class="font-mono font-black text-sm w-6 text-center">1</span>
                            <button onclick="adjustSharesQuantityCounter(1)" class="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center font-black transition">+</button>
                        </div>
                    </div>
                    
                    <div class="pt-3 border-t border-white/10 flex justify-between items-center z-10 relative">
                        <div>
                            <p class="text-[8px] text-slate-400 uppercase font-bold">Verification Index</p>
                            <p id="deposit-status" class="text-xs font-black text-amber-400 mt-0.5 uppercase tracking-tight animate-pulse">Awaiting Capital</p>
                        </div>
                        <button id="btn-pay-modal" onclick="openPaymentGateway()" class="px-4 py-2.5 bg-white text-slate-950 font-black rounded-xl text-xs active:scale-95 transition shadow">Deposit Unit</button>
                    </div>
                </div>

                <div class="space-y-3">
                    <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-wider">Statutory Security Vault</h4>
                    
                    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-lg shadow-inner"><i class="fa-solid fa-file-pdf"></i></div>
                            <div>
                                <p class="text-xs font-black text-slate-800">Executed Risk Agreement</p>
                                <p class="text-[9px] font-bold text-slate-400 font-mono mt-0.5">SIGNED LIQUIDITY CHARTER BOND</p>
                            </div>
                        </div>
                        <button onclick="downloadExecutedAgreementPDF()" class="w-9 h-9 bg-slate-50 border border-slate-200 rounded-xl text-slate-500 flex items-center justify-center active:bg-slate-100 transition"><i class="fa-solid fa-download text-xs"></i></button>
                    </div>

                    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
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
    },

    init: function() {
        window.updateDashboardDisplayValues();
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
        if(qSelector) qSelector.style.display = "none";
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

// DYNAMIC MODAL GENERATOR AND QUANTITY VALUE CORRELATION
window.openPaymentGateway = function() {
    if (!window.globalUserDataObj) return;
    const u = window.globalUserDataObj;
    const count = u.sharesCount || 1;
    const computedAmt = (count * 200).toFixed(2);

    const mCount = document.getElementById('gateway-share-units-count');
    const mAmt = document.getElementById('gateway-display-amount');
    const modal = document.getElementById('payment-gateway-modal');
    
    if(mCount) mCount.innerText = `Allocation Payload: ${count} Share Unit${count > 1 ? 's' : ''}`;
    if(mAmt) mAmt.innerText = `₹${computedAmt}`;

    db.collection("config").doc("gateway").get().then((gDoc) => {
        const liveMerchantUPI = gDoc.exists ? gDoc.data().upiId : "merchant@upi";
        const upiPaymentURI = `upi://pay?pa=${liveMerchantUPI}&pn=Bharat%20Digital%20Assets&am=${computedAmt}&cu=INR`;
        
        const intentLink = document.getElementById('dynamic-upi-intent-link');
        if(intentLink) intentLink.href = upiPaymentURI;

        const qrContainer = document.getElementById('dynamic-qr-string-display');
        if (qrContainer) {
            qrContainer.innerHTML = `
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(upiPaymentURI)}" 
                     alt="UPI Gateway Node QR" 
                     class="border-4 border-white p-1 rounded-xl shadow-xs">
            `;
        }
        if(modal) {
            modal.classList.remove('hidden');
            modal.style.setProperty('display', 'flex', 'important');
        }
    });
};

window.closePaymentGateway = function() {
    const modal = document.getElementById('payment-gateway-modal');
    if(modal) {
        modal.classList.add('hidden');
        modal.style.setProperty('display', 'none', 'important');
    }
};

window.submitUTRVerification = function() {
    const code = document.getElementById('input-utr-code').value.trim();
    if(code.length !== 12 || isNaN(code)) {
        return triggerAlert("Validation Error", "The banking transaction UTR string must consist of exactly 12 numeric digits.", "error");
    }
    db.collection("users").doc(window.currentUserMobile).update({ utrCode: code }).then(() => {
        closePaymentGateway();
        triggerAlert("Token Registered", "Your payment verification reference has been securely cataloged for administrative verification audit pipeline.", "success");
    });
};

window.downloadExecutedAgreementPDF = function() {
    if (!window.globalUserDataObj) return;
    const u = window.globalUserDataObj;
    try {
        const { jsPDF } = window.jspdf; const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFillColor(255, 254, 245); pdf.rect(0, 0, 210, 297, 'F');
        pdf.setDrawColor(234, 179, 8); pdf.setLineWidth(1); pdf.rect(6, 6, 198, 285);
        pdf.setDrawColor(30, 41, 59); pdf.setLineWidth(0.2); pdf.rect(8, 8, 194, 281);

        pdf.setFillColor(30, 41, 59); pdf.rect(8, 8, 194, 25, 'F');
        pdf.setTextColor(255, 255, 255); pdf.setFont("serif", "bold"); pdf.setFontSize(15);
        pdf.text("BHARAT DIGITAL ASSETS TRUSTEE CORPORATE", 105, 17, { align: "center" });
        pdf.setFontSize(8); pdf.setFont("sans-serif", "normal"); pdf.setTextColor(156, 163, 175);
        pdf.text("STATUTORY DIGITAL MEMORANDUM OF RISK ALLOCATION ASSIGNMENT", 105, 24, { align: "center" });

        pdf.setTextColor(15, 23, 42); pdf.setFont("serif", "normal"); pdf.setFontSize(11);
        let textScript = `This official document establishes that subscriber entity ${u.name.toUpperCase()} (+91-${u.phone}) has recorded structural demographical authentication elements on date ledger ${u.registrationDate}.\n\n` +
                         `The user has committed liquid funds evaluating to precisely INR ${(u.sharesCount * 200).toFixed(2)} mapped corresponding to an administrative weight index score of exactly ${u.sharesCount} Asset Allocation Units.\n\n` +
                         `GENERAL DISCLOSURE CLAUSE: Systemic digital investment nodes possess volatile structural market exposure tracking. Capital elements assigned are bound to computational liquidation frameworks. By appending the vector signature mark onto this application ledger module instances, the client accepts absolute asset exposure vulnerability indexes and declares waiver of systemic litigation channels.`;

        let lines = pdf.splitTextToSize(textScript, 170); pdf.text(lines, 20, 55);

        if (u.signatureUrl) {
            pdf.setDrawColor(226, 232, 240); pdf.line(20, 220, 190, 220);
            pdf.setFont("sans-serif", "bold"); pdf.setFontSize(8); pdf.setTextColor(148, 163, 184);
            pdf.text("DIGITAL COORDINATE SIGNATURE LOG SEAL LOCKED:", 20, 230);
            pdf.addImage(u.signatureUrl, 'PNG', 20, 235, 45, 15);
        }
        pdf.save(`Executed_Charter_${u.phone}.pdf`);
        triggerAlert("System Success", "Asset risk charter sheet downloaded successfully.", "success");
    } catch(e) { alert(e.message); }
};
