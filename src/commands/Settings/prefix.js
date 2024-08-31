const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Prefix = require('../../models/prefix'); // Adjust the path if necessary

module.exports = {
  name: 'prefix',
  category: 'Settings',
  aliases: ['pre'],
  cooldown: 5,
  description: 'Change the prefix for the server.',
  args: false,
  usage: 'prefix <prefix>',
  userPrams: ['ManageGuild'],
  botPrams: ['EmbedLinks'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    let data = await Prefix.findOne({ where: { id: message.guildId } });
    const pre = args.join(' ').trim();

    let currentPrefix;
    if (!data || !data.prefix) {
      currentPrefix = client.config.prefix;
    } else {
      currentPrefix = data.prefix;  // Ensure 'prefix' is used
    }

    if (!pre) {
      return message.channel.send({ content: `The current prefix is \`${currentPrefix}\`.` });
    }

    if (pre.length >= 4) {
      const embed = new AttachmentBuilder(`https://iili.io/d2UkWt1.png`);
      return message.reply({ files: [embed] });
    }

    if (data) {
      data.oldPrefix = prefix;
      data.prefix = pre;
      await data.save();
    } else {
      data = await Prefix.create({
        id: message.guildId,
        prefix: pre,
        oldPrefix: currentPrefix,
      });
    }

    // Update the prefix in the client's map
    client.prefixes.set(message.guildId, pre);

    const embed = new AttachmentBuilder(`https://iili.io/d2U8GQ1.png`);
    return message.reply({ files: [embed] });
  }
};
