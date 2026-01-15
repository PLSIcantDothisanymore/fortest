import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, setDoc, doc } 
    from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔴 PASTE YOUR CONFIG HERE (Same as index.js)
const firebaseConfig = {
  apiKey: "AIzaSyD3jwOwv5FHHi_IM3nVPQNQC6ayPnuylEA",
  authDomain: "forwebtesting-12636.firebaseapp.com",
  projectId: "forwebtesting-12636",
  storageBucket: "forwebtesting-12636.firebasestorage.app",
  messagingSenderId: "721692467237",
  appId: "1:721692467237:web:a4eb6e74d05f9c9deddfcc",
  measurementId: "G-1DR3E38CKP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const btn = document.getElementById('addBtn');

btn.addEventListener('click', async () => {
    // 1. Get all values (including the new ID)
    const idVal = document.getElementById('mId').value.trim(); // 🟢 NEW
    const nameVal = document.getElementById('mName').value;
    const thumbVal = document.getElementById('mThumb').value;
    const detailVal = document.getElementById('mDetail').value;
    const descVal = document.getElementById('mDesc').value;
    const weakVal = document.getElementById('mWeak').value;
    const chartVal = document.getElementById('mChart').value;

    // Check if ID is empty
    if(!idVal || !nameVal || !thumbVal) {
        alert("Please fill in ID, Name, and Thumbnail!");
        return;
    }

    try {
        // 2. Use setDoc with the specific ID
        // syntax: doc(database, "collectionName", "your-custom-id")
        await setDoc(doc(db, "monsters", idVal), {
            name: nameVal,
            thumbnail: thumbVal,
            detailImage: detailVal,
            description: descVal,
            weaknessText: weakVal,
            weaknessChart: chartVal,
            createdAt: new Date()
        });

        alert(`Success! Monster '${idVal}' added.`);
        document.querySelectorAll('input, textarea').forEach(i => i.value = '');
        
    } catch (e) {
        console.error("Error adding document: ", e);
        alert("Error! Check console.");
    }
});