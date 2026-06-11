// ==========================================================================
// BHARAT DIGITAL ASSETS - ANTI-TAMPER SECURITY ENGINE & INTERCEPTOR v4.3
// ==========================================================================

const SecurityEngine = {
    // इनपुट डेटा पूर्णपणे स्वच्छ आणि सुरक्षित करण्याचे फंक्शन (XSS Filter)
    sanitizeString: function(inputRaw) {
        if (typeof inputRaw !== 'string') return inputRaw;
        
        let clean = inputRaw.trim();
        // एचटीएमएल आणि स्क्रिप्ट टॅग्ज काढून टाकणे
        clean = clean.replace(/<[^>]*>/g, '');
        
        // हॅकिंगसाठी वापरले जाणारे की-वर्ड्स ब्लॉक किंवा न्यूट्रल करणे
        clean = clean.replace(/javascript:/gi, '');
        clean = clean.replace(/onclick/gi, '');
        clean = clean.replace(/onerror/gi, '');
        
        // डेंजरस कॅरेक्टर्सचे एचटीएमएल एन्टीटीजमध्ये रूपांतर करणे
        return clean
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/\//g, "&#x2F;");
    },

    // मोबाईल नंबर फक्त अंक आहेत ना हे तपासणे
    validateMobile: function(phoneNum) {
        const regex = /^[0-9]{10}$/;
        return regex.test(phoneNum);
    },

    // ईमेल आयडीची रचना बरोबर आहे ना हे तपासणे
    validateEmail: function(emailStr) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(emailStr);
    },

    // बँक आयएफएससी (IFSC) कोड व्हेरिफाय करणे
    validateIFSC: function(ifscStr) {
        const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        return regex.test(ifscStr);
    }
};

console.log("BDA Security Node: Anti-Tamper Security core filtering proxies are armed.");
