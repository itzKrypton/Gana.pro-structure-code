const { EmbedBuilder, PermissionFlagsBits, AttachmentBuilder } = require("discord.js");

module.exports = {
  name: 'connect',
  aliases: ["join", "conn"],
  category: 'Music',
  description: '',
  args: false,
  usage: '',
  cooldown: 5,
  userPrams: [],
  botPrams: ['Connect', 'EmbedLinks'],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const { channel } = message.member.voice;
    const player = client.manager.players.get(message.guild.id);
    if (player) {
      return await message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.sahilcolor)
            .setAuthor({ name: message.author.username || "Unknown User", iconURL: message.author.displayAvatarURL( { dynamic : true })})
            .setDescription(`I'm already connected to ${
              player?.voiceChannel
                ? `<#${player.voiceChannel}>`
                : `Unknown Channel`
            }..!!`)
            .setTimestamp(),
        ],
      });
    } else {
      if (!message.guild.members.me
        .permissionsIn(channel)
        .has([PermissionFlagsBits.Connect, PermissionFlagsBits.Speak]))
        return message.channel.send({
          files: [new AttachmentBuilder(`https://iili.io/JiFgQCN.png`)]
        });

      await client.manager.createPlayer({
        guildId: message.guild.id,
        voiceId: message.member.voice.channel.id,
        textId: message.channel.id,
        shardId: message.guild.shardId,
        loadBalancer: true,
        deaf: true,
      });

      const attachment = new AttachmentBuilder(`https://iili.io/JiF45x4.png`)
      return message.reply({ files: [attachment] });
    }
  }
}