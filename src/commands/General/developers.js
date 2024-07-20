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

    let sahil2 = new AttachmentBuilder(`https://iili.io/dnYS3gV.jpg`);
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
    const msg = await message.channel.send({fles: [sahil2], components: [sahil1]});
    let flexx2 = new AttachmentBuilder(`https://iili.io/dna7fsf.jpg`);
    let devil2 = new AttachmentBuilder(`https://iili.io/dnaaIou.jpg`);
    let roonee2 = new AttachmentBuilder(`https://iili.io/dnacbIt.jpg`);
    const collector = await msg.createMessageComponentCollector({
                filter :(interaction) => {
                    if(message.author.id === interaction.user.id) return true;
                    else{
                        interaction.reply({content : `Only ${message.author.tag} can use this button!` , ephemeral : true})
                    }
                },
                time : 1000000,
                idle : 1000000/2
     });

    if(interaction.isButton())
                {
                    if(interaction.customId === `sahil`)
                    {
                        return interaction.update({files : [sahil2], components: [sahil1]});
                    }
                    if(interaction.customId === `flexx`)
                    {
                        return interaction.update({files : [flexx2], components: [flexx1]});
                    }
                    if(interaction.customId === `devil`)
                    {
                        return interaction.update({files : [devil2], components: [devil1]})
                    }
                    if(interaction.customId === `roonee`)
                    {
                        return interaction.update({files : [roonee2], components: [roonie1]})
                    }
                }
            });
            collector.on('end',async() => {
            msg.edit({files : [sahil2] , components : []})
        })
  }
}
