const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });


// Ci-Dessous les extentions de fichier blacklist ^^
const blacklist = ['exe', 'vbs', 'bat'];

// Petite initialisation du bot
bot.on("ready", () => {
    // Ici on envoie un message dans la console pour dire le nom enregistrer sur votre panel + on indique qu'il est en ligne UwU
    console.log(`${bot.user.username} est en ligne !`);
    // On affiche une activité pour le bot (joue à.....)
    bot.user.setActivity("by SaabniaTv | https://github.com/SaabniaTv/");
});



bot.on("message", (message) => {
    if (message.attachments.size > 0) {
        // Cette constante divise l'url avec chaque . et prend le dernier objet dans le tableau avec le .pop pour que les gens ne puissent pas tricher en nommant leurs fichiers thing.txt.exe. 
        const MIME = message.attachments.map(a => a.url.split('.').pop())
        const LowerCStringMIME = MIME.toString().toLowerCase();
        // Cette commande essaie de voir si l'extension de fichier est dans la blacklist <3
        if (blacklist.includes(LowerCStringMIME)) {


            // Ce paramètre essaie de voir si le membre obtien la permission "VIEW_AUDIT_LOG" et ignore s'il l'a obtenue <3 ^^
            if (message.member.hasPermission('VIEW_AUDIT_LOG')) return console.log(message.author + ' (' + message.author.username + ')' + ' sent a (probably) malicious file but has VIEW_AUDIT_LOG permission so it was ignored.')
            message.delete()
            // Ici le Bot renvoie un message dans le Chanel pour le "demander pourquoi ce fichier" est pour le lui dire que le fichier n'est pas accepté sur le serveur :)))))
            message.reply(' Qu est - ce que vous essayez de faire ? ' + LowerCStringMIME + 'file' + ' non accepte sur ce serveur !')
            // Le bot renvoie dans la console le pseudo discord de la personne + un message indiquant qu il a essayé d'envoyer un fichier ou l'extension et interdite sur le serveur
            console.log(message.author + ' (' + message.author.username + ')' + ' a essaye d envoyer un fichier probablement malveillant!')
        }
    }
});


bot.login(config.token);
