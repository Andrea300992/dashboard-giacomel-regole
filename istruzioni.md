# Dashboard mensile Giacomel – istruzioni operative (v5.0 · 2026-11-18)

Queste istruzioni completano la skill "dashboard-mensile-giacomel". Seguile alla lettera.

## REGOLA ZERO: NESSUN DATO SCRITTO A MANO
- Tutti i numeri, i nomi delle fonti, dei fornitori, dei modelli e i testi delle promozioni della dashboard vengono SOLO dall'output dello script `calcolo.py`.
- VIETATO calcolare, stimare, completare, arrotondare o "riempire" qualsiasi valore a mente. VIETATO aggiungere o togliere fonti, righe o modelli.
- Se lo script si ferma con un errore, mostra all'utente il messaggio di errore così com'è e fermati. Non provare a rimediare inventando dati.

## PASSO 1 – Prepara ed esegui lo script
1. Hai già letto `regole_paid.txt` e `calcolo.py` dai link della skill.
2. Nello strumento di esecuzione del codice (Python) prova prima a scaricarli direttamente:
   ```
   import urllib.request
   B = "https://raw.githubusercontent.com/Andrea300992/dashboard-giacomel-regole/main/"
   regole = urllib.request.urlopen(B + "regole_paid.txt").read().decode("utf-8")
   codice = urllib.request.urlopen(B + "calcolo.py").read().decode("utf-8")
   exec(codice.replace("<<INCOLLA QUI IL CONTENUTO DI regole_paid.txt>>", regole), {"__name__": "__main__"})
   ```
3. Se il download da Python non funziona (nessun accesso a internet), copia nel codice il testo di `calcolo.py` IDENTICO, carattere per carattere, e sostituisci la riga `<<INCOLLA QUI IL CONTENUTO DI regole_paid.txt>>` con il testo IDENTICO di `regole_paid.txt`. Poi eseguilo.
4. Lo script trova da solo i 4 file Excel caricati dall'utente e stampa due parti: `=== FASE 1 ===` e `=== DASHBOARD ===`.

## PASSO 2 – FASE 1 (in chat, niente codice)
- Scrivi in chat il testo tra `=== FASE 1 ===` e `=== DASHBOARD ===` così com'è, senza cambiare nessun numero.
- Poi scrivi: "Rispondi OK per generare la dashboard in Canvas. Attiva prima Canvas dal menu Strumenti. Oppure dimmi cosa cambiare." e ATTENDI.
- Se l'utente chiede chiarimenti su un numero, rispondi rieseguendo codice Python sui file, mai a memoria.

## PASSO 3 – FASE 2 (solo dopo l'OK)
- Crea un documento Canvas di codice HTML. Titolo: `dashboard_fratelli_giacomel_<brand>_<mese>_<anno>` (minuscolo, underscore, senza accenti), lo stesso testo nel tag `<title>`.
- Il contenuto è il MODELLO qui sotto. Sostituisci `__TITOLO__` con il titolo e `__DATI__` con la riga JSON stampata tra `=== DASHBOARD ===` e `=== FINE DASHBOARD ===`, copiata IDENTICA, dall'inizio `{` alla fine `}`.
- Nient'altro: niente CSS, script, librerie o modifiche al modello. La grafica la disegna il motore.
- In chat: una sola riga di conferma. VIETATO scrivere codice in chat.
- Se l'anteprima mostra un riquadro rosso, NON correggere a mano: rileggi la riga JSON dall'output dello script e ricopiala.
- Modifiche successive richieste dall'utente: se riguardano i dati, rifai i calcoli con Python; aggiorna lo STESSO documento Canvas.

## PASSO 4 – GRAFICI SU RICHIESTA
- Se l'utente chiede quali grafici si possono cambiare o quali tipi esistono: riesegui lo script con `MOSTRA_GRAFICI = True` e riporta in chat l'elenco stampato, così com'è.
- Se l'utente chiede di cambiare un grafico (es. "metti le fonti organiche del mese a colonne"):
  1. individua nell'elenco l'id del blocco (es. `organico-mese.fonti`) e il tipo richiesto (es. `colonne`); se non sei sicuro di quale blocco intende, chiediglielo;
  2. riesegui lo script con `GRAFICI = {"organico-mese.fonti": "colonne"}` (più cambi insieme nello stesso dizionario; tieni anche quelli chiesti prima);
  3. se lo script risponde che il tipo non è ammesso, riferisci il messaggio con i tipi ammessi e NON modificare la dashboard;
  4. altrimenti sostituisci nel documento Canvas l'intera riga dei dati con la nuova riga JSON stampata.
- VIETATO cambiare a mano il campo "type" o qualsiasi altro campo dei dati: passa sempre dallo script.

## MODELLO
=== INIZIO MODELLO ===
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>__TITOLO__</title>
</head>
<body>
<div id="app" style="font-family:sans-serif;padding:40px;color:#888">Caricamento della dashboard… (serve la connessione a internet)</div>
<script>
const DASHBOARD = __DATI__;
</script>
<script src="https://andrea300992.github.io/dashboard-giacomel-regole/motore.js" onerror="this.onerror=null;var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/Andrea300992/dashboard-giacomel-regole@main/motore.js';document.body.appendChild(s)"></script>
</body>
</html>
=== FINE MODELLO ===
