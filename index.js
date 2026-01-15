let currentSection = 0;
const totalSections = 3;
let isScrolling = false;
const container = document.getElementById('mainContainer');
const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('.section');
const modal = document.getElementById('monsterModal');


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. Setup (Paste your keys here)
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

// 2. The Loop (The Magic Part)
async function loadMonsters() {
    const grid = document.getElementById('monsterGrid');
    const book = document.getElementById('bookContent');

    // Fetch data from Firebase
    const snapshot = await getDocs(collection(db, "monsters"));

    snapshot.forEach((doc) => {
        const m = doc.data(); // m is the monster data (name, image, etc.)
        const id = doc.id;

        // --- TEMPLATE A: The Small Card ---
        const cardHTML = `
            <div class="monster-card" id="card-${id}" 
                 style="background-image: url('${m.thumbnail}');">
                <div class="monster-name-tag">${m.name}</div>
            </div>
        `;
        grid.insertAdjacentHTML('beforeend', cardHTML); // Add to grid

        // Add Click Event
        document.getElementById(`card-${id}`).addEventListener('click', () => {
            openModal(id);
        });

        // --- TEMPLATE B: The Book Page ---
        const pageHTML = `
            <div id="content-${id}" class="monster-detail-layout" style="display: none;">
                <div class="monster-image-large">
                    <img src="${m.detailImage}" alt="${m.name}" />
                </div>
                <div class="monster-info">
                    <h2>${m.name}</h2>
                    <div class="info-section">
                        <h3>General Info</h3>
                        <p>${m.description}</p>
                    </div>
                    <div class="info-section">
                        <h3>Weakness</h3>
                        <p>${m.weaknessText}</p>
                        ${m.weaknessChart ? `<img src="${m.weaknessChart}" class="weakness-img">` : ''}
                    </div>
                </div>
            </div>
        `;
        book.insertAdjacentHTML('beforeend', pageHTML); // Add to book
    });
}

loadMonsters(); // Run it!
// ฟังก์ชันเลื่อนหน้า
function scrollToSection(index) {
    if (index < 0 || index >= totalSections) return;
    currentSection = index;
    container.style.transform = `translateY(-${currentSection * 100}vh)`;
    sections.forEach(sec => sec.classList.remove('active'));
    sections[currentSection].classList.add('active');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSection].classList.add('active');
    isScrolling = true;
    setTimeout(() => { isScrolling = false; }, 1000);
}

// ตรวจจับการเลื่อนเมาส์
window.addEventListener('wheel', (e) => {
    if (modal.classList.contains('show')) return;
    if (isScrolling) return;
    if (e.deltaY > 0) scrollToSection(currentSection + 1);
    else scrollToSection(currentSection - 1);
});

// ตรวจจับปุ่มคีย์บอร์ด
window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('show')) return;
    if (isScrolling) return;
    if (e.key === 'ArrowDown') scrollToSection(currentSection + 1);
    if (e.key === 'ArrowUp') scrollToSection(currentSection - 1);
});

// เปิด Modal
function openModal(monsterId) {
    modal.classList.add('show');
    const allContents = document.querySelectorAll('.monster-detail-layout');
    allContents.forEach(content => { content.style.display = 'none'; });
    const targetContent = document.getElementById('content-' + monsterId);
    if (targetContent) targetContent.style.display = 'flex';
}

// ปิด Modal
function closeModal() {
    modal.classList.remove('show');
}
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});


// 1. Load YouTube API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var isMuted = true;

// 🟢 FIX: Attach this function to 'window' so YouTube can find it
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'po_t8I9FC2Y', // Your Monster Hunter Track ID
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'controls': 0,
            'showinfo': 0,
            'autohide': 1,
            'modestbranding': 1,
            'playlist': 'po_t8I9FC2Y'
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    event.target.mute(); // Start muted (browser policy)
    event.target.playVideo();
}

// 🟢 FIX: Attach this to 'window' so your HTML Button can find it
window.toggleMute = function() {
    const btn = document.getElementById("muteBtn");
    if (player && typeof player.isMuted === 'function') {
        if (isMuted) {
            player.unMute();
            btn.innerHTML = "🔊 Mute Music"; // Should indicate Sound is ON
            isMuted = false;
        } else {
            player.mute();
            btn.innerHTML = "🔇 Unmute Music"; // Should indicate Sound is OFF
            isMuted = true;
        }
    }
}

// Smart Autoplay (Click anywhere to start music)
document.addEventListener('click', function(e) {
    if (e.target.id === 'muteBtn' || e.target.closest('#muteBtn')) return;
    
    if (player && typeof player.playVideo === 'function') {
        // If the player is paused or hasn't started, try to play
        if (player.getPlayerState() !== 1) { 
             player.playVideo();
        }
        
        // Optional: Auto-unmute on first click if you want
        // if (player.isMuted()) { player.unMute(); isMuted = false; }
    }
});