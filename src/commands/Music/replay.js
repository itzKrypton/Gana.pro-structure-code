const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
module.exports = {
  name: 'replay',
  aliases: ['rplay'],
  category: 'Music',
  description: '',
  args: false,
  usage: '',
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
    const title = player.queue.current.title > 30
          ? player.queue.current.title.slice(0, 30) + "....."
          : player.queue.current.title + ".....";
    if (!player.queue.current.isSeekable) {
        const thing1 = new AttachmentBuilder(`https://iili.io/JLdWmPf.png`);
        return message.reply({ files: [thing1] });
    }
    player.shoukaku.seekTo(0);
    let thing = new AttachmentBuilder(`https://iili.io/JLdXLUQ.png`)
    return message.reply({ files: [thing] });
  },
};