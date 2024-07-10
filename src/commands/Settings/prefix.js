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
    const pre = args.join(' ');

    let px;
    if (!data || !data.prefix) {
      px = client.config.prefix;
    } else {
      px = data.Prefix;
    }
    if (!pre[0]) {
      return message.channel.send({ content: `The current prefix is \`${px}\`.` });
    }
    if (pre.length >= 4) {
      const embed = new AttachmentBuilder(`https://iili.io/d2UkWt1.png`)
      return message.reply({ files: [embed] });
  }
  if (data) {
    data.oldPrefix = prefix;
    data.prefix = pre;
    await data.save();
    const embed = new AttachmentBuilder(`https://iili.io/d2U8GQ1.png`)
    return message.reply({ files: [embed] });
} else {
    data = Prefix.create({
      id: message.guildId,
      prefix: pre,
      oldPrefix: px,
    });

    const embed = new AttachmentBuilder(`https://iili.io/d2U8GQ1.png`)

    return message.reply({ files: [embed] });
   }
  }
};
