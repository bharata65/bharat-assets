import { auth, db } from "./firebase-config.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
doc,
setDoc
}
from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const regBtn =
document.getElementById("registerBtn");

if(regBtn){

regBtn.onclick = async ()=>{

const mobile =
document.getElementById("regMobile").value;

const password =
document.getElementById("regPassword").value;

const confirm =
document.getElementById("regConfirm").value;

if(password !== confirm){
alert("Passwords do not match");
return;
}

const email =
mobile + "@bharatshares.app";

try{

const user =
await createUserWithEmailAndPassword(
auth,
email,
password
);

await setDoc(
doc(db,"users",user.user.uid),
{
uid:user.user.uid,
mobile,
balance:0,
status:"active",
createdAt:Date.now()
}
);

loadPage("login");

}catch(e){
alert(e.message);
}
}
}

const loginBtn =
document.getElementById("loginBtn");

if(loginBtn){

loginBtn.onclick = async ()=>{

const mobile =
document.getElementById("loginMobile").value;

const password =
document.getElementById("loginPassword").value;

const email =
mobile + "@bharatshares.app";

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

loadPage("home");

}catch(e){
alert(e.message);
}
}
}
