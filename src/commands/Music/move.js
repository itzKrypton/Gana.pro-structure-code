const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'move',
  category: 'Music',
  aliases: ["skipto", "jump"],
  description: 'To move a track to new position in the queue.',
  args: false,
  usage: '<track>',
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
               return message.reply({ embeds: [thing] });
            }

    const position = Number(args[0]);
    if (!position || position > player.queue.length || position < 0) {
        return message.reply({
         files: [new AttachmentBuilder(`https://iili.io/JifAsqX.png`)]
       });
    }

    if (args[0] == 1) player.skip();

    player.queue.splice(0, position - 1);
    await player.skip();

    return message.reply({
        files: [new AttachmentBuilder(`https://iili.io/JifuacJ.png`)]
    });
  }
}