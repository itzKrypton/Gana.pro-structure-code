const { Client, VoiceState, EmbedBuilder, AttachmentBuilder } = require("discord.js")
const { KazagumoPlayer } = require("kazagumo")
const reconnect = require("../../models/autoreconnect")
const delay = require("delay");
const { REST } = require("@discordjs/rest");

/** 
 *
 * @param {Client} client
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 * @param {KazagumoPlayer} player
 * @returns {Promise<void>}
 */

module.exports = {
    name: "voiceStateUpdate",
    run: async (client, oldState, newState) => {
  
      let guildId = newState.guild.id;
      const player = client.manager.players.get(guildId);
      const reconnectAuto = reconnect.findOne({ where: { Guild: newState.guild.id } });
      if (!player) return;
      if (reconnectAuto) return;
      if (!newState.guild.members.cache.get(client.user.id).voice.channelId) {
        if (reconnectAuto) return;
          const text = player?.textId;
          
          await player.destroy(player.guildId);
          let emb = new AttachmentBuilder(`https://iili.io/dFzrCej.png`)
              
          client.channels.cache.get(text).send({ files: [emb] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) });

      }
    }
}