// ==========================================================================
// BHARAT DIGITAL ASSETS - AUTOMATED VIRTUAL ASSISTANT SUPPORT BOT v4.3
// ==========================================================================

const ChatbotComponent = {
    // चॅटबॉटचा मॉडाल ड्रॉवर उघडण्याचे फंक्शन
    open: function() {
        const drawer = document.getElementById('chatbot-drawer');
        if (drawer) {
            drawer.classList.remove('hidden');
            drawer.style.display = 'flex';
        }
    },

    // चॅटबॉटचा मॉडाल ड्रॉवर बंद करण्याचे फंक्शन
    close: function() {
        const drawer = document.getElementById('chatbot-drawer');
        if (drawer) {
            drawer.classList.add('hidden');
            drawer.style.display = 'none';
        }
    },

    // प्री-सेट प्रश्नांवर क्लिक केल्यावर स्वयंचलित टाईपिंग ॲनिमेशन आणि मराठी उत्तरे ट्रिगर करणे
    processReply: function(optionId) {
        const streamBox = document.getElementById('chat-stream-box');
        if (!streamBox) return;

        let userMsg = "";
        let botMsg = "";

        // पर्याय मॅपिंग आणि अधिकृत मराठी बँक रिस्पॉन्स नियमावली
        if (optionId === 1) {
            userMsg = "₹1000 रिटर्न कधी मिळणार?";
            botMsg = "तुमच्या ₹200 पैशांचे मायक्रो-शेअर्समध्ये यशस्वी वाटप झाले आहे. तुमचे असेट्स 90 दिवसांच्या मॅच्युरिटी लॉक-इन नियमानुसार वाढत आहेत. प्रोग्रेस बार 100% झाल्यावर रिटर्न बँक खात्यात पाठवला जाईल.";
        } else if (optionId === 2) {
            userMsg = "माझे पैसे बुडतील का?";
            botMsg = "भारत डिजिटल असेट्स एक सुरक्षित कायदेशीर प्रणाली आहे. तुमच्या डिपॉझिटच्या बदल्यात तुम्हाला डिजिटल स्टॅम्प पेपर कराराची प्रत डाऊनलोड करून देण्यात आली आहे, ज्यामुळे तुमचे भांडवल कायदेशीररित्या सुरक्षित राहते.";
        } else if (optionId === 3) {
            userMsg = "ॲग्रीमेंट डाऊनलोड होत नाहीये";
            botMsg = "तुम्ही तुमच्या 'Account Center' मध्ये जाऊन 'Legal Agreement Script' च्या समोरील डाऊनलोड बटनावर क्लिक करून स्वाक्षरी केलेला करारनामा कधीही पुन्हा डाऊनलोड करू शकता.";
        }

        // १. युझरचा संदेश स्क्रीनवर दाखवणे
        streamBox.innerHTML += `
            <div class="flex items-start justify-end gap-2 animate-fade-in">
                <div class="bg-blue-900 text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] font-bold shadow-xs">
                    ${userMsg}
                </div>
            </div>
        `;

        // २. टाईपिंग इंडिकेटर (Loading dots) दाखवणे
        const typingId = "bot-typing-holder";
        streamBox.innerHTML += `
            <div id="${typingId}" class="flex items-start gap-2 max-w-[85%] animate-fade-in">
                <div class="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-xs text-slate-400 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
            </div>
        `;
        streamBox.scrollTop = streamBox.scrollHeight;

        // ३. ६००ms च्या हुशार विलंबांनंतर बॉटचे अधिकृत उत्तर स्क्रीनवर लोड करणे
        setTimeout(() => {
            const typingIndicator = document.getElementById(typingId);
            if (typingIndicator) typingIndicator.remove();

            streamBox.innerHTML += `
                <div class="flex items-start gap-2 max-w-[85%] animate-fade-in">
                    <div class="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none text-slate-800 font-bold leading-relaxed shadow-xs">
                        ${botMsg}
                    </div>
                </div>
            `;
            streamBox.scrollTop = streamBox.scrollHeight;
        }, 600);
    }
};

// ग्लोबल स्कोपमध्ये फंक्शन्स उघडे करणे (index.html बटनांना चालवण्यासाठी)
window.openChatbot = ChatbotComponent.open;
window.closeChatbot = ChatbotComponent.close;
window.triggerBotReply = ChatbotComponent.processReply;

console.log("BDA Components Hub: Automated helpdesk chatbot compiler script ready.");
