document.addEventListener('DOMContentLoaded', function () {
    // Affiche la section par défaut au chargement de la page
    showSection('pos');
});
function updateFolderContent(folderName) {
    const contentArea = document.getElementById('folderContent');
    contentArea.innerHTML = `<li>${folderName}</li>`;
}
function showSection(sectionId) {
    // Masquer toutes les sections
    document.querySelectorAll('.content').forEach(function(section) {
        section.classList.remove('active');
    });

    // Afficher la section demandée
    document.getElementById(sectionId).classList.add('active');
}
            function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgSrc; // Définit l'image cliquée comme source
    lightbox.style.display = 'flex'; // Affiche la lightbox
}
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none'; // Cache la lightbox
}
document.addEventListener("mousemove", (e) => {
const layers = document.querySelectorAll(".layer");
const xOffset = (window.innerWidth - e.pageX * 2) / 200;
const yOffset = (window.innerHeight - e.pageY * 2) / 200;

layers.forEach((layer, index) => {
    const depth = index * 50;
    layer.style.transform = `translate(${xOffset}px, ${yOffset}px) translateZ(${depth}px)`;
});
});
document.addEventListener("DOMContentLoaded", () => {
const bootSequence = document.getElementById("boot-sequence");
const lines = [
"",
"System Initializing...",
"> Checking Hardware: OK",
"> Checking CPU Status: OK",
"> Checking RAM Integrity: OK",
"> Checking Disk Sectors: OK",
"> GPU Initialization: IcarTS 3580CC [PASSED]",
"> Network Adapters: ?EPsilon45_ShorW TO [DETECTED]",
"> USB Ports: 6 Devices Connected",
"> Loading EEG_syc Modules:",
"   - Filesystem Drivers: TYD4, MiniD5",
"   - Network Protocols: TCP/IP, DDIP, SIMPDI",
"   - Virtual Machine Support: Enabled",
"   - Audio: Radio Driver [LOADED]",
"   - Video: FusionOp set V 4.23 [LOADED]",
"   - Security Modules: ArmoredShild ?EPsilon45 [ENABLED]",
"> Running System Diagnostics:",
"   - Temperature Check: CPU 15°C, GPU 27°C",
"   - Power Supply: Stable, Voltage 530V",
"   - Cooling Systems: Fans Operational",
"   - Battery: 100% Charged",
"   - Network Latency: 5ms to 7.105.2.88.8 (?EPsilon)",
"> Current Processes: 120 Active",
"   - System Daemons: 30",
"   - User Applications: 14",
"   - Background Services: 627",
"> System Uptime: 00:00:15",
"> Pending Updates: 3 Critical Updates Available",
"> Verifying Secure Boot: OK",
"> Checking for Intrusion Attempts:",
"   - Last Login: *****-12-01 23:15:45",
"   - Failed Login Attempts: 0",
"> Firewall Status: Enabled, 0 Threats Detected",
"> Antivirus: Fowim Shield v2.5 [ACTIVE]",
"> Event Log:",
"   - [INFO] *****-12-02 00:00:12: Bootloader Initialized",
"   - [INFO] *****-12-02 00:00:13: Kernel Modules Loaded",
"   - [WARN] *****-12-02 00:00:14: USB Device Not Recognized (Port 4)",
"   - [INFO] *****-12-02 00:00:15: Network Connection Established",
"> Initializing System Services:",
"   - Database Service: OK",
"   - Server: OK",
"   - Message Broker: OK",
"   - User Interface: OK",
"> Background Tasks Started: Scheduler, Logger",
".",
".",
".",
".",
".",
".",
"System Ready.",
".",
"Welcome to Fowim",
];
let currentLine = 0;

function typeLine() {
if (currentLine < lines.length) {
    bootSequence.innerHTML += lines[currentLine] + "<br>"; // Ajoute une ligne complète
    bootSequence.scrollTop = bootSequence.scrollHeight;
    currentLine++;
    setTimeout(typeLine, 50); // Pause rapide entre les lignes (50ms)
} else {
    setTimeout(() => {
        document.getElementById('intro').style.display = 'none'; // Cacher l'intro après tout
    }, 2000); // Pause finale de 3 secondes
}
}

typeLine(); // Démarre l'affichage par ligne
});
let historyStack = []; // Stocke les sections affichées dans l’ordre chronologique

function showSection(sectionId) {
// Masquer toutes les sections
document.querySelectorAll('.content').forEach(function(section) {
section.classList.remove('active');
});

// Afficher la section demandée
const targetSection = document.getElementById(sectionId);
if (targetSection) {
targetSection.classList.add('active');

// Ajouter à l'historique uniquement si différent de l'actuel
if (historyStack.length === 0 || historyStack[historyStack.length - 1] !== sectionId) {
historyStack.push(sectionId);
}
} else {
console.error(`Section with ID '${sectionId}' not found.`);
}
}

function goBack() {
if (historyStack.length > 1) {
// Supprimer la section actuelle
historyStack.pop();

// Afficher la dernière section visitée
const previousSection = historyStack[historyStack.length - 1];
showSection(previousSection);
} else {
console.log("Aucune section précédente.");
}
}
