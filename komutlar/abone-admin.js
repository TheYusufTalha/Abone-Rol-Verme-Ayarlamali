const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(' Bu komutu kullanabilmek için **Yönetici** olmalısın!')
  let rol = message.mentions.roles.first();
  if(!rol) {
     const embed = new Discord.MessageEmbed()
        .setColor(0x36393F)
        .setFooter(client.user.username, client.user.avatarURL())
        .setDescription(`Lütfen bir rol etiketleyiniz!`);
      message.channel.send(embed);
    return;
  }
  db.set(`aboneAD_${message.guild.id}`, rol.id)
  const embed = new Discord.MessageEmbed()
      .setColor(0x36393F)
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Abone yetkilisi rolu; ${rol} olarak ayarlandı!`);
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
  name: 'abone-admin',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'komutlar'
};
//izexlesh.js
