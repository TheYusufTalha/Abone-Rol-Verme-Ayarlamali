const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  
  db.delete(`aboneLO_${message.guild.id}`)
  const embed = new Discord.MessageEmbed()
      .setColor(0x36393F)
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Abone log kanalı sıfırlandı!`);
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
  name: 'abone-log-kanal-sıfırla',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'komutlar'
};
//izexlesh.js
