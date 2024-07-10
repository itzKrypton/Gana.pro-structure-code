const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: 'shuffle',
  aliases: ['sh'],
  category: 'Music',
  description: 'Shuffles The queue!',
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
      let thing = new AttachmentBuilder(`https://iili.io/J6nzN6J.png`)
      return message.reply({ files: [thing] });
    }
    if (player.queue.length < 3) {
      return message.reply({
        files: [
          new AttachmentBuilder(`https://iili.io/JpTvVZF.png`)
        ],
      });
    }
    player.queue.shuffle();
    return message.reply({
      files: [
        new AttachmentBuilder(`https://iili.io/JpTvsa4.png`)
      ],
    });

  },
};
