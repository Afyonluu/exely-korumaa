const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async(client, message, args ) => {
  
let k = message.mentions.channels.first()

if (!k) return message.channel.send(`Kanal Belirt!`)
  
  
  
  db.set(`rollog_${message.guild.id}`, k.id)
  
  const sa = new Discord.MessageEmbed()
  .setDescription(`Rol Log **${k}** Olarak Ayarlandı`)
  return message.channel.send(sa)
};
exports.conf = {
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'rol-log'
}; 