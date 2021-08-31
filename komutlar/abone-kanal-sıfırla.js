const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(' Bu komutu kullanabilmek için **Yönetici** olmalısın!')
 
  db.delete(`aboneKA_${message.guild.id}`)
  const embed = new Discord.MessageEmbed()
      .setColor(0x36393F)
      .setFooter(client.user.username, client.user.avatarURL())
      .setDescription(`Abone kanalı sıfırlandı!`);
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
  name: 'abone-kanal-sıfırla',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'komutlar'
};
//izexlesh.js
