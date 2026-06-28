import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
const db = getFirestore();

window.updateMarket = async (shareId, newPrice) => {
    const ref = doc(db, "shares", shareId);
    await updateDoc(ref, { price: newPrice });
    alert("Market Updated Real-time!");
};

