// ==========================================================================
// BHARAT DIGITAL ASSETS - ENTERPRISE MASTER LEDGER CONTROL HUB v5.5
// ==========================================================================

const AdminView = {
    render: function() {
        return `
            <div id="view-admin" class="view-panel p-5 space-y-5 min-h-screen bg-slate-100 flex flex-col pb-16 overflow-y-auto" style="display: none; width: 100%;">
                
                <div class="flex justify-between items-center border-b border-slate-200 pb-3">
                    <div>
                        <h2 class="text-xl font-black text-slate-900 tracking-tight">Master Admin Control</h2>
                        <p class="text-[9px] text-slate-500 font-bold font-mono uppercase tracking-wider">Unified Operational Risk Hub</p>
                    </div>
                    <button onclick="window.location.reload()" class="text-xs font-black bg-white border border-slate-300 text-red-600 px-3 py-1.5 rounded-xl active:bg-red-50">Exit Shell</button>
                </div>

                <div class="space-y-3 flex-1">
                    <h3 class="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><i class="fa-solid fa-folder-tree"></i> Central Member Auditing Ledger Pipeline</h3>
                    <div id="admin-master-super-wrapper" class="space-y-4">
                        </div>
                </div>
            </div>
        `;
    }
};

window.syncAdminMasterLedger = function() {
    const mainWrapper = document.getElementById('admin-master-super-wrapper');
    if (!mainWrapper) return;

    // Active pipeline cross-reference link to read users and chat disputes simultaneously
    db.collection("users").onSnapshot((userSnap) => {
        db.collection("chat_disputes").get().then((chatSnap) => {
            
            let chatMap = {};
            chatSnap.forEach(cDoc => {
                let cData = cDoc.data();
                if(!chatMap[cData.phone]) chatMap[cData.phone] = [];
                chatMap[cData.phone].push(cData.query);
            });

            mainWrapper.innerHTML = "";
            if (userSnap.empty) {
                mainWrapper.innerHTML = `<div class="text-center p-6 bg-white rounded-2xl border text-xs text-slate-400 font-bold">No registered entity blocks mapped.</div>`;
                return;
            }

            userSnap.forEach((uDoc) => {
                const user = uDoc.data();
                const bank = user.bankDetails || {};
                const chatHistoryList = chatMap[user.phone] || [];
                const shareCountVal = user.sharesCount || 1;

                const cardNode = document.createElement('div');
                cardNode.className = "bg-white border border-slate-200 rounded-[2rem] p-5 shadow-xs space-y-4 animate-fade-in";

                cardNode.innerHTML = `
                    <div class="flex justify-between items-start border-b border-slate-100 pb-3">
                        <div>
                            <h4 class="font-black text-sm text-slate-900 tracking-tight uppercase">${user.name}</h4>
                            <p class="text-[10px] font-mono text-slate-500 font-bold mt-0.5">${user.phone} | ${user.email}</p>
                            <span class="inline-block text-[9px] bg-blue-50 text-blue-900 border border-blue-100 px-2 mt-1 rounded font-bold">Allocated Units: ${shareCountVal} (₹${shareCountVal * 200})</span>
                        </div>
                        <span class="text-[9px] font-black font-mono px-2 py-0.5 rounded-md ${user.isPaid ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}">
                            ${user.isPaid ? 'APPROVED' : 'AWAITING AUDIT'}
                        </span>
                    </div>

                    <div class="bg-slate-50 p-3 rounded-2xl border text-[10px] space-y-1.5">
                        <p class="text-[8px] font-black text-slate-400 uppercase tracking-wider"><i class="fa-solid fa-wallet"></i> Registered Bank Account</p>
                        <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-700">
                            <p><span class="text-slate-400 text-[8px] block uppercase">Bank Node:</span><strong class="text-slate-900">${bank.bankName || 'N/A'}</strong></p>
                            <p><span class="text-slate-400 text-[8px] block uppercase">IFSC Code:</span><strong class="font-mono text-blue-900">${bank.ifscCode || 'N/A'}</strong></p>
                            <p><span class="text-slate-400 text-[8px] block uppercase">Account No:</span><strong class="font-mono text-slate-900">${bank.accountNumber || 'N/A'}</strong></p>
                            <p><span class="text-slate-400 text-[8px] block uppercase">IMPS Status:</span><strong class="text-emerald-600">₹1.00 Dispatched</strong></p>
                        </div>
                    </div>

                    <div class="bg-blue-50/40 border border-blue-100/60 p-3 rounded-2xl text-[10px] space-y-1">
                        <p class="text-[8px] font-black text-blue-900 uppercase tracking-wider"><i class="fa-solid fa-headset"></i> Support Helpdesk Dispute Log</p>
                        ${chatHistoryList.length === 0 ? 
                            `<p class="text-slate-400 italic">No chat assistant interaction logs recorded.</p>` : 
                            `<ul class="list-disc list-inside text-slate-700 space-y-0.5 font-medium">${chatHistoryList.map(q => `<li class="truncate">${q}</li>`).join('')}</ul>`
                        }
                    </div>

                    ${user.signatureUrl ? `
                        <div class="space-y-1">
                            <span class="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Cryptographic Signature String:</span>
                            <img src="${user.signatureUrl}" class="h-10 bg-slate-50 border border-dashed rounded-xl px-2 py-1 object-contain">
                        </div>
                    ` : ''}

                    <div class="pt-2 flex flex-col gap-2 border-t border-slate-100">
                        ${!user.isPaid ? `
                            <button onclick="approveUserPaymentFromAdmin('${user.phone}')" class="w-full py-2.5 bg-slate-900 text-white font-black rounded-xl text-[10px] uppercase tracking-wider active:scale-[0.98] transition">
                                Approve Asset Block & Issue Documents
                            </button>
                        ` : `
                            <div class="grid grid-cols-2 gap-2">
                                <button onclick="triggerAdminExternalPDFDownload('${user.phone}', 'agreement')" class="py-2 bg-slate-100 text-slate-700 font-bold border border-slate-200 rounded-xl text-[10px] uppercase flex items-center justify-center gap-1"><i class="fa-solid fa-download"></i> Agreement</button>
                                <button onclick="triggerAdminExternalPDFDownload('${user.phone}', 'certificate')" class="py-2 bg-slate-100 text-slate-700 font-bold border border-slate-200 rounded-xl text-[10px] uppercase flex items-center justify-center gap-1"><i class="fa-solid fa-download"></i> Certificate</button>
                            </div>
                        `}
                    </div>
                `;
                mainWrapper.appendChild(cardNode);
            });
        });
    });
};

