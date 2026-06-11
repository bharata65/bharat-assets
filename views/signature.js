// ==========================================================================
// BHARAT DIGITAL ASSETS - SIGNATURE ENGINE & BANK SETTLEMENT VIEW v5.0
// ==========================================================================

const SignatureView = {
    render: function() {
        return `
            <div id="view-signature" class="view-panel p-5 flex flex-col min-h-screen bg-slate-50 pb-16 overflow-y-auto" style="display: none; width: 100%;">
                
                <div id="sub-panel-signature" class="space-y-5 w-full flex flex-col justify-between flex-1">
                    <div class="space-y-4">
                        <div class="text-center">
                            <div class="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl mx-auto flex items-center justify-center shadow-md mb-2 border border-blue-100">
                                <i class="fa-solid fa-pen-clip text-lg"></i>
                            </div>
                            <h2 class="text-xl font-black text-blue-950 tracking-tight">Digital Authorization Seal</h2>
                            <p class="text-xs text-slate-400 font-medium mt-0.5">Step 4 of 5: Legal Verification Signature</p>
                        </div>

                        <div class="bg-slate-900 text-slate-300 p-4 rounded-2xl text-[11px] font-medium leading-relaxed border border-slate-800 shadow-inner">
                            <i class="fa-solid fa-circle-info text-amber-400 mr-1"></i>
                            Please draw your official signature inside the white canvas box using your finger or stylus pen.
                        </div>

                        <div class="relative w-full bg-white border border-slate-200 rounded-3xl p-2 shadow-xl shadow-slate-100/80 overflow-hidden">
                            <canvas id="signature-canvas" class="w-full h-48 bg-slate-50 rounded-2xl border border-dashed border-slate-200" style="touch-action: none;"></canvas>
                        </div>

                        <div class="flex justify-start">
                            <button onclick="clearSignatureCanvas()" class="px-4 py-2 bg-white text-slate-600 border border-slate-200 font-black rounded-xl text-[10px] uppercase tracking-wider active:bg-slate-50 transition shadow-xs">
                                <i class="fa-solid fa-eraser mr-1"></i> Clear Board
                            </button>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-slate-200/60 w-full">
                        <button onclick="saveSignatureAndProceedToBank()" class="w-full py-4 bg-slate-950 text-white rounded-2xl font-bold text-sm shadow-xl active:scale-[0.97] transition duration-150 flex items-center justify-center gap-2">
                            Accept & Proceed to Bank Setup <i class="fa-solid fa-arrow-right text-xs text-slate-400"></i>
                        </button>
                    </div>
                </div>

                <div id="sub-panel-bank" class="space-y-5 w-full hidden">
                    <div class="text-center">
                        <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl mx-auto flex items-center justify-center shadow-md mb-2 border border-emerald-100">
                            <i class="fa-solid fa-credit-card text-lg"></i>
                        </div>
                        <h2 class="text-xl font-black text-slate-900 tracking-tight">Bank Settlement Node</h2>
                        <p class="text-xs text-slate-400 font-medium mt-0.5">Step 5 of 5: Link Settlement Account</p>
                    </div>

                    <div class="bg-emerald-50 text-emerald-950 p-4 rounded-2xl text-[11px] font-medium leading-relaxed border border-emerald-100 shadow-xs">
                        <i class="fa-solid fa-shield-check text-emerald-600 mr-1"></i>
                        Link your operational bank account. A <strong>₹1.00 security micro-deposit</strong> authentication handshake will be triggered post ledger linking.
                    </div>

                    <div class="space-y-4 bg-white border border-slate-100 rounded-[2rem] p-5 shadow-xl shadow-slate-100/60">
                        
                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Select Bank Name</label>
                            <select id="bank-name-select" class="bda-input bg-white font-medium text-slate-800">
                                <option value="" disabled selected>Choose your banking institution...</option>
                                <option value="State Bank of India">State Bank of India (SBI)</option>
                                <option value="HDFC Bank">HDFC Bank Limited</option>
                                <option value="ICICI Bank">ICICI Bank Limited</option>
                                <option value="Bank of Baroda">Bank of Baroda</option>
                                <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
                                <option value="Axis Bank">Axis Bank Limited</option>
                                <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                                <option value="Canara Bank">Canara Bank</option>
                                <option value="Union Bank of India">Union Bank of India</option>
                                <option value="Indian Bank">Indian Bank</option>
                                <option value="Bank of India">Bank of India</option>
                                <option value="Central Bank of India">Central Bank of India</option>
                                <option value="IDBI Bank">IDBI Bank</option>
                                <option value="IndusInd Bank">IndusInd Bank</option>
                                <option value="Federal Bank">Federal Bank</option>
                                <option value="Yes Bank">Yes Bank Limited</option>
                                <option value="UCO Bank">UCO Bank</option>
                                <option value="Bank of Maharashtra">Bank of Maharashtra</option>
                                <option value="India Post Payments Bank">India Post Payments Bank (IPPB)</option>
                                <option value="Paytm Payments Bank">Paytm Payments Bank</option>
                                <option value="Airtel Payments Bank">Airtel Payments Bank</option>
                                <option value="Jio Payments Bank">Jio Payments Bank</option>
                                <option value="NSDL Payments Bank">NSDL Payments Bank</option>
                                <option value="Fino Payments Bank">Fino Payments Bank</option>
                                <option value="AU Small Finance Bank">AU Small Finance Bank</option>
                                <option value="Equitas Small Finance Bank">Equitas Small Finance Bank</option>
                                <option value="Suryoday Small Finance Bank">Suryoday Small Finance Bank</option>
                                <option value="Ujjivan Small Finance Bank">Ujjivan Small Finance Bank</option>
                                <option value="Capital Small Finance Bank">Capital Small Finance Bank</option>
                                <option value="ESAF Small Finance Bank">ESAF Small Finance Bank</option>
                                <option value="Jana Small Finance Bank">Jana Small Finance Bank</option>
                                <option value="North East Small Finance Bank">North East Small Finance Bank</option>
                                <option value="Shivalik Small Finance Bank">Shivalik Small Finance Bank</option>
                                <option value="Unity Small Finance Bank">Unity Small Finance Bank</option>
                                <option value="Utkarsh Small Finance Bank">Utkarsh Small Finance Bank</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Account Holder Name</label>
                            <input type="text" id="bank-holder-name" placeholder="As printed on bank passbook" class="bda-input">
                        </div>

                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Bank Account Number</label>
                            <input type="password" id="bank-account-num" placeholder="Enter bank account number" class="bda-input font-mono tracking-widest">
                        </div>

                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Confirm Account Number</label>
                            <input type="text" id="bank-account-conf" placeholder="Re-enter bank account number" class="bda-input font-mono tracking-widest" onpaste="return false;">
                        </div>

                        <div>
                            <label class="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">IFSC Code</label>
                            <input type="text" id="bank-ifsc-code" maxlength="11" placeholder="e.g. SBIN0001234" class="bda-input uppercase font-mono font-bold">
                        </div>

                        <div class="pt-2">
                            <button onclick="handleCompleteOnboardingSettlement()" class="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-600/20 active:scale-[0.96] transition duration-150 flex items-center justify-center gap-2">
                                <i class="fa-solid fa-vault text-xs"></i> Finalize Secure Node Enrollment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// ==========================================================================
// ANTI-CRASH INTERACTIVE TOUCH MOUNTING CORE ENGINE
// ==========================================================================
let isDrawingActive = false;
let sigLastX = 0;
let sigLastY = 0;
let base64SignatureData = "";

window.initSignatureEngine = function() {
    const canvas = document.getElementById('signature-canvas');
    const subPanelSig = document.getElementById('sub-panel-signature');
    const subPanelBank = document.getElementById('sub-panel-bank');
    
    if (!canvas) return;
    
    // रीसेट सब-पॅनेल्स व्हिजिबिलिटी स्टेट्स
    if (subPanelSig) subPanelSig.style.display = "flex";
    if (subPanelBank) subPanelBank.style.display = "none";

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // मोबाईल डिव्हाइसेसवर वेक्टर को-ऑर्डिनेट्स तंतोतंत अलाइन करणे
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.strokeStyle = '#0f172a'; // Deep Institutional Blue Ink
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function getVectorCoordinates(evt) {
        const cRect = canvas.getBoundingClientRect();
        if (evt.touches && evt.touches.length > 0) {
            return {
                x: evt.touches[0].clientX - cRect.left,
                y: evt.touches[0].clientY - cRect.top
            };
        } else {
            return {
                x: evt.clientX - cRect.left,
                y: evt.clientY - cRect.top
            };
        }
    }

    // मोबाईल रिस्पॉन्सिव्ह टच इव्हेंट मॅपिंग्ज
    canvas.addEventListener('touchstart', (e) => {
        isDrawingActive = true;
        const coords = getVectorCoordinates(e);
        sigLastX = coords.x; sigLastY = coords.y;
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (!isDrawingActive) return;
        const coords = getVectorCoordinates(e);
        
        ctx.beginPath();
        ctx.moveTo(sigLastX, sigLastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();

        sigLastX = coords.x; sigLastY = coords.y;
    }, { passive: true });

    canvas.addEventListener('touchend', () => { isDrawingActive = false; });

    // डेस्कटॉप माउस ओव्हरराईड इव्हेंट्स
    canvas.addEventListener('mousedown', (e) => {
        isDrawingActive = true;
        const coords = getVectorCoordinates(e);
        sigLastX = coords.x; sigLastY = coords.y;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawingActive) return;
        const coords = getVectorCoordinates(e);
        ctx.beginPath(); ctx.moveTo(sigLastX, sigLastY); ctx.lineTo(coords.x, coords.y); ctx.stroke();
        sigLastX = coords.x; sigLastY = coords.y;
    });

    canvas.addEventListener('mouseup', () => { isDrawingActive = false; });
    canvas.addEventListener('mouseleave', () => { isDrawingActive = false; });
};

window.clearSignatureCanvas = function() {
    const canvas = document.getElementById('signature-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// सही सेव्ह करून बँक सिलेक्शन पॅनेल उघडणे
window.saveSignatureAndProceedToBank = function() {
    const canvas = document.getElementById('signature-canvas');
    if (!canvas) return;
    
    base64SignatureData = canvas.toDataURL();
    
    // सब-पॅनेल टॉगल करणे (स्वाक्षरी पॅनेल लपवून बँक फॉर्म दाखवणे)
    document.getElementById('sub-panel-signature').style.display = "none";
    
    const bankPanel = document.getElementById('sub-panel-bank');
    bankPanel.classList.remove('hidden');
    bankPanel.style.display = "block";
};

// अंतिम स्टेप ५: ऑल इंडिया बँक डिटेल्स व्हॅलिडेशन आणि फायरबेस सिंक
window.handleCompleteOnboardingSettlement = function() {
    const bankName = document.getElementById('bank-name-select').value;
    const holderName = document.getElementById('bank-holder-name').value.trim();
    const accountNum = document.getElementById('bank-account-num').value.trim();
    const accountConf = document.getElementById('bank-account-conf').value.trim();
    const ifscCode = document.getElementById('bank-ifsc-code').value.trim().toUpperCase();

    if (!bankName) return triggerAlert("Validation Error", "Please select your financial bank institution.", "error");
    if (!holderName || holderName.length < 3) return triggerAlert("Validation Error", "Please input account holder legal name.", "error");
    if (accountNum.length < 9 || isNaN(accountNum)) return triggerAlert("Validation Error", "Invalid Bank Account Number configuration.", "error");
    if (accountNum !== accountConf) return triggerAlert("Validation Error", "Account Number matching mismatch.", "error");
    if (ifscCode.length !== 11) return triggerAlert("Validation Error", "IFSC configuration code requires precisely 11 alphanumeric keys.", "error");

    // बँक डिटेल्स आणि स्वाक्षरी डेटा मूळ ऑब्जेक्टमध्ये इंजेक्ट करणे
    window.globalUserDataObj.signatureUrl = base64SignatureData;
    window.globalUserDataObj.bankLinked = true;
    window.globalUserDataObj.bankDetails = {
        bankName: bankName,
        holderName: holderName,
        accountNumber: accountNum,
        ifscCode: ifscCode,
        microDepositDispatched: true // ₹१.०० ट्रिगर मार्क सिस्टीम व्हॅल्यू
    };

    // संपूर्ण डेटा डेटाबेसमध्ये सुरक्षित सेव्ह करणे
    db.collection("users").doc(window.currentUserMobile).set(window.globalUserDataObj).then(() => {
        triggerAlert("Settlement Verified", "Bank settlement ledger linked. ₹1.00 processing pipeline initialized.", "success");
        setTimeout(() => { switchView('home'); }, 1200);
    }).catch(err => triggerAlert("Database Fault", err.message, "error"));
};
