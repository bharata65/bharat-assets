<?php $amt = $_GET['amount']; ?>
<!DOCTYPE html>
<html>
<body style="background:#f4f4f4; text-align:center; padding:20px;">
    <h3>Payment Gateway</h3>
    <div style="background:white; padding:20px; border-radius:10px;">
        <h1 style="color:red;">₹<?php echo $amt; ?></h1>
        <!-- डायनॅमिक QR -->
        <img src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=upi://pay?pa=7186024384801SB1024@mairtel&am=<?php echo $amt; ?>&cu=INR">
        <p>1. Please use another device to scan.<br>2. Input 12 digit UTR below.</p>
        <input type="text" placeholder="Input 12 digits here">
        <button onclick="alert('Wait for admin verification')">SUBMIT UTR</button>
    </div>
    
    <div style="margin-top:20px; text-align:left; font-size:14px;">
        <p><b>STPES OF SOFTWARE:</b></p>
        <p>1) जैसे ही आप Payment Complete करोगे वैसे तुरंत आपके whatsapp number पे हमारी टीम से आपको colour Trading Software Apk मिलेगा।</p>
        <p>2) Apk install करके उसमे RPIRTAUTU ये पासवर्ड कोड डालके Software Start करना है।</p>
        <p>3) जितना लिमिट बताया है, उतना प्रॉफिट होते ही software बंद करना है।</p>
        <p>4) software की validity खतम होने से पहले Renew किया करना।</p>
    </div>
</body>
</html>

