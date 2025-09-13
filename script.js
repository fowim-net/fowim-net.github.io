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
    playerWindow = window.open(
        "player.html",
        "Lecteur",
        "width=400,height=220,left=50,top=50,resizable=no,scrollbars=no"
    );
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
"musique/Wizards of Aldur - Queen of Sorcery.mp3"
];
let index = 0;
const lecteur = document.getElementById("lecteur");
const loopBtn = document.getElementById("loop");
const titre = document.getElementById("titre");

// Charger la première musique
function chargerMusique() {
    lecteur.src = musiques[index];
    lecteur.play();
    const nom = musiques[index].split("/").pop(); // extrait le nom du fichier
    titre.textContent = "🎵 En lecture : " + nom;
}

// Charger la première musique
chargerMusique();

function prevSong() {
    index = (index - 1 + musiques.length) % musiques.length;
    chargerMusique();
}

function nextSong() {
    index = (index + 1) % musiques.length;
    chargerMusique();
}

// Quand une musique finit → passer à la suivante (sauf si loop activé)
lecteur.addEventListener("ended", () => {
    if (lecteur.loop) return;
    nextSong();
});
// Activer/désactiver le loop
function toggleLoop() {
    lecteur.loop = !lecteur.loop;
    loopBtn.textContent = lecteur.loop ? " Loop: On" : " Loop: Off";
}
document.getElementById("prev").addEventListener("click", e => { e.preventDefault(); prevSong(); });
document.getElementById("next").addEventListener("click", e => { e.preventDefault(); nextSong(); });
loopBtn.addEventListener("click", e => { e.preventDefault(); toggleLoop(); });

