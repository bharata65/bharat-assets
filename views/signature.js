// ==========================================================================
// BHARAT DIGITAL ASSETS - DIGITAL SIGNATURE CONSOLE CORE v4.4
// ==========================================================================

const SignatureView = {
    render: function() {
        return `
            <div id="view-signature" class="view-panel p-5 flex flex-col justify-between min-h-screen bg-slate-50/50 pb-12" style="display: none; width: 100%;">
                
                <div class="space-y-4 w-full">
                    <div class="text-center">
                        <div class="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl mx-auto flex items-center justify-center shadow-md mb-2 border border-blue-100">
                            <i class="fa-solid fa-pen-clip text-lg"></i>
                        </div>
                        <h2 class="text-xl font-black text-blue-950 tracking-tight">Digital Signature</h2>
                        <p class="text-xs text-slate-400 font-medium mt-0.5">Step 4 of 4: Authorization Seal</p>
                    </div>

                    <div class="bg-blue-50/60 border border-blue-100/50 p-4 rounded-2xl text-[11px] text-blue-950 font-medium leading-relaxed shadow-inner">
                        <i class="fa-solid fa-circle-info text-blue-800 mr-1"></i>
                        खालील पांढऱ्या पॅनेलवर बोटाने तुमची डिजिटल स्वाक्षरी (Signature) करा.
                    </div>

                    <div class="relative w-full bg-white border border-slate-200 rounded-3xl p-2 shadow-xl shadow-slate-100/80 overflow-hidden">
                        <canvas id="signature-canvas" class="w-full h-56 bg-slate-50 rounded-2xl border border-dashed border-slate-200 non-zoomable-canvas" style="touch-action: none;"></canvas>
                    </div>

                    <div class="flex justify-start">
                        <button onclick="clearSignatureCanvas()" class="px-4 py-2 bg-slate-100 text-slate-600 border border-slate-200 font-black rounded-xl text-[10px] uppercase tracking-wider shadow-xs active:bg-slate-200 transition">
                            <i class="fa-solid fa-eraser mr-1"></i> Clear Screen
                        </button>
                    </div>
                </div>

                <div class="pt-4 bg-transparent border-t border-slate-100/40 w-full">
                    <button onclick="generateAndSaveAgreement()" class="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-600/20 active:scale-[0.96] transition duration-200 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-file-signature text-sm"></i> Authorize & Save Profile Data
                    </button>
                </div>
            </div>
        `;
    }
};

// ==========================================================================
// SAFE DIGITAL INTERACTIVE CANVAS SIGNATURE INTERFACES
// ==========================================================================
let isDrawingOnPad = false;
let lastCanvasX = 0;
let lastCanvasY = 0;

window.initSignatureEngine = function() {
    const canvas = document.getElementById('signature-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // मोबाईल स्क्रीन रिझोल्यूशन मॅचिंग करणे
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // लाईन स्टाईल डिझाईन (Premium Wealth Ink)
    ctx.strokeStyle = '#1e3a8a'; 
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // १. मोबाईल टच इव्हेंट्स (Touch Screen Configurations)
    canvas.addEventListener('touchstart', (e) => {
        isDrawingOnPad = true;
        const touch = e.touches[0];
        const mRect = canvas.getBoundingClientRect();
        lastCanvasX = touch.clientX - mRect.left;
        lastCanvasY = touch.clientY - mRect.top;
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (!isDrawingOnPad) return;
        const touch = e.touches[0];
        const mRect = canvas.getBoundingClientRect();
        const currentX = touch.clientX - mRect.left;
        const currentY = touch.clientY - mRect.top;

        ctx.beginPath();
        ctx.moveTo(lastCanvasX, lastCanvasY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        lastCanvasX = currentX;
        lastCanvasY = currentY;
    }, { passive: true });

    canvas.addEventListener('touchend', () => { isDrawingOnPad = false; });

    // २. डेस्कटॉप माउस इव्हेंट्स (Desktop Mouse Overrides)
    canvas.addEventListener('mousedown', (e) => {
        isDrawingOnPad = true;
        const mRect = canvas.getBoundingClientRect();
        lastCanvasX = e.clientX - mRect.left;
        lastCanvasY = e.clientY - mRect.top;
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawingOnPad) return;
        const mRect = canvas.getBoundingClientRect();
        const currentX = e.clientX - mRect.left;
        const currentY = e.clientY - mRect.top;

        ctx.beginPath();
        ctx.moveTo(lastCanvasX, lastCanvasY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        lastCanvasX = currentX;
        lastCanvasY = currentY;
    });

    canvas.addEventListener('mouseup', () => { isDrawingOnPad = false; });
    canvas.addEventListener('mouseleave', () => { isDrawingOnPad = false; });
};

window.clearSignatureCanvas = function() {
    const canvas = document.getElementById('signature-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
};

console.log("BDA Views Hub: Signature view compilation completed with zero-error fail-safe.");
