const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'resume',
  aliases: ['r'],
  category: 'Music',
  description: 'Resume currently playing music',
  args: false,
  usage: '<Number of song in queue>',
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

    const song = player.queue.current;
    const title = song.title.length > 20
          ? song.title.slice(0, 20) + "....."
          : song.title + ".....";
    if (!player.shoukaku.paused) {
      const alre = new AttachmentBuilder(`https://iili.io/JLdjBYQ.png`)
      return message.reply({ files: [alre] });
    }
    await player.pause(false);
    const thing = new AttachmentBuilder(`https://iili.io/JLdODo7.png`)
    return message.reply({ files: [thing] });
  },
};