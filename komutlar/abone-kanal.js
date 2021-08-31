const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(' Bu komutu kullanabilmek için **Yönetici** olmalısın!')
  let kanal = message.mentions.channels.first();
  if(!kanal) {
     const embed = new Discord.MessageEmbed()
        .setColor(0x36393F)
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Lütfen bir kanal etiketleyiniz!`);
      message.channel.send(embed);
    return;
  }
  db.set(`aboneKA_${message.guild.id}`, kanal.id)
  const embed = new Discord.MessageEmbed()
      .setColor(0x36393F)
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Abone kanalı; ${kanal} olarak ayarlandı!`);
    message.channel.send(embed);
    return;
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'abone-kanal',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'komutlar'
};
//izexlesh.js
