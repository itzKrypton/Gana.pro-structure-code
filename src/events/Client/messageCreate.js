const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, SelectMenuBuilder, PermissionsBitField, ChannelType, AttachmentBuilder } = require('discord.js');
const db = require('../../models/prefix');
const { cooldown } = require("../../handlers/functions.js");
const webHookurl ="https://discord.com/api/webhooks/1171735017689468958/EllsolP-WPT29hKTXSXSoAbETKpl0iMNGJil1_7nwkwJmnYBSasraDr8RtRXenFxwTN1";
const { WebhookClient } = require("discord.js");
const hook = new WebhookClient({ url: webHookurl });
const NoPrefix = require('../../models/noprefix');
const Blacklist = require('../../models/blacklist');
const { RateLimitManager } = require("@sapphire/ratelimits");
const spamRateLimitManager = new RateLimitManager(10000, 7);
module.exports = {
  name: 'messageCreate',
  run: async (client, message) => {
    
    if (message.author.bot || message.webhookId || !message.guild || !message.channel) return;
    if (!message.guild) return;
    if (message.channel.type == ChannelType.DM || message.channel.type == ChannelType.GuildForum) return;
    if (message.partial) await message.fetch();

    if (message.content.toLowerCase().includes(`jsk`)) {
      client.dokdo.run(message);
    }

    let [owner] = await Promise.all([
      await client.config.ownerID.find((x) => x === message.author.id)
    ]);
    let blacklistUser = await Blacklist.findOne({ where: { userId: message.author.id } });
    if (owner) blacklistUser = false;
    if (blacklistUser) {
      return message.reply("You are blacklisted and can't use my commands.");
    }

    const prefixMatch = "1178298709407174666"
    var prefix = client.prefix;
    const ress = await db.findOne({ _id: message.guildId });
    if (ress && ress.prefix) prefix = ress.prefix;

    const mentionRegex = RegExp(`^<@!?${client.user.id}>$`); 
      if (message.content.match(mentionRegex)) {
        const msg1 = new AttachmentBuilder(`https://iili.io/dFzP6YX.png`);
        const sahu = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=414530792776&scope=bot%20applications.commands`).setLabel(`Invite`),
          new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(`https://gaana.pro`).setLabel(`Website`)
        )

      const mentionRlBucket = spamRateLimitManager.acquire(`${message.author.id}`);
      if (mentionRlBucket.limited && !owner) {
        await Blacklist.create({ userId: message.author.id });
        return message.reply({ content: `You have been blacklisted due to excessive mentions.`});
      }
      try {
        mentionRlBucket.consume();
      } catch (e) {}

      message.reply({ files: [msg1], components: [sahu] })
    };

    async function getNoPrefixList(client) {
      const data = await NoPrefix.findAll();
      return data.map(entry => entry.userId);
    }
    const noprefix = await getNoPrefixList(client);
    if (noprefix.includes(message.author.id) && !message.content.startsWith(prefix)) {
      prefix = "";
    }

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    
    if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('SendMessages'))) return await message.author.dmChannel.send({ files: [ new AttachmentBuilder(`https://iili.io/dFzsAJ9.png`)] }).catch(() => { });

    if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('ViewChannel'))) return;
    if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('EmbedLinks'))) return await message.channel.send({ files: [ new AttachmentBuilder(`https://iili.io/dFzLnmg.png`)] }).catch(() => { });
    if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('ReadMessageHistory'))) return await message.channel.send({ files: [ new AttachmentBuilder(`https://iili.io/dFzZdlV.png`)] }).catch(() => { });
    if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('UseExternalEmojis'))) return await message.channel.send({ files: [ new AttachmentBuilder(`https://iili.io/dFzZkqx.png`)] }).catch(() => { });
      
    if (command.userPrams) {

      if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPrams || []))) return message.channel.send({ content: `You Are Missing The Following Permissions ${command.userPrams || []}.`}).then(msg => setTimeout(() => { msg.delete().catch(e => null) }, 5000));
    }

    //BOTPERMISSION HANDLER
    if (command.botPrams) {

      if (!message.channel.permissionsFor(client.user.id).has(PermissionsBitField.resolve(command.botPrams || []))) return message.channel.send({ content: `I am missing ${command.botPrams || []} permission to execute the provided task!`}).then(msg => setTimeout(() => { msg.delete().catch(e => null) }, 5000));
    }

    if (command.args && !args.length) {
      let reply = ``;

      if (command.name) {
        reply += `**Command Name**\n\`-\`${command.name}\n`;
      }
      if (command.description) {
        reply += `**Command Description**\n\`-\`${command.description}`;
      }
      if (command.aliases) {
        reply += `\n**Command Aliases**\n\`-\`${command.aliases.join(", ")}`;
      }
      if (command.usage) {
        reply += `\n**Command Usage**\n\`-\`${command.name} ${command.usage}`
      }
      if (command.cooldown) {
        reply += `\n**Command Cooldown**\n\`-\`${command.cooldown}s`
      }
      if (command.botPrams) {
        reply += `\n**Command Permission**\n\`-\`${command.botPrams}`
      }
      if (command.userPrams) {
        reply += `\n\`\`\`diff\n- [] = optional argument\n- <> = required argument\n- Do NOT type these when using commands!\`\`\``
      }

      const embed = new EmbedBuilder()
      .setColor(client.sahilcolor)
      embed.setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true}) })
      //embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
      embed.setTimestamp()
      embed.setDescription(reply);
      return message.channel.send({ embeds: [embed] });
    }
      // usage: '',

   const embed = new EmbedBuilder()
    .setColor(client.sahilcolor)
    if (command.owner) {
      if (client.owner) {
        const owner = client.owner.find((x) => x === message.author.id);
        if (!owner)
          return message.channel.send({
            embeds: [embed.setAuthor({
              name: `| You are not eligible to use that command.`,
              iconURL: message.guild.iconURL({ dynamic: true })
            })],
          });
      }
    }

    if (command) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${message.guild.name}`,
        iconURL: message.guild.iconURL({ dynamic: true })
      })
      .addFields([
          {
              name: `Information`,
              value: `> • **Command Author:** ${message.author.tag}(<@${message.author.id}>)\n> • **Command Name:** [${command.name}](https://discord.com/channels/${message.guild.id}/${message.channel.id})\n> • **Channel Id:** ${message.channel.id}\n> • **Channel Name:** ${message.channel.name}\n> • **Guild Name:** ${message.guild.name}\n> • **Guild Id:** ${message.guild.id}`,
          },
      ])
      .setColor(client.sahilcolor)
      .setThumbnail(message.author.avatarURL({ dynamic: true }))
      .setTimestamp();
    if (args.length > 0) {
      embed.addFields({
        name: "Arguments",
        value: args.join(" "),
        inline: true,
      });
    }
    hook.send({ embeds: [embed] });
    if (command.category == "Owner" && !client.owner.includes(message.member.id) && !prefixMatch.includes(message.member.id)) {
      const embed = new EmbedBuilder()
        .setColor(client.sahilcolor)
        .setAuthor({
          name: "| You are not allowed to use this command!",
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        });
      return message.reply({ embeds: [embed] }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      });
    }

   const channelId = message.channel.id;

    //if exists and member has required permissions
    if (command) {
      //check if user is under cooldown
      if (cooldown(message, command) && !client.owner.includes(message.author.id)) {
        //send msg to inform that user is under cooldown
        return message.reply({
          content: `You are on cooldown, wait **${cooldown(message, command).toFixed()}** Seconds to use this command again.`
        })
      }
      else {
        if (command.category == "Owner" && !client.owner.includes(message.author.id)) return message.reply({
          embeds: [
            new EmbedBuilder()
              .setColor(client.sahilcolor)
              .setAuthor({
                name: `| You are not eligible to use that command.`,
                iconURL: message.guild.iconURL({ dynamic: true })
              })
          ]
        })
      }
    }
    const player = client.manager.players.get(message.guild.id);

    const embedsahil = new EmbedBuilder()
    .setColor(client.sahilcolor)
      .setColor(client.sahilcolor)
        if (command.player && !player) {
          const att = new AttachmentBuilder(`https://iili.io/J6nzN6J.png`)
            return message.reply({ files: [att] });
        }

        if (command.inVoiceChannel && !message.member.voice.channelId) {
            const invc = new AttachmentBuilder(`https://iili.io/J6nTvII.png`)
            return message.reply({ files: [invc] });
        }

        if (command.sameVoiceChannel) {
            if (message.guild.members.me.voice.channel) {
                if (message.guild.members.me.voice.channelId !== message.member.voice.channelId) {
                  const svc = new AttachmentBuilder(`https://iili.io/J6nuCEg.png`)
                  return message.reply({ files: [svc] });
                }
            }
        }
        try {
            command.execute(message, args, client, prefix);
        } catch (error) {
            console.log(error);
            const embed = new EmbedBuilder()
            .setColor(client.sahilcolor)
            embed.setDescription("There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.");
            return message.channel.send({ embeds: [embed] });
        }
    }
  }
}
