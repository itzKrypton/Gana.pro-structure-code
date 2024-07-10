const { AttachmentBuilder } = require('discord.js');
const db = require("../../models/autoreconnect");

module.exports = {
    name: '247',
    category: 'Music',
    aliases: ["alwayson"],
    description: 'Joins the voice channel for 24/7.',
    args: false,
    usage: '',
    userPrams: ['ManageChannels'],
    cooldown: 5,
    botPrams: ['EmbedLinks'],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const player = client.manager.players.get(message.guild.id);

        let data = await db.findOne({ where: { Guild: message.guild.id } });
        if (data) {
            await data.destroy();
            const att = new AttachmentBuilder(`https://iili.io/JPG4hgI.png`)
        return message.reply({
          files: [att]
        })
        } else {
            data = await db.create({ // Added await here
                Guild: player.guildId,
                TextId: player.textId,
                VoiceId: player.voiceId
            });
            const att1 = new AttachmentBuilder(`https://iili.io/JidPTb4.png`)
        return message.reply({
          files: [att1]
        })
        }
    }
}