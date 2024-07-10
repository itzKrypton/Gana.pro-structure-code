const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
  name: 'removedupes',
  category: 'Music',
  description: '',
  aliases: ["removedp","removeduplicate","remdupe"],
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
      let thing = new EmbedBuilder().setColor(client.sahilcolor).setAuthor({ name: message.author.username || "Unknown User", iconURL: message.author.displayAvatarURL( { dynamic : true })})
      .setDescription(`No song/s currently playing within this guild.`)
      .setTimestamp()
      return message.reply({ embeds: [thing] });
    }
    let tracks = player.queue;
       const newtracks = [];
       for (let i = 0; i < tracks.length; i++) {
         let exists = false; 
         for (j = 0; j < newtracks.length; j++) {
           if (tracks[i].uri === newtracks[j].uri) {
             exists = true;
             break;
           }
         }
         if (!exists) {
           newtracks.push(tracks[i]);
         }
       }
       player.queue.clear();
       for (const track of newtracks)
         player.queue.add(track);
         const thing = new AttachmentBuilder(`https://iili.io/JLdVihu.png`)
       return message.reply({ files: [thing] });
  }
}