// ==========================================================================
// BHARAT DIGITAL ASSETS - ENTERPRISE AUTOMATED CHAT LOGGER ENGINE v5.0
// ==========================================================================

const ChatbotComponent = {
    open: function() {
        const drawer = document.getElementById('chatbot-drawer');
        if (drawer) { drawer.classList.remove('hidden'); drawer.style.display = 'flex'; }
    },

    close: function() {
        const drawer = document.getElementById('chatbot-drawer');
        if (drawer) { drawer.classList.add('hidden'); drawer.style.display = 'none'; }
    },

    processReply: function(optionId) {
        const streamBox = document.getElementById('chat-stream-box');
        if (!streamBox) return;

        let userMsg = "";
        let botMsg = "";

        // Standardized English Institutional Support Presets
        if (optionId === 1) {
            userMsg = "When will I receive my matured returns?";
            botMsg = "Your capital contribution is mapped under a strict 90-day structural liquidity maturity contract. Once the ledger progress reaches 100%, settlement funds are directly wired into your linked bank node.";
        } else if (optionId === 2) {
            userMsg = "Is my capital allocation legally secured?";
            botMsg = "Absolute statutory protection is enforced. Your profile generates a legally binding Digital Stamp Paper Contract immediately upon onboarding, minimizing organizational liability and backing your capital.";
        } else if (optionId === 3) {
            userMsg = "Why is my Asset Certificate showing as locked?";
            botMsg = "Ownership certificates require formal administrative clearance tokens. Once the Master Ledger Desk authorizes your structural deposit hash, your high-definition vector certificate unlocks instantly.";
        }

        // Render User Query to Screen Interface
        streamBox.innerHTML += `
            <div class="flex items-start justify-end gap-2 animate-fade-in">
                <div class="bg-blue-900 text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] font-bold shadow-xs">
                    ${userMsg}
                </div>
            </div>
        `;

        // Render Latency Loading Spinner Dots
        const typingId = "bot-typing-holder";
        streamBox.innerHTML += `
            <div id="${typingId}" class="flex items-start gap-2 max-w-[85%] animate-fade-in">
                <div class="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-xs text-slate-400 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
            </div>
        `;
        streamBox.scrollTop = streamBox.scrollHeight;

        // Commit Log Instance directly to Firestore Tracking for Admin Desk Audit
        if (window.currentUserMobile) {
            db.collection("users").doc(window.currentUserMobile).collection("chats").add({
                query: userMsg,
                response: botMsg,
                timestamp: new Date().toISOString()
            }).catch(e => console.error("Log fault:", e));
        }

        // Output Bot Reply with Fluid Simulation Delay
        setTimeout(() => {
            const indicator = document.getElementById(typingId);
            if (indicator) indicator.remove();

            streamBox.innerHTML += `
                <div class="flex items-start gap-2 max-w-[85%] animate-fade-in">
                    <div class="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none text-slate-800 font-bold leading-relaxed shadow-xs">
                        ${botMsg}
                    </div>
                </div>
            `;
            streamBox.scrollTop = streamBox.scrollHeight;
        }, 550);
    }
};

window.openChatbot = ChatbotComponent.open;
window.closeChatbot = ChatbotComponent.close;
window.triggerBotReply = ChatbotComponent.processReply;

console.log("BDA Components: Chatbot log infrastructure initialized.");
