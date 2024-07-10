const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
    name: "pause",
    category: "Music",
    description: "Pause the currently playing music",
    args: false,
    usage: "",
    userPrams: [],
    cooldown: 5,
    botPrams: ["EmbedLinks"],
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
        if (player.shoukaku.paused) {
            const th = new AttachmentBuilder(`https://iili.io/Jif5vNR.png`)
            return message.reply({ files: [th] });
        }
        await player.pause(true);
        const song = player.queue.current;
        const title = song.title.length > 20
          ? song.title.slice(0, 20) + "....."
          : song.title + ".....";

        const thing = new AttachmentBuilder(`https://iili.io/Jif7qxV.png`)
        return message.reply({ files: [thing] });
    },
};