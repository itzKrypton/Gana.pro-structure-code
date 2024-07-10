const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: 'volume',
  aliases: ['vol'],
  category: 'Music',
  description: 'update player volume',
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
    try{
        const player = client.manager.players.get(message.guild.id);
        if(!player){
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.sahilcolor).setAuthor({ name: message.author.username || "Unknown User", iconURL: message.author.displayAvatarURL( { dynamic : true })})
            .setDescription(`No song/s currently playing within this guild.`)
            .setTimestamp()]})
        }
        let vol = Number(args[0])
        if(vol < 0 || vol > 200){
            return message.channel.send({embeds : [new AttachmentBuilder(`https://iili.io/dFTnR0Q.png`)]})
        }
        if(player.volume * 100 === vol){
            return message.channel.send({embeds : [new AttachmentBuilder(`https://iili.io/dFToC4R.png`)]});
        }
        await player.setVolume(vol / 1);
        return message.channel.send({embeds : [new AttachmentBuilder(`https://iili.io/dFTo1vS.png`)]})
        } catch(e) {
            console.log(e)
        }
    }
};