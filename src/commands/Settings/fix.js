const { AttachmentBuilder } = require("discord.js");
module.exports = {
    name: 'fix',
    category: 'Settings',
    aliases: ['fx', 'fixplayer'],
    cooldown: 5,
    description: '',
    args: false,
    usage: '',
    userPrams: ['ManageGuild'],
    botPrams: ['EmbedLinks', 'ManageGuild'],
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
        const regions = [
            "us-west",
            "us-east",
            "us-central",
            "us-south",
            "singapore",
            "southafrica",
            "sydney",
            "europe",
            "brazil",
            "hongkong",
            "russia",
            "japan",
            "india",
          ];
          const random = Math.floor(Math.random() * regions.length);
          if (!args[0]) {
            message.member.voice.channel
            .setRTCRegion(regions[random])
            return message.reply({ embeds: [new AttachmentBuilder(`https://iili.io/d2UvoWF.png`)]});
          }
    }
}