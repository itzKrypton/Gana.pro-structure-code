const { EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require('discord.js');
module.exports = {
  name: 'play',
  category: 'Music',
  aliases: ['p'],
  description: 'Plays songs from different platforms.',
  args: false,
  cooldown: 3,
  usage: '[song name or song link]',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  owner: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    if (
!message.guild.members.me.permissions.has(
  PermissionsBitField.resolve(["Speak", "Connect"])
      )
    )
    return message.reply({
      files: [
new AttachmentBuilder("https://iili.io/JpeTjfI.png" )
]
});

    const { channel } = message.member.voice;

    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(channel)
        .has(PermissionsBitField.resolve(["Speak", "Connect"]))
    )
    return message.reply({
      files: [
new AttachmentBuilder("https://iili.io/JpeATGV.png" )
]
});

   const query = args.join(' ');

    const player = await client.manager.createPlayer({
      guildId: message.guild.id,
      voiceId: message.member.voice.channel.id,
      textId: message.channel.id,
      shardId: message.guild.shardId,
      loadBalancer: true,
      deaf: true,
    });

    const result = await player.search(query, { requester: message.author });

    const nomatch = new AttachmentBuilder(`https://iili.io/dFINcw7.png`)

      if (!result.tracks.length) return message.reply({ files: [nomatch] });

    const queueNumber = player.queue.length;
    const tracks = result.tracks;
    const buffer = await client.canvas.buildqueue1(tracks, result);
   const attachment = new AttachmentBuilder(buffer, {
      name: 'Queue.png',
    });
    const qbuffer = await client.canvas.buildqueue2(tracks, result);
    const qattachment = new AttachmentBuilder(qbuffer, {
       name: 'Queue1.png',
     });
     if (result.type === 'PLAYLIST') for (let track of tracks) player.queue.add(track);
     else player.queue.add(tracks[0]);
  
     if (!player.playing && !player.paused) player.play();
      return message.reply( result.type === 'PLAYLIST' ? {
        files: [qattachment]
      } : {
        files: [attachment]
      },
      )
  },
};