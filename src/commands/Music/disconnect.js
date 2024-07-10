const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Wait = require('util').promisify(setTimeout);

module.exports = {
  name: 'disconnect',
  category: 'Music',
  aliases: ["dc", "leave"],
  description: 'Stops the music',
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
      let thing = new EmbedBuilder()
      .setColor(client.sahilcolor)
      .setAuthor({ name: message.author.username || "Unknown User", iconURL: message.author.displayAvatarURL( { dynamic : true })})
      .setDescription(`No song/s currently playing within this guild.`)
      return message.reply({ embeds: [thing] });
    }
    player.queue.clear();
    player.data.delete("autoplay")
    player.loop = 'none';
    player.playing = false;
    player.paused = false;
    await player.skip();
    Wait(500);
    const song = player.queue.current;
    const title = song.title.length > 20
    ? song.title.slice(0, 20) + "....."
    : song.title + ".....";

    const attachment = new AttachmentBuilder(`https://iili.io/JiF6lQR.png`)
    message.reply({ files: [attachment]});
    }
  }