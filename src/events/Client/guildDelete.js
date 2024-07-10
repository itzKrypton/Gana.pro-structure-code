const { EmbedBuilder, ChannelType, WebhookClient } = require('discord.js');
const moment = require('moment');
const web = new WebhookClient({url : `https://discord.com/api/webhooks/1182946282126463069/t9nWY_NAlXCcXwnTaFV3Bw0CUe27IBPHl-RBN3T0RPO-Hpp1tKikYz59FWygignvPRZY`});

module.exports = {
  name: "guildDelete",
  run: async (client, guild) => {
 let links = `https://cdn.discordapp.com/banners/`+guild.id+`/`+guild.banner+`.`+`webp?size=1024`;
 if(guild.partnered && guild.verified)
 emoji = `<:partnered:918906133563998230><:verified3:918906111359340594>`;
 else if(guild.partnered && !guild.verified)
 emoji = "<:partnered:918906133563998230>";
 else if(!guild.partnered && guild.verified)
 emoji = "<:verified3:918906111359340594>";
 else if(!guild.partnered && !guild.verified)
 emoji = "<:cross1:853965073383292970>";

    const sahil = new EmbedBuilder()
    .setColor(client.sahilcolor)
    .setAuthor({ name: `Server left..!`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Name: **${guild.name}**\nId: **${guild.id}**\nDiscord Level: ${emoji}\nMemberCount: **${guild.memberCount}**\nGuild Joined: **<t:${Math.round(guild.joinedTimestamp / 1000)}:R>**`)
      .addFields([
        { name: `${client.user.username}'s Server Count`, value: `${client.guilds.cache.size} Servers`},
      ])
    if(guild.banner)
    sahil.setImage(links)
  web.send({ embeds: [sahil]})
  }
};