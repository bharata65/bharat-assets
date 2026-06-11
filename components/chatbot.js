// ==========================================================================
// BHARAT DIGITAL ASSETS - CHATBOT INTERFACE BINDING HUB v6.0
// ==========================================================================

const ChatbotComponent = {
    open: function() {
        const drawer = document.getElementById('chatbot-drawer');
        if (drawer) { drawer.classList.remove('hidden'); drawer.style.setProperty('display', 'flex', 'important'); }
    },
    close: function() {
        const drawer = document.getElementById('chatbot-drawer');
        if (drawer) { drawer.classList.add('hidden'); drawer.style.setProperty('display', 'none', 'important'); }
    },
    processReply: function(optionId) {
        const streamBox = document.getElementById('chat-stream-box');
        if (!streamBox) return;

        let userQueryText = ""; let botResponseText = "";
        if (optionId === 1) {
            userQueryText = "When will I receive my structured maturity yield?";
            botResponseText = "Your base unit capital allocation tracks automated 90-day micro-share node cycles. Funds disburse instantly into linked settlement cards upon verification clearance.";
        } else if (optionId === 2) {
            userQueryText = "Is my deposited capital contractually secured?";
            botResponseText = "Affirmative. The platform auto-compiles dynamic golden-framed legal risk agreements carrying strict metadata validation constraints ensuring contract execution.";
        } else if (optionId === 3) {
            userQueryText = "I am unable to download my executed agreement PDF.";
            botResponseText = "Ensure browser popup blockage overrides are completely disabled. Alternatively, trigger instant manual rendering downloads within your Account Center interface.";
        }

        streamBox.innerHTML += `<div class="flex items-start justify-end w-full animate-fade-in"><div class="bg-blue-900 text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] font-bold text-xs shadow-sm">${userQueryText}</div></div>`;
        streamBox.scrollTop = streamBox.scrollHeight;

        const activeUserPhone = window.currentUserMobile || "Guest_Visitor";
        const activeUserName = (window.globalUserDataObj && window.globalUserDataObj.name) ? window.globalUserDataObj.name : "Anonymous Node";

        // Sync chat logs to centralized administrative collector
        db.collection("chat_disputes").add({ phone: activeUserPhone, name: activeUserName, query: userQueryText, timestamp: new Date().toISOString() });

        setTimeout(() => {
            streamBox.innerHTML += `<div class="flex items-start gap-2 max-w-[85%] w-full animate-fade-in"><div class="bg-white border p-3.5 rounded-2xl rounded-tl-none text-slate-800 text-xs font-bold leading-relaxed shadow-sm">${botResponseText}</div></div>`;
            streamBox.scrollTop = streamBox.scrollHeight;
        }, 500);
    }
};

window.openChatbot = ChatbotComponent.open;
window.closeChatbot = ChatbotComponent.close;
window.triggerBotReply = ChatbotComponent.processReply;
