const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db2 = require("../../models/autoreconnect");
const { autoplay } = require("../../utils/functions");
const { REST } = require("@discordjs/rest");
module.exports = {
  name: 'playerEmpty',
  run: async (client, player, message) => {
            
    if (player.data.get('message') && player.data.get('message').deletable) player.data.get('message').delete().catch(() => null);

    const voiceId = player.voiceId;
        const status = ` `;
        const rest = new REST({ version: '10' }).setToken(client.config.token);
            await rest.put(`/channels/${voiceId}/voice-status`, {
                body: {
                    status: status
                }
            });

    if (player.data.get("autoplay")) {
      player.previous = player.data.get("autoplaySystem");
      return autoplay(player);
    }
    let guild = client.guilds.cache.get(player.guildId);
    if (!guild) return;

    const TwoFourSeven = await db2.findOne({ where: { Guild: guild.id } })

    if (TwoFourSeven) {
      client.channels.cache.get(player.textId)?.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.sahilcolor)
            .setAuthor({
              name: "| Queue ended. 24/7 is Enable i am not leaving the voice channel.",
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            }),
        ], components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setLabel("Admin Perms")
              .setURL(
                `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=37088600&scope=bot%20applications.commands`
              ),
            new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Require Perms")
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=37080065&scope=bot`)
          ),
        ]
      }).then(msg => { setTimeout(() => { msg.delete() }, 10000) });
    } else if (!TwoFourSeven) {

      client.channels.cache.get(player.textId)?.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.sahilcolor)
            .setAuthor({
              name: "| Queue ended. 24/7 is Disable i am leaving the voice channel.",
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            }),
        ], components: [
          new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setLabel("Admin Perms")
              .setURL(
                `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=37088600&scope=bot%20applications.commands`
              ),
            new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Require Perms")
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=37080065&scope=bot`)
          ),
        ]
      }).then(msg => { setTimeout(() => { msg.delete() }, 10000) });
      await player.destroy()
    }

  },
};
