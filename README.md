# GZN Everworld — Website

Statischer One-Pager für den GZN Everworld Minecraft-Server. Kein Build-Step, kein Framework — reines HTML/CSS/JS, läuft direkt auf GitHub Pages.

## Struktur
```
index.html      Seiteninhalt (alle Sektionen)
style.css       Design-System (Farben, Typo, Layout, Animationen)
script.js       Interaktivität (Scroll-Straße, Regel-Tabs, Video-Lightbox, Nav)
assets/icons/   Favicon
assets/img/     Leer — siehe Asset-Liste unten
```

## Auf GitHub Pages hosten
1. Repo erstellen (z.B. `gzn-everworld`), diesen Ordnerinhalt hochladen (nicht in einen Unterordner — `index.html` muss im Root liegen).
2. **Settings → Pages → Source: `main` Branch, `/ (root)`.**
3. Nach ein bis zwei Minuten läuft sie unter `https://<dein-username>.github.io/gzn-everworld/`.
4. Eigene Domain optional über eine `CNAME`-Datei im Root.

## Noch offen (bewusst als Platzhalter gebaut)
- **Client-Download** (`#client`-Button): zeigt aktuell auf `#`. Bevor du den echten Download verlinkst — siehe Hinweis unten zu deinem `.minecraft`-Ordner.
- **Videos III & IV**: Karten sind vorbereitet ("Bald verfügbar"), einfach nach dem gleichen Muster wie Video I/II mit `data-yt-id` befüllen, sobald sie online sind.
- **Deine Socials** (`#ueber-mich`): Ich habe im Web nach "Endougetta" gesucht und keine verlässlich zuordenbaren Profile gefunden. Im HTML stehen 6 Platzhalter-Links (Twitch, YouTube, Discord, TikTok, Instagram, X) mit `href="#"` — so markiert:
  ```html
  <!-- TODO Endougetta: echte Links hier eintragen -->
  ```
  Einfach die `#` durch deine echten URLs ersetzen. Lösch die Zeilen, die du nicht brauchst.
- **Minecraft-Version / Modloader** im Client-Bereich: aktuell "wird ergänzt", trag die echten Werte in `index.html` bei `.client-specs` ein.

## Zu deinem hochgeladenen Client-ZIP
Die Datei, die du geschickt hast, ist dein komplettes `.minecraft`-Verzeichnis (Saves, Server-Logs mit IPs, Voicechat-Configs, Mod-Configs) — kein sauber verteilbares Paket. Bevor das auf GitHub landet:
- **Persönliche Daten raus:** `saves/`, `logs/`, `voicechat`-Configs mit IPs/Usernamen gehören da nicht rein.
- **Mod-Lizenzen:** Viele Mods (CurseForge/Modrinth) verbieten Redistribution der `.jar`-Dateien selbst. Sauberer Weg: ein **Modrinth-Modpack (`.mrpack`)** — das ist nur ein Manifest mit Download-Links zu den Original-Quellen, keine rohen Mod-Dateien. Alternativ ein Prism/MultiMC-Export.
- GitHub hat außerdem ein Soft-Limit von ~100MB pro Datei (dein ZIP ist 440MB) — für den Download eignet sich eher ein GitHub *Release* (Anhänge dort dürfen größer sein) statt ein Datei-Commit im Repo selbst.

## Asset-Liste — das brauche ich noch von dir
Lade folgende Dateien in `assets/img/` hoch, dann kann ich sie einbinden (Namen bitte exakt so, dann greifen die CSS-Referenzen ohne weitere Änderung):

| Datei | Was rein soll |
|---|---|
| `hero-bg.jpg` | Ein eigener Screenshot von Everworld (Landschaft/Base), quer, min. 1920×1080 — kein Stock-Bild, damit es wirklich "eure Welt" zeigt |
| `og-image.jpg` | Vorschaubild für Discord/Twitter-Link-Previews, 1200×630 |
| `city-1.jpg` … `city-3.jpg` | Screenshots von den ersten Bauten/Städten, sobald es welche gibt (für die "Städte & Zivilisation"-Sektion) |
| `portrait.jpg` | Dein eigenes Profilbild/Avatar für den "Über mich"-Bereich (ersetzt aktuell den "E"-Platzhalter-Kreis) |

Bitte **keine fremden/urheberrechtlich geschützten Bilder** aus dem Netz — am besten eigene Screenshots aus eurer Welt, das passt auch besser zur "das ist unsere echte Geschichte"-Idee der Seite.

## Design-Entscheidung kurz erklärt
Kein Standard-Minecraft-Server-Look (dunkel + Neon-Grün). Stattdessen: **Chronik/Atlas-Ästhetik** — Pergament, Tinte, Wachssiegel-Marker. Signatur-Element ist die handgezeichnete Straße (SVG), die sich beim Scrollen durch die ganze Seite zeichnet und jede Sektion als "Wegpunkt" markiert — das spiegelt direkt eure Regel, dass Siedlungen durch Wege miteinander verbunden sein müssen.
