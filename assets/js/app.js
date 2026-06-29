// Global Function for Loading Animation
window.showLoader = () => {
    document.getElementById('loader').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2000);
};

// Deposit Amount Validation & Button Color Logic
window.checkInput = () => {
    const amount = document.getElementById('custom-amount').value;
    const btn = document.getElementById('dep-btn');
    if (!btn) return;
    
    if (amount >= 200) {
        btn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        btn.classList.add('bg-blue-600');
        btn.disabled = false;
    } else {
        btn.classList.remove('bg-blue-600');
        btn.classList.add('bg-gray-400', 'cursor-not-allowed');
        btn.disabled = true;
    }
};

// Proceed to Payment (No popups, only loader)
window.proceedToPayment = () => {
    window.showLoader();
    setTimeout(() => {
        window.location.href = "payment-gateway.html";
    }, 1500);
};
