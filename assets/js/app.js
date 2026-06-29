// app.js - ID Generator
export function generateUniqueId() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// युजर रजिस्टर करताना हे वापर:
// const userId = generateUniqueId();
// await addDoc(collection(db, "users"), { 
//     userId: userId, 
//     number: num, 
//     ... 
// });

