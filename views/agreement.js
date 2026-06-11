// ==========================================================================
// BHARAT DIGITAL ASSETS - STATUTORY LEGAL AGREEMENT VIEW v4.3
// ==========================================================================

const AgreementView = {
    // स्क्रीन ३: कायदेशीर करारनामा पॅनेलचा स्वतंत्र लेआउट रेंडर करणे
    render: function() {
        return `
            <div id="view-agreement" class="view-panel p-5 flex flex-col justify-between min-h-screen bg-slate-50/50 pb-12" style="display: none;">
                
                <div class="space-y-4 flex-1 overflow-y-auto max-h-[75vh] pr-1">
                    <div class="border-2 border-amber-600/20 bg-amber-50/60 p-4 rounded-2xl text-xs text-amber-950 flex items-start gap-2.5 shadow-sm">
                        <i class="fa-solid fa-circle-info mt-0.5 text-amber-700 text-sm"></i>
                        <p class="font-bold leading-relaxed">Please read the micro-share structural assignment terms and conditions thoroughly before signing your digital verification token.</p>
                    </div>

                    <div id="agreement-pdf-content" class="bg-amber-50/20 border border-amber-200/60 p-5 rounded-3xl font-serif text-xs text-stone-900 space-y-4 leading-relaxed relative shadow-inner">
                        
                        <div class="text-center border-b border-stone-300 pb-3 mb-2">
                            <h3 class="font-black text-sm uppercase tracking-wider text-stone-800">MEMORANDUM OF STRUCTURAL DEPOSIT</h3>
                            <p class="text-[9px] text-stone-500 font-sans mt-0.5 font-bold tracking-widest">Asset Identification Block: BDA-2026-X99</p>
                        </div>
                        
                        <p class="indent-6">This statutory architecture framework catalogs that the applicant <span id="pdf-insert-name" class="font-black underline text-blue-950 uppercase tracking-tight">-</span> has successfully completed and executed formal organization onboarding protocols on date <span id="pdf-insert-date" class="font-black underline font-sans">-</span>.</p>
                        
                        <p>The consolidated unit capital sum of <span class="font-black">INR 200.00 (Two Hundred Rupees Only)</span> is tracked and processed strictly toward high-liquidity decentralized trading chart matrix indexes. The capital allocation holds unique structural redemption parameters governed under network settlement execution metrics.</p>
                        
                        <div class="bg-stone-100 border border-stone-200/60 p-3.5 rounded-2xl text-[10.5px] text-stone-700 font-sans italic font-medium leading-relaxed shadow-sm">
                            "Statutory Clause §7: The security fund unit allocated via micro-growth blocks carries specific baseline market risks. In occurrences of rapid algorithmic market liquidations or capital consolidation shifts, depreciation variance up to 100% of the base contribution may occur without organizational legal indemnity."
                        </div>

                        <p>By proceeding and initializing the dynamic digital signature console pad on the subsequent panel interface window, the member yields absolute formal consent to asset terms and voluntarily waives dispute recourse relative to baseline market index variance.</p>
                    </div>
                </div>

                <div class="pt-4 bg-transparent border-t border-slate-100/40">
                    <button onclick="navigateToSignature()" class="w-full py-4 bg-blue-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-900/20 active:scale-[0.96] transition duration-200 flex items-center justify-center gap-2">
                        Proceed to Signature Console <i class="fa-solid fa-arrow-right text-xs"></i>
                    </button>
                </div>
            </div>
        `;
    }
};

console.log("BDA Views Hub: Scrollable statutory contract template registered.");
