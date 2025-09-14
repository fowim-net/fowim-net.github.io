function showSection(id) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';

    window.scrollTo(0, 0);
    }
    
// Fonction pour convertir le texte en HTML
    function convertText() {
        const inputText = document.getElementById('inputText').value;
        const lines = inputText.split('\n');
        let html = '';
        lines.forEach((line) => {
            if (line.trim() === '') {
                html += '<br>\n';
            } else {
                html += `<p>${line.trim()}</p>\n`;
            }
        });
        document.getElementById('outputHtml').textContent = html.trim();
    }
    function copyToClipboard() {
        const outputHtml = document.getElementById('outputHtml').textContent;
        navigator.clipboard.writeText(outputHtml).catch(err => {
            alert('Erreur lors de la copie : ' + err);
        });
    }
    
document.addEventListener("DOMContentLoaded", () => {
    const diceBtn = document.getElementById("rollDice");
    const result = document.getElementById("diceResult");

    diceBtn.addEventListener("click", () => {
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const total = die1 + die2;

        result.textContent = `D Gauche : ${die1} | D Droite : ${die2} | Total : ${total}`;
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const stats = {
        "bonus-skill-hab": 0,
        "main-skill-hab": 0,
        "bonus-skill-end": 0,
        "main-skill-end": 0,
        "bonus-skill-cha": 0,
        "main-skill-cha": 0
    };

    // Calcule et met à jour la stat principale affectée par le bonus
    function updateMainComputed(key) {
        const base = stats[`main-${key}`] || 0;
        const bonus = stats[`bonus-${key}`] || 0;
        const total = base + bonus;

        document.querySelectorAll(`.stat[data-key="main-${key}"]`).forEach(el => {
            el.textContent = total;
        });
    }

    // Met à jour l'affichage d'une stat (hors calcul)
    function updateDisplays(key) {
if (key.startsWith("bonus-skill-")) {
  const short = key.replace("bonus-", "");
  // 1. Met à jour l'affichage du bonus lui-même
  document.querySelectorAll(`.stat[data-key="${key}"]`).forEach(el => {
    el.textContent = stats[key];
  });
  // 2. Met à jour la stat principale influencée
  updateMainComputed(short);
}
 else if (key.startsWith("main-skill-")) {
            const short = key.replace("main-", "");
            updateMainComputed(short);
        } else {
            document.querySelectorAll(`.stat[data-key="${key}"]`).forEach(el => {
                el.textContent = stats[key];
            });
        }
    }

    // Initialisation des stats depuis le HTML
    document.querySelectorAll(".stat").forEach(el => {
        const key = el.dataset.key;
        if (key && !(key in stats)) {
            stats[key] = parseInt(el.textContent) || 0;
        }
    });
    // Boutons + / −
    document.querySelectorAll("button.increase, button.decrease").forEach(button => {
        const key = button.dataset.key;
        button.addEventListener("click", () => {
            if (!key) return;
            if (!(key in stats)) stats[key] = 0;

            if (button.classList.contains("increase")) {
                stats[key]++;
            } else if (button.classList.contains("decrease")) {
                stats[key]--;
            }

            updateDisplays(key);
        });
    });

    // Gestion modification clavier
    document.querySelectorAll(".stat").forEach(span => {
        const key = span.dataset.key;
        if (!stats.hasOwnProperty(key)) return;

        span.addEventListener("blur", () => {
            const val = parseInt(span.textContent, 10);
            if (!isNaN(val)) {
                stats[key] = val;
            }
            updateDisplays(key);
        });

        span.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                span.blur();
            }
        });
    });
    // Réinitialisation
    const resetBtn = document.getElementById("resetStats");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            for (const key in stats) {
                stats[key] = 0;
                updateDisplays(key);
            }
        });
    }
    // Mise à jour initiale
    for (const key in stats) {
        updateDisplays(key);
    }
});

document.addEventListener("DOMContentLoaded", () => {
  // Vider les listes dynamiques à chaque chargement
  ["equipmentList", "magicList", "curseList"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });

// Libra toggle
const libraToggle = document.getElementById("libraToggle");
const libraState = document.getElementById("libraState");
libraToggle.addEventListener("change", () => {
  libraState.textContent = libraToggle.checked ? "Disponible" : "Indisponible";
});

// Dés

// Ajout d'item
function setupItemInput(nameId, qtyId, noteId, listId) {
  const name = document.getElementById(nameId);
  const qty = qtyId ? document.getElementById(qtyId) : null;
  const note = document.getElementById(noteId);
  const list = document.getElementById(listId);

  // Filtrer les inputs valides
  const inputs = [name, note];
  if (qty) inputs.push(qty);

  inputs.forEach(input => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const itemName = name.value.trim();
        const itemNote = note.value.trim();
        const itemQty = qty ? qty.value || 1 : null;

        if (!itemName) return;

        const label = itemQty !== null
          ? `${itemName} (x${itemQty})\n${itemNote}`
          : `${itemName}\n${itemNote}`;

        const block = document.createElement("div");
        block.className = "item-block";
        block.textContent = label;

        block.addEventListener("click", () => {
          const newText = prompt("Modifier ou supprimer (laisser vide pour supprimer) :", label);
          if (newText === null) return;
          if (newText.trim() === "") {
            list.removeChild(block);
          } else {
            block.textContent = newText.trim();
          } 
        });

        list.appendChild(block);
        name.value = "";
        if (qty) qty.value = "";
        note.value = "";
      }
    });
  });
}
setupItemInput("itemName", "itemQty", "itemNote", "equipmentList");
setupItemInput("magicName", "magicQty", "magicNote", "magicList");
setupItemInput("curseName", null, "curseNote", "curseList");
});

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
"musique/Cave Spellcaster - Troglodyte full album.mp3"
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
