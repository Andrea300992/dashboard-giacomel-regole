# Dashboard Giacomel – regole e motore (v5)

Repository centrale della skill Gemini "dashboard-mensile-giacomel" v5.
La skill installata dai colleghi è leggera: a ogni dashboard legge da qui istruzioni, script e regole, quindi gli aggiornamenti arrivano a tutti senza reinstallare nulla.

| File | Cosa contiene | Chi lo modifica |
|---|---|---|
| `istruzioni.md` | Il prompt operativo completo (Fase 1, Fase 2, grafici su richiesta, modello HTML) | Andrea |
| `calcolo.py` | Lo script che legge i 4 Excel, calcola tutto e produce i dati della dashboard | Andrea |
| `regole_paid.txt` | Fonti e dettagli origine paid da escludere dall'organico | Andrea (anche dal sito di GitHub) |
| `motore.js` | Il motore grafico v1.3 (grafica, filtri, stampa) | Andrea |
| `versioni/` | Copie fisse delle versioni del motore | – |
| `skill/SKILL.md` | La skill leggera da installare su Gemini | – |

Il vecchio motore (repository `dashboard-giacomel`) resta invariato: le dashboard e le skill precedenti continuano a usarlo.

## Aggiornare le regole paid
Apri `regole_paid.txt` su GitHub, clicca la matita, aggiungi o togli una riga, poi "Commit changes". Vale dalla dashboard successiva.
