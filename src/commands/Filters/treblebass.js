const { EmbedBuilder, AttachmentBuilder } = require("discord.js")
module.exports = {
  name: 'treblebass',
  category: 'Filters',
  cooldown: 5,
  description: '',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player) {
      const embed = new EmbedBuilder().setColor(client.sahilcolor).setAuthor({
        name: message.author.username || "Unknown User",
        iconURL: message.author.displayAvatarURL( { dynamic : true }),
     })
     .setDescription(`No song/s currently playing within this guild.`)
     .setTimestamp()
      .setColor(client.sahilcolor);
      return message.channel.send({ embeds: [embed] });
    }
    const embed = new EmbedBuilder()
    .setColor(client.sahilcolor)
    if (player.treblebass) {
        player.setTreblebass(false);
        const att1 = new AttachmentBuilder(`https://iili.io/J6eKchb.png`)
        return message.reply({
          files: [att1]
      })
    } else {
        player.setTreblebass(true);
        const att = new AttachmentBuilder(`https://iili.io/J6eKoQf.png`)
        return message.reply({
          files: [att]
      })
    }
  }
}