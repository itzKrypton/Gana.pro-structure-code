const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { convertTime } = require("../../utils/convert");
const ms = require('ms');

module.exports = {
  name: 'forward',
  category: 'Music',
  aliases: ["seek"],
  description: 'Forward/seeks the player to the provided timestamp.',
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
      let thing = new EmbedBuilder()
      .setColor(client.sahilcolor)
      .setAuthor({ name: message.author.username || "Unknown User", iconURL: message.author.displayAvatarURL( { dynamic : true })})
      .setDescription(`No song/s currently playing within this guild.`);
      return message.reply({ embeds: [thing] });
    }

    const time = ms(`${args.slice(0).join(" ")}`);
    const position = player.shoukaku.position;
    const duration = player.queue.current.length;

    const song = player.queue.current;
    const title = song.title.length > 20
          ? song.title.slice(0, 20) + "....."
          : song.title + ".....";

    if (time <= duration) {
      if (time > position) {
        await player.shoukaku.seekTo(time);
        const seek = new AttachmentBuilder(`https://iili.io/JiKS2sI.png`)
        return message.reply({ files: [seek] });
      } else {
        await player.shoukaku.seekTo(time);
        const sek = new AttachmentBuilder(`https://iili.io/JiKS2sI.png`)
        return message.reply({ files: [sek] });
      }
    } else {
      const thing = new AttachmentBuilder(`https://iili.io/JiKLEhu.png`)
      return message.reply({ files: [thing] });
    }
  },
};
