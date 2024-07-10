const { AttachmentBuilder } = require('discord.js');

module.exports = {
    name: 'addprevious',
    category: 'Music',
    aliases: ["back", "previous", "prev"],
    description: 'adds the previous song to the queue',
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
      const no = new AttachmentBuilder(`https://iili.io/JidP0du.png`)
    if (!player.queue.previous) return message.reply({
      files: [no]
    }).catch(() => { });

    player.queue.add(player.queue.previous);
    if (player && !player.playing && !player.paused && !player.queue.length) await player.play();
    const track = player.queue.previous;
    const buffer = await client.canvas.prev(track);
    const attachment = new AttachmentBuilder(buffer, {
      name: 'Queue.png',
    });
    return message.reply({ files: [attachment] }).catch(() => { });
}
}