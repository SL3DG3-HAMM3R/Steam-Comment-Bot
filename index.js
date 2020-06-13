//Konfiguration:
//Füge hier die IDs der Accounts ein, welche kommentiert werden sollen: ["ID1","ID2","ID3"]
const steamIDsToCommentOn = [
	"ID1",
	"ID2",
	"ID3"
]

//Füge nur einen Kommentar ein, um nur ein Kommentar auf den Profilen zu hinterlassen.
//Füge verschiedene Kommentare ein ["Comment1","Comment2","Comment3"] damit zufällig ein Kommentar gewählt und hinterlassen wird.
const comments = ["Comment1","Comment2","Comment3"];
//End

const SteamUser = require('steam-user');
const SteamCommunity = require('steamcommunity');
const fs = require('fs')

const bot = new SteamUser();
const community = new SteamCommunity();

const logininfo = require('./logininfo.json');
const d = function d() { return new Date(); }
var randomstring = arr => arr[Math.floor(Math.random() * arr.length)];
function logger(string) {
	console.log(string)
	fs.appendFileSync("./output.txt", string + "\n", err => {
        if (err) console.log("error: " + err)
    });
}

const bootstart = d()
const version = "1.0"
const cooldown = 5000;
const steamIDsToCommentOnlength = steamIDsToCommentOn.length;

const logOnOptions = {
  accountName: logininfo.accountName,
  password: logininfo.password,
};

bot.logOn(logOnOptions);

//Startup
bot.on('loggedOn', () => {
	logger(' ')
	logger(' ')
	fs.appendFileSync('./output.txt', 'All IDs: [\n')
	steamIDsToCommentOn.forEach(function(element) {
		fs.appendFileSync('./output.txt', '"' + element + '",\n')
	});
	fs.appendFileSync('./output.txt', ']')
	logger(' ')
	logger('*---------------------*')
	logger('Bot ' + version + ' erfolgreich eingeloggt.');
	logger(d())
	logger('Consolenoutput wird in der output.txt hinterlegt!')
	const bootend = d() - bootstart
	logger('Ready after ' + bootend + 'ms!')
	logger('*---------------------*')
	logger(' ')
	logger('Warte ' + cooldown + 'ms zwischen jedem Kommentar.')
	logger('Starte in 5 Sekunden...')
	setTimeout(() => {
		logger(' ')

		//Commenting
		steamIDsToCommentOn.forEach((steamID, index) => {
			setTimeout(() => {
				var comment = randomstring(comments)
				logger('Commenting ' + comment + ' on ' + steamID + ' (' + (index + 1) + '/' + steamIDsToCommentOnlength + ')')

				community.postUserComment(steamID, comment, (error) => {
					if(error !== null) {
						logger("postUserComment error: " + error);
						if (error == "Error: HTTP error 429") {
							logger(" ")					
							logger("Accounts wurden übersprungen! Deine Accounts haben einen Cooldown. Versuche es später erneut.")
							logger('*---------------------*')
							logger("SteamID von fehlgeschlagenen Kommentaren: [\n")
							steamIDsToCommentOn.forEach(function(element) {
								logger('"' + element + '",\n');
							});
							logger("]")
							logger('*---------------------*')
							logger('Check output.txt! Schließe in 5 Sekunden...')
							setTimeout(() => {
								process.exit();
							}, 5000)	
						}
					} else {
						steamIDsToCommentOn.shift(); //Remove first entry of array if there were no errors
					}
				});

				if (index >= (steamIDsToCommentOnlength - 1)) {
					logger("Fertig!")
					if (steamIDsToCommentOn.length <= 1) {
						logger("Keine fehlgeschlagenen Kommentare!")
					} else {
						logger("Check output.txt!")
						logger("SteamID von fehlgeschlagenen Kommentaren: [\n")
						steamIDsToCommentOn.forEach(function(element) {
							logger('"' + element + '",\n');
						});	
						logger("]")
					}
					logger('Schließe in 5 Sekunden...')
					setTimeout(() => {
						process.exit();
					}, 5000)
				}
			}, cooldown*index);
		});
	}, 5000)
});

bot.on("webSession", (sessionID, cookies) => { 
	community.setCookies(cookies);
});
