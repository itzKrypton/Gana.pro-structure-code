const { AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const moment = require(`moment`);
const { GlobalFonts } = require('@napi-rs/canvas');
require(`moment-duration-format`);

module.exports = {
  name: 'nowplaying',
  category: 'Music',
  aliases: ["np"],
  description: 'Displays the currently playing song in a graphical format.',
  args: false,
  usage: '',
  userPrams: [],
  cooldown: 5,
  botPrams: ['EmbedLinks'],
  owner: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix, track) => {
    const player = client.manager.players.get(message.guild.id);

    const buildCanvas = async (player) => {
      try {
        const canvas = createCanvas(1200, 400);
        const ctx = canvas.getContext("2d");

        // Load the background image
        const bgImage = await loadImage('https://iili.io/J6C1Xa9.png');

        // Calculate new dimensions for the background image to make it bigger
        const scaleFactor = 1.5; // Adjust this factor to make the image bigger or smaller
        const bgWidth = canvas.width * scaleFactor;
        const bgHeight = canvas.height * scaleFactor;
        const bgX = -(bgWidth - canvas.width) / 2; // Center the image
        const bgY = -(bgHeight - canvas.height) / 2; // Center the image

        // Draw the blurred background image
        ctx.filter = 'blur(10px)';
        ctx.drawImage(bgImage, bgX, bgY, bgWidth, bgHeight);
        ctx.filter = 'none'; // reset filter

        // Draw the title text
        ctx.fillStyle = "#f9f9f9";
        ctx.font = "bold 65px Times_New_Roman,NOTO_COLOR_EMOJI";
        ctx.fillText(
          `${player.queue.current.title.length > 15
            ? player.queue.current.title.slice(0, 15) + "....."
            : player.queue.current.title + "....."}`, 
          425, 180);

        // Draw the author text
        ctx.fillStyle = "#999797";
        ctx.font = "50px momcakebold";
        ctx.fillText(`${player.queue.current.author}`, 425, 260);

        // Load and draw the thumbnail image with rounded corners
        const thumbnailCanvas = createCanvas(564, 564);
        const thumbnailCtx = thumbnailCanvas.getContext('2d');
        let thumbnailImage;
        try {
          thumbnailImage = await loadImage(player.queue.current.thumbnail ? player.queue.current.thumbnail : `https://img.youtube.com/vi/${player.queue.current.identifier}/maxresdefault.jpg`);
        } catch (error) {
          thumbnailImage = await loadImage('https://iili.io/J6pEPAx.png');
        }
        const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
        const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
        const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;
        const cornerRadius = 45;

        thumbnailCtx.beginPath();
        thumbnailCtx.moveTo(0 + cornerRadius, 0);
        thumbnailCtx.arcTo(thumbnailCanvas.width, 0, thumbnailCanvas.width, thumbnailCanvas.height, cornerRadius);
        thumbnailCtx.arcTo(thumbnailCanvas.width, thumbnailCanvas.height, 0, thumbnailCanvas.height, cornerRadius);
        thumbnailCtx.arcTo(0, thumbnailCanvas.height, 0, 0, cornerRadius);
        thumbnailCtx.arcTo(0, 0, thumbnailCanvas.width, 0, cornerRadius);
        thumbnailCtx.closePath();
        thumbnailCtx.clip();

        thumbnailCtx.drawImage(thumbnailImage, thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);

        // Draw the thumbnail image on the main canvas
        const thumbX = 50;
        const thumbY = 35;
        const thumbWidth = 325;
        const thumbHeight = 325;
        ctx.drawImage(thumbnailCanvas, thumbX, thumbY, thumbWidth, thumbHeight);

        // Draw a 2D border with rounded corners around the thumbnail image
        const borderWidth = 10;
        const borderRadius = cornerRadius;
        ctx.lineWidth = borderWidth;
        ctx.strokeStyle = "#2D3339"; // White border color
        ctx.beginPath();
        ctx.moveTo(thumbX + borderRadius, thumbY - borderWidth / 2);
        ctx.arcTo(thumbX + thumbWidth + borderWidth / 2, thumbY - borderWidth / 2, thumbX + thumbWidth + borderWidth / 2, thumbY + thumbHeight + borderWidth / 2, borderRadius);
        ctx.arcTo(thumbX + thumbWidth + borderWidth / 2, thumbY + thumbHeight + borderWidth / 2, thumbX - borderWidth / 2, thumbY + thumbHeight + borderWidth / 2, borderRadius);
        ctx.arcTo(thumbX - borderWidth / 2, thumbY + thumbHeight + borderWidth / 2, thumbX - borderWidth / 2, thumbY - borderWidth / 2, borderRadius);
        ctx.arcTo(thumbX - borderWidth / 2, thumbY - borderWidth / 2, thumbX + thumbWidth + borderWidth / 2, thumbY - borderWidth / 2, borderRadius);
        ctx.closePath();
        ctx.stroke();

        return canvas.toBuffer("image/png");
      } catch (error) {
        console.error('Error while building canvas:', error);
        throw error; // Throw the error for debugging purposes
      }
    };

    try {
      const qbuffer = await buildCanvas(player);
      const qattachment = new AttachmentBuilder(qbuffer, { name: 'nowplaying.png' });
      return message.reply({ files: [qattachment] });
    } catch (error) {
      console.error('Error sending nowplaying message:', error);
      return message.reply('There was an error while processing the nowplaying command.');
    }
  }
};
