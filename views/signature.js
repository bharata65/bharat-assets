// ==========================================================================
// BHARAT DIGITAL ASSETS - VALIDATED SIGNATURE & MANUAL BANK HANDSHAKE v5.5
// ==========================================================================

const SignatureView = {
    render: function() {
        return `
            <div id="view-signature" class="view-panel p-5 flex flex-col min-h-screen bg-slate-50 pb-16 overflow-y-auto" style="display: none; width: 100%;">
                
                <div id="sub-panel-signature" class="space-y-5 w-full flex flex-col justify-between flex-1">
                    <div class="space-y-4">
                        <div class="text-center">
                            <div class="w-12 h-12 bg-blue-900 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-2">
                                <i class="fa-solid fa-file-signature text-lg"></i>
                            </div>
                            <h2 class="text-xl font-black text-blue-950 tracking-tight">Authorization Seal</h2>
                            <p class="text-xs text-slate-400 font-medium mt-0.5">Step 4 of 5: Secure Digital Signature</p>
                        </div>

                        <div class="bg-slate-900 text-slate-300 p-4 rounded-2xl text-[11px] font-medium leading-relaxed border border-slate-800">
                            <i class="fa-solid fa-circle-info text-amber-400 mr-1"></i>
                            Draw your signature below. The system requires an active signature matrix to unlock next structural steps.
                        </div>

                        <div class="relative w-full bg-white border border-slate-200 rounded-3xl p-2 shadow-xl overflow-hidden">
                            <canvas id="signature-canvas" class="w-full h-48 bg-slate-50 rounded-2xl border border-dashed border-slate-300" style="touch-action: none !important;"></canvas>
                        </div>

                        <div class="flex justify-start">
                            <button onclick="clearSignatureCanvas()" class="px-4 py-2 bg-white text-slate-600 border border-slate-200 font-black rounded-xl text-[10px] uppercase tracking-wider active:bg-slate-50 transition shadow-xs">
                                <i class="fa-solid fa-eraser mr-1"></i> Clear Canvas
                            </button>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-slate-200/60 w-full">
                        <button onclick="saveSignatureAndProceedToBank()" class="w-full py-4 bg-slate-950 text-white rounded-2xl font-bold text-sm shadow-xl active:scale-[0.97] transition flex items-center justify-center gap-2">
                            Verify Seal & Continue <i class="fa-solid fa-arrow-right text-xs text-slate-400"></i>
                        </button>
                    </div>
                </div>

                <div id="sub-panel-bank" class="space-y-5 w-full hidden">
                    <div class="text-center">
                        <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center shadow-md mb-2 border border-emerald-100">
                            <i class="fa-solid fa-building-columns text-lg"></i>
                        </div>
                        <h2 class="text-xl font-black text-slate-900 tracking-tight">Settlement Node Account</h2>
                        <p class="text-xs text-slate-400 font-medium mt-0.5">Step 5 of 5: Link Verification Account</p>
                    </div>

                    <div id="bank-loading-spinner" class="hidden flex-col items-center justify-center p-8 bg-slate-950 text-white rounded-3xl space-y-4 animate-fade-in">
                        <i class="fa-solid fa-circle-notch animate-spin text-3xl text-emerald-400"></i>
                        <div class="text-center space-y-1">
                            <p class="text-xs font-black tracking-wider uppercase">Triggering Verification Engine...</p>
                            <p class="text-[9px] text-slate-400 font-mono">DISPATCHING INR 1.00 IMPS SECURITY TOKEN PATHWAYS...</p>
                        </div>
                    </div>

                    <div id="bank-form-fields-wrapper" class="space-y-4 bg-white border border-slate-100 rounded-[2rem] p-5 shadow-xl shadow-slate-100/60">
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Bank Name</label>
                            <input type="text" id="bank-name-manual" placeholder="e.g. State Bank of India, HDFC Bank" class="bda-input">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Account Holder Name</label>
                            <input type="text" id="bank-holder-name" placeholder="As printed on bank records" class="bda-input">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Bank Account Number</label>
                            <input type="password" id="bank-account-num" placeholder="Enter account number" class="bda-input font-mono tracking-widest">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Confirm Account Number</label>
                            <input type="text" id="bank-account-conf" placeholder="Re-enter account number" class="bda-input font-mono tracking-widest" onpaste="return false;">
                        </div>
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">IFSC Code</label>
                            <input type="text" id="bank-ifsc-code" maxlength="11" placeholder="e.g. SBIN0001234" class="bda-input uppercase font-mono font-bold tracking-wider">
                        </div>

                        <div class="pt-2">
                            <button onclick="handleCompleteOnboardingSettlement()" class="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-600/20 active:scale-[0.96] transition flex items-center justify-center gap-2">
                                <i class="fa-solid fa-shield-halved text-xs"></i> Authorize & Link Card Node
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

let hasUserSignedOnCanvas = false;
let canvasIsDrawing = false;
let sigCanvasX = 0; let sigCanvasY = 0;
let rawSignatureBase64String = "";

window.initSignatureEngine = function() {
    const canvas = document.getElementById('signature-canvas');
    if (!canvas) return;
    
    hasUserSignedOnCanvas = false; 
    document.getElementById('sub-panel-signature').style.display = "flex";
    document.getElementById('sub-panel-bank').style.display = "none";

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width; canvas.height = rect.height;

    ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3.0; ctx.lineCap = 'round'; ctx.lineJoin = 'round';

    function getCoords(e) {
        const cRect = canvas.getBoundingClientRect();
        if (e.touches && e.touches.length > 0) {
            return { x: e.touches[0].clientX - cRect.left, y: e.touches[0].clientY - cRect.top };
        }
        return { x: e.clientX - cRect.left, y: e.clientY - cRect.top };
    }

    canvas.addEventListener('touchstart', (e) => {
        canvasIsDrawing = true; hasUserSignedOnCanvas = true;
        const pts = getCoords(e); sigCanvasX = pts.x; sigCanvasY = pts.y;
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (!canvasIsDrawing) return;
        const pts = getCoords(e);
        ctx.beginPath(); ctx.moveTo(sigCanvasX, sigCanvasY); ctx.lineTo(pts.x, pts.y); ctx.stroke();
        sigCanvasX = pts.x; sigCanvasY = pts.y;
    }, { passive: true });

    canvas.addEventListener('touchend', () => canvasIsDrawing = false);
    
    canvas.addEventListener('mousedown', (e) => {
        canvasIsDrawing = true; hasUserSignedOnCanvas = true;
        const pts = getCoords(e); sigCanvasX = pts.x; sigCanvasY = pts.y;
    });
    canvas.addEventListener('mousemove', (e) => {
        if (!canvasIsDrawing) return;
        const pts = getCoords(e);
        ctx.beginPath(); ctx.moveTo(sigCanvasX, sigCanvasY); ctx.lineTo(pts.x, pts.y); ctx.stroke();
        sigCanvasX = pts.x; sigCanvasY = pts.y;
    });
    canvas.addEventListener('mouseup', () => canvasIsDrawing = false);
};

window.clearSignatureCanvas = function() {
    const canvas = document.getElementById('signature-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasUserSignedOnCanvas = false;
};

window.saveSignatureAndProceedToBank = function() {
    if (!hasUserSignedOnCanvas) {
        return triggerAlert("Signature Required", "Please provide your dynamic signature seal before clicking continue.", "error");
    }
    const canvas = document.getElementById('signature-canvas');
    rawSignatureBase64String = canvas.toDataURL();
    
    document.getElementById('sub-panel-signature').style.display = "none";
    const bPanel = document.getElementById('sub-panel-bank');
    bPanel.classList.remove('hidden'); bPanel.style.display = "block";
};

window.handleCompleteOnboardingSettlement = function() {
    const bankName = document.getElementById('bank-name-manual').value.trim();
    const holderName = document.getElementById('bank-holder-name').value.trim();
    const accountNum = document.getElementById('bank-account-num').value.trim();
    const accountConf = document.getElementById('bank-account-conf').value.trim();
    const ifscCode = document.getElementById('bank-ifsc-code').value.trim().toUpperCase();

    if (!bankName) return triggerAlert("Input Error", "Please provide your operational bank name.", "error");
    if (!holderName || holderName.length < 3) return triggerAlert("Input Error", "Please enter account holder name.", "error");
    if (accountNum.length < 9) return triggerAlert("Input Error", "Invalid Bank Account Number length.", "error");
    if (accountNum !== accountConf) return triggerAlert("Input Error", "Account Number entries mismatch.", "error");
    if (ifscCode.length !== 11) return triggerAlert("Input Error", "IFSC must be exactly 11 characters.", "error");

    document.getElementById('bank-form-fields-wrapper').style.display = "none";
    const spinner = document.getElementById('bank-loading-spinner');
    spinner.classList.remove('hidden'); spinner.style.display = "flex";

    setTimeout(() => {
        window.globalUserDataObj.signatureUrl = rawSignatureBase64String;
        window.globalUserDataObj.bankLinked = true;
        window.globalUserDataObj.sharesCount = 1; // Default allocation unit
        window.globalUserDataObj.bankDetails = { bankName, holderName, accountNumber: accountNum, ifscCode, microDepositDispatched: true };

        db.collection("users").doc(window.currentUserMobile).set(window.globalUserDataObj).then(() => {
            triggerAlert("Verification Success", "Account validated successfully. INR 1.00 credited via IMPS node transaction.", "success");
            setTimeout(() => { switchView('home'); }, 1200);
        }).catch(err => {
            document.getElementById('bank-loading-spinner').style.display = "none";
            document.getElementById('bank-form-fields-wrapper').style.display = "block";
            triggerAlert("Database Error", err.message, "error");
        });
    }, 2500); // 2.5 Sec Real-time banking linkage simulation window delay
};
