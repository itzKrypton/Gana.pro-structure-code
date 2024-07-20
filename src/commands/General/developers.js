const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
module.exports = {
  name: 'developers',
  category: 'Information',
  aliases: ['dev', 'developer'],
  cooldown: 5,
  description: '',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  owner: false,
  execute: async (message, args, client, prefix) => {

    let sahil = new AttachmentBuilder(`https://iili.io/dnYS3gV.jpg`);
    const sahil1 = new ActionRowBuilder().addComponents(
       new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`sahil`).setLabel(`アバヤンカラ`).setDisabled(true),
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`flexx`).setLabel(`Nitrix`),
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`devil`).setLabel(`Devil`),
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`roonee`).setLabel(`Roonee`)
    )
    const flexx1 = new ActionRowBuilder().addComponents(
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`sahil`).setLabel(`アバヤンカラ`),
       new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`flexx`).setLabel(`Nitrix`).setDisabled(true),
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`devil`).setLabel(`Devil`),
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`roonee`).setLabel(`Roonee`)
     )
     const devil1 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`sahil`).setLabel(`アバヤンカラ`),
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`flexx`).setLabel(`Nitrix`),
       new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`devil`).setLabel(`Devil`).setDisabled(true),
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`roonee`).setLabel(`Roonee`)
      ) 
    const roonee1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setStyle(ButtonStyle.Secondary ).setCustomId(`sahil`).setLabel(`アバヤンカラ`),
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`flexx`).setLabel(`Nitrix`),
       new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`devil`).setLabel(`Devil`),
       new ButtonBuilder().setStyle(ButtonStyle.Danger).setCustomId(`roonee`).setLabel(`Roonee`).setDisabled(true)
    )
    const msg = await message.channel.send({fles: [sahil], components: [sahil1]});
  }
}
