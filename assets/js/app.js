// १. ग्लोबल लोडर आणि बटन लॉजिक
window.validateAmount = () => {
    const amount = document.getElementById('custom-amount').value;
    const btn = document.getElementById('dep-btn');
    if (!btn) return;
    
    if (parseInt(amount) >= 200) {
        btn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        btn.classList.add('bg-blue-600');
        btn.disabled = false;
    } else {
        btn.classList.remove('bg-blue-600');
        btn.classList.add('bg-gray-400', 'cursor-not-allowed');
        btn.disabled = true;
    }
};

window.proceedToPayment = () => {
    document.getElementById('loader').classList.remove('hidden');
    setTimeout(() => {
        window.location.href = "payment-gateway.html";
    }, 1500);
};

// २. सर्व क्लिकसाठी ग्लोबल लोडर ॲनिमेशन
document.addEventListener('click', function(e) {
    if(e.target.tagName === 'BUTTON' && !e.target.disabled) {
        const loader = document.getElementById('loader');
        if(loader) {
            loader.classList.remove('hidden');
            setTimeout(() => loader.classList.add('hidden'), 1500);
        }
    }
});
