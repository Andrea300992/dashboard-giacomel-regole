# Dashboard Giacomel – motore 2.0 e regole

Motore grafico e regole della skill Gemini "dashboard-mensile-giacomel" (dalla versione 6.0).

| File | Contenuto | Chi lo modifica |
|---|---|---|
| `motore.js` | Motore della dashboard: calcoli, esclusioni paid, grafici, filtri, stampa | Andrea |
| `regole_paid.txt` | Fonti e dettagli origine paid da escludere dall'organico | Andrea (anche dal sito di GitHub) |
| `versioni/` | Copie fisse delle versioni del motore | – |

La pagina generata da Gemini contiene solo i dati estratti dagli Excel (`DATI`) e le impostazioni richieste in chat (`IMPOSTAZIONI`); tutto il resto lo fa il motore.
Il motore precedente (repository `dashboard-giacomel`) resta invariato per le skill precedenti.

## Aggiornare le regole paid
Apri `regole_paid.txt` su GitHub, clicca la matita, aggiungi o togli una riga, poi "Commit changes". Vale per tutte le dashboard dalla successiva apertura.
