// ==========================================================================
// BHARAT DIGITAL ASSETS - MASTER LEDGER CONTROL & REALTIME AUDIT BOARD v4.4
// ==========================================================================

const AdminView = {
    render: function() {
        return `
            <div id="view-admin" class="view-panel p-5 space-y-6 min-h-screen bg-slate-100 flex flex-col pb-16" style="display: none; width: 100%;">
                
                <div class="flex justify-between items-center border-b border-slate-200 pb-4">
                    <div>
                        <h2 class="text-xl font-black text-slate-900 tracking-tight">Master Ledger Desk</h2>
                        <p class="text-[10px] text-slate-500 font-bold font-mono uppercase tracking-wider">Live Registered Users Database</p>
                    </div>
                    <button onclick="window.location.reload()" class="text-xs font-black bg-white border border-slate-300 text-red-600 px-3.5 py-2 rounded-xl shadow-xs active:bg-red-50 transition duration-150">
                        <i class="fa-solid fa-power-off mr-1"></i> Exit Admin
                    </button>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-slate-900 text-white p-4 rounded-2xl shadow-md">
                        <p class="text-[9px] text-slate-400 uppercase font-black tracking-wider">Total Active Users</p>
                        <p id="admin-total-users-count" class="text-2xl font-black text-emerald-400 font-mono mt-1">0</p>
                    </div>
                    <div class="bg-blue-950 text-white p-4 rounded-2xl shadow-md">
                        <p class="text-[9px] text-blue-300 uppercase font-black tracking-wider">Pending Approvals</p>
                        <p id="admin-pending-users-count" class="text-2xl font-black text-amber-400 font-mono mt-1">0 Nodes</p>
                    </div>
                </div>

                <div class="space-y-3 flex-1 overflow-y-auto">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <i class="fa-solid fa-users"></i> Member Management Queue
                    </h3>
                    
                    <div id="admin-user-list-wrapper" class="space-y-3">
                        <div class="text-center p-8 bg-white rounded-2xl border text-xs text-slate-400 font-medium">
                            <i class="fa-solid fa-circle-notch animate-spin mr-2"></i> Syncing live network nodes...
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};

// फायरबेसमधून सर्व युझर्सचा डेटा ओढून लिस्ट बनवणारे प्रगत फंक्शन
window.syncAdminMasterLedger = function() {
    const listWrapper = document.getElementById('admin-user-list-wrapper');
    const totalCountEl = document.getElementById('admin-total-users-count');
    const pendingCountEl = document.getElementById('admin-pending-users-count');
    
    if (!listWrapper) return;

    db.collection("users").onSnapshot((snapshot) => {
        listWrapper.innerHTML = "";
        let totalUsersCount = 0;
        let pendingUsersCount = 0;

        if (snapshot.empty) {
            listWrapper.innerHTML = `<div class="text-center p-6 bg-white rounded-2xl border text-xs font-bold text-slate-400">No registered users found in database.</div>`;
            if(totalCountEl) totalCountEl.innerText = "0";
            if(pendingCountEl) pendingCountEl.innerText = "0";
            return;
        }

        snapshot.forEach((doc) => {
            const user = doc.data();
            totalUsersCount++;
            
            if (!user.isPaid) { pendingUsersCount++; }

            // प्रत्येक युझरसाठी एक सुंदर प्रगत माहिती बॉक्स डिझाईन करणे
            const userRow = document.createElement('div');
            userRow.className = "bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 animate-fade-in";
            
            userRow.innerHTML = `
                <div class="flex justify-between items-start border-b border-slate-100 pb-2">
                    <div>
                        <h4 class="font-black text-xs text-slate-800 uppercase tracking-tight">${user.name}</h4>
                        <p class="text-[10px] text-slate-500 font-mono font-bold mt-0.5"><i class="fa-solid fa-phone text-[8px] text-slate-400 mr-0.5"></i> ${user.phone}</p>
                    </div>
                    <span class="text-[9px] font-black font-mono px-2 py-0.5 rounded-md ${user.isPaid ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}">
                        ${user.isPaid ? 'APPROVED' : 'PENDING'}
                    </span>
                </div>
                
                <div class="grid grid-cols-2 gap-2 text-[10px] text-slate-600 font-medium">
                    <p class="break-all"><span class="text-slate-400 font-bold block text-[8px] uppercase">Email Hub</span>${user.email}</p>
                    <p><span class="text-slate-400 font-bold block text-[8px] uppercase">Submitted UTR Code</span><span class="font-mono font-bold text-blue-900">${user.utrCode ? user.utrCode : 'Not Submitted'}</span></p>
                </div>

                ${!user.isPaid ? `
                    <div class="pt-1 flex gap-2">
                        <button onclick="approveUserPaymentFromAdmin('${user.phone}')" class="flex-1 py-2 bg-emerald-600 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm active:scale-95 transition">
                            Approve Block & Unlock Certificate
                        </button>
                    </div>
                ` : ''}
            `;
            listWrapper.appendChild(userRow);
        });

        if(totalCountEl) totalCountEl.innerText = totalUsersCount;
        if(pendingCountEl) pendingCountEl.innerText = pendingUsersCount + " Nodes";
    }, (error) => {
        listWrapper.innerHTML = `<div class="text-center p-4 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-bold">Error syncing data: ${error.message}</div>`;
    });
};

// ॲडमिन थ्रू पेमेंट अप्रूव्ह करण्याचे आणि युझरचे सर्टिफिकेट चालू करण्याचे फंक्शन
window.approveUserPaymentFromAdmin = function(userPhone) {
    if (!userPhone) return;
    
    db.collection("users").doc(userPhone).update({
        isPaid: true
    }).then(() => {
        alert("User Node Approved Successfully! Certificate Unlocked.");
    }).catch(err => {
        alert("Approval Process Fault: " + err.message);
    });
};
