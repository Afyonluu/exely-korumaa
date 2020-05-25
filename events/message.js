const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let talkedRecently = new Set();
module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(" ")[0].slice(ayarlar.prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (cmd.conf.enabled === false) {
      if (
        !ayarlar.sahip.includes(message.author.id) &&
        !ayarlar.sahip.includes(message.author.id)
      ) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `:x: **${cmd.help.name}** isimli komut şuanda geçici olarak kullanıma kapalıdır!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }

    if (cmd.conf.permLevel === 1) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 2) {
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 3) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 4) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 5) {
      if (!ayarlar.sahip.includes(message.author.id)) {
        const embed = new Discord.RichEmbed()
          .setDescription(`Bu komutu sadece **sahibim** kullanabilir!`)
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};



/*/
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const Discord = require("discord.js");
module.exports = async message => {
  let onlycode = db.fetch(`onlycode.botbakim`);
  let client = message.client;
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (onlycode)
      return message.channel.send(
        `**<a:bakm:706502971537752134> Bakımdayız. \n<a:685083475509772337:699974316326125628> Size Daha İyi Hizmet Vermek İçin Çalışıyoruz. \n<a:692838217396912193:706506191093628940>Yakında Daha Gelişmiş Komutlarla Karşınızdayız**`
      );
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};
/*/
// Yukarıyı Silince Bakım Oluyo Ekleyince Bakımdan Çıkı 
// TAMAM ANLADIM REİS EYW SAĞOL BURASI KALSIN BEN BURDAN BAKIM NASIL YAPACAĞIMA ANLARIM
//Hellloooooo