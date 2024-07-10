const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const load = require('lodash');
const { createCanvas, loadImage } = require('@napi-rs/canvas');

module.exports = {
  name: 'queue',
  category: 'Music',
  aliases: ['q'],
  description: 'Show the music queue and now playing.',
  args: false,
  usage: '',
  userPrams: [],
  cooldown: 5,
  botPrams: ['EmbedLinks'],
  owner: false,
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue.current) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setAuthor({
          name: message.author.username || "Unknown User",
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setDescription('There is no player for this guild, Please connect by using join command.')
        .setTimestamp();
      return message.reply({ embeds: [thing] });
    }

    const generateQueueCanvas = async (page) => {
      const TotalSongsPerPage = 5;
      const canvas = createCanvas(1942, 832);
      const ctx = canvas.getContext('2d');
      const img = await loadImage('https://iili.io/JiOcL3Q.png'); // Background image URL
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f9f9f9';
      ctx.font = 'bold 50px Times_New_Roman, NOTO_COLOR_EMOJI';

      const start = (page - 1) * TotalSongsPerPage;
      const end = page * TotalSongsPerPage;
      const tracks = player.queue.slice(start, end);

      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        const thumbnailCanvas = createCanvas(200, 200);
        const thumbnailCtx = thumbnailCanvas.getContext('2d');
        let thumbnailImage;
        try {
          thumbnailImage = await loadImage(track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${track.identifier}/maxresdefault.jpg`);
        } catch (error) {
          thumbnailImage = await loadImage('https://iili.io/J6pEPAx.png');
        }
        const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
        const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
        const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;
        const cornerRadius2 = 15;

        thumbnailCtx.beginPath();
        thumbnailCtx.moveTo(0 + cornerRadius2, 0);
        thumbnailCtx.arcTo(thumbnailCanvas.width, 0, thumbnailCanvas.width, thumbnailCanvas.height, cornerRadius2);
        thumbnailCtx.arcTo(thumbnailCanvas.width, thumbnailCanvas.height, 0, thumbnailCanvas.height, cornerRadius2);
        thumbnailCtx.arcTo(0, thumbnailCanvas.height, 0, 0, cornerRadius2);
        thumbnailCtx.arcTo(0, 0, thumbnailCanvas.width, 0, cornerRadius2);
        thumbnailCtx.closePath();
        thumbnailCtx.clip();

        thumbnailCtx.drawImage(thumbnailImage, thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
        ctx.drawImage(thumbnailCanvas, 100, 130 + i * 140, 100, 100);

        // Track number
        ctx.fillStyle = '#999797';
        ctx.font = '30px Times_New_Roman, NOTO_COLOR_EMOJI';
        ctx.fillText(`${start + (i + 1)}`, 40, 190 + i * 140);

        // Track title
        ctx.fillStyle = 'white';
        ctx.font = '30px Times_New_Roman, NOTO_COLOR_EMOJI';
        ctx.fillText(`${track.title.length > 15 ? track.title.slice(0, 15) + "..." : track.title}`, 210, 170 + i * 140);

        // Track artist
        ctx.fillStyle = '#999797';
        ctx.font = '30px Times_New_Roman, NOTO_COLOR_EMOJI';
        ctx.fillText(`${track.author}`, 210, 210 + i * 140);

        // Track album
        ctx.fillText(`${track.track.length > 15 ? track.track.slice(0, 15) + "..." : track.track}`, 750, 180 + i * 140);

        // Requester avatar and username
        const requesterAvatar = await loadImage(track.requester.displayAvatarURL({ format: 'png' }));
        ctx.save();
        ctx.beginPath();
        ctx.arc(1250 + 20, 150 + i * 140 + 20, 20, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(requesterAvatar, 1250, 150 + i * 140, 40, 40);
        ctx.restore();
        ctx.fillText(`${track.requester.username}`, 1300, 180 + i * 140);

        // Duration
        ctx.fillText(`${track.isStream ? '◉ LIVE' : convertTime(track.length)}`, 1780, 180 + i * 140);
      }

      return canvas.toBuffer('image/png');
    };

    const title = player.queue.current.title.length > 50
      ? player.queue.current.title.slice(0, 50) + "....."
      : player.queue.current.title + ".....";

    const TotalSongsPerPage = 5;
    const totalPages = Math.ceil(player.queue.length / TotalSongsPerPage);
    let page = 1;

    if (args[0]) {
      const pageArg = parseInt(args[0]);
      if (isNaN(pageArg) || pageArg < 1 || pageArg > totalPages) {
        const invalidPageEmbed = new EmbedBuilder()
          .setColor(client.sahilcolor)
          .setAuthor({ name: message.author.username || "Unknown User", iconURL: message.author.displayAvatarURL({ dynamic: true }) })
          .setDescription(`Invalid page number. Please provide a number between 1 and ${totalPages}.`);
        return message.channel.send({ embeds: [invalidPageEmbed] });
      }
      page = pageArg;
    }

    const buffer = await generateQueueCanvas(page);
    const attachment = new AttachmentBuilder(buffer, { name: 'queue.png' });
    return message.reply({ files: [attachment]});
  },
};
