// ==========================================================================
// BHARAT DIGITAL ASSETS - FINANCIAL ACCOUNT ECOSYSTEM DASHBOARD v5.0
// ==========================================================================

const HomeView = {
    render: function() {
        return `
            <div id="view-home" class="view-panel p-5 space-y-6 pb-28 bg-slate-50/40" style="display: none; width: 100%; flex-direction: column;">
                
                <div class="flex justify-between items-center bg-slate-950 text-white p-5 -mx-5 -mt-5 rounded-b-[2.25rem] shadow-xl border-b border-slate-800 animate-fade-in">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-blue-950 rounded-xl flex items-center justify-center font-black text-xs text-blue-400 border border-blue-900/50 shadow-inner">
                            BDA
                        </div>
                        <div>
                            <p class="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Authorized Portfolio</p>
                            <h3 id="dash-user-name" class="font-black text-sm tracking-tight text-slate-200">Synchronizing...</h3>
                        </div>
                    </div>
                    
                    <button onclick="openChatbot()" class="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 text-slate-300 relative active:scale-95 transition">
                        <i class="fa-solid fa-headset text-sm"></i>
                        <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full absolute top-1.5 right-1.5 animate-pulse"></span>
                    </button>
                </div>

                <div class="bda-gradient-card text-white p-6 space-y-6 relative overflow-hidden animate-fade-in">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="text-[9px] text-blue-300 uppercase tracking-widest font-black">Consolidated Managed Capital Balance</span>
                            <h2 class="text-3xl font-black mt-1 tracking-tight font-mono">₹200.00</h2>
                        </div>
                        <div class="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[9px] font-black uppercase tracking-wider text-blue-200">
                            Node: Active 1A
                        </div>
                    </div>
                    
                    <div class="pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
                        <div>
                            <p class="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Verification Allocation Progress</p>
                            <p id="deposit-status" class="text-xs font-black text-amber-400 flex items-center gap-1.5 mt-0.5">
                                <i class="fa-solid fa-circle-notch animate-spin text-[10px]"></i> Awaiting Ledger Clearance
                            </p>
                        </div>
                        <button id="btn-pay-modal" onclick="openPaymentGateway()" class="px-4 py-2.5 bg-white text-slate-950 font-black rounded-xl shadow-lg text-xs tracking-tight active:scale-95 transition">
                            Deposit Unit
                        </button>
                    </div>
                </div>

                <div class="space-y-3">
                    <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-wider">Secure Document Distribution Center</h4>
                    
                    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-md flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-red-50 text-red-600 rounded-xl border border-red-100/50 flex items-center justify-center text-lg shadow-inner">
                                <i class="fa-solid fa-file-pdf"></i>
                            </div>
                            <div>
                                <p class="text-xs font-black text-slate-800">Executed Asset Agreement</p>
                                <p class="text-[9px] font-medium text-slate-400 font-sans mt-0.5">Digitally Signed Stamp Memorandum</p>
                            </div>
                        </div>
                        <button onclick="triggerPureAgreementCompilation()" class="w-9 h-9 bg-slate-50 border border-slate-200/60 rounded-xl text-slate-600 flex items-center justify-center active:bg-slate-100"><i class="fa-solid fa-download text-xs"></i></button>
                    </div>

                    <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-md flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl border border-amber-100/50 flex items-center justify-center text-lg shadow-inner">
                                <i class="fa-solid fa-award"></i>
                            </div>
                            <div>
                                <p class="text-xs font-black text-slate-800">Ownership Certificate</p>
                                <p id="cert-subtext" class="text-[9px] font-medium text-slate-400 font-sans mt-0.5">Locks evaluate on admin authorization clearance</p>
                            </div>
                        </div>
                        <button id="btn-download-cert" onclick="downloadAssetCertificate()" disabled class="w-9 h-9 bg-slate-100 rounded-xl text-slate-300 flex items-center justify-center cursor-not-allowed"><i class="fa-solid fa-download text-xs"></i></button>
                    </div>
                </div>
            </div>
        `;
    }
};

// State Data Hydration Core Processor (Triggered via Router Matrix Hooks)
window.hydrateUserSession = function() {
    if (!window.globalUserDataObj) return;

    const uName = document.getElementById('dash-user-name');
    const statusText = document.getElementById('deposit-status');
    const payBtn = document.getElementById('btn-pay-modal');
    const certBtn = document.getElementById('btn-download-cert');
    const certSub = document.getElementById('cert-subtext');

    if (uName) uName.innerText = window.globalUserDataObj.name;

    // Check deployment payment ledger parameters real-time
    if (window.globalUserDataObj.isPaid) {
        if (statusText) statusText.innerHTML = `<span class="text-emerald-600 flex items-center gap-1"><i class="fa-solid fa-shield-check"></i> Capital Unit Secured</span>`;
        if (payBtn) payBtn.style.display = "none"; // Hide deposit interface if already paid
        if (certBtn) {
            certBtn.disabled = false;
            certBtn.className = "w-9 h-9 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl flex items-center justify-center active:bg-amber-100";
        }
        if (certSub) certSub.innerText = "HD Vector Asset Certificate Unlocked";
    } else {
        if (statusText) statusText.innerHTML = `<span class="text-amber-500 flex items-center gap-1"><i class="fa-solid fa-circle-notch animate-spin"></i> Deposit Verification Pending</span>`;
    }
};

// Pure Direct Coordinate PDF Compiler for executed Agreement Download (Bypasses rendering failures)
window.triggerPureAgreementCompilation = function() {
    if (!window.globalUserDataObj) return;
    
    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        pdf.setFont("serif", "bold");
        pdf.setFontSize(18);
        pdf.text("MEMORANDUM OF STRUCTURAL CAPITAL ASSIGNMENT", 105, 30, { align: "center" });
        
        pdf.setFont("sans-serif", "normal");
        pdf.setFontSize(9);
        pdf.text(`REGISTRY REPLICATION ACCOUNT CODE: BDA-REG-${window.globalUserDataObj.phone.slice(-4)}`, 105, 38, { align: "center" });
        
        pdf.line(20, 44, 190, 44);
        
        pdf.setFont("serif", "normal");
        pdf.setFontSize(11);
        let bodyText = `This statutory instrument serves as confirmation that the verified registrant ${window.globalUserDataObj.name.toUpperCase()} has successfully finalized profile onboarding under communication node index ${window.globalUserDataObj.phone}.\n\nA structural micro-allocation capital sum of precisely INR 200.00 (Two Hundred Rupees Only) is officially recognized within our serverless firestore ledger network indices.\n\nBy executing this electronic signature below, the member understands that managed asset cycles carry structural market parameters and liquidation variances up to 100% of base value may execute without asset group indemnities.`;
        
        const splitText = pdf.splitTextToSize(bodyText, 160);
        pdf.text(splitText, 20, 60);
        
        if (window.globalUserDataObj.signatureUrl) {
            pdf.text("AUTHORIZED DIGITAL SIGNATURE SEAL:", 20, 150);
            pdf.addImage(window.globalUserDataObj.signatureUrl, 'PNG', 20, 155, 50, 18);
        }
        
        pdf.save(`Signed_Agreement_${window.globalUserDataObj.phone}.pdf`);
        triggerAlert("Document Saved", "Your digitally signed legal assignment memorandum has been downloaded successfully.", "success");
    } catch(err) {
        alert("PDF Compilation Engine error: " + err.message);
    }
};
