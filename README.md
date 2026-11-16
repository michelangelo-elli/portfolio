# Portfolio Data Analyst — Michelangelo Elli

**Sito online : [michelangelo-elli.github.io/portfolio](https://michelangelo-elli.github.io/portfolio/)**

Portfolio dei 12 progetti realizzati nel percorso **Data Analyst OpenClassrooms** (certificazione RNCP37837, livello 6).

Sito statico (HTML/CSS/JS, nessuna dipendenza) — pubblicato su GitHub Pages.

## Contenuto

- `index.html` — pagina unica: hero, profilo, blocchi di competenza RNCP, **sezione veille** (fonti, criteri, automazione, risultati), 12 schede progetto
- `assets/` — CSS e JavaScript (dati dei progetti + modal con anteprima inline)
- `veille-log.md` — journal de veille mensile (fonti datate, valutate su 6 criteri)
- `llms.txt` + blocco JSON-LD in `index.html` — versione leggibile dagli agenti AI (schema.org Person, elenco progetti e deliverable)
- `livrables/p1 … p12/` — deliverable dei progetti:
  - PDF e notebook **visualizzabili direttamente** nel sito (i `.ipynb` sono stati convertiti in HTML)
  - file Power BI (`.pbix`), Excel, Word, CSV, sorgenti Python/SQL scaricabili
  - `p12/` : notebook BottleNeck v2 migliorato, documentazione della démarche (veille, capitolato, POC, tracciabilità IA), glossario dei concetti

Ogni scheda progetto segue la stessa narrativa: **contesto/bisogno → approccio → risultati & impatto → limiti & prossimi passi**, più i deliverable consultabili.

## Pubblicare il sito

### Opzione A — GitHub Pages (consigliata)

1. Crea un repository su [github.com](https://github.com/new) (es. `data-analyst-portfolio`), pubblico.
2. Carica **tutto il contenuto di questa cartella** nella radice del repo
   (trascina la cartella sulla pagina "upload files" di GitHub, oppure con git).
3. Impostazioni → **Pages** → Source: `main` / root → Salva.
4. Dopo 1-2 minuti il sito è live su: `https://<tuo-username>.github.io/<nome-repo>/`

### Opzione B — Netlify Drop (la più veloce, senza git)

1. Vai su [app.netlify.com/drop](https://app.netlify.com/drop) (accesso con Google/GitHub).
2. Trascina l'intera cartella `portfolio-oc` nella pagina.
3. Subito online su un indirizzo `https://xxxx.netlify.app` (personalizzabile gratis).

## Anteprima locale

```bash
cd portfolio-oc
python -m http.server 8321
# poi apri http://localhost:8321
```

## Note

- La presentazione completa del P8 (89 MB) non è inclusa per ragioni di peso — disponibile su richiesta.
- Per aggiornare i contenuti: modificare i dati dei progetti in `assets/app.js` (titoli, descrizioni, risultati, limiti, link).
- **Prima di pubblicare**: sostituire email, GitHub e LinkedIn segnaposto nella sezione contatti di `index.html`.
