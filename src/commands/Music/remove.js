const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'remove',
  category: 'Music',
  aliases: ["rm"],
  description: 'Remove song from the queue',
  args: false,
  usage: '<Number of song in queue>',
  userPrams: [],
  cooldown: 3,
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
      .setTimestamp();
      return message.reply({ embeds: [thing] });
    }
    if (!args[0] || isNaN(args[0])) {
        return message.reply({
            files: [
              new AttachmentBuilder(`https://iili.io/JLHSq7f.png`)
            ]
          }); 
    }

    const position = Number(args[0]) - 1;
    if (position > player.queue.length) {
      const number = position + 1;
      const img = new AttachmentBuilder(`https://iili.io/JLdEv1V.png`)
      return message.reply({ files: [img] });
    }
    const song = player.queue[position];
    const title = song.title.length > 20
          ? song.title.slice(0, 20) + "....."
          : song.title + ".....";
    await player.queue.splice(position, 1);
    const thing = new AttachmentBuilder(`https://iili.io/JLdM8R1.png`)
    return message.reply({ files: [thing] });
  },
};