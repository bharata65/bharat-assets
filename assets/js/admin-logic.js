import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
const db = getFirestore();

// १. सर्व युजर्स आणि बँक डिटेल्स फेच करा
window.loadUsers = async () => {
    const users = await getDocs(collection(db, "users"));
    const table = document.getElementById("user-table");
    users.forEach(u => {
        const data = u.data();
        table.innerHTML += `<tr>
            <td>${data.name}</td>
            <td>${data.number}</td>
            <td>${data.bankName || 'Not Added'}</td>
            <td>
                <button onclick="toggleUserStatus('${u.id}', 'banned')" class="text-red-500">Ban</button>
            </td>
        </tr>`;
    });
};

// २. विथड्रॉल अप्रूव्हल (Request Approval Logic)
window.approveWithdrawal = async (id) => {
    await updateDoc(doc(db, "withdrawals", id), { status: "success" });
    alert("Withdrawal successfully approved!");
    location.reload();
};

