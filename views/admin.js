// ==========================================================================
// BHARAT DIGITAL ASSETS - MASTER LEDGER CONTROL & AUDIT BOARD v5.0 (ENGLISH)
// ==========================================================================

const AdminView = {
    render: function() {
        return `
            <div id="view-admin" class="view-panel p-5 space-y-6 min-h-screen bg-slate-100 flex flex-col pb-16" style="display: none; width: 100%;">
                
                <div class="flex justify-between items-center border-b border-slate-200 pb-4">
                    <div>
                        <h2 class="text-xl font-black text-slate-900 tracking-tight">Master Ledger Desk</h2>
                        <p class="text-[10px] text-slate-500 font-bold font-mono uppercase tracking-wider">Enterprise Centralized Control Desk</p>
                    </div>
                    <button onclick="window.location.reload()" class="text-xs font-black bg-white border border-slate-300 text-red-600 px-3.5 py-2 rounded-xl shadow-xs active:bg-red-50 transition duration-150">
                        <i class="fa-solid fa-power-off mr-1"></i> Terminate Connection
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-slate-950 text-white p-4 rounded-2xl shadow-md relative overflow-hidden">
                        <p class="text-[9px] text-slate-400 uppercase font-black tracking-wider">Total Registered Entities</p>
                        <p id="admin-total-users-count" class="text-2xl font-black text-emerald-400 font-mono mt-1">0</p>
                    </div>
                    <div class="bg-blue-950 text-white p-4 rounded-2xl shadow-md relative overflow-hidden">
                        <p class="text-[9px] text-blue-300 uppercase font-black tracking-wider">Awaiting Verification</p>
                        <p id="admin-pending-users-count" class="text-2xl font-black text-amber-400 font-mono mt-1">0 Nodes</p>
                    </div>
                </div>

                <div class="space-y-3 flex-1 overflow-y-auto">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <i class="fa-solid fa-server"></i> Live Asset Node Pipeline
                    </h3>
                    
                    <div id="admin-user-list-wrapper" class="space-y-4">
                        <div class="text-center p-8 bg-white rounded-2xl border text-xs text-slate-400 font-medium">
                            <i class="fa-solid fa-circle-notch animate-spin mr-2"></i> Fetching global secure network data...
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// ==========================================================================
// REAL-TIME SYNCHRONIZATION & INSTITUTIONAL SETTLEMENT LEDGERS
// ==========================================================================
window.syncAdminMasterLedger = function() {
    const listWrapper = document.getElementById('admin-user-list-wrapper');
    const totalCountEl = document.getElementById('admin-total-users-count');
    const pendingCountEl = document.getElementById('admin-pending-users-count');
    
    if (!listWrapper) return;

    db.collection("users").onSnapshot((snapshot) => {
        listWrapper.innerHTML = "";
        let totalCount = 0;
        let pendingCount = 0;

        if (snapshot.empty) {
            listWrapper.innerHTML = `<div class="text-center p-6 bg-white rounded-2xl border text-xs font-bold text-slate-400">No active user records found in the security cluster.</div>`;
            if(totalCountEl) totalCountEl.innerText = "0";
            if(pendingCountEl) pendingCountEl.innerText = "0";
            return;
        }

        snapshot.forEach((doc) => {
            const user = doc.data();
            totalCount++;
            if (!user.isPaid) { pendingCount++; }

            // Extract Settlement Vector Objects safely
            const bank = user.bankDetails || {};

            const nodeRow = document.createElement('div');
            nodeRow.className = "bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 animate-fade-in";
            
            nodeRow.innerHTML = `
                <div class="flex justify-between items-start border-b border-slate-100 pb-2.5">
                    <div>
                        <h4 class="font-black text-xs text-slate-900 uppercase tracking-tight">${user.name}</h4>
                        <p class="text-[10px] text-slate-500 font-mono font-bold mt-0.5"><i class="fa-solid fa-phone text-[8px] text-slate-400 mr-0.5"></i> ${user.phone} | <span class="text-slate-400">${user.email}</span></p>
                    </div>
                    <span class="text-[9px] font-black font-mono px-2.5 py-0.5 rounded-md ${user.isPaid ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}">
                        ${user.isPaid ? 'VERIFIED' : 'PENDING'}
                    </span>
                </div>
                
                <div class="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2 text-[10px]">
                    <div class="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <i class="fa-solid fa-building-columns text-[8px]"></i> Account Settlement Parameters
                    </div>
                    <div class="grid grid-cols-2 gap-y-2 gap-x-4 text-slate-700">
                        <p><span class="text-slate-400 block text-[8px] uppercase font-bold">Bank Name</span> <span class="font-bold text-slate-900">${bank.bankName || 'Not Linked'}</span></p>
                        <p><span class="text-slate-400 block text-[8px] uppercase font-bold">Account Holder</span> <span class="font-semibold">${bank.holderName || 'N/A'}</span></p>
                        <p><span class="text-slate-400 block text-[8px] uppercase font-bold">Account Number</span> <span class="font-mono font-bold text-slate-900 tracking-wide">${bank.accountNumber || 'N/A'}</span></p>
                        <p><span class="text-slate-400 block text-[8px] uppercase font-bold">IFSC Code</span> <span class="font-mono font-bold text-blue-900">${bank.ifscCode || 'N/A'}</span></p>
                    </div>
                    
                    <div class="pt-1.5 mt-1 border-t border-slate-200/50 flex items-center justify-between text-[9px] font-bold">
                        <span class="text-slate-400 uppercase">Verification Deposit Status:</span>
                        <span class="${bank.microDepositDispatched ? 'text-emerald-600' : 'text-slate-400'} flex items-center gap-1">
                            <i class="fa-solid fa-circle-check"></i> ₹1.00 IMPS Dispatched
                        </span>
                    </div>
                </div>

                ${!user.isPaid ? `
                    <div class="pt-1">
                        <button onclick="approveUserPaymentFromAdmin('${user.phone}')" class="w-full py-2.5 bg-slate-950 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-md active:scale-[0.98] transition">
                            Verify Ledger Node & Unlock Documents
                        </button>
                    </div>
                ` : `
                    <div class="bg-emerald-50 text-emerald-700 text-center py-2 rounded-xl text-[9px] font-bold border border-emerald-100 uppercase tracking-wider">
                        <i class="fa-solid fa-lock-open mr-0.5"></i> Certificate & Portfolio Dispatched
                    </div>
                `}
            `;
            listWrapper.appendChild(nodeRow);
        });

        if(totalCountEl) totalCountEl.innerText = totalCount;
        if(pendingCountEl) pendingCountEl.innerText = pendingCount + " Nodes";
    }, (error) => {
        listWrapper.innerHTML = `<div class="text-center p-4 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-bold">Database Handshake Error: ${error.message}</div>`;
    });
};

// Admin Control Authorization Callback
window.approveUserPaymentFromAdmin = function(userPhone) {
    if (!userPhone) return;
    
    db.collection("users").doc(userPhone).update({
        isPaid: true
    }).then(() => {
        alert("Success: Ledger node authorized. User documents successfully generated.");
    }).catch(err => {
        alert("Operation Error: Failed to commit status update. " + err.message);
    });
};

console.log("BDA Views Hub: Admin panel module compiled successfully with settlement metrics.");
