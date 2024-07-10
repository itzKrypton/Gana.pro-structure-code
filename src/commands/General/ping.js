const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
module.exports = {
  name: 'ping',
  category: 'Information',
  aliases: ['latency'],
  cooldown: 5,
  description: '',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    let api_ping = client.ws.ping;
    message.reply({ content: `${api_ping}ms Ping!`})
    }
}