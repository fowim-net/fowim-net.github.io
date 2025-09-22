let playerWindow = null;
function openPlayer() {
    if (!playerWindow || playerWindow.closed) {
        playerWindow = window.open(
            "player.html",
            "_blank",
            "width=400,height=420,left=50,top=50,resizable=no,scrollbars=no"
        );

        // Dès que la fenêtre est prête, tenter la lecture auto (avec mute/unmute)
        playerWindow.onload = () => {
            const lecteur = playerWindow.document.getElementById("lecteur");
            lecteur.muted = true;
            lecteur.play().then(() => {
                lecteur.muted = false;
            }).catch(err => {
                console.log("Autoplay bloqué :", err);
            });
        };
    } else {
        playerWindow.focus(); // si elle est déjà ouverte, juste mettre au premier plan
    }
}

function closePlayer() {
    if (playerWindow && !playerWindow.closed) {
        playerWindow.close();
    }
}


// Liste des musiques dans le dossier /musique
const musiques = [
"musique/Inscryption OST 16 - The Scrybe of Beasts.mp3",
"musique/Lantern -- Summer Knight.mp3",
"musique/Wizards of Aldur - Queen of Sorcery.mp3",
"musique/Mountain Realm - Grayshadow Ruins Full Album - Dungeon Synth.mp3",
"musique/Tales Under The Oak - And Yet Another Journey Begins.mp3",
"musique/Cave Spellcaster - Troglodyte full album.mp3",
"musique/ddguntitled2.mp3"
];

let index = 0;
const lecteur = document.getElementById("lecteur");
const loopBtn = document.getElementById("loop");
const titre = document.getElementById("titre");
const playBtn = document.getElementById("play");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");

// 🔹 Charger une musique
function chargerMusique() {
    lecteur.src = musiques[index];
    lecteur.play();
    const nom = musiques[index].split("/").pop();
    titre.textContent = "🎵 En lecture : " + nom;
    playBtn.textContent = "Play"; // quand on charge une musique → bouton = pause
}

// 🔹 Lecture / Pause
function togglePlay() {
    if (lecteur.paused) {
        lecteur.play();
        playBtn.textContent = "Stop";
    } else {
        lecteur.pause();
        playBtn.textContent = "Play";
    }
}

// 🔹 Musique précédente
function prevSong() {
    index = (index - 1 + musiques.length) % musiques.length;
    chargerMusique();
}

// 🔹 Musique suivante
function nextSong() {
    index = (index + 1) % musiques.length;
    chargerMusique();
}

// 🔹 Quand une musique finit → passer à la suivante (sauf si loop activé)
lecteur.addEventListener("ended", () => {
    if (lecteur.loop) return;
    nextSong();
});

// 🔹 Activer/désactiver le loop
function toggleLoop() {
    lecteur.loop = !lecteur.loop;
    loopBtn.textContent = lecteur.loop ? "Loop: On" : "Loop: Off";
}

// 🔹 Lier les boutons
document.getElementById("prev").addEventListener("click", prevSong);
document.getElementById("next").addEventListener("click", nextSong);
document.getElementById("loop").addEventListener("click", toggleLoop);
document.getElementById("play").addEventListener("click", togglePlay);

// Charger la première musique au démarrage
chargerMusique();


// Met à jour la barre + temps
lecteur.addEventListener("timeupdate", () => {
    progress.value = (lecteur.currentTime / lecteur.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(lecteur.currentTime);
});

// Quand la musique est chargée → afficher durée
lecteur.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(lecteur.duration);
});

// Permet de cliquer/déplacer la barre
progress.addEventListener("input", () => {
    lecteur.currentTime = (progress.value / 100) * lecteur.duration;
});

// Volume
volumeSlider.addEventListener("input", () => {
    lecteur.volume = volumeSlider.value;
});

// Fonction utilitaire pour afficher mm:ss
function formatTime(sec) {
    const minutes = Math.floor(sec / 60) || 0;
    const seconds = Math.floor(sec % 60) || 0;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
