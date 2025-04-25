function showSection(id) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
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

    