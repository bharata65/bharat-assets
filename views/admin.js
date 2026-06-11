// ==========================================================================
// BHARAT DIGITAL ASSETS - MASTER ADMIN ARCHITECTURE HUB v7.5
// ==========================================================================

const AdminView = {
    render: function() {
        return `
            <div id="view-admin" class="view-panel p-5 space-y-5 min-h-screen bg-slate-100 flex flex-col pb-16 overflow-y-auto" style="display: none; width: 100%;">
                
                <div class="flex justify-between items-center border-b pb-3 border-slate-300">
                    <div>
                        <h2 class="text-xl font-black text-slate-900 tracking-tight">Master Admin Control</h2>
                        <p class="text-[9px] text-slate-500 font-bold uppercase font-mono">Central System Security Node</p>
                    </div>
                    <button onclick="window.location.reload()" class="text-xs font-black bg-white border border-slate-300 text-red-600 px-3 py-1.5 rounded-xl shadow-xs">Exit Session</button>
                </div>

                <div class="bg-slate-900 text-white p-4 rounded-2xl space-y-3 shadow-md border border-slate-800">
                    <p class="text-[9px] font-black tracking-wider text-blue-400 uppercase flex items-center gap-1">
                        <i class="fa-solid fa-bolt animate-pulse"></i> Core Gateway Master Target UPI ID
                    </p>
                    <div class="space-y-2">
                        <input type="text" id="admin-input-master-upi" placeholder="Enter Destination Merchant UPI ID" class="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-xl text-xs font-mono font-bold">
                        <button onclick="updateMasterPaymentGatewayUPIID()" class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] rounded-xl uppercase tracking-wider transition">Commit Gateway Routing</button>
                    </div>
                </div>

                <div class="space-y-3 flex-1">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <i class="fa-solid fa-folder-tree"></i> Centralized User Audits Realtime Matrix
                    </h3>
                    
                    <div id="admin-master-super-wrapper" class="space-y-4">
                        <div class="text-center p-8 bg-white rounded-2xl border text-xs text-slate-400 font-bold">
                            <i class="fa-solid fa-circle-notch animate-spin mr-1.5"></i> Initializing ledger syncer matrix...
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

window.updateMasterPaymentGatewayUPIID = function() {
    const upiStr = document.getElementById('admin-input-master-upi').value.trim();
    if(!upiStr) return alert("Please specify a valid operational target UPI merchant address string.");
    db.collection("config").doc("gateway").set({ upiId: upiStr }).then(() => {
        alert("Master System Confirmation: Merchant destination link successfully locked.");
    });
};

window.syncAdminMasterLedger = function() {
    const mainWrapper = document.getElementById('admin-master-super-wrapper');
    if (!mainWrapper) return;

    db.collection("config").doc("gateway").get().then(gDoc => {
        const liveUpiConfigAddress = gDoc.exists ? gDoc.data().upiId : "merchant@upi";
        const upiField = document.getElementById('admin-input-master-upi');
        if(upiField && gDoc.exists) upiField.value = liveUpiConfigAddress;

        db.collection("users").onSnapshot((userSnap) => {
            db.collection("chat_disputes").get().then((chatSnap) => {
                
                let chatHistoryLogsMap = {};
                chatSnap.forEach(c => { 
                    let d = c.data(); 
                    if(!chatHistoryLogsMap[d.phone]) chatHistoryLogsMap[d.phone] = []; 
                    chatHistoryLogsMap[d.phone].push(d.query); 
                });

                mainWrapper.innerHTML = "";
                if(userSnap.empty) {
                    mainWrapper.innerHTML = `<div class="text-center p-6 bg-white rounded-2xl border text-xs text-slate-400 font-bold">No active user data blocks found inside collection.</div>`;
                    return;
                }

                userSnap.forEach((uDoc) => {
                    const user = uDoc.data();
                    const bank = user.bankDetails || {};
                    const userQueriesLog = chatHistoryLogsMap[user.phone] || [];
                    const countUnits = user.sharesCount || 1;

                    const rowComponent = document.createElement('div');
                    rowComponent.className = "bg-white border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm relative overflow-hidden flex flex-col";

                    let alertUtrBadgeHTML = "";
                    if (user.utrCode && !user.isPaid) {
                        alertUtrBadgeHTML = `
                            <div class="bg-red-500 border border-red-600 text-white font-mono text-[8px] font-black tracking-widest px-3 py-1 rounded-full text-center mb-1 animate-pulse uppercase">
                                🚨 UTR VERIFICATION ACTION REQUIRED
                            </div>
                        `;
                    }

                    rowComponent.innerHTML = `
                        ${alertUtrBadgeHTML}
                        
                        <div class="flex justify-between items-start border-b border-slate-100 pb-2">
                            <div>
                                <h4 class="font-black text-slate-900 uppercase text-xs tracking-tight">${user.name}</h4>
                                <p class="text-[9px] font-mono text-slate-500 font-bold mt-0.5">${user.phone} | ${user.email}</p>
                            </div>
                            <span class="text-[9px] font-black font-mono px-2 py-0.5 rounded ${user.isPaid ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}">
                                ${user.isPaid ? 'VERIFIED' : 'PENDING'}
                            </span>
                        </div>

                        <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-[10px] space-y-1.5">
                            <div class="text-blue-900 font-black flex justify-between items-center text-[10px]">
                                <span>SECURED SHARES VOLUME: ${countUnits} Unit${countUnits > 1 ? 's' : ''}</span>
                                <span class="font-mono text-slate-900 font-black bg-slate-200 px-2 py-0.5 rounded">₹${countUnits * 200}.00</span>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-600 border-t border-slate-200/60 pt-1.5 mt-1.5">
                                <p><span class="text-slate-400 text-[8px] block uppercase font-bold">Bank Node:</span><strong class="text-slate-800">${bank.bankName || 'Not Linked'}</strong></p>
                                <p><span class="text-slate-400 text-[8px] block uppercase font-bold">IFSC Code:</span><strong class="font-mono text-slate-800">${bank.ifscCode || 'N/A'}</strong></p>
                                <p><span class="text-slate-400 text-[8px] block uppercase font-bold">Account No:</span><strong class="font-mono text-slate-800">${bank.accountNumber || 'N/A'}</strong></p>
                                <p><span class="text-slate-400 text-[8px] block uppercase font-bold">Verification:</span><strong class="text-emerald-600">₹1.00 Dispatched</strong></p>
                            </div>
                        </div>

                        <div class="p-3 rounded-2xl text-[10px] border ${user.utrCode ? 'bg-red-50/60 border-red-200/80 text-red-950' : 'bg-slate-50 border-slate-100 text-slate-500 italic'}">
                            <span class="text-[8px] font-black uppercase tracking-wider block ${user.utrCode ? 'text-red-800' : 'text-slate-400'}">Submitted Payment UTR Reference:</span>
                            <p class="font-mono text-xs font-black mt-0.5 tracking-widest">${user.utrCode ? user.utrCode : 'Awaiting reference submission...'}</p>
                        </div>

                        <div class="bg-blue-50/40 border border-blue-100/60 p-3 rounded-2xl text-[10px] space-y-1">
                            <span class="text-[8px] font-black text-blue-900 uppercase tracking-wider block"><i class="fa-solid fa-headset"></i> Chatbot Enquiries</span>
                            ${userQueriesLog.length === 0 ? 
                                `<p class="text-slate-400 italic font-medium">No helpdesk logs cataloged.</p>` : 
                                `<ul class="list-disc list-inside text-slate-600 font-medium space-y-0.5">${userQueriesLog.map(q => `<li class="truncate">${q}</li>`).join('')}</ul>`
                            }
                        </div>

                        <div class="pt-1 border-t border-slate-100">
                            ${!user.isPaid ? `
                                <button onclick="approveUserPaymentFromAdmin('${user.phone}')" class="w-full py-2.5 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase tracking-wider active:scale-[0.98] transition">
                                    Approve Capital Node & Authorize Vault
                                </button>
                            ` : `
                                <div class="bg-emerald-50 text-emerald-700 text-center py-2 rounded-xl text-[9px] font-black uppercase tracking-wider border border-emerald-100">
                                    <i class="fa-solid fa-circle-check"></i> Capital Node Active
                                </div>
                            `}
                        </div>
                    `;
                    mainWrapper.appendChild(rowComponent);
                });
            });
        });
    });
};

window.approveUserPaymentFromAdmin = function(phoneNum) {
    if (!phoneNum) return;
    db.collection("users").doc(phoneNum).update({ isPaid: true }).then(() => {
        alert("Node clearance success committed.");
    });
};
