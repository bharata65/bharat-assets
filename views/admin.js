// ==========================================================================
// BHARAT DIGITAL ASSETS - MASTER ADMIN ARCHITECTURE HUB v6.0
// ==========================================================================

const AdminView = {
    render: function() {
        return `
            <div id="view-admin" class="view-panel p-5 space-y-5 min-h-screen bg-slate-100 flex flex-col pb-16 overflow-y-auto" style="display: none; width: 100%;">
                
                <div class="flex justify-between items-center border-b pb-3">
                    <div><h2 class="text-xl font-black text-slate-900 tracking-tight">Master Admin Control</h2><p class="text-[9px] text-slate-500 font-bold uppercase font-mono">Dynamic Payment Config Node</p></div>
                    <button onclick="window.location.reload()" class="text-xs font-black bg-white border border-slate-300 text-red-600 px-3 py-1 rounded-xl">Exit Shell</button>
                </div>

                <div class="bg-slate-900 text-white p-4 rounded-2xl space-y-3 shadow-md">
                    <p class="text-[9px] font-black tracking-wider text-blue-400 uppercase"><i class="fa-solid fa-bolt"></i> Live Gateway Configuration</p>
                    <div class="space-y-2">
                        <input type="text" id="admin-input-master-upi" placeholder="Enter Master Merchant UPI ID (e.g. business@ybl)" class="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl text-xs font-mono">
                        <button onclick="updateMasterPaymentGatewayUPIID()" class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] rounded-xl uppercase tracking-wider transition">Update Live Gateway String</button>
                    </div>
                </div>

                <div class="space-y-3 flex-1">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><i class="fa-solid fa-server"></i> Active Pipeline</h3>
                    <div id="admin-master-super-wrapper" class="space-y-4"></div>
                </div>
            </div>
        `;
    }
};

window.updateMasterPaymentGatewayUPIID = function() {
    const upiStr = document.getElementById('admin-input-master-upi').value.trim();
    if(!upiStr) return alert("Please enter a valid UPI address framework string.");
    db.collection("config").doc("gateway").set({ upiId: upiStr }).then(() => {
        alert("Success: Master merchant payment channel redirected to: " + upiStr);
    });
};

window.syncAdminMasterLedger = function() {
    const mainWrapper = document.getElementById('admin-master-super-wrapper');
    if (!mainWrapper) return;

    db.collection("config").doc("gateway").get().then(gDoc => {
        const activeLiveUPI = gDoc.exists ? gDoc.data().upiId : "merchant@upi";
        const upiField = document.getElementById('admin-input-master-upi');
        if(upiField && gDoc.exists) upiField.value = activeLiveUPI;

        db.collection("users").onSnapshot((userSnap) => {
            db.collection("chat_disputes").get().then((chatSnap) => {
                let chatMap = {}; chatSnap.forEach(c => { let d = c.data(); if(!chatMap[d.phone]) chatMap[d.phone] = []; chatMap[d.phone].push(d.query); });
                mainWrapper.innerHTML = "";

                userSnap.forEach((uDoc) => {
                    const user = uDoc.data(); const bank = user.bankDetails || {}; const chatHistoryList = chatMap[user.phone] || []; const shareCountVal = user.sharesCount || 1;
                    const cardNode = document.createElement('div'); cardNode.className = "bg-white border rounded-[2rem] p-5 space-y-4 text-xs shadow-xs";

                    cardNode.innerHTML = `
                        <div class="flex justify-between items-start border-b pb-2">
                            <div><h4 class="font-black text-slate-900 uppercase">${user.name}</h4><p class="text-[10px] font-mono text-slate-500 font-bold">${user.phone} | ${user.email}</p></div>
                            <span class="text-[9px] font-black font-mono px-2 py-0.5 rounded-md ${user.isPaid ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}">${user.isPaid ? 'VERIFIED' : 'AWAITING AUDIT'}</span>
                        </div>
                        <div class="bg-slate-50 p-3 rounded-xl text-[10px] space-y-1">
                            <p class="text-blue-900 font-bold">Units Secured: ${shareCountVal} (Total Value: ₹${shareCountVal * 200})</p>
                            <p><span class="text-slate-400">Linked Bank:</span> <strong>${bank.bankName || 'N/A'}</strong> | A/C: <strong>${bank.accountNumber || 'N/A'}</strong> | IFSC: <strong>${bank.ifscCode || 'N/A'}</strong></p>
                        </div>
                        <div class="bg-blue-50/30 p-2.5 rounded-xl text-[10px] space-y-1">
                            <p class="font-bold text-slate-500 uppercase text-[8px]">Chat History Enquiries Logs:</p>
                            ${chatHistoryList.length === 0 ? `<p class="text-slate-400 italic">No chat records mapped.</p>` : `<ul class="list-disc list-inside text-slate-600 space-y-0.5">${chatHistoryList.map(q => `<li>${q}</li>`).join('')}</ul>`}
                        </div>
                        ${!user.isPaid ? `<button onclick="approveUserPaymentFromAdmin('${user.phone}')" class="w-full py-2 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase">Approve Capital Allocation & Lock Assets</button>` : `<p class="text-center text-emerald-600 font-bold bg-emerald-50 py-1.5 rounded-xl uppercase tracking-wider text-[9px]">Node Active & Documents Dispatched</p>`}
                    `;
                    mainWrapper.appendChild(cardNode);
                });
            });
        });
    });
};

