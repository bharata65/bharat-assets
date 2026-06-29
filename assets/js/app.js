import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { firebaseConfig } from "../../config.js"; // हा पाथ बरोबर असणे खूप महत्त्वाचे आहे!

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.registerUser = async () => {
    // 1. डेटा गोळा करणे
    const name = document.getElementById('name').value;
    const num = document.getElementById('num').value;
    const pass = document.getElementById('pass').value;
    const cpass = document.getElementById('cpass').value;
    const agree = document.getElementById('agree').checked;

    // 2. व्हॅलिडेशन (चुका तपासणे)
    if (!name || !num || !pass) { alert("सर्व माहिती भरा!"); return; }
    if (!agree) { alert("Please agree to terms!"); return; }
    if (pass !== cpass) { alert("Passwords do not match!"); return; }
    if (num.length !== 10) { alert("Enter valid 10 digit number!"); return; }

    // बटण लोडिंग स्टेटवर नेणे
    const btn = document.querySelector("button");
    const originalText = btn.innerText;
    btn.innerText = "Processing...";
    btn.disabled = true;

    try {
        // 3. फायरबेस मध्ये डेटा पाठवणे
        await addDoc(collection(db, "users"), {
            name: name,
            number: num,
            password: pass,
            userId: Math.floor(100000 + Math.random() * 900000), // 6-Digit ID
            status: "standard",
            balance: 0
        });

        alert("Account Created! Redirecting to Home...");
        
        // 4. थेट Dashboard वर पाठवणे (इथे चूक होती, ती दुरुस्त केली आहे)
        window.location.href = "user/dashboard.html"; 

    } catch (error) {
        console.error("Firebase Error: ", error);
        alert("Error! फायरबेस कनेक्ट होत नाहीये. (Console चेक कर)");
        btn.innerText = originalText;
        btn.disabled = false;
    }
};
