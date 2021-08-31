const Discord = require("discord.js");
const db = require("quick.db")
module.exports.run = async (client, message, args) => {
   try {
        await message.channel.send(new Discord.MessageEmbed().setDescription(`Komutlar:\n\n${client.commands.map(props => `\`${props.help.name}\``).join("\n")}`));
    } catch (e) {
        throw e;
    }
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'yardım',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'komutlar'
};
//izexlesh.js
