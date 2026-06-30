<?php
// डेटा सेव्ह करण्यासाठी (Register.txt)
if(isset($_POST['register'])){
    $entry = $_POST['name'] . "|" . $_POST['whatsapp'] . "|" . date('Y-m-d H:i:s') . "\n";
    file_put_contents("users.txt", $entry, FILE_APPEND);
}
?>
<!DOCTYPE html>
<html lang="mr">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SARKAR CRACKER</title>
    <style>
        body { background: #121212; color: #fff; font-family: 'Arial', sans-serif; margin: 0; padding: 10px; }
        .header { text-align: center; color: #FFD700; font-size: 28px; font-weight: 800; margin: 20px 0; text-shadow: 2px 2px 4px #000; }
        .card { background: #1E1E1E; padding: 20px; border-radius: 20px; margin-bottom: 20px; border: 1px solid #333; }
        .btn { background: linear-gradient(45deg, #FFD700, #FFA500); border: none; width: 100%; padding: 15px; border-radius: 10px; font-weight: bold; font-size: 16px; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="header">SARKAR CRACKER</div>

    <!-- Registration -->
    <div class="card">
        <h3>Register / Login</h3>
        <form method="POST">
            <input type="text" name="name" placeholder="Name" style="width:90%; padding:10px; margin-bottom:10px;" required><br>
            <input type="number" name="whatsapp" placeholder="WhatsApp Number" style="width:90%; padding:10px; margin-bottom:10px;" required><br>
            <input type="password" name="pass" placeholder="4 Digit Password" maxlength="4" style="width:90%; padding:10px; margin-bottom:10px;" required><br>
            <button type="submit" name="register" class="btn">CONTINUE</button>
        </form>
    </div>

    <!-- Softwares -->
    <div class="card">
        <h3>WINGO 1 MINUTE</h3>
        <p>Limit: 2700rs | Price: 203rs</p>
        <button class="btn" onclick="openPayment(203)">BUY NOW</button>
    </div>

    <script>
        function openPayment(amt) {
            window.location.href = "payment.php?amount=" + amt;
        }
    </script>
</body>
</html>
