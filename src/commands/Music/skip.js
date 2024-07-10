const { AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'skip',
  aliases: ['s'],
  category: 'Music',
  description: 'To skip the current playing song.',
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
        if (player.shoukaku.paused) {
          const embed = new AttachmentBuilder(`https://iili.io/JpTSSBn.png`)
          return message.reply({ files: [embed] });
        }
        const title = player.queue.current.title.length > 20
          ? player.queue.current.title.slice(0, 20) + "....."
          : player.queue.current.title + ".....";
        if (!args[0]) {
          await player.skip();
          return message.reply({
            files: [
              new AttachmentBuilder(`https://iili.io/JpTg4b2.png`)
            ],
          });
        }

        if (isNaN(args[0]))
          return message.reply({ files: [new AttachmentBuilder(`https://iili.io/JpTsZ0P.png`)]});
        if (args[0] > player.queue.length)
          return message.reply({ files: [new AttachmentBuilder(`https://iili.io/JpTtDCv.png`)]});
        player.queue.remove(0, parseInt(args[0]));
        player.skip();
        return message.reply({
          files: [
            new AttachmentBuilder(`https://iili.io/JpTbJKQ.png`)
          ],
        });
      },
    };