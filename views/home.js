// ==========================================================================
// BHARAT DIGITAL ASSETS - PORTFOLIO VIEW & NATIVE COMPILER INFRASTRUCTURE v5.5
// ==========================================================================

const HomeView = {
    render: function() {
        return `
            <div id="view-home" class="view-panel p-5 space-y-5 pb-28 bg-slate-50/40" style="display: none; width: 100%;">
                
                <div class="flex justify-between items-center bg-slate-950 text-white p-5 -mx-5 -mt-5 rounded-b-[2.25rem] shadow-xl border-b border-slate-800">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center font-black text-xs text-blue-400 border border-blue-900/50">BDA</div>
                        <div>
                            <p class="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Authorized Entity</p>
                            <h3 id="dash-user-name" class="font-black text-sm tracking-tight text-slate-200">Loading Node Matrix...</h3>
                        </div>
                    </div>
                    <button onclick="openChatbot()" class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 text-slate-300 relative active:scale-95 transition">
                        <i class="fa-solid fa-headset text-sm"></i>
                        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full absolute top-1.5 right-1.5"></span>
                    </button>
                </div>

                <div class="bda-gradient-card text-white p-6 space-y-4 relative overflow-hidden">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="text-[9px] text-blue-300 uppercase tracking-widest font-black">Consolidated Micro-Asset Value</span>
                            <div class="flex items-baseline gap-1 mt-1">
                                <span class="text-3xl font-black font-mono" id="dash-display-total-value">₹200.00</span>
                            </div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider text-blue-200" id="dash-display-shares-count">1 Share Unit</div>
                    </div>

                    <div id="shares-quantity-selector-block" class="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between">
                        <span class="text-[11px] font-bold text-slate-300">Modify Allocation Units:</span>
                        <div class="flex items-center gap-2">
                            <button onclick="adjustSharesQuantityCounter(-1)" class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-black active:bg-white/20">-</button>
                            <span id="shares-quantity-input-display" class="font-mono font-black text-sm w-6 text-center">1</span>
                            <button onclick="adjustSharesQuantityCounter(1)" class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-black active:bg-white/20">+</button>
                        </div>
                    </div>
                    
                    <div class="pt-2 border-t border-white/10 flex justify-between items-center z-10 relative">
                        <div>
                            <p class="text-[8px] text-slate-400 uppercase font-bold">Ledger Allocation Status</p>
                            <p id="deposit-status" class="text-xs font-black text-amber-400 mt-0.5 uppercase tracking-tight">Awaiting Payment</p>
                        </div>
                        <button id="btn-pay-modal" onclick="openPaymentGateway()" class="px-4 py-2.5 bg-white text-slate-950 font-black rounded-xl text-xs active:scale-95 transition">Secure Capital Node</button>
                    </div>
                </div>

                <div class="space-y-3">
                    <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-wider">Secure Document Vault</h4>
                    
                    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-lg shadow-inner"><i class="fa-solid fa-file-pdf"></i></div>
                            <div>
                                <p class="text-xs font-black text-slate-800">Executed Deposit Agreement</p>
                                <p class="text-[9px] font-medium text-slate-400 font-sans mt-0.5">Signed Stamp Paper Framework</p>
                            </div>
                        </div>
                        <button onclick="downloadExecutedAgreementPDF()" class="w-9 h-9 bg-slate-50 border border-slate-200/60 rounded-xl text-slate-500 flex items-center justify-center active:bg-slate-100"><i class="fa-solid fa-download text-xs"></i></button>
                    </div>

                    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-lg shadow-inner"><i class="fa-solid fa-award"></i></div>
                            <div>
                                <p class="text-xs font-black text-slate-800">Asset Ownership Certificate</p>
                                <p id="cert-subtext" class="text-[9px] font-medium text-slate-400 font-sans mt-0.5">Locks until Administrative Validation clears</p>
                            </div>
                        </div>
                        <button id="btn-download-cert" onclick="downloadAssetCertificate()" disabled class="w-9 h-9 bg-slate-100 rounded-xl text-slate-300 flex items-center justify-center cursor-not-allowed"><i class="fa-solid fa-download text-xs"></i></button>
                    </div>
                </div>

                <div id="chatbot-drawer" class="hidden fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 flex items-end justify-center" style="display: none;">
                    <div class="bg-white w-full max-w-md h-[78vh] rounded-t-[2.5rem] flex flex-col justify-between overflow-hidden shadow-2xl border-t border-slate-100 animate-slide-up">
                        <div class="bg-slate-950 text-white p-5 flex justify-between items-center border-b border-slate-800 shadow-md">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 bg-blue-950 rounded-xl flex items-center justify-center text-sm text-blue-400 border border-blue-900/40"><i class="fa-solid fa-robot"></i></div>
                                <div>
                                    <h4 class="text-xs font-black tracking-tight text-slate-200">BDA Automated Assistant</h4>
                                    <span class="text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5"><span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Service Stream Live</span>
                                </div>
                            </div>
                            <button onclick="closeChatbot()" class="w-8 h-8 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 active:scale-95 transition"><i class="fa-solid fa-xmark text-sm"></i></button>
                        </div>
                        <div id="chat-stream-box" class="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 text-[11px]">
                            <div class="flex items-start gap-2 max-w-[85%] animate-fade-in w-full">
                                <div class="bg-white border border-slate-200/80 p-3.5 rounded-2xl rounded-tl-none shadow-xs text-slate-800 font-bold leading-relaxed">
                                    Welcome to Bharat Digital Assets automated helpdesk system. Please select your operational inquiry parameter below:
                                </div>
                            </div>
                        </div>
                        <div class="p-4 bg-white border-t border-slate-100 flex flex-col gap-2.5 shadow-xl">
                            <button onclick="triggerBotReply(1)" class="w-full px-4 py-3 bg-slate-50 text-slate-700 font-bold rounded-xl text-left border border-slate-200 text-xs">When will I receive my structured maturity yield?</button>
                            <button onclick="triggerBotReply(2)" class="w-full px-4 py-3 bg-slate-50 text-slate-700 font-bold rounded-xl text-left border border-slate-200 text-xs">Is my deposited capital contractually secured?</button>
                            <button onclick="triggerBotReply(3)" class="w-full px-4 py-3 bg-slate-50 text-slate-700 font-bold rounded-xl text-left border border-slate-200 text-xs">I am unable to download my executed agreement PDF.</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// Adjust Shares Allocation Quantities & Updates Multiplier Metrics
window.adjustSharesQuantityCounter = function(delta) {
    if (!window.globalUserDataObj) return;
    let count = window.globalUserDataObj.sharesCount || 1;
    count += delta;
    if (count < 1) count = 1; if (count > 50) count = 50; // Lock ceiling limits
    
    window.globalUserDataObj.sharesCount = count;
    
    document.getElementById('shares-quantity-input-display').innerText = count;
    document.getElementById('dash-display-shares-count').innerText = `${count} Share Unit${count > 1 ? 's' : ''}`;
    document.getElementById('dash-display-total-value').innerText = `₹${(count * 200).toFixed(2)}`;
    
    // Per-node state write back tracking update
    db.collection("users").doc(window.currentUserMobile).update({ sharesCount: count });
};

// ==========================================================================
// PURE VECTOR PDF COMPILER GENERATOR ENGINE
// ==========================================================================
window.downloadExecutedAgreementPDF = function() {
    if (!window.globalUserDataObj) return;
    try {
        const { jsPDF } = window.jspdf; const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFillColor(254, 252, 232); pdf.rect(0, 0, 210, 297, 'F'); // Warm paper tone
        pdf.setDrawColor(180, 83, 9); pdf.setLineWidth(0.5); pdf.rect(5, 5, 200, 287);

        pdf.setTextColor(30, 41, 59); pdf.setFont("serif", "bold"); pdf.setFontSize(20);
        pdf.text("MEMORANDUM OF RISK & CONTRIBUTION EQUITY", 105, 25, { align: "center" });
        pdf.setFontSize(9); pdf.setFont("sans-serif", "normal"); pdf.text(`REGISTRY REPLICATION LINK PATH TOKEN: BDA-LOG-${window.globalUserDataObj.phone.slice(-4)}-2026`, 105, 32, { align: "center" });

        pdf.line(15, 38, 195, 38);
        pdf.setFont("serif", "italic"); pdf.setFontSize(12);
        
        let textBody = `This institutional charter records that the registered entity member ${window.globalUserDataObj.name.toUpperCase()} (Node Identity Matrix: ${window.globalUserDataObj.phone}) has voluntarily submitted profile metrics on timestamp ${window.globalUserDataObj.registrationDate || '2026-06-11'} for micro-asset pooling allocations.\n\n` +
                       `The member has committed capital assets totaling INR ${(window.globalUserDataObj.sharesCount * 200).toFixed(2)} representing exactly ${window.globalUserDataObj.sharesCount} core trading equity unit allocations managed by Bharat Digital Assets.\n\n` +
                       `STATUTORY DISCLOSURE INDEMNITY CLAUSE: Micro-asset node execution handles carry inherent high-frequency ledger market tracking exposures. Volatility adjustments within index matrices may yield fractional shifts or full capital erosion. By appending the vector signature verification coordinates onto this secure ledger frame, the member confirms absolute statutory waiver of dispute recourse mechanisms. All investment channels hold independent risk vectors under institutional guidelines.`;

        let lines = pdf.splitTextToSize(textBody, 175); pdf.text(lines, 15, 52);

        if (window.globalUserDataObj.signatureUrl) {
            pdf.setFont("sans-serif", "bold"); pdf.setFontSize(8); pdf.text("AUTHORIZED PROFILE NODE SEAL:", 15, 210);
            pdf.setFillColor(241, 245, 249); pdf.rect(15, 215, 50, 18, "F");
            pdf.addImage(window.globalUserDataObj.signatureUrl, 'PNG', 16, 216, 48, 16);
            pdf.line(15, 235, 65, 235);
        }

        pdf.save(`Executed_Agreement_${window.globalUserDataObj.phone}.pdf`);
        triggerAlert("Vault Download", "Executed digital stamp paper contract compiled successfully.", "success");
    } catch(err) { alert("PDF Compilation Exception: " + err.message); }
};
