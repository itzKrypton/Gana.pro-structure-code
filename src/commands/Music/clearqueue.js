const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: 'clearqueue',
  aliases: ['clearq', 'cq'],
  category: 'Music',
  description: 'Clear Music Queue',
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

    if (!player.queue) {
      let thing = new EmbedBuilder()
        .setColor(client.sahilcolor)
        .setAuthor({
          name: message.author.username || "Unknown User",
          iconURL: message.author.displayAvatarURL( { dynamic : true }),
        })
        .setDescription(`No song/s currently playing within this guild.`)
      return message.reply({ embeds: [thing] });
    }

    if (!player.queue[0]) {
        const no = new AttachmentBuilder(`https://iili.io/Ji2Q3J9.png`)
      return message.reply({ files: [no] });
    }
    await player.queue.clear();
    const att = new AttachmentBuilder(`https://iili.io/Ji3Us6X.png`)
    return message.reply({ files: [att] })
  }
}