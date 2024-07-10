const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const NoPrefix = require('../../models/noprefix');
const NoPrefixAccess = [
  "1193982492676464892",
  "921602447754031175"
]

function createEmbed(client, ID, added, allGuilds) {
      const description = added
        ? `${added} no prefix to <@${ID}> for ${allGuilds ? 'all guilds' : 'this guild'}`
        : `Already ${added ? 'added' : 'removed'} no prefix to <@${ID}> for ${allGuilds ? 'all guilds' : 'this guild'}`;
    
      return new EmbedBuilder()
        .setColor("#2f3136")
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true})})
        .setTimestamp()
        .setDescription(description);
}
function getUser(message, args) {
  const user = message.guild.members.cache.get(args[1]) || message.mentions.members.first() || message.author;
  const ID = user.id;
  return { user, ID };
}

async function addUserToNoPrefixList(client, ID) {
  const existingUser = await NoPrefix.findOne({ where: { userId: ID } });
  if (existingUser) {
    return 'already_added';
  } else {
    await NoPrefix.create({ userId: ID });
    return createEmbed(client, ID, true, true);
  }
}


async function removeUserFromNoPrefixList(client, ID) {
  const existingUser = await NoPrefix.findOne({ where: { userId: ID } });
  if (!existingUser) {
    return 'not_found';
  } else {
    await NoPrefix.destroy({ where: { userId: ID } });
    return createEmbed(client, ID, false, true);
  }
}

async function getNoPrefixList(client) {
  const data = await NoPrefix.findAll();
  return data.map(entry => entry.userId);
}

