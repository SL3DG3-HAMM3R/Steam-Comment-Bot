<div align="center">
	<h1 align="center">~ Steam Comment Bot ~</h1>
	<strong>Kommentiere mehrere Steamaccounts auf einmal.</strong><br />Funktionsweise und Erklärung siehe unten.<br /><br />
</div>


Dieser Bot hat zwei konfigurierbare Listen: eine für alle Steamaccounts, welche kommentiert werden sollen und eine Liste für die gewünschten Kommentare.
Du kannst auswählen, ob auf jedem Account der selbe Kommentar hinterlassen werden soll, oder ob du verschiedene Kommentare hinterlassen willst.
Genaueres wird unten erklärt.

## Anforderungen

- `node` (https://nodejs.org)

Notwendig, wenn du über die CommandLine klonen möchtest:
- `git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) installed

## Downloading

Klicke hier: [Download](https://github.com/SL3DG3-HAMM3R/Steam-Comment-Bot/archive/master.zip)  
Entpacken und den entpackten Ordner öffen.

## Konfiguration

Benenne die Datei `logininfo.json.example` in `logininfo.json` um.  
Öffne die Datei mit einem beliebigen Texteditor und trage deine Accountdetails deiner Bots ein.

**Die Logindaten werden _nur_ zum einloggen benutzt, um das/die gewünschte/n Profil/e zu kommentieren.**

Öffne die `index.js` mit einem beliebigen Texteditor. Oben in der Datei findest du zwei Listen, einmal `steamIDsToCommentOn` und `comments`.  
Fülle die Listen wie erklärt aus.

Der Bot ist nun bereit. Der Bot wird die Accounts von oben nach unten durcharbeiten und alle 5 Sekunden einen Kommentar verfassen.  
Dieser Delay sorgt dafür, dass deine Botaccounts nicht von Steam getimeouted werden, wegen zu vieler Kommentare. Sollten deine Accounts dennoch einen Cooldown bekommen, so wird dir eine Fehlermeldung angezeigt. Du kannst sie dann später nochmal versuchen zu benutzen.  
Alles was in der Console ausgegeben wird, wird in der output.txt hinterlegt.

## Bot starten

Zum starten mache einen Doppelklick auf die run.bat (Windows) oder öffne ein Terminal und navigiere zu dem Projektordner und gebe folgenden Befehl ein:  
`node index.js`

Solltest du für deine Botaccounts Steam Guard aktiviert haben, so wird der Bot dich auffordern den Code einzugeben.  
Der Bot sollte nun starten.

Sollte ein Fehler auftreten, so wird dieser in der output.txt hinterlegt.  

