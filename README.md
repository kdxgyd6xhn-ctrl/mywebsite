# Premium Request — Static GitHub Pages Version

Diese Version ist eine client-seitige Simulation. Alle Daten werden lokal im Browser (`localStorage`) gespeichert.

## Dateien
- `index.html` — Login
- `admin.html` — Admin Dashboard
- `user.html` — Benutzer Dashboard
- `app.js` — App-Logik
- `styles.css` — Styling

## Installation & Veröffentlichung auf GitHub Pages
1. Neues Repository auf GitHub erstellen (z. B. `premium-request-static`).
2. Die Dateien oben in das Repo hochladen (root).
3. In den Repo-Einstellungen → Pages → Branch: `main` (oder `gh-pages`) auswählen, Ordner `/ (root)` auswählen und speichern.
4. Nach kurzer Zeit ist die Seite unter `https://<dein-user>.github.io/<repo>` erreichbar.

## Wichtige Hinweise
- Echte Auth, E-Mail, Datenbankfunktionalität **werden nicht** ausgeführt — alles ist lokal.
- Nicht geeignet für sensible Daten oder Produktion.
- Default Accounts (`keyo`/`2208`, `user`/`JerryF921`) werden beim ersten Start lokal angelegt, sind aber nicht auf der Login-Seite sichtbar.

## Anpassung
- Um die Default-Anmeldedaten zu ändern, öffne `app.js` und setze `DEFAULTS.users`.
- Falls du echte Persistenz willst, deploye die ursprüngliche Flask-App auf einen Server (Heroku, Railway, Replit, VPS) — dann sind SQLite & SMTP möglich.