module.exports = {
    name: 'noprefix',
    category: 'Owner',
    cooldown: 5,
    description: '',
    args: false,
    usage: '',
    userPerms: [],
    botPerms: ['EmbedLinks'],
    owner: false,
    execute: async (message, args, client, prefix) => {
      const subcommand = args[0];
        const { user, ID } = getUser(message, args);

        const guide = new EmbedBuilder()
        .setColor(client.sahilcolor)
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true})})
        .setDescription(`**noprefix add <user> all**\nAdd a user to noprefix users for all servers.\n**noprefix remove <user> all**\nRemove a user from noprefix users from all servers.\n**noprefix show**\nShows all the users in noprefix database.\n**noprefix reset**\nRemoves all the users from noprefix users from the database.`)
        .setTimestamp()
        .setThumbnail(message.author.displayAvatarURL({dynamic: true, size: 2048 }))
        const pag = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId("first")
            .setLabel("<<")
            .setDisabled(true),
            new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setCustomId("previous")
            .setLabel("Previous")
            .setDisabled(true),
            new ButtonBuilder()
            .setStyle(ButtonStyle.Danger)
            .setCustomId("close")
            .setLabel("Close"),
            new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setCustomId("next")
            .setLabel("Next"),
            new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId("last")
            .setLabel(">>")
            .setDisabled(false)
        );

        if (!NoPrefixAccess.includes(message.author.id)) {
          return;
        }
      
        if (NoPrefixAccess.includes(message.author.id)) {
          if (!subcommand) {
            return message.channel.send({ embeds: [guide] });
          }
      switch (subcommand) {
          case 'add': {
                if (!args[1]) {
                  return message.channel.send(`Provide a Member`);
                }
  
                const result = await addUserToNoPrefixList(client, ID);
                const userObject = await client.users.fetch(ID);
                if (result === 'already_added') {
                  return message.channel.send(`Already added no prefix to \`${userObject.username}\` for all guilds`);
                } else {
                  return message.channel.send(`Added no prefix to \`${userObject.username}\` for all guilds`);
                }
          }
          break;
          case 'remove': {
                  if (!args[1]) {
                    return message.channel.send("Mention someone first.");
                  }
    
                  const result = await removeUserFromNoPrefixList(client, ID);
                  const userObject = await client.users.fetch(ID);
                  if (result === 'not_found') {
                    return message.channel.send(`Yet not having no prefix to \`${userObject.username}\` for all guilds`);
                  } else {
                    return message.channel.send(`Removed no prefix from \`${userObject.username}\` for all guilds`);
                  }
            }
            break;
            case 'show': {
              const listData = await getNoPrefixList(client);
            
              if (!listData || listData.length === 0) {
                return message.channel.send("Nothing to Show");
              }
            
              const totalPages = Math.ceil(listData.length / 10);
            
              const generateEmbed = async (currentPage) => {
                const startIndex = currentPage * 10;
                const endIndex = Math.min(startIndex + 10, listData.length);
                const currentMembers = listData.slice(startIndex, endIndex);
            
                const fetchUserPromises = currentMembers.map(async (userId, index) => {
                  try {
                    const user = await client.users.fetch(userId);
                    if (!user) return `\`[${startIndex + index + 1}]\` | ID: [${userId}](https://discord.com/users/${userId}) | User not found`;
                    return `\`[${startIndex + index + 1}]\` | ID: [${userId}](https://discord.com/users/${userId}) | [${user.username}](https://discord.com/users/${userId})`;
                  } catch (error) {
                    console.error(`Error fetching user ${userId}: ${error.message}`);
                    return '';
                  }
                });
            
                const memberList = (await Promise.all(fetchUserPromises)).join("\n");
            
                return memberList;
              };
              let currentPage = 0;
        const memberList = await generateEmbed(currentPage);
      
        const mem = message.guild.members.cache.get(message.author.id);
      
        const embed = new EmbedBuilder()
          .setColor(client.sahilcolor)
          .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true})})
          .setTitle(`Total No Prefix Users - Page ${currentPage + 1}/${totalPages}`)
          .setDescription(memberList)    

        if (totalPages === 1) {
          pag.components.forEach((button) => {
            button.setDisabled(true);
          });
        }

        const messageComponent = await message.channel.send({ embeds: [embed], components: [pag] });
      
        const collector = messageComponent.createMessageComponentCollector({
          filter: (interaction) => interaction.user.id === message.author.id,
          time: 200000,
          idle: 300000 / 2,
        });

        collector.on("collect", async (interaction) => {
          if (interaction.isButton()) {
            if (interaction.customId === "next") {
              if (currentPage < totalPages - 1) {
                currentPage++;
              }
            } else if (interaction.customId === "previous") {
              if (currentPage > 0) {
                currentPage--;
              }
            } else if (interaction.customId === "first") {
              currentPage = 0;
            } else if (interaction.customId === "last") {
              currentPage = totalPages - 1;
            } else if (interaction.customId === "close") {
              messageComponent.delete().catch((error) => {
                console.error("Failed to delete message:", error);
              });
              return;
            }
      
            const updatedEmbed = new MessageEmbed(embed)
              .setTitle(`Total No Prefix Users - Page ${currentPage + 1}/${totalPages}`)
              .setDescription(await generateEmbed(currentPage)); // Update the description
      
            const firstButton = pag.components.find((component) => component.customId === "first");
            const previousButton = pag.components.find((component) => component.customId === "previous");
            const nextButton = pag.components.find((component) => component.customId === "next");
            const lastButton = pag.components.find((component) => component.customId === "last");
      
            firstButton.setDisabled(currentPage === 0);
            previousButton.setDisabled(currentPage === 0);
            nextButton.setDisabled(currentPage === totalPages - 1);
            lastButton.setDisabled(currentPage === totalPages - 1);
      
            interaction.update({ embeds: [updatedEmbed], components: [pag] });
          }
        });
      
        collector.on("end", () => {
          pag.components.forEach((button) => button.setDisabled(true));
          messageComponent.edit({ components: [pag] });
        });
      
        break;
      }
      case 'reset': {      
        const listData = await getNoPrefixList(client);
      
        if (!listData || listData.length === 0) {
          return message.channel.send(`No one is in No Prefix Database.`);
        }
      
        await NoPrefix.destroy({ where: {} });
      
        return message.channel.send(`Reset Np database.`);
      }
        default: {
          message.channel.send({ embeds: [guide] });
        }

      }
     }
  }
};
