const container = document.getElementById("shareContainer");

if (container) {
  container.innerHTML = `
  <div class="share-card">
    <div class="share-left">
      <h3>Reliance Industries</h3>
      <p>Buy Price : ₹1000</p>
      <p>Profit : ₹1200</p>
      <p>Duration : 30 Days</p>
    </div>

    <button class="buy-btn">
      Buy
    </button>
  </div>

  <div class="share-card">
    <div class="share-left">
      <h3>TCS</h3>
      <p>Buy Price : ₹2000</p>
      <p>Profit : ₹2400</p>
      <p>Duration : 45 Days</p>
    </div>

    <button class="buy-btn">
      Buy
    </button>
  </div>
  `;
}
