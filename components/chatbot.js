// ==========================================================================
// BHARAT DIGITAL ASSETS - MASTER IMMERSIVE FULL SCREEN CHATBOT SYSTEM v7.0
// ==========================================================================

const ChatbotComponent = {
    open: function() {
        const fullView = document.getElementById('chatbot-full-view');
        if (fullView) {
            fullView.classList.remove('hidden');
            fullView.style.setProperty('display', 'flex', 'important');
        }
    },
    
    close: function() {
        const fullView = document.getElementById('chatbot-full-view');
        if (fullView) {
            fullView.classList.add('hidden');
            fullView.style.setProperty('display', 'none', 'important');
        }
    },
    
    processReply: function(optionId) {
        const streamBox = document.getElementById('chat-stream-box');
        if (!streamBox) return;

        let queryText = ""; let responseText = "";
        if (optionId === 1) {
            queryText = "When will I receive my structured maturity yield?";
            responseText = "Your allocated units execute over a systematic 90-day structural tracking cycle. Asset payouts process automatically into your verified banking link upon nodal clearing validation.";
        } else if (optionId === 2) {
            queryText = "Is my deposited capital contractually secured?";
            responseText = "Affirmative. Every allocation compiles an instantaneous golden-sealed digital bond asset sheet documenting full contract framework parameters.";
        } else if (optionId === 3) {
            queryText = "I am unable to download my executed agreement PDF.";
            responseText = "Please evaluate your native web browser sandbox popups blocking parameters and allow permissions. Manual rebuild functions can also be triggered via your central Account Console.";
        }

        // Push User query node
        streamBox.innerHTML += `
            <div class="flex items-start justify-end w-full animate-fade-in">
                <div class="bg-blue-900 text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] font-black text-xs shadow-md">
                    ${queryText}
                </div>
            </div>
        `;
        streamBox.scrollTop = streamBox.scrollHeight;

        const senderPhone = window.currentUserMobile || "Guest_Channel";
        const senderName = (window.globalUserDataObj && window.globalUserDataObj.name) ? window.globalUserDataObj.name : "Anonymous Node";

        // Save Ticket parameters to database log collection
        db.collection("chat_disputes").add({
            phone: senderPhone,
            name: senderName,
            query: queryText,
            timestamp: new Date().toISOString()
        }).catch(e => console.log(e));

        // Push Simulated Engine response node
        setTimeout(() => {
            streamBox.innerHTML += `
                <div class="flex items-start gap-2 max-w-[85%] w-full animate-fade-in">
                    <div class="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-tl-none text-slate-800 text-xs font-bold shadow-xs">
                        ${responseText}
                    </div>
                </div>
            `;
            streamBox.scrollTop = streamBox.scrollHeight;
        }, 450);
    }
};

window.openFullPageChatbot = ChatbotComponent.open;
window.closeFullPageChatbot = ChatbotComponent.close;
window.triggerBotReply = ChatbotComponent.processReply;