window.approveUserPaymentFromAdmin = function(phoneNum) {
    db.collection("users").doc(phoneNum).update({ isPaid: true }).then(() => { alert("Node authorized successfully."); });
};

// ==========================================================================
// CENTRAL CLIENT INTENT DISPATCH HOOK (QR CODE GENERATOR ADAPTER LINK)
// ==========================================================================
window.openPaymentGateway = function() {
    if (!window.globalUserDataObj) return;
    const u = window.globalUserDataObj;
    const computedSum = u.sharesCount * 200;
    
    db.collection("config").doc("gateway").get().then(gDoc => {
        const targetMerchantUPIAddress = gDoc.exists ? gDoc.data().upiId : "merchant@upi";
        
        // Cryptographic deep linked interface adapters config
        const upiIntentString = `upi://pay?pa=${targetMerchantUPIAddress}&pn=Bharat%20Digital%20Assets&am=${computedSum}.00&cu=INR&tn=BDA-NODE-TOKEN-${u.phone.slice(-4)}`;
        const qrChartAPIEndpoint = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiIntentString)}`;
        
        const gModal = document.getElementById('payment-gateway-modal');
        const qrImgContainer = document.getElementById('dynamic-qr-string-display');
        const intentAnchorLink = document.getElementById('dynamic-upi-intent-link');
        
        if (gModal && qrImgContainer && intentAnchorLink) {
            qrImgContainer.innerHTML = `<img src="${qrChartAPIEndpoint}" class="mx-auto border p-2 rounded-xl bg-slate-50 shadow-inner" alt="Payment QR Grid">`;
            intentAnchorLink.href = upiIntentString;
            gModal.style.setProperty('display', 'flex', 'important');
            gModal.classList.remove('hidden');
        }
    });
};

window.closePaymentGateway = function() { document.getElementById('payment-gateway-modal').classList.add('hidden'); };
window.submitUTRVerification = function() {
    const code = document.getElementById('input-utr-code').value.trim();
    if(code.length !== 12 || isNaN(code)) return triggerAlert("UTR Mismatch", "Bank standard transaction references require 12 numerical characters.", "error");
    db.collection("users").doc(window.currentUserMobile).update({ utrCode: code }).then(() => {
        triggerAlert("UTR Submitted", "Transaction token mapped successfully. Waiting for centralized administrative clearance validation.", "success");
        closePaymentGateway();
    });
};
