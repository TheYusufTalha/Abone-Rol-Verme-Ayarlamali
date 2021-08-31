const Discord = require('discord.js');
const disbut = require('discord-buttons');
const client = new Discord.Client();
require('discord-buttons')(client);
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

client.setMaxListeners(30)


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var sesese = "2";

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});





client.on("message",message=>{
  let AboneADMIN = db.fetch(`aboneAD_${message.guild.id}`)
  let AboneKANAL = db.fetch(`aboneKA_${message.guild.id}`)
  let AboneLOG = db.fetch(`aboneLO_${message.guild.id}`)
  let AboneROL = db.fetch(`aboneRO_${message.guild.id}`)
  
if(AboneKANAL) {
    if(message.channel.id==AboneKANAL){ // ABONE SS KANAL İDSİ
    if(message.attachments.size < 1) return false;
    if(message.member.roles.cache.get(AboneADMIN)) return false; // Abone Sorumlusu İDSİ
    let kod = "`"
        message.react("880199583286853634"); // Tik Emojiniz
        message.react("880199649405829120"); // Carpi Emojiniz
        const filter = (reaction, user) => {

        return message.guild.members.cache.get(user.id).roles.cache.has(AboneADMIN)&&!user.bot; // Abone Sorumlusu İDSİ
            };
              const collector = message.createReactionCollector(filter, {});
collector.on('collect', async (reaction, user) => {

        if(reaction.emoji.name=="tik"){
        message.guild.member(message.author.id).roles.add(AboneROL) // Abone Rol İDSİ
                message.reactions.removeAll()
                client.channels.cache.get(AboneKANAL).send(`${message.author}, **İsimli Üyeye ${kod}${user.tag}${kod} Tarafından ${kod}ABONE${kod} Rolü Verildi! <#içeriklerin oldu kanal id>**`); //ABONE
                                          // abone ss kanal idsi
            } else if(reaction.emoji.name=="carpi"){            
        message.guild.member(message.author.id).roles.remove(AboneROL) // Abone Rol İDSİ
        message.reactions.removeAll()
                client.channels.cache.get(AboneKANAL).send(`${message.author}, **Lütfen Ekran Görüntünüzü Kontrol Ediniz <#KANAL İD> Kanalını Okuyunuz! | ${kod}${user.tag}${kod}**`); // TAKİPÇİ
                                           // abone ss kanal idsi
            }
    });
};
}

if(!AboneKANAL) return
});

client.login(process.env.TOKEN);
