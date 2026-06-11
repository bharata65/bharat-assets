// ==========================================================================
// BHARAT DIGITAL ASSETS - DIGITAL SIGNATURE CONSOLE CORE v4.3
// ==========================================================================

const SignatureView = {
    // स्क्रीन ४: डिजिटल सिग्नेचर पॅडचा स्वतंत्र लेआउट रेंडर करणे
    render: function() {
        return `
            <div id="view-signature" class="view-panel p-5 flex flex-col justify-between min-h-screen bg-slate-50/50 pb-12" style="display: none;">
                
                <div class="space-y-4">
                    <div class="text-center">
                        <div class="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl mx-auto flex items-center justify-center shadow-md mb-2 border border-blue-100">
                            <i class="fa-solid fa-pen-clip text-lg animate-pulse"></i>
                        </div>
                        <h2 class="text-xl font-black text-blue-950 tracking-tight">Digital Signature</h2>
                        <p class="text-xs text-slate-400 font-medium mt-0.5">Step 4 of 4: Authorization Seal</p>
                    </div>

                    <div class="bg-blue-50/60 border border-blue-100/50 p-4 rounded-2xl text-[11px] text-blue-950 font-medium leading-relaxed shadow-inner">
                        <i class="fa-solid fa-circle-info text-blue-850 mr-1"></i>
                        Draw your formal signature on the clear white panel below using your touch screen input.
                    </div>

                    <div class="relative w-full bg-white border border-slate-200 rounded-3xl p-2 shadow-xl shadow-slate-100/80 overflow-hidden">
                        <canvas id="signature-canvas" class="w-full h-56 bg-slate-50 rounded-2xl border border-dashed border-slate-200 non-zoomable-canvas"></canvas>
                    </div>

                    <div class="flex justify-start">
                        <button onclick="clearSignatureCanvas()" class="px-4 py-2 bg-slate-100 text-slate-600 border border-slate-200 font-black rounded-xl text-[10px] uppercase tracking-wider shadow-xs active:bg-slate-200 transition">
                            <i class="fa-solid fa-eraser mr-1"></i> Clear Screen
                        </button>
                    </div>
                </div>

                <div class="pt-4 bg-transparent border-t border-slate-100/40">
                    <button onclick="generateAndSaveAgreement()" class="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-600/20 active:scale-[0.96] transition duration-200 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-file-signature text-sm"></i> Authorize & Download PDF Agreement
                    </button>
                </div>
            </div>
        `;
    }
};

console.log("BDA Views Hub: Interactive HTML5 pointer signature layout compiled.");
