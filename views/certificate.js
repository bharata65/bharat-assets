// ==========================================================================
// BHARAT DIGITAL ASSETS - ANTI-CRASH VECTOR CERTIFICATE ENGINE v4.3
// ==========================================================================

const CertificateView = {
    // हा व्ह्यू बॅकग्राउंडला पीडीएफ कंपाईल करतो, त्यामुळे याचा स्वतंत्र रेंडर ब्लॉक रिकामी ठेवला आहे
    render: function() {
        return `<div id="view-certificate" class="view-panel" style="display: none;"></div>`;
    }
};

// ==========================================================================
// PURE VECTOR COORDINATE COMPILER ENGINE (Zero Memory Lag On Mobile)
// ==========================================================================
window.downloadAssetCertificate = function() {
    if (!globalUserDataObj || !globalUserDataObj.isPaid) {
        return triggerAlert("Access Restricted", "Asset ownership certificate remains locked until administrative node approval clears.", "error");
    }

    try {
        const { jsPDF } = window.jspdf;
        // Landscape Mode A5 (210mm x 148mm) प्रीमियम डिझाईन फ्रेम सिलेक्ट करणे
        const pdf = new jsPDF('l', 'mm', [210, 148]);
        
        // १. इन्स्टिट्यूशनल रॉयल डार्क बॅकग्राउंड लेयर सेट करणे
        pdf.setFillColor(15, 23, 42); // Slate 900 Theme Deep Dark
        pdf.rect(0, 0, 210, 148, 'F');
        
        // २. प्रगत डबल सोनेरी बॉर्डर फ्रेम रेंडरिंग (Dynamic Golden Border Matrix)
        pdf.setDrawColor(217, 119, 6); // Amber 600 Gold Shade
        pdf.setLineWidth(1.5);
        pdf.rect(4, 4, 202, 140); // बाहेरील सोनेरी बॉर्डर
        
        pdf.setDrawColor(251, 191, 36); // Amber 400 Light Gold Shade
        pdf.setLineWidth(0.5);
        pdf.rect(6, 6, 198, 136); // आतील बारीक सोनेरी बॉर्डर
        
        // ३. कोपऱ्यांमधील नक्षीकाम (Four-Corner Security Geometric Vectors)
        pdf.setLineWidth(1);
        pdf.line(4, 12, 12, 4); pdf.line(206, 12, 198, 4);
        pdf.line(4, 136, 12, 144); pdf.line(206, 136, 198, 144);

        // ४. मुख्य हेडर टायटल (Rethink Rich Typography Rendering)
        pdf.setTextColor(251, 191, 36); // Gold Text Color
        pdf.setFont("serif", "bold");
        pdf.setFontSize(22);
        pdf.text("CERTIFICATE OF ASSET OWNERSHIP", 105, 24, { align: "center" });
        
        // ५. सब-हेडर मॅपिंग
        pdf.setTextColor(148, 163, 184); // Slate 400 Muted Silver Text
        pdf.setFont("sans-serif", "normal");
        pdf.setFontSize(8);
        pdf.text("ISSUED UNDER STATUTORY CHARTER BY BHARAT DIGITAL ASSETS TRUST", 105, 30, { align: "center" });
        
        // ६. मध्यभागी असणारी बारीक डिझाईन लाईन (Center Divide Rule)
        pdf.setDrawColor(217, 119, 6);
        pdf.setLineWidth(0.3);
        pdf.line(65, 34, 145, 34);

        // ७. मुख्य मजकूर रचना (Body Text Dynamic Parameter Mapping)
        pdf.setTextColor(241, 245, 249); // Slate 100 White Text
        pdf.setFont("serif", "italic");
        pdf.setFontSize(11);
        pdf.text("This statutory blockchain replication ledger records that the network member", 105, 48, { align: "center" });
        
        // ८. युझरचे नाव (ठळक आणि मोठ्या अक्षरात अंडरलाईनसह)
        pdf.setTextColor(255, 255, 255);
        pdf.setFont("sans-serif", "bold");
        pdf.setFontSize(16);
        const nameUpper = globalUserDataObj.name.toUpperCase();
        pdf.text(nameUpper, 105, 59, { align: "center" });
        
        pdf.setDrawColor(251, 191, 36);
        pdf.setLineWidth(0.5);
        const nameWidth = pdf.getTextWidth(nameUpper);
        pdf.line(105 - (nameWidth/2), 62, 105 + (nameWidth/2), 62); // नावाच्या खाली परफेक्ट लाईन

        // ९. फायनान्शियल व्हॅल्यू डिस्क्रिप्शन क्लॉज
        pdf.setTextColor(203, 213, 225); // Slate 300 text
        pdf.setFont("serif", "italic");
        pdf.setFontSize(11);
        pdf.text("holds absolute, lawful, decentralized digital asset equity tokens distributed across active core", 105, 73, { align: "center" });
        
        pdf.text("network nodes, representing an institutional stake configuration value of precisely", 105, 79, { align: "center" });
        
        // १०. टोकन रक्कम हायलाईट (Premium Gold Sum Callout)
        pdf.setTextColor(251, 191, 36);
        pdf.setFont("sans-serif", "bold");
        pdf.setFontSize(13);
        pdf.text("INR 200.00 (TWO HUNDRED RUPEES ONLY)", 105, 89, { align: "center" });

        // ११. तळभागातील तांत्रिक आयडी आणि व्हेरिफिकेशन्स डेटा (Footer Infrastructure Logs)
        pdf.setDrawColor(51, 65, 85); // Slate 700 Line
        pdf.setLineWidth(0.5);
        pdf.line(12, 104, 198, 104); // तळभागाची मोठी लाईन
        
        pdf.setTextColor(100, 116, 139); // Slate 500 text
        pdf.setFont("sans-serif", "normal");
        pdf.setFontSize(7);
        
        // डाव्या बाजूचा डेटा (Registration ID & System Stamps)
        pdf.text(`REGISTRY NODE NO: BDA-REG-${globalUserDataObj.phone.slice(-4)}-2026`, 15, 112);
        pdf.text(`ACTIVATION SYSTEM DATE: ${globalUserDataObj.registrationDate}`, 15, 117);
        pdf.text("STATUS STATUS VALUE: SECURED & MATURED ASSET BLOCK", 15, 122);
        
        // उजव्या बाजूला युझरची सही ऑटोमॅटिक इंजेक्ट करणे (Dynamic Base64 Signature Injector)
        if (globalUserDataObj.signatureUrl) {
            // सहीचा पांढरा बॅकग्राउंड रॉयल डार्क करण्यासाठी आपण ओव्हरले करू शकतो, किंवा थेट व्हेक्टर रेंडर करू शकतो
            pdf.setFillColor(30, 41, 59); // Slate 800 background for signature container
            pdf.rect(155, 108, 40, 15, "F");
            pdf.addImage(globalUserDataObj.signatureUrl, 'PNG', 157, 109, 36, 13);
        }
        
        pdf.line(155, 125, 195, 125); // सहीच्या खालची रेष
        pdf.text("AUTHORIZED MEMBER SIGNATURE", 154, 130);

        // १२. थेट हाय-स्पीड विदाऊट मेमरी लॅग सेव्ह ट्रिगर (Anti-Crash PDF Push)
        pdf.save(`Asset_Certificate_${globalUserDataObj.phone}.pdf`);
        
        // यश आलेला कस्टम पॉपअप दाखवणे
        triggerAlert("Certificate Downloaded", "Your official high-definition asset ownership certificate has been compiled and saved into local storage.", "success");
        
    } catch (err) {
        alert("Certificate Generation Compiler Fault: " + err.message);
    }
};

console.log("BDA Views Hub: High-definition anti-crash vector certificate compiler ready.");
