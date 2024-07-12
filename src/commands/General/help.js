const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, AttachmentBuilder } = require('discord.js');
module.exports = {
  name: 'help',
  category: 'Information',
  aliases: ['helpp', 'h'],
  cooldown: 5,
  description: 'Help with all commands, or one specific command.',
  args: false,
  botPrams: ['EmbedLinks'],
  owner: false,
  execute: async (message, args, client, prefix) => {
       const he = new AttachmentBuilder(`https://iili.io/J6WmwNe.png`);
       const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder('Select A Category From Menu!!')
        .addOptions([
            {
              label: 'Home',
              description: 'Return you to the home page of help menu.',
              value: 'homecat'
            },
            {
              label: 'Information',
              description: 'Get list of all information commands.',
              value: 'infocate'
            },
            {
              label: 'Music',
              description: 'Get list of all music commands.',
              value: 'musiccat'
            },
            {
              label: 'Filters',
              description: 'Get list of all filter commands.',
              value: 'filterscat'
            },
            {
              label: 'Favourite',
              description: 'Get list of all favourite commands.',
              value: 'playlistcat'
            },
            {
              label: 'Config',
              description: 'Get list of all config commands.',
              value: 'configcat'
            }
        ])
      )
      const msg = await message.reply({ content: `discord.gg/gaana`, files: [he], components: [row]})
        const collector = await msg.createMessageComponentCollector({
          filter :(interaction) => {
              if(message.author.id === interaction.user.id) return true;
              else{
                  interaction.reply({content : `That's not your session run **:(**` , ephemeral : true})
              }
          },
          time : 1000000,
          idle : 1000000/2
      });

      let _commands;
      _commands1 = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``);
      _commands2 = client.commands.filter((x) => x.category && x.category === "Filters").map((x) => `\`${x.name}\``);
      _commands3 = client.commands.filter((x) => x.category && x.category === "Favourite").map((x) => `\`${x.name}\``);
      _commands4 = client.commands.filter((x) => x.category && x.category === "Information").map((x) => `\`${x.name}\``);
      _commands5 = client.commands.filter((x) => x.category && x.category === "Settings").map((x) => `\`${x.name}\``);
  
        collector.on('collect',async(interaction) => {
          if(interaction.isSelectMenu())
            for(const value of interaction.values)
            {
            if (value === "homecat") {
              return interaction.update({ files: [he], components: [row]});
            }
            if (value === "infocate") {
              return interaction.reply({ content: `${_commands4.join(", ")}`, ephemeral: true});
            }
            if (value === "musiccat") {
              return interaction.reply({ content: `${_commands1.join(", ")}`, ephemeral: true});
            }
            if (value === "filterscat") {
              return interaction.reply({ content: `${_commands2.join(", ")}`, ephemeral: true});
            }
            if (value === "playlistcat") {
              return interaction.reply({ content: `${_commands3.join(", ")}`, ephemeral: true});
            }
            if (value === "configcat") {
              return interaction.reply({ content: `${_commands5.join(", ")}`, ephemeral: true});
            }
          }
          });
            collector.on('end',async() => {
            msg.edit({files: [he], components : []})
      })
  },
};
