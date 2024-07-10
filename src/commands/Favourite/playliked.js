const { EmbedBuilder } = require('discord.js');
const FavPlay = require('../../models/playlist');

module.exports = {
  name: 'playliked',
  category: 'Favourite',
  description: 'Get information about your saved playlist.',
  args: false,
  cooldown: 5,
  usage: '<playlist name>',
  userParams: [],
  botParams: ['EmbedLinks'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client) => {
    const Name = "Fav";
    const data = await Playlist.findOne({ where: { UserId: message.author.id, PlaylistName: Name } });

    let name = Name;

    if (!args[0]) {
      return message.reply({
        files: [
          new AttachmentBuilder(`https://iili.io/d2SZ9HX.png`)
        ],
      });
    }

    if (!data) {
      return message.reply({
        files: [
          new AttachmentBuilder(`https://iili.io/Jpwe2zQ.png`)
        ],
      });
    }
    const player = await client.manager.createPlayer({
      guildId: message.guild.id,
      voiceId: message.member.voice.channel.id,
      textId: message.channel.id,
      deaf: true,
    });
    if (!player) return;

    let count = 0;
    const m = await message.reply({
      files: [
        new AttachmentBuilder(`https://iili.io/d2UGTl9.png`)
      ],
    });

    for (const track of data.playlist) {
      let s = await player.search(track.uri ? track.uri : track.title, { requester: message.author });
      if (s.type === "TRACK") {
        if (player) player.queue.add(s.tracks[0]);
        if (player && !player.playing && !player.paused) await player.play();
        ++count;
      } else if (s.type === 'SEARCH') {
        await player.queue.add(s.tracks[0]);
        if (player && !player.playing && !player.paused) await player.play();
        ++count;
      } else if (s.type === 'PLAYLIST') {
        await player.queue.add(s.tracks[0]);
        if (player && !player.playing && !player.paused) await player.play();
        ++count;
      };
    }
    if (player && !player.queue.current) player.destroy(message.guild.id);
    if (count <= 0 && m)
      return await m.edit({
        files: [
          new AttachmentBuilder(`https://iili.io/d2UGSUX.png`)
        ],
      });
    if (m)
      return await m.edit({
        files: [
          new AttachmentBuilder(`https://iili.io/d2UGTl9.png`)
        ],
      });
  }
}