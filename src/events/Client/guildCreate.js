const { ChannelType, EmbedBuilder, WebhookClient, ButtonBuilder, ButtonStyle, ActionRowBuilder, AttachmentBuilder } = require('discord.js');
const web = new WebhookClient({url : `https://discord.com/api/webhooks/1182639603010785300/_gBLoQEs0l3ME0qTAtIUoB3y1X71Ij5NyjeAPeRECuCPrBqjuxzGKCutwdMA_ImpFeOD`});
const moment = require('moment');

module.exports = {
  name: "guildCreate",
  run: async (client, guild) => {

    const channel = client.channels.cache.get(client.config.logs);
    //let own = await guild?.fetchOwner();
    let text;
    guild.channels.cache.forEach(c => {
      if (c.type === ChannelType.GuildText && !text) text = c;
    });
    const invite = await text.createInvite({ reason: `For ${client.user.tag} Developer(s)`, maxAge: 0 });

    let prefix = client.prefix;
  let links = `https://cdn.discordapp.com/banners/`+guild.id+`/`+guild.banner+`.`+`webp?size=1024`;
 if(guild.partnered && guild.verified)
 emoji = `<:partnered:918906133563998230><:verified3:918906111359340594>`;
 else if(guild.partnered && !guild.verified)
 emoji = "<:partnered:918906133563998230>";
 else if(!guild.partnered && guild.verified)
 emoji = "<:verified3:918906111359340594>";
 else if(!guild.partnered && !guild.verified)
 emoji = "<:cross1:853965073383292970>";
    const joinembed = new EmbedBuilder()
    .setColor(client.sahilcolor)
    .setAuthor({ name: `Joined a new server!`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Name: **${guild.name}**\nId: **${guild.id}**\nDiscord Level: ${emoji}\nMemberCount: **${guild.memberCount}**\nGuild Joined: **<t:${Math.round(guild.joinedTimestamp / 1000)}:R>**`)
      .addFields([
        { name: '**Owner**', value: `Info: **${(await guild.members.fetch(guild.ownerId))
          ? guild.members.cache.get(guild.ownerId).user.tag
          : "Unknown User"}**\nGuild Created: **<t:${Math.round(guild.createdTimestamp / 1000)}:R>**` },
        { name: 'Invite link', value: `[Here is ${guild.name} invite ](https://discord.gg/${invite})`},
        { name: `${client.user.username}'s Server Count`, value: `${client.guilds.cache.size} Servers`},
      ])
      if(guild.vanityURLCode)
    {
      let temp = `https://discord.gg/`+guild.vanityURLCode;
      joinembed.setURL(temp)
    }
    if(guild.banner)
    joinembed.setImage(links)
  web.send({ embeds: [joinembed]})

  const sahil = new AttachmentBuilder(`https://iili.io/dFzP6YX.png`)
   const sahu = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=414530792776&scope=bot%20applications.commands`).setLabel(`Invite`),
    new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`https://gaana.pro`).setLabel(`Website`),
   )
  const serverChannel = guild.channels.cache.find(
    (channel) =>
      channel.name.includes("logs") ||
      channel.name.includes("log") ||
      channel.name.includes("setup") ||
      channel.name.includes("bot") ||
      channel.name.includes("bot-logs") ||
      channel.name.includes("music") ||
      channel.name.includes("music-logs") ||
      channel.name.includes("music-req") ||
      channel.name.includes("chat") ||
      channel.name.includes("general") ||
      channel.name.includes("welcome") ||
      channel.name.includes("gen") ||
      channel.name.includes("rank") ||
      channel.name.includes("media") ||
      channel.name.includes("pic") ||
      channel.name.includes("meme")
  );
  if (!serverChannel) return;
  serverChannel.send({ files: [sahil], components: [sahu] });
  }
};
