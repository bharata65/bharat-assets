import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { firebaseConfig } from "../../config.js"; // तुझा कॉन्फिग पाथ बरोबर ठेव

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// रजिस्ट्रेशन लॉजिक
window.registerUser = async () => {
    const name = document.getElementById('name').value;
    const num = document.getElementById('num').value;
    const pass = document.getElementById('pass').value;
    const cpass = document.getElementById('cpass').value;
    const agree = document.getElementById('agree').checked;

    if (!agree) { alert("Please agree to terms!"); return; }
    if (pass !== cpass) { alert("Passwords do not match!"); return; }
    if (num.length !== 10) { alert("Enter valid 10 digit number!"); return; }

    try {
        await addDoc(collection(db, "users"), {
            name: name,
            number: num,
            password: pass,
            userId: Math.floor(100000 + Math.random() * 900000), // 6-Digit Unique ID
            status: "standard",
            balance: 0
        });
        alert("Registration Successful! Please Login.");
        window.location.href = "../index.html";
    } catch (e) { alert("Error: " + e.message); }
};

// लॉगिन लॉजिक
window.loginUser = async () => {
    const num = document.getElementById('num').value;
    const pass = document.getElementById('pass').value;
    
    const q = query(collection(db, "users"), where("number", "==", num), where("password", "==", pass));
    const res = await getDocs(q);
    
    if(!res.empty) {
        alert("Login Successful!");
        window.location.href = "user/dashboard.html";
    } else {
        alert("Invalid Details!");
    }
};
