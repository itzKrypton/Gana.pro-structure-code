const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { convertTime } = require("../../utils/convert");
const ms = require('ms');
module.exports = {
  name: 'rewind',
  aliases: ['rd', 'rw'],
  category: 'Music',
  description: 'Rewind the player to the provided timestamp.',
  args: false,
  usage: '<time>',
  userPrams: [],
  cooldown: 5,
  botPrams: ['EmbedLinks'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player.queue.current) {
      let thing = new EmbedBuilder().setColor(client.sahilcolor).setAuthor({ name: message.author.username || "Unknown User", iconURL: message.author.displayAvatarURL( { dynamic : true })})
      .setDescription(`No song/s currently playing within this guild.`)
      .setTimestamp()
      return message.reply({ embeds: [thing] });
    }
    if(!player.queue.current.isSeekable) {
        let thing = new AttachmentBuilder(`https://iili.io/JLdvLAv.png`)
        return message.reply({ files: [thing] });
    }
    const song = player.queue.current;
    const time = ms(`${args.slice(0).join(" ")}`);
        let position = 10000;
        if (time) position = parseInt(time) * 1000;
        let seekPosition = player.shoukaku.position - position;
          if (seekPosition <= 0) {
            let thing1 = new AttachmentBuilder(`https://iili.io/JLdS1BS.png`)
           return message.reply({ files: [thing1] });
          }
    player.shoukaku.seekTo(seekPosition);
    let thing2 = new AttachmentBuilder(`https://iili.io/JLd44KN.png`)
    return message.reply({ files: [thing2] });

  }
}