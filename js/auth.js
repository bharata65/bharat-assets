import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const mobile = document.getElementById("mobile");
const password = document.getElementById("password");
const msg = document.getElementById("msg");

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

registerBtn.onclick = async () => {
  try {
    const email =
      mobile.value + "@bharatshares.app";

    const user =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password.value
      );

    await setDoc(
      doc(db, "users", user.user.uid),
      {
        uid: user.user.uid,
        mobile: mobile.value,
        balance: 0,
        status: "active",
        createdAt: Date.now()
      }
    );

    msg.innerHTML = "Registration Successful";
  } catch (e) {
    msg.innerHTML = e.message;
  }
};

loginBtn.onclick = async () => {
  try {
    const email =
      mobile.value + "@bharatshares.app";

    await signInWithEmailAndPassword(
      auth,
      email,
      password.value
    );

    msg.innerHTML = "Login Successful";

    location.href = "home.html";

  } catch (e) {
    msg.innerHTML = e.message;
  }
};