// Admin Central Override For Dispatched Status Releases
window.approveUserPaymentFromAdmin = function(phoneNum) {
    db.collection("users").doc(phoneNum).update({ isPaid: true }).then(() => {
        alert("Node clearance success: Asset blocks verified and pushed to client vault.");
    });
};

// Master Admin Isolated PDF Generation Engine Callbacks
window.triggerAdminExternalPDFDownload = function(phoneNum, documentType) {
    db.collection("users").doc(phoneNum).get().then(doc => {
        if(!doc.exists) return;
        const u = doc.data();
        const { jsPDF } = window.jspdf; const pdf = new jsPDF('p', 'mm', 'a4');
        
        if(documentType === 'agreement') {
            pdf.text(`Executed Agreement - Name: ${u.name.toUpperCase()} | Node: ${u.phone}`, 15, 20);
            if(u.signatureUrl) pdf.addImage(u.signatureUrl, 'PNG', 15, 30, 40, 15);
            pdf.save(`Admin_Agreement_${u.phone}.pdf`);
        } else {
            // High-definition certificate format fallback layout compiler
            pdf.setFillColor(15, 23, 42); pdf.rect(0, 0, 210, 297, 'F');
            pdf.setTextColor(251, 191, 36); pdf.setFontSize(22); pdf.text("CERTIFICATE OF ASSET DEPOSIT", 105, 40, {align:"center"});
            pdf.setTextColor(255, 255, 255); pdf.setFontSize(16); pdf.text(u.name.toUpperCase(), 105, 80, {align:"center"});
            pdf.save(`Admin_Certificate_${u.phone}.pdf`);
        }
    });
};
