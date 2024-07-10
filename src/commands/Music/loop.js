const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'loop',
  category: 'Music',
  aliases: ['repeat'],
  description: 'Toggle music loop..!!',
  args: false,
  usage: 'loop <track|queue|off>',
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
      let thing = new EmbedBuilder()
      .setColor(client.sahilcolor)
      .setAuthor({ name: message.author.username || "Unknown User", iconURL: message.author.displayAvatarURL( { dynamic : true })})
      .setDescription(`No song/s currently playing within this guild.`)
      return message.reply({ embeds: [thing] });
    }

    if (['q', 'queue', 'all'].includes(args[0])) {
        await player.setLoop('queue');
        return message.reply({
            files: [new AttachmentBuilder(`https://iili.io/Jif3g29.png`)]
        });
      } else if (['track', 't', 'song', 'current'].includes(args[0])) {
        await player.setLoop('track');
        return message.reply({
            files: [new AttachmentBuilder(`https://iili.io/JifKsfV.png`)]
        });

      } else if (['off', 'c', 'clear', 'reset'].includes(args[0])) {
        await player.setLoop('none');
        return message.reply({
            files: [new AttachmentBuilder(`https://iili.io/JifKmba.png`)]
        });
      }
  }
}