// ==========================================================================
// BHARAT DIGITAL ASSETS - DYNAMIC QUANTITY & ROYAL PDF GATEWAY v6.0
// ==========================================================================

const HomeView = {
    render: function() {
        return `
            <div id="view-home" class="view-panel p-5 space-y-5 pb-28 bg-slate-50/40" style="display: none; width: 100%;">
                
                <div class="flex justify-between items-center bg-slate-950 text-white p-5 -mx-5 -mt-5 rounded-b-[2.25rem] shadow-xl">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center font-black text-xs text-blue-400">BDA</div>
                        <div>
                            <p class="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Authorized Entity</p>
                            <h3 id="dash-user-name" class="font-black text-sm tracking-tight text-slate-200">-</h3>
                        </div>
                    </div>
                    <button onclick="openChatbot()" class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 text-slate-300"><i class="fa-solid fa-headset text-sm"></i></button>
                </div>

                <div class="bda-gradient-card text-white p-6 space-y-4 relative overflow-hidden">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="text-[9px] text-blue-300 uppercase tracking-widest font-black">Consolidated Portfolio Balance</span>
                            <h2 class="text-3xl font-black mt-1 tracking-tight font-mono" id="dash-display-total-value">₹200.00</h2>
                        </div>
                        <div class="bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-black uppercase" id="dash-display-shares-count">1 Share Unit</div>
                    </div>

                    <div id="shares-quantity-selector-block" class="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between">
                        <span class="text-[11px] font-bold text-slate-300">Modify Allocation Units:</span>
                        <div class="flex items-center gap-2">
                            <button onclick="adjustSharesQuantityCounter(-1)" class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-black">-</button>
                            <span id="shares-quantity-input-display" class="font-mono font-black text-sm w-6 text-center">1</span>
                            <button onclick="adjustSharesQuantityCounter(1)" class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center font-black">+</button>
                        </div>
                    </div>
                    
                    <div class="pt-2 border-t border-white/10 flex justify-between items-center z-10 relative">
                        <div>
                            <p class="text-[8px] text-slate-400 uppercase font-bold">Verification Status</p>
                            <p id="deposit-status" class="text-xs font-black text-amber-400 mt-0.5 uppercase tracking-tight">Awaiting Payment</p>
                        </div>
                        <button id="btn-pay-modal" onclick="openPaymentGateway()" class="px-4 py-2.5 bg-white text-slate-950 font-black rounded-xl text-xs">Deposit Unit</button>
                    </div>
                </div>

                <div class="space-y-3">
                    <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-wider">Secure Document Vault</h4>
                    <div class="bg-white p-4 rounded-2xl border shadow-sm flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-lg shadow-inner"><i class="fa-solid fa-file-pdf"></i></div>
                            <div><p class="text-xs font-black text-slate-800">Executed Asset Agreement</p><p class="text-[9px] font-medium text-slate-400 font-sans mt-0.5">Signed Royal Stamp Paper Framework</p></div>
                        </div>
                        <button onclick="downloadExecutedAgreementPDF()" class="w-9 h-9 bg-slate-50 border rounded-xl text-slate-500 flex items-center justify-center"><i class="fa-solid fa-download text-xs"></i></button>
                    </div>
                    <div class="bg-white p-4 rounded-2xl border shadow-sm flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-lg shadow-inner"><i class="fa-solid fa-award"></i></div>
                            <div><p class="text-xs font-black text-slate-800">Ownership Certificate</p><p id="cert-subtext" class="text-[9px] font-medium text-slate-400 font-sans mt-0.5">Awaiting ledger clearance verification</p></div>
                        </div>
                        <button id="btn-download-cert" onclick="downloadAssetCertificate()" disabled class="w-9 h-9 bg-slate-100 rounded-xl text-slate-300 flex items-center justify-center"><i class="fa-solid fa-download text-xs"></i></button>
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
    
    document.getElementById('dash-user-name').innerText = u.name;
    document.getElementById('shares-quantity-input-display').innerText = count;
    document.getElementById('dash-display-shares-count').innerText = `${count} Share Unit${count > 1 ? 's' : ''}`;
    document.getElementById('dash-display-total-value').innerText = `₹${(count * 200).toFixed(2)}`;
    
    const dStatus = document.getElementById('deposit-status');
    const dBtn = document.getElementById('btn-download-cert');
    const dSubtext = document.getElementById('cert-subtext');
    const qSelector = document.getElementById('shares-quantity-selector-block');

    if (u.isPaid) {
        dStatus.className = "text-xs font-black text-emerald-400 mt-0.5 uppercase tracking-tight";
        dStatus.innerText = "LEDGER VERIFIED";
        dBtn.disabled = false; dBtn.className = "w-9 h-9 bg-amber-50 border border-amber-200 rounded-xl text-amber-600 flex items-center justify-center active:bg-amber-100";
        dSubtext.innerText = "Official HD Certificate available for instant download.";
        if(qSelector) qSelector.style.display = "none"; // Lock quantity update after verification
    }
};

window.adjustSharesQuantityCounter = function(delta) {
    if (!window.globalUserDataObj || window.globalUserDataObj.isPaid) return;
    let count = window.globalUserDataObj.sharesCount || 1; count += delta;
    if (count < 1) count = 1; if (count > 50) count = 50;
    window.globalUserDataObj.sharesCount = count;
    window.updateDashboardDisplayValues();
    db.collection("users").doc(window.currentUserMobile).update({ sharesCount: count });
};

// ==========================================================================
// DEEP INSTITUTIONAL PDF GRAPHICS GENERATORS ENGINE
// ==========================================================================
window.downloadExecutedAgreementPDF = function() {
    if (!window.globalUserDataObj) return;
    const u = window.globalUserDataObj;
    try {
        const { jsPDF } = window.jspdf; const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Premium Royal Stamp Paper Layout Frame Geometry
        pdf.setFillColor(255, 254, 245); pdf.rect(0, 0, 210, 297, 'F');
        pdf.setDrawColor(234, 179, 8); pdf.setLineWidth(1); pdf.rect(6, 6, 198, 285);
        pdf.setDrawColor(30, 41, 59); pdf.setLineWidth(0.2); pdf.rect(8, 8, 194, 281);

        // Header Deep Graphic Stamp Banner
        pdf.setFillColor(30, 41, 59); pdf.rect(8, 8, 194, 25, 'F');
        pdf.setTextColor(255, 255, 255); pdf.setFont("serif", "bold"); pdf.setFontSize(16);
        pdf.text("BHARAT DIGITAL ASSETS TRUSTEE CORPORATE", 105, 18, { align: "center" });
        pdf.setFontSize(8); pdf.setFont("sans-serif", "normal"); pdf.setTextColor(156, 163, 175);
        pdf.text("STATUTORY DIGITAL MEMORANDUM OF ACCOUNT BOND ASSIGNMENT", 105, 24, { align: "center" });

        // Legal Text Core
        pdf.setTextColor(15, 23, 42); pdf.setFont("serif", "normal"); pdf.setFontSize(11);
        let clauses = `This official statutory charter records that the contracting entity member ${u.name.toUpperCase()} (Registered Mobile Parameter Node: +91-${u.phone}) has voluntarily parseddemographical metadata elements on date stamp ${u.registrationDate}.\n\n` +
                      `The executing subscriber has assigned structured investment funds totaling exactly INR ${(u.sharesCount * 200).toFixed(2)} (Two Hundred Rupees Multiplier Format) directed toward high-liquidity decentralized index nodes representing precisely ${u.sharesCount} Active Allocation Capital Units.\n\n` +
                      `STATUTORY INDEMNITY LIABILITY LIMIT: Financial micro-asset ledgers hold systemic algorithmic baseline market execution variance parameters. In events of structural consolidation adjustments, liquidity drain sequences, or platform tracking node failures, base asset capital allocations up to 100% variance may occur without statutory legal recourse or trustee compensation parameters.\n\n` +
                      `By anchoring the pixel vector electronic signature seal onto this serverless data pipeline interface module, the subscriber acknowledges full reading comprehension metrics and yields absolute irrevocable waiver of claims against Bharat Digital Assets foundation.`;

        let splitLines = pdf.splitTextToSize(clauses, 170); pdf.text(splitLines, 20, 55);

        // Embed Vector Signatures Canvas Data
        if (u.signatureUrl) {
            pdf.setDrawColor(226, 232, 240); pdf.line(20, 225, 190, 225);
            pdf.setFont("sans-serif", "bold"); pdf.setFontSize(8); pdf.setTextColor(100, 116, 139);
            pdf.text("DIGITAL SIGNATURE COORDINATES SEAL VERIFIED:", 20, 235);
            pdf.addImage(u.signatureUrl, 'PNG', 20, 240, 45, 15);
        }
        pdf.save(`Executed_Agreement_${u.phone}.pdf`);
        triggerAlert("Download Complete", "Executed Risk Agreement successfully downloaded.", "success");
    } catch(err) { alert(err.message); }
};

window.downloadAssetCertificate = function() {
    if (!window.globalUserDataObj || !window.globalUserDataObj.isPaid) return;
    const u = window.globalUserDataObj;
    try {
        const { jsPDF } = window.jspdf; const pdf = new jsPDF('l', 'mm', [210, 148]);
        pdf.setFillColor(15, 23, 42); pdf.rect(0, 0, 210, 148, 'F');
        pdf.setDrawColor(251, 191, 36); pdf.setLineWidth(1.2); pdf.rect(4, 4, 202, 140);
        pdf.setDrawColor(30, 41, 59); pdf.setLineWidth(0.3); pdf.rect(6, 6, 198, 136);

        pdf.setTextColor(251, 191, 36); pdf.setFont("serif", "bold"); pdf.setFontSize(22);
        pdf.text("CERTIFICATE OF ASSET OWNERSHIP", 105, 25, { align: "center" });
        pdf.setTextColor(148, 163, 184); pdf.setFont("sans-serif", "normal"); pdf.setFontSize(8);
        pdf.text("OFFICIAL REPLICATION DECENTRALIZED NODE ALLOCATION UNIT", 105, 32, { align: "center" });

        pdf.setTextColor(241, 245, 249); pdf.setFont("serif", "italic"); pdf.setFontSize(12);
        pdf.text("This certifies that the authenticated enterprise ecosystem member", 105, 55, { align: "center" });
        pdf.setTextColor(255, 255, 255); pdf.setFont("sans-serif", "bold"); pdf.setFontSize(18);
        pdf.text(u.name.toUpperCase(), 105, 68, { align: "center" });

        pdf.setTextColor(203, 213, 225); pdf.setFont("serif", "italic"); pdf.setFontSize(11);
        pdf.text(`holds a validated institutional investment stake of ${u.sharesCount} Asset Units valued at`, 105, 82, { align: "center" });
        pdf.setTextColor(251, 191, 36); pdf.setFont("sans-serif", "bold"); pdf.setFontSize(14);
        pdf.text(`INR ${(u.sharesCount * 200).toFixed(2)} (MUTUALIZED SYSTEM ALLOCATION)`, 105, 92, { align: "center" });

        if(u.signatureUrl) pdf.addImage(u.signatureUrl, 'PNG', 150, 112, 38, 12);
        pdf.setFontSize(7); pdf.setTextColor(100, 116, 139); pdf.text(`NODE HASH: BDA-CERT-${u.phone.slice(-4)}-2026`, 15, 125);
        
        pdf.save(`Asset_Certificate_${u.phone}.pdf`);
    } catch(err) { alert(err.message); }
};
