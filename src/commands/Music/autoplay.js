const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    category: "Settings",
    description: "Toggle music autoplay",
    args: false,
    usage: "",
    userPrams: [],
    cooldown: 4,
    botPrams: ['EmbedLinks'],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
        const player = client.manager.players.get(message.guild.id);
        if (!player) {
            const embed = new EmbedBuilder()
            .setAuthor({
               name: message.author.username || "Unknown User",
               iconURL: message.author.displayAvatarURL( { dynamic : true }),
            })
            .setDescription(`No song/s currently playing within this guild.`)
            .setColor(client.sahilcolor);
            return message.channel.send({ embeds: [embed] });
        }
        const ap = player.data.get("autoplay");
    if (ap) {
      player.data.set("autoplay", false);
      const dis = new AttachmentBuilder(`https://iili.io/Ji2irmJ.png`)
      return message.channel.send({ files: [dis] });
    } else {
      player.data.set("autoplay", true);
      const ena = new AttachmentBuilder(`https://iili.io/Ji2s7YF.png`)
      return message.channel.send({ files: [ena] });
    }
  },
};