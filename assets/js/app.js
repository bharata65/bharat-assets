import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { firebaseConfig } from "../../config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// LOGIN FUNCTION
window.login = async () => {
    const num = document.getElementById('num').value;
    const pin = document.getElementById('pin').value;
    
    const q = query(collection(db, "users"), where("number", "==", num), where("password", "==", pin));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
        alert("Login Successful!");
        window.location.href = "user/dashboard.html";
    } else {
        alert("Invalid Details!");
    }
};

// REGISTER FUNCTION
window.register = async () => {
    const num = document.getElementById('num').value;
    const pin = document.getElementById('pin').value;
    await addDoc(collection(db, "users"), { number: num, password: pin, status: "standard" });
    alert("Registered! Now Login.");
};

