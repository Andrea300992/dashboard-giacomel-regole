# -*- coding: utf-8 -*-
# Dashboard mensile Giacomel - calcolo dati
# Versione script: 5.0 (2026-11-17)
# Legge i 4 file Excel caricati, applica le regole e stampa:
#   1) il riepilogo della Fase 1
#   2) l'oggetto DASHBOARD completo in JSON, da copiare IDENTICO nel modello.
# Non modificare nulla sotto la riga "NON MODIFICARE".

REGOLE = """
<<INCOLLA QUI IL CONTENUTO DI regole_paid.txt>>
"""

# Cambio grafico su richiesta dell'utente: {"id-del-blocco": "tipo"}. Vuoto = grafici standard.
GRAFICI = {}
# True = stampa l'elenco dei grafici sostituibili e i tipi ammessi, invece della dashboard.
MOSTRA_GRAFICI = False

# ========================== NON MODIFICARE ==========================
import glob, os, re, json, collections
from datetime import datetime, date
from decimal import Decimal, ROUND_HALF_UP
import openpyxl

VERSIONE_SKILL = "5.0"
DATA_SKILL = "2026-11-18"
MESI = ["", "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio",
        "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]

BRAND = {
    "audi": dict(nome="Audi", conc=["Lombarda", "Sesto", "Sagam", "Eurocar"],
                 modelli=["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q4 e-tron", "Q5", "Q6 e-tron",
                          "Q7", "Q8", "e-tron GT", "TT", "R8"]),
    "cupra": dict(nome="CUPRA", conc=["Lombarda", "Eurocar", "Busto Motor Company", "Wendecar"],
                  modelli=["Born", "Formentor", "Leon", "Ateca", "Terramar", "Tavascan", "Raval",
                           "Ibiza", "Arona", "Tarraco"]),
    "seat": dict(nome="SEAT", conc=["Lombarda", "Eurocar", "Busto Motor Company", "Wendecar"],
                 modelli=["Ibiza", "Arona", "Leon", "Ateca", "Tarraco", "Born", "Formentor", "Terramar",
                          "Tavascan", "Raval"]),
    "skoda": dict(nome="Skoda", conc=["Rigoldi", "Autocogliati", "Autoarona", "Bossoni"],
                  modelli=["Fabia", "Scala", "Kamiq", "Karoq", "Kodiaq", "Octavia", "Superb", "Enyaq", "Elroq",
                           "Epiq", "Peaq"]),
    "volkswagen": dict(nome="Volkswagen", conc=["Rigoldi", "Sesto", "Lombarda", "Martignoni"],
                       modelli=["Polo", "T-Cross", "Taigo", "T-Roc", "Golf", "ID.3", "ID.4", "ID.5", "ID.7",
                                "ID. Buzz", "Tiguan", "Tayron", "Touareg", "Passat", "Multivan"]),
    "apsp": dict(nome="APSP", conc=["Lombarda", "Sesto", "Eurocar"], modelli=None),
    "usato": dict(nome="Usato", conc=["BeBeep", "Eurocar", "Ninicar"], modelli=None),
}
TUTTI_MODELLI = {m.lower(): k for k, v in BRAND.items() if v["modelli"] for m in v["modelli"]}
FONTI_PAID_ORDINE = ["Google Ads", "Meta", "Fornitori Esterni", "Ekonsilio"]
AVVISI = []


def k(s):
    return re.sub(r"\s+", " ", str(s or "")).strip().lower()


def vuoto(v):
    return v is None or (isinstance(v, str) and v.strip() in ("", "-"))


# ---------- formati ----------
def r2(x, n=2):
    return float(Decimal(str(x)).quantize(Decimal(1).scaleb(-n), rounding=ROUND_HALF_UP))


def euro(x):
    s = f"{r2(x):,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return "€ " + s


def pct(a, b):
    if not b:
        return "n.d."
    return f"{r2(a / b * 100, 1):.1f}".replace(".", ",") + "%"


def intero(n):
    return f"{int(n):,}".replace(",", ".")


def cpl(sp, l):
    return (euro(sp / l), r2(sp / l)) if l else ("n.d.", 0)


# ---------- lettura file ----------
def cerca_file():
    out = {}
    cand = []
    for d in [os.environ.get("GIACOMEL_DIR", ""), ".", "/mnt/data", "/content", "/mnt/user-data/uploads"]:
        if d and os.path.isdir(d):
            cand = glob.glob(os.path.join(d, "**", "*.xlsx"), recursive=True)
            if cand:
                break
    for f in sorted(set(os.path.abspath(x) for x in cand)):
        try:
            wb = openpyxl.load_workbook(f, data_only=True, read_only=True)
        except Exception:
            continue
        nomi = [s.lower() for s in wb.sheetnames]
        head = [k(c) for c in next(wb.worksheets[0].iter_rows(max_row=1, values_only=True), [])]
        if "riepilogo" in nomi:
            out.setdefault("f1", f)
        elif "statusq" in head:
            out.setdefault("f2", f)
        elif "fase" in head and "data trattativa" in head:
            out.setdefault("f3", f)
        elif "fratelli giacomel" in nomi:
            out.setdefault("f4", f)
    manca = [x for x in ["f1", "f2", "f3", "f4"] if x not in out]
    if manca:
        raise SystemExit("MANCANO I FILE: " + ", ".join({"f1": "File 1 Paid (foglio Riepilogo)", "f2": "File 2 Report Lead",
                                                         "f3": "File 3 Report Preventivi", "f4": "File 4 Promozioni"}[m] for m in manca))
    return out


def righe(f, foglio=None):
    wb = openpyxl.load_workbook(f, data_only=True)
    ws = wb[[s for s in wb.sheetnames if s.lower() == foglio.lower()][0]] if foglio else wb.worksheets[0]
    it = ws.iter_rows(values_only=True)
    head = [k(h) for h in next(it)]
    rs = []
    for r in it:
        if all(vuoto(v) for v in r):
            continue
        d = dict(zip(head, r))
        prima = k(r[0])
        if prima.startswith("totale") or prima.startswith("conteggio"):
            continue
        rs.append(d)
    return head, rs


def col(head, *nomi, file=""):
    for n in nomi:
        if k(n) in head:
            return k(n)
    raise SystemExit(f"COLONNA MANCANTE in {file}: '{nomi[0]}'. Chiedi il file corretto.")


def num(v):
    if vuoto(v):
        return 0.0
    if isinstance(v, (int, float)):
        return float(v)
    s = str(v).replace("€", "").strip()
    if s in ("", "-"):
        return 0.0
    if "MANCA COLONNA" in s.upper():
        raise SystemExit("Il File 1 contiene 'MANCA COLONNA': correggi il file.")
    s = s.replace(".", "").replace(",", ".") if "," in s else s
    try:
        return float(s)
    except ValueError:
        return 0.0


def data(v):
    if isinstance(v, (datetime, date)):
        return v.year, v.month
    m = re.match(r"\s*(\d{1,2})/(\d{1,2})/(\d{4})", str(v or ""))
    return (int(m.group(3)), int(m.group(2))) if m else None


# ---------- regole paid ----------
def leggi_regole(testo):
    fonti, dett, combo = set(), set(), set()
    for riga in testo.splitlines():
        riga = riga.strip()
        if not riga or riga.startswith("#") or ":" not in riga:
            continue
        tipo, val = riga.split(":", 1)
        tipo = k(tipo)
        if tipo == "fonte paid":
            fonti.add(k(val))
        elif tipo == "dettaglio paid":
            dett.add(k(val))
        elif tipo == "fonte+dettaglio paid":
            if "|" not in val:
                AVVISI.append(f"Regola ignorata (manca il simbolo | tra fonte e dettaglio): {riga}")
                continue
            a, b = val.split("|", 1)
            combo.add((k(a), k(b)))
        elif tipo.startswith("fonte") or tipo.startswith("dettaglio"):
            AVVISI.append(f"Regola non riconosciuta: {riga}")
    if not (fonti or dett or combo):
        raise SystemExit("REGOLE vuote: incolla nello script il contenuto di regole_paid.txt.")
    return fonti, dett, combo


# ---------- modelli ----------
def modello(x, brand):
    s = re.sub(r"^(nuova|nuovo)\s+", "", str(x or "").strip(), flags=re.I).strip()
    if not s:
        return ""
    lst = BRAND[brand]["modelli"]
    if lst:
        for m in sorted(lst, key=len, reverse=True):
            if k(s) == k(m) or k(s).startswith(k(m) + " "):
                return m
    return s


def altro_marchio(x, brand):
    lst = BRAND[brand]["modelli"]
    if not lst:
        return False
    s = re.sub(r"^(nuova|nuovo)\s+", "", str(x or "").strip(), flags=re.I)
    if not s:
        return False
    sl = k(s)
    propri = [k(m) for m in lst]
    if any(sl == m or sl.startswith(m + " ") for m in propri):
        return False
    for m, b in TUTTI_MODELLI.items():
        if (sl == m or sl.startswith(m + " ")) and b != brand:
            return True
    for nome in ["audi", "cupra", "seat", "skoda", "volkswagen", "vw"]:
        if sl.startswith(nome + " ") and nome not in (brand, "vw" if brand == "volkswagen" else "-"):
            return True
    return False


def classifica(contratti):
    """contratti = lista di nomi modello ('' = senza modello). Top 5 + pari merito, N/D in fondo."""
    c = collections.Counter(m for m in contratti if m)
    ordine = sorted(c.items(), key=lambda kv: (-kv[1], kv[0].lower()))
    if len(ordine) > 5:
        soglia = ordine[4][1]
        ordine = [x for i, x in enumerate(ordine) if i < 5 or x[1] == soglia]
    data_ = [{"name": n, "value": v} for n, v in ordine]
    nd = sum(1 for m in contratti if not m)
    if nd:
        data_.append({"name": "N/D", "value": nd})
    top = [n for n, v in ordine if v == ordine[0][1]] if ordine else []
    vinc = " / ".join(top) if top else "n.d."
    return data_, vinc, (ordine[0][1] if ordine else 0), len(contratti) - nd, len(contratti)


# ====================================================================
def main():
    F = cerca_file()
    fonti_p, dett_p, combo_p = leggi_regole(REGOLE)

    # ---------- File 1 ----------
    h1, P = righe(F["f1"], "Riepilogo")
    for c_ in ["Fonte", "Mese", "Consuntivo", "Lead", "Opp.", "Prev.", "Contr. Tot.", "Falliti", "Fornitore"]:
        col(h1, c_, file="File 1 / Riepilogo")
    P = [r for r in P if not vuoto(r["fonte"])]
    for r in P:
        f = k(r["fonte"])
        r["fonte"] = {"google ads": "Google Ads", "meta": "Meta", "fornitori esterni": "Fornitori Esterni",
                      "ekonsilio": "Ekonsilio"}.get(f, str(r["fonte"]).strip())
    mesi = sorted({str(r["mese"]).strip() for r in P}, key=lambda s: int(re.match(r"\d+", s).group()))
    if len(mesi) < 4:
        AVVISI.append(f"File 1: trovati solo {len(mesi)} mesi ({', '.join(mesi)}), ne servono 4.")
    M = mesi[-1]
    T = mesi[-4:-1]
    nM = int(re.match(r"\d+", M).group())
    nT = [int(re.match(r"\d+", x).group()) for x in T]
    for r in P:
        if num(r["prev."]) > num(r["opp."]) or num(r["opp."]) > num(r["lead"]):
            AVVISI.append(f"File 1: riga {r.get('riga origine', '?')} ({r['fonte']} {r['mese']}) con Prev. > Opp. o Opp. > Lead.")
            break

    def ag(rs):
        return dict(sp=sum(num(r["consuntivo"]) for r in rs), l=int(sum(num(r["lead"]) for r in rs)),
                    q=int(sum(num(r["opp."]) for r in rs)), p=int(sum(num(r["prev."]) for r in rs)),
                    c=int(sum(num(r["contr. tot."]) for r in rs)), f=int(sum(num(r["falliti"]) for r in rs)))

    def pm(mesi_, fonte=None):
        return ag([r for r in P if str(r["mese"]).strip() in mesi_ and (fonte is None or r["fonte"] == fonte)])

    # ---------- File 2 ----------
    h2, L = righe(F["f2"])
    for c_ in ["Fonte del lead", "Data creazione", "Data trattativa", "Data proposta acquisto", "StatusQ",
               "Dettaglio origine", "Modello"]:
        col(h2, c_, file="File 2")
    # ---------- File 3 ----------
    h3, Q = righe(F["f3"])
    for c_ in ["Data trattativa", "Brand", "Modello", "Fase", "Data proposta acquisto", "Fonte del lead"]:
        col(h3, c_, file="File 3")

    marca = collections.Counter(k(r["brand"]) for r in Q if not vuoto(r["brand"])).most_common(1)
    marca = marca[0][0] if marca else ""
    nomef = k(" ".join(os.path.basename(x) for x in F.values()))
    brand = None
    for b in ["skoda", "audi", "cupra", "seat", "volkswagen", "apsp", "usato"]:
        if b == marca or b in nomef:
            brand = b
            break
    if marca in ("vw", "volkswagen") or "vw" in nomef.split("_"):
        brand = brand or "volkswagen"
    if not brand:
        raise SystemExit("Brand non riconosciuto: chiedi all'utente quale brand è.")
    BN = BRAND[brand]["nome"]

    anni = collections.Counter(d[0] for d in (data(r["data creazione"]) for r in L) if d)
    anno = anni.most_common(1)[0][0]
    mese_di = {nM: "M", **{m: "T" for m in nT}}

    esclusi_marchio = []

    def tieni(r, fonte_file):
        if altro_marchio(r.get("modello"), brand):
            esclusi_marchio.append(f"{fonte_file}: {r.get('modello')}")
            return False
        return True

    # paid / organico
    paid_trovati = collections.Counter()
    nuove_comb = collections.Counter()
    ORG = []
    for r in L:
        fo, de = k(r["fonte del lead"]), k(r["dettaglio origine"])
        if fo in fonti_p or de in dett_p or (fo, de) in combo_p:
            paid_trovati[f"{r['fonte del lead']}" + (f" | {r['dettaglio origine']}" if de else "")] += 1
            continue
        if not tieni(r, "File 2"):
            continue
        nome = str(r["fonte del lead"] or "").strip() or "(fonte vuota)"
        if k(nome) == "venditore":
            nome = "Walk In"
        r["_fonte"] = nome
        if de:
            nuove_comb[f"{nome} | {r['dettaglio origine']}"] += 1
        d = data(r["data creazione"])
        r["_p"] = mese_di.get(d[1]) if d and d[0] == anno else None
        r["_m"] = d[1] if d else None
        ORG.append(r)
    coperti = {d[1] for d in (data(r["data creazione"]) for r in L) if d}
    if not set([nM] + nT) <= coperti:
        AVVISI.append("File 2 non copre tutti i mesi: presenti " + ", ".join(MESI[m] for m in sorted(coperti)))

    def om(rs):
        return dict(l=len(rs),
                    o=sum(1 for r in rs if str(r["statusq"] or "").strip()[:1] in ("4", "5") and str(r["statusq"] or "").strip()),
                    t=sum(1 for r in rs if not vuoto(r["data trattativa"])),
                    c=sum(1 for r in rs if not vuoto(r["data proposta acquisto"])),
                    f=sum(1 for r in rs if str(r["statusq"] or "").strip()[:1] == "3"))

    # preventivi
    QQ = []
    for r in Q:
        if not tieni(r, "File 3"):
            continue
        d = data(r["data trattativa"])
        r["_p"] = mese_di.get(d[1]) if d and d[0] == anno else None
        r["_m"] = d[1] if d else None
        r["_c"] = not vuoto(r["data proposta acquisto"]) and k(r["fase"]) != "chiusa persa"
        QQ.append(r)
    fonte_vuota = pct(sum(1 for r in QQ if vuoto(r["fonte del lead"])), len(QQ))

    # ---------- File 4 ----------
    wb4 = openpyxl.load_workbook(F["f4"], data_only=True)
    if k(wb4.sheetnames[0]) != "fratelli giacomel":
        AVVISI.append("File 4: il primo foglio non è 'Fratelli Giacomel'.")
    promo = []
    conc_presenti = []
    for ws in wb4.worksheets:
        it = ws.iter_rows(values_only=True)
        head = [k(h) for h in next(it, [])]
        rows_ = [dict(zip(head, r)) for r in it if not all(vuoto(v) for v in r)]
        conc_presenti.append(ws.title)
        if not rows_:
            promo.append([ws.title, "ND", "ND", "ND", "ND"])
        for r in rows_:
            def cap(v):
                s = str(v).strip() if not vuoto(v) else "ND"
                return s.capitalize() if s.isupper() and len(s) > 1 and s != "ND" else s
            promo.append([ws.title, cap(r.get("brand")), cap(r.get("modello")),
                          str(r.get("formula d'acquisto")).strip() if not vuoto(r.get("formula d'acquisto")) else "ND",
                          str(r.get("promozione")).strip() if not vuoto(r.get("promozione")) else "ND"])
    for c_ in BRAND[brand]["conc"]:
        if not any(k(c_) in k(p) or k(p) in k(c_) for p in conc_presenti):
            AVVISI.append(f"File 4: manca il foglio del concorrente {c_}.")

    # ================= COSTRUZIONE DASHBOARD =================
    MeseN, Mesi3 = MESI[nM], [MESI[m] for m in nT]
    TRI = f"{Mesi3[0]} – {Mesi3[-1]} {anno}"

    # --- Capitolo 1
    a = {f: pm([M], f) for f in FONTI_PAID_ORDINE}
    tot = pm([M])
    rows1 = [[f, euro(a[f]["sp"]), a[f]["l"], a[f]["q"], pct(a[f]["q"], a[f]["l"]), a[f]["p"],
              pct(a[f]["p"], a[f]["q"]), cpl(a[f]["sp"], a[f]["l"])[0]] for f in FONTI_PAID_ORDINE]
    tot1 = ["TOTALE", euro(tot["sp"]), tot["l"], tot["q"], pct(tot["q"], tot["l"]), tot["p"], pct(tot["p"], tot["q"]),
            cpl(tot["sp"], tot["l"])[0]]
    cap1 = dict(label="Paid – mese", title=f"Campagne a pagamento – {MeseN} {anno}",
                subtitle="Lead, qualificati e preventivi per fonte a pagamento.", blocks=[
        dict(type="kpi", items=[
            dict(label="Spesa", value=euro(tot["sp"])), dict(label="CPL", value=cpl(tot["sp"], tot["l"])[0]),
            dict(label="Lead", value=intero(tot["l"])),
            dict(label="Qualificati", value=intero(tot["q"]), suffix=f"({pct(tot['q'], tot['l'])})", note="% sui lead", highlight=True),
            dict(label="Preventivi", value=intero(tot["p"]), suffix=f"({pct(tot['p'], tot['q'])})", note="% sui qualificati")]),
        dict(type="cols", blocks=[
            dict(id="paid-mese.lead-fonte", type="colonne", title="Lead e qualificati per fonte", series=["Lead", "Qualificati"],
                 data=[{"name": f, "Lead": a[f]["l"], "Qualificati": a[f]["q"]} for f in FONTI_PAID_ORDINE]),
            dict(id="paid-mese.cpl-fonte", type="barre", title="CPL per fonte",
                 note="Nota: Nella fonte Google Ads vengono conteggiati solo i lead da Form.",
                 data=[{"name": f, "value": cpl(a[f]["sp"], a[f]["l"])[1], "display": cpl(a[f]["sp"], a[f]["l"])[0]}
                       for f in FONTI_PAID_ORDINE])]),
        dict(type="table", title="Dettaglio per fonte", subtitle=f"{MeseN} {anno}",
             head=["Fonte", "Spesa", "Lead", "Qualificati", "% qualificati", "Preventivi", "% preventivi", "CPL"],
             rows=rows1, total=tot1)])

    # --- Capitolo 2
    b = {f: pm(T, f) for f in FONTI_PAID_ORDINE}
    tt = pm(T)

    def r10(n, x):
        return [n, euro(x["sp"]), x["l"], x["q"], pct(x["q"], x["l"]), x["p"], pct(x["p"], x["q"]), x["c"], x["f"],
                cpl(x["sp"], x["l"])[0]]

    forn = collections.defaultdict(list)
    for r in P:
        if str(r["mese"]).strip() in T and r["fonte"] == "Fornitori Esterni":
            forn[str(r.get("fornitore") or "(senza fornitore)").strip()].append(r)
    fo = sorted(((n, ag(v)) for n, v in forn.items()), key=lambda kv: (-kv[1]["l"], kv[0].lower()))
    ftot = ag([r for v in forn.values() for r in v])
    cap2 = dict(label="Paid – trimestre", title=f"Campagne a pagamento – {TRI}",
                subtitle="Trimestre mobile: lead, qualificati, preventivi e contratti per fonte.", blocks=[
        dict(type="kpi", items=[dict(label="Spesa", value=euro(tt["sp"])), dict(label="CPL", value=cpl(tt["sp"], tt["l"])[0]),
                                dict(label="Lead", value=intero(tt["l"]))]),
        dict(type="kpi", items=[
            dict(label="Qualificati", value=intero(tt["q"]), suffix=f"({pct(tt['q'], tt['l'])})", note="% sui lead", highlight=True),
            dict(label="Preventivi", value=intero(tt["p"]), suffix=f"({pct(tt['p'], tt['q'])})", note="% sui qualificati"),
            dict(label="Contratti", value=intero(tt["c"]))]),
        dict(type="table", title="Dettaglio per fonte", subtitle=TRI,
             head=["Fonte", "Spesa", "Lead", "Qualificati", "% qualificati", "Preventivi", "% preventivi", "Contratti", "Falliti", "CPL"],
             rows=[r10(f, b[f]) for f in FONTI_PAID_ORDINE], total=r10("TOTALE", tt)),
        dict(type="heading", text="Andamento mese su mese"),
        dict(type="cols", blocks=[
            dict(id="paid-trimestre.lead-mese", type="linea", title="Lead per fonte", series=FONTI_PAID_ORDINE,
                 data=[dict(name=MESI[nT[i]], **{f: pm([m], f)["l"] for f in FONTI_PAID_ORDINE}) for i, m in enumerate(T)]),
            dict(id="paid-trimestre.qualificati-mese", type="linea", title="Qualificati per fonte", series=FONTI_PAID_ORDINE,
                 data=[dict(name=MESI[nT[i]], **{f: pm([m], f)["q"] for f in FONTI_PAID_ORDINE}) for i, m in enumerate(T)])]),
        dict(type="table", title="Mese su mese – totale fonti",
             head=["Mese", "Spesa", "Lead", "Qualificati", "% qualificati", "Preventivi", "% preventivi", "Contratti", "Falliti", "CPL"],
             rows=[r10(MESI[nT[i]], pm([m])) for i, m in enumerate(T)], total=r10("TRIMESTRE", tt)),
        dict(type="heading", text="Fornitori esterni"),
        dict(type="cols", blocks=[
            dict(id="paid-trimestre.lead-fornitore", type="barre", title="Lead per fornitore", data=[{"name": n, "value": x["l"]} for n, x in fo]),
            dict(id="paid-trimestre.cpl-fornitore", type="barre", title="CPL per fornitore",
                 data=[{"name": n, "value": cpl(x["sp"], x["l"])[1], "display": cpl(x["sp"], x["l"])[0]} for n, x in fo])]),
        dict(type="table", title="Dettaglio fornitori esterni", subtitle=TRI,
             head=["Fornitore", "Spesa", "Lead", "Qualificati", "% qualificati", "Preventivi", "Contratti", "CPL"],
             rows=[[n, euro(x["sp"]), x["l"], x["q"], pct(x["q"], x["l"]), x["p"], x["c"], cpl(x["sp"], x["l"])[0]] for n, x in fo],
             total=["TOTALE", euro(ftot["sp"]), ftot["l"], ftot["q"], pct(ftot["q"], ftot["l"]), ftot["p"], ftot["c"],
                    cpl(ftot["sp"], ftot["l"])[0]])])

    # --- Capitoli 3 e 4
    def org_blocchi(rs, sub, pref):
        x = om(rs)
        src = collections.defaultdict(list)
        for r in rs:
            src[r["_fonte"]].append(r)
        srt = sorted(src.items(), key=lambda kv: (-len(kv[1]), kv[0].lower()))
        contr = [modello(r["modello"], brand) for r in rs if not vuoto(r["data proposta acquisto"])]
        cl, vinc, nv, conmod, tot_c = classifica(contr)
        gruppo = lambda n: "Casa Madre" if k(n) == "casa madre" else "Fonti nostre"
        filtri = ["Casa Madre", "Tutte le fonti", "Fonti nostre"]
        righe_ = []
        for n, v in srt:
            y = om(v)
            righe_.append([n, y["l"], y["o"], pct(y["o"], y["l"]), y["t"], pct(y["t"], y["o"]), y["c"], y["f"]])
        return x, vinc, nv, [
            dict(type="kpi", items=[
                dict(label="Lead", value=intero(x["l"])),
                dict(label="Opportunità", value=intero(x["o"]), suffix=f"({pct(x['o'], x['l'])})", note="% sui lead", highlight=True),
                dict(label="Trattative", value=intero(x["t"]), suffix=f"({pct(x['t'], x['o'])})", note="% sulle opportunità")]),
            dict(type="kpi", items=[
                dict(label="Contratti", value=intero(x["c"])), dict(label="Falliti", value=intero(x["f"])),
                dict(label="Auto vincitrice", value=vinc, suffix=f"({nv} contratti)")]),
            dict(id=pref + ".fonti", type="barre", title="Lead e opportunità per fonte", series=["Lead", "Opportunità"],
                 switch=False, filtri=filtri, maxRighe=6,
                 data=[{"name": n, "Lead": len(v), "Opportunità": om(v)["o"], "gruppo": gruppo(n)} for n, v in srt]),
            dict(type="table", title="Dettaglio per fonte", subtitle=sub, full=True, sortable=True, filtri=filtri,
                 gruppi=[gruppo(n) for n, _ in srt],
                 totali={g: (lambda y: ["TOTALE", y["l"], y["o"], pct(y["o"], y["l"]), y["t"], pct(y["t"], y["o"]), y["c"], y["f"]])(
                     om([r for r in rs if g == "Tutte le fonti" or gruppo(r["_fonte"]) == g])) for g in filtri},
                 head=["Fonte", "Lead", "Opportunità", "% opportunità", "Trattative", "% trattative", "Contratti", "Falliti"],
                 rows=righe_,
                 total=["TOTALE", x["l"], x["o"], pct(x["o"], x["l"]), x["t"], pct(x["t"], x["o"]), x["c"], x["f"]]),
            dict(id=pref + ".top-modelli", type="classifica", title="Top 5 modelli per contratti", unit="contratti", data=cl,
                 note=f"Calcolata sui {conmod} contratti con modello indicato, su {tot_c} contratti totali."
                      + (" N/D = contratti senza modello in Salesforce." if tot_c > conmod else ""))]

    oM = [r for r in ORG if r["_p"] == "M"]
    oT = [r for r in ORG if r["_p"] == "T"]
    xM, vM, nvM, bl3 = org_blocchi(oM, f"{MeseN} {anno}", "organico-mese")
    xT, vT, nvT, bl4 = org_blocchi(oT, TRI, "organico-trimestre")
    cap3 = dict(label="Organico – mese", title=f"Lead organici – {MeseN} {anno}",
                subtitle="Lead da fonti non a pagamento, per mese di creazione del lead.", blocks=bl3)
    mm = {m: [r for r in ORG if r["_p"] == "T" and r["_m"] == m] for m in nT}
    bl4 += [
        dict(type="heading", text="Andamento mese su mese"),
        dict(id="organico-trimestre.andamento", type="linea", title="Lead, opportunità e contratti", series=["Lead", "Opportunità", "Contratti"],
             data=[{"name": MESI[m], "Lead": om(mm[m])["l"], "Opportunità": om(mm[m])["o"], "Contratti": om(mm[m])["c"]} for m in nT]),
        dict(type="table", title="Mese su mese – totale fonti",
             head=["Mese", "Lead", "Opportunità", "% opportunità", "Trattative", "% trattative", "Contratti", "Falliti"],
             rows=[[MESI[m], y["l"], y["o"], pct(y["o"], y["l"]), y["t"], pct(y["t"], y["o"]), y["c"], y["f"]]
                   for m in nT for y in [om(mm[m])]],
             total=["TRIMESTRE", xT["l"], xT["o"], pct(xT["o"], xT["l"]), xT["t"], pct(xT["t"], xT["o"]), xT["c"], xT["f"]]),
        dict(type="heading", text="Top 5 modelli per mese"),
        dict(type="cols", blocks=[dict(type="classifica", style="righe", title=MESI[m],
                                       data=classifica([modello(r["modello"], brand) for r in mm[m]
                                                        if not vuoto(r["data proposta acquisto"])])[0]) for m in nT])]
    cap4 = dict(label="Organico – trimestre", title=f"Lead organici – {TRI}",
                subtitle="Lead da fonti non a pagamento, per mese di creazione del lead.", blocks=bl4)

    # --- Capitolo 5
    def qm(rs):
        con = [modello(r["modello"], brand) for r in rs if r["_c"]]
        return dict(t=len(rs), c=len(con), nd=sum(1 for m in con if not m), con=con)

    qM = qm([r for r in QQ if r["_p"] == "M"])
    qT = qm([r for r in QQ if r["_p"] == "T"])
    qm_ = {m: qm([r for r in QQ if r["_p"] == "T" and r["_m"] == m]) for m in nT}
    clM, vqM, nqM, cmM, tcM = classifica(qM["con"])
    clT, vqT, nqT, cmT, tcT = classifica(qT["con"])
    blocchi5 = [dict(type="avviso", text=f"Attenzione: il {fonte_vuota} delle trattative non ha la fonte del lead compilata.")]
    if qM["nd"] or qT["nd"]:
        blocchi5.append(dict(type="avviso", text=f"Contratti senza modello in Salesforce: {qM['nd']} nel mese, {qT['nd']} nel trimestre. "
                                                 "Sono contati nei totali e nelle classifiche come N/D."))
    blocchi5 += [
        dict(type="kpi", items=[dict(label="Trattative", value=intero(qM["t"])), dict(label="Contratti", value=intero(qM["c"])),
                                dict(label="Tasso di chiusura", value=pct(qM["c"], qM["t"]), note="contratti / trattative"),
                                dict(label="Modello più venduto", value=vqM, suffix=f"({nqM} contratti)", highlight=True)]),
        dict(id="preventivi.top-modelli-mese", type="classifica", title=f"Top 5 modelli – {MeseN} (contratti)", unit="contratti", data=clM,
             note=f"Calcolata sui {cmM} contratti con modello indicato, su {tcM} contratti totali."),
        dict(type="heading", text=f"Trimestre mobile – {TRI}"),
        dict(type="kpi", items=[dict(label="Trattative", value=intero(qT["t"])), dict(label="Contratti", value=intero(qT["c"])),
                                dict(label="Tasso di chiusura", value=pct(qT["c"], qT["t"]), note="contratti / trattative"),
                                dict(label="Modello più venduto", value=vqT, suffix=f"({nqT} contratti)", highlight=True)]),
        dict(type="cols", blocks=[
            dict(id="preventivi.trattative-mese", type="colonne", title="Trattative e contratti per mese", series=["Trattative", "Contratti"],
                 data=[{"name": MESI[m], "Trattative": qm_[m]["t"], "Contratti": qm_[m]["c"]} for m in nT]),
            dict(id="preventivi.top-modelli-trimestre", type="classifica", title="Top 5 modelli del trimestre (contratti)", unit="contratti", data=clT,
                 note=f"Calcolata sui {cmT} contratti con modello indicato, su {tcT} contratti totali.")]),
        dict(type="table", title="Riepilogo mensile",
             head=["Mese", "Trattative", "Contratti", "Contratti senza modello", "Tasso di chiusura"],
             rows=[[MESI[m], qm_[m]["t"], qm_[m]["c"], qm_[m]["nd"], pct(qm_[m]["c"], qm_[m]["t"])] for m in nT],
             total=["TRIMESTRE", qT["t"], qT["c"], qT["nd"], pct(qT["c"], qT["t"])]),
        dict(type="heading", text="Top 5 modelli per mese"),
        dict(type="cols", blocks=[dict(type="classifica", style="righe", title=MESI[m], data=classifica(qm_[m]["con"])[0]) for m in nT])]
    cap5 = dict(label="Preventivi", title=f"Preventivi da tutte le fonti – {MeseN} {anno}",
                subtitle="Trattative (preventivi) e contratti per mese della trattativa; focus sull'ultimo mese e trimestre mobile.",
                blocks=blocchi5)

    # --- Capitolo 6
    cap6 = dict(label="Concorrenza", title=f"Promozioni attive – {MeseN} {anno}",
                subtitle="Promozioni di Fratelli Giacomel e dei concorrenti locali, dal file promozioni.",
                blocks=[dict(type="table", title="Promozioni per concessionario", full=True,
                             head=["Concessionario", "Brand", "Modello", "Formula d'acquisto", "Promozione"], rows=promo)])

    D = dict(period=f"{BN} · {MeseN} {anno}", thanks="", brand="grafite", accent="arancio",
             generatore=f"dashboard-mensile-giacomel v{VERSIONE_SKILL} · {DATA_SKILL}",
             skill=VERSIONE_SKILL, tabs=[cap1, cap2, cap3, cap4, cap5, cap6])

    # ================= CAMBIO GRAFICI SU RICHIESTA =================
    COMPAT = {"serie": ["barre", "colonne", "linea"], "valori": ["barre", "colonne", "linea", "bolle"],
              "classifica": ["classifica", "barre", "colonne"]}
    DESCR = {"barre": "barre orizzontali", "colonne": "colonne verticali", "linea": "linea (andamento)",
             "bolle": "bolle (area = valore)", "classifica": "classifica con podio"}

    def tutti_blocchi():
        for c in D["tabs"]:
            for b_ in c["blocks"]:
                yield c, b_
                for x in b_.get("blocks", []) if b_.get("type") == "cols" else []:
                    yield c, x

    def famiglia(b_):
        if b_["type"] == "classifica":
            return "classifica"
        return "serie" if b_.get("series") else "valori"

    if MOSTRA_GRAFICI:
        print("=== GRAFICI SOSTITUIBILI ===")
        print("Tipi del motore: " + "; ".join(f"{t} = {d}" for t, d in DESCR.items()))
        for c, b_ in tutti_blocchi():
            if b_.get("id"):
                print(f"- {b_['id']} · capitolo '{c['label']}' · '{b_.get('title', '')}' · ora: {b_['type']} · ammessi: {', '.join(COMPAT[famiglia(b_)])}")
        print("=== FINE GRAFICI ===")
        return D
    for gid, tipo in GRAFICI.items():
        trovati = [b_ for _, b_ in tutti_blocchi() if b_.get("id") == gid]
        if not trovati:
            raise SystemExit(f"Grafico '{gid}' inesistente. Esegui con MOSTRA_GRAFICI = True per l'elenco.")
        b_ = trovati[0]
        ammessi = COMPAT[famiglia(b_)]
        if tipo not in ammessi:
            raise SystemExit(f"Il grafico '{gid}' non può diventare '{tipo}'. Tipi ammessi: {', '.join(ammessi)}.")
        if b_["type"] == "classifica" and tipo != "classifica":
            b_["data"] = [d for d in b_["data"] if d["name"] != "N/D"]
            for x in ("unit", "style"):
                b_.pop(x, None)
        if tipo == "classifica" and b_["type"] != "classifica":
            b_["unit"] = b_.get("unit", "")
        b_["type"] = tipo

    # ================= AUTOCONTROLLI =================
    def somma(rows, i):
        return sum(r[i] for r in rows)
    for t_ in [b_ for c in D["tabs"] for b_ in c["blocks"] if b_.get("type") == "table" and "total" in b_]:
        for i, h in enumerate(t_["head"]):
            if i and isinstance(t_["total"][i], int) and t_["rows"] and all(isinstance(r[i], int) for r in t_["rows"]):
                assert somma(t_["rows"], i) == t_["total"][i], f"Somma errata: {t_['title']} / {h}"
        for r in t_["rows"]:
            assert len(r) == len(t_["head"]), f"Celle errate in {t_['title']}"
    fonti_file2 = {str(r["_fonte"]) for r in ORG}
    for c in (cap3, cap4):
        for b_ in c["blocks"]:
            if b_.get("id", "").endswith(".fonti"):
                assert all(d["name"] in fonti_file2 for d in b_["data"]), "Fonte non presente nel File 2"
                assert sum(d["Lead"] for d in b_["data"]) == (xM if c is cap3 else xT)["l"], "Somma lead per fonte errata"

    # ================= FASE 1 =================
    lin = []
    lin.append(f"{BN} · Mese: {MeseN} {anno} · Trimestre: {Mesi3[0]}–{Mesi3[-1]} {anno}")
    lin.append(f"Paid mese: spesa {euro(tot['sp'])}, lead {tot['l']}, qualificati {tot['q']} ({pct(tot['q'], tot['l'])}), "
               f"preventivi {tot['p']}, CPL {cpl(tot['sp'], tot['l'])[0]}")
    lin.append("   per fonte: " + ", ".join(f"{f} {a[f]['l']} lead / {euro(a[f]['sp'])}" for f in FONTI_PAID_ORDINE))
    lin.append(f"Paid trimestre: spesa {euro(tt['sp'])}, lead {tt['l']}, qualificati {tt['q']} ({pct(tt['q'], tt['l'])}), "
               f"preventivi {tt['p']}, contratti {tt['c']}, CPL {cpl(tt['sp'], tt['l'])[0]}")
    lin.append("   fornitori: " + (", ".join(f"{n} {x['l']}" for n, x in fo) or "nessuno"))
    for lab, x, v, nv, rs in [("mese", xM, vM, nvM, oM), ("trimestre", xT, vT, nvT, oT)]:
        lin.append(f"Organico {lab}: lead {x['l']}, opportunità {x['o']} ({pct(x['o'], x['l'])}), trattative {x['t']}, "
                   f"contratti {x['c']}, vincitrice {v} ({nv})")
        cnt = collections.Counter(r["_fonte"] for r in rs)
        lin.append("   fonti: " + ", ".join(f"{n} {c}" for n, c in sorted(cnt.items(), key=lambda kv: (-kv[1], kv[0].lower()))))
    lin.append(f"Preventivi mese: trattative {qM['t']}, contratti {qM['c']} (senza modello {qM['nd']}), chiusura {pct(qM['c'], qM['t'])} · "
               f"trimestre: trattative {qT['t']}, contratti {qT['c']} (senza modello {qT['nd']}), chiusura {pct(qT['c'], qT['t'])} · "
               f"fonte vuota {fonte_vuota}")
    npromo = collections.Counter(p[0] for p in promo)
    lin.append(f"Concorrenza: {len(promo)} promozioni da {len(npromo)} concessionari (" +
               ", ".join(f"{n} {c}" for n, c in npromo.items()) + ")")
    if paid_trovati:
        lin.append(f"ATTENZIONE: nel File 2 ci sono {sum(paid_trovati.values())} lead paid, esclusi: " +
                   ", ".join(f"{n} ({c})" for n, c in paid_trovati.most_common()))
    if nuove_comb:
        lin.append("Combinazioni fonte | dettaglio contate come ORGANICHE: " +
                   ", ".join(f"{n} ({c})" for n, c in nuove_comb.most_common(12)))
    if esclusi_marchio:
        c_ = collections.Counter(esclusi_marchio)
        lin.append("Righe escluse (modello di altro marchio): " + ", ".join(f"{n} ({c})" for n, c in c_.most_common()))
    lin.append("Controlli: tutto torna." if not AVVISI else "Controlli: " + " | ".join(AVVISI[:5]))

    print("=== FASE 1 ===")
    print("\n".join(lin))
    print("=== DASHBOARD ===")
    print(json.dumps(D, ensure_ascii=False, separators=(",", ":")))
    print("=== FINE DASHBOARD ===")
    return D


if __name__ == "__main__":
    main()
