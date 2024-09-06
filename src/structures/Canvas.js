const apiKey = "7c5b72c7a6be8a06413ff8025ca26207";
const path = require('path');
const { GlobalFonts, createCanvas, loadImage } = require('@napi-rs/canvas');
GlobalFonts.registerFromPath(
    path.resolve(__dirname, '../base/Kalam-Regular.ttf'),
    'kalam',
  );
GlobalFonts.registerFromPath(
    path.resolve(__dirname, '../base/ITCBenguiatStdBookCn.OTF'),
    'ITC',
  );
const axios = require("axios");
module.exports = class Canvas {
    constructor(client) {
        this.client = client;
    }

    async build(track, player) {
      try {
        const canvas = createCanvas(1200, 400);
        const ctx = canvas.getContext("2d");
        const img = await loadImage('https://iili.io/J6C1Xa9.png');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f9f9f9";
        ctx.font = "bold 65px ITC,NOTO_COLOR_EMOJI";
        ctx.fillText(`${track.title.length > 15
        ? track.title.slice(0, 15) + "....."
        : track.title + "....."}`, 425, 180);
        ctx.fillStyle = "#999797";
        ctx.font = "50px ITC";
        ctx.fillText(`${track.author}`, 425, 260);
        ctx.fillStyle = "#E8E8E8";

        const thumbnailCanvas = createCanvas(564, 564);
        const thumbnailCtx = thumbnailCanvas.getContext('2d');
        let thumbnailImage;
        try {
            thumbnailImage = await loadImage(`${track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${track.identifier}/maxresdefault.jpg`}`);
        } catch (error) {
            thumbnailImage = await loadImage('https://iili.io/J6pEPAx.png');
        }
        const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
        const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
        const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;
        const cornerRadius2 = 45;

        thumbnailCtx.beginPath();
        thumbnailCtx.moveTo(0 + cornerRadius2, 0);
        thumbnailCtx.arcTo(thumbnailCanvas.width, 0, thumbnailCanvas.width, thumbnailCanvas.height, cornerRadius2);
        thumbnailCtx.arcTo(thumbnailCanvas.width, thumbnailCanvas.height, 0, thumbnailCanvas.height, cornerRadius2);
        thumbnailCtx.arcTo(0, thumbnailCanvas.height, 0, 0, cornerRadius2);
        thumbnailCtx.arcTo(0, 0, thumbnailCanvas.width, 0, cornerRadius2);
        thumbnailCtx.closePath();
        thumbnailCtx.clip();

        thumbnailCtx.drawImage(thumbnailImage, thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
        ctx.drawImage(thumbnailCanvas, 50, 35, 325, 325);
    return canvas.toBuffer("image/png");

    }
    catch (e) {
        console.log(e);
    }
}
  
  

    async buildqueue1(tracks, result) {
        try {
          const canvas = createCanvas(2480, 520);
          const ctx = canvas.getContext("2d");
          const img = await loadImage('https://iili.io/J6CiUvt.png');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const title = tracks[0].title.length > 25 ? tracks[0].title.slice(0, 25) + "..." : tracks[0].title || tracks.title;
          ctx.fillStyle = "#f9f9f9";
          ctx.font = "bold 75px ITC,NOTO_COLOR_EMOJI";
          ctx.fillText(title, 570, 250);
          ctx.fillStyle = "#999797";
          ctx.font = "65px ITC";
          ctx.fillText(tracks[0].author || "Ganna Playlist", 570, 340);
          ctx.fillStyle = "#E8E8E8";
          const thumbnailCanvas = createCanvas(564, 564);
          const thumbnailCtx = thumbnailCanvas.getContext('2d');
          let thumbnailImage;
          try {
             thumbnailImage = await loadImage(`https://img.youtube.com/vi/${tracks[0].identifier}/maxresdefault.jpg` || `https://img.youtube.com/vi/${tracks.identifier}/maxresdefault.jpg`);
          } catch (error) {
             thumbnailImage = await loadImage('https://iili.io/J6pEPAx.png');
          }
          const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
          const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
          const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;
          const cornerRadius2 = 45;
  
          thumbnailCtx.beginPath();
          thumbnailCtx.moveTo(0 + cornerRadius2, 0);
          thumbnailCtx.arcTo(thumbnailCanvas.width, 0, thumbnailCanvas.width, thumbnailCanvas.height, cornerRadius2);
          thumbnailCtx.arcTo(thumbnailCanvas.width, thumbnailCanvas.height, 0, thumbnailCanvas.height, cornerRadius2);
          thumbnailCtx.arcTo(0, thumbnailCanvas.height, 0, 0, cornerRadius2);
          thumbnailCtx.arcTo(0, 0, thumbnailCanvas.width, 0, cornerRadius2);
          thumbnailCtx.closePath();
          thumbnailCtx.clip();
  
          thumbnailCtx.drawImage(thumbnailImage, thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
          ctx.drawImage(thumbnailCanvas, 100, 50, 425, 425);
      return canvas.toBuffer("image/png");
  
      }
      catch (e) {
          console.log(e);
      }
}

async buildqueue2(tracks, result) {
    try {
      const canvas = createCanvas(2480, 520);
      const ctx = canvas.getContext("2d");
      const img = await loadImage('https://iili.io/J6CiUvt.png');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const ti = result.playlistName;
      ctx.fillStyle = "#f9f9f9";
      ctx.font = "bold 75px ITC,NOTO_COLOR_EMOJI";
      ctx.fillText(ti, 570, 250);
      ctx.fillStyle = "#999797";
      ctx.font = "65px ITC";
      ctx.fillText(`Total: ${tracks.length}`, 570, 340);
      ctx.fillStyle = "#E8E8E8";
      const thumbnailCanvas = createCanvas(564, 564);
      const thumbnailCtx = thumbnailCanvas.getContext('2d');
      let thumbnailImage;
          try {
             thumbnailImage = await loadImage(`https://img.youtube.com/vi/${tracks.identifier}/maxresdefault.jpg`);
          } catch (error) {
             thumbnailImage = await loadImage('https://iili.io/J6pEPAx.png');
          }
      const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
      const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
      const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;
      const cornerRadius2 = 45;

      thumbnailCtx.beginPath();
      thumbnailCtx.moveTo(0 + cornerRadius2, 0);
      thumbnailCtx.arcTo(thumbnailCanvas.width, 0, thumbnailCanvas.width, thumbnailCanvas.height, cornerRadius2);
      thumbnailCtx.arcTo(thumbnailCanvas.width, thumbnailCanvas.height, 0, thumbnailCanvas.height, cornerRadius2);
      thumbnailCtx.arcTo(0, thumbnailCanvas.height, 0, 0, cornerRadius2);
      thumbnailCtx.arcTo(0, 0, thumbnailCanvas.width, 0, cornerRadius2);
      thumbnailCtx.closePath();
      thumbnailCtx.clip();

      thumbnailCtx.drawImage(thumbnailImage, thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
      ctx.drawImage(thumbnailCanvas, 100, 50, 425, 425);
  return canvas.toBuffer("image/png");

  }
  catch (e) {
      console.log(e);
  }
}


async msg1(client, prefix) {
    try {
      const canvas = createCanvas(1200, 400);
      const ctx = canvas.getContext("2d");
      const img = await loadImage('https://iili.io/J6WgtvR.png');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#f9f9f9";
      ctx.font = "bold 65px ITC, NOTO_COLOR_EMOJI";
      ctx.fillText(client.prefix, 710, 70);
  return canvas.toBuffer("image/png");

  }
  catch (e) {
      console.log(e);
  }
}


async lyrics(client, message) {
    try {
        const player = client.manager.players.get(message.guild.id);
        const songName = player.queue.current && player.queue.current.title ? player.queue.current.title : "Ahil";
        const song = songName.replace(/ /g, "%20");
        const authorName = player.queue.current.author;
        const author = authorName.replace(/ /g, "%20");
        const response = await axios.get(`https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${song}&q_artist=${author}&apikey=${apiKey}`);
        const data = response.data;
        let lyrics;
        try {
            lyrics = data.message.body.lyrics.lyrics_body;
        } catch (error) {
            lyrics = "Sorry, No lyrics found."
        }
        const canvas = createCanvas(564, 573);
        const ctx = canvas.getContext("2d");
        const img = await loadImage('https://iili.io/J6m0c2j.png');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#f9f9f9";
        ctx.font = "bold 15px kalam,Times_New_Roman,NOTO_COLOR_EMOJI";

        // Split lyrics into lines
        const maxWidth = 524; // Maximum width for lyrics
        const lineHeight = 20; // Line height for lyrics
        const lines = [];
        let currentLine = '';
        const words = lyrics.split(/\s+/);
        for (const word of words) {
            const width = ctx.measureText(currentLine + word).width;
            if (width < maxWidth) {
                currentLine += (currentLine === '' ? '' : ' ') + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);

        // Render each line onto the canvas
        let y = 50; // Initial y position
        for (const line of lines) {
            ctx.fillText(line, 20, y);
            y += lineHeight;
        }

        return canvas.toBuffer("image/png");
    } catch (e) {
        console.log(e);
    }
}

async prev(track, result) {
    try {
      const canvas = createCanvas(2480, 520);
      const ctx = canvas.getContext("2d");
      const img = await loadImage('https://iili.io/J6CiUvt.png');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const title = track.title.length > 25 ? track.title.slice(0, 25) + "..." : track.title || track.title;
      ctx.fillStyle = "#f9f9f9";
      ctx.font = "bold 75px ITC,NOTO_COLOR_EMOJI";
      ctx.fillText(title, 570, 250);
      ctx.fillStyle = "#999797";
      ctx.font = "65px ITC";
      ctx.fillText(track.author || "Ganna Playlist", 570, 340);
      ctx.fillStyle = "#E8E8E8";
      const thumbnailCanvas = createCanvas(564, 564);
      const thumbnailCtx = thumbnailCanvas.getContext('2d');
      let thumbnailImage;
      try {
         thumbnailImage = await loadImage(`https://img.youtube.com/vi/${track.identifier}/maxresdefault.jpg` || `https://img.youtube.com/vi/${track.identifier}/maxresdefault.jpg`);
      } catch (error) {
         thumbnailImage = await loadImage('https://iili.io/J6pEPAx.png');
      }
      const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
      const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
      const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;
      const cornerRadius2 = 45;

      thumbnailCtx.beginPath();
      thumbnailCtx.moveTo(0 + cornerRadius2, 0);
      thumbnailCtx.arcTo(thumbnailCanvas.width, 0, thumbnailCanvas.width, thumbnailCanvas.height, cornerRadius2);
      thumbnailCtx.arcTo(thumbnailCanvas.width, thumbnailCanvas.height, 0, thumbnailCanvas.height, cornerRadius2);
      thumbnailCtx.arcTo(0, thumbnailCanvas.height, 0, 0, cornerRadius2);
      thumbnailCtx.arcTo(0, 0, thumbnailCanvas.width, 0, cornerRadius2);
      thumbnailCtx.closePath();
      thumbnailCtx.clip();

      thumbnailCtx.drawImage(thumbnailImage, thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
      ctx.drawImage(thumbnailCanvas, 100, 50, 425, 425);
  return canvas.toBuffer("image/png");

  }
  catch (e) {
      console.log(e);
  }
}


async generateQueueCanvas(page, track, player) {
    const TotalSongsPerPage = 5;
    const canvas = createCanvas(1942, 832); // Adjust size if needed
    const ctx = canvas.getContext('2d');
    const img = await loadImage('https://iili.io/JiOcL3Q.png'); // Background image URL
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f9f9f9';
    ctx.font = 'bold 50px ITC, NOTO_COLOR_EMOJI';

    const start = (page - 1) * TotalSongsPerPage;
    const end = page * TotalSongsPerPage;
    const tracks = player.queue.slice(start, end);

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      const thumbnailCanvas = createCanvas(200, 200);
      const thumbnailCtx = thumbnailCanvas.getContext('2d');
      let thumbnailImage;
      try {
        thumbnailImage = await loadImage(`${track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${track.identifier}/maxresdefault.jpg`}`);
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
      ctx.font = '30px ITC, NOTO_COLOR_EMOJI';
      ctx.fillText(`${start + (i + 1)}`, 40, 190 + i * 140);

      // Track title
      ctx.fillStyle = 'white';
      ctx.font = '30px ITC, NOTO_COLOR_EMOJI';
      ctx.fillText(`${track.title.length > 15 ? track.title.slice(0, 15) + "..." : track.title}`, 210, 170 + i * 140);

      // Track artist
      ctx.fillStyle = '#999797';
      ctx.font = '30px ITC, NOTO_COLOR_EMOJI';
      ctx.fillText(`${track.author}`, 210, 210 + i * 140);

      // Track album
      ctx.fillText(`${track.title.length > 15 ? track.title.slice(0, 15) + "..." : track.title}`, 750, 180 + i * 140);

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

  async nowplaying(player, track) {
    try {
        const canvas = createCanvas(451, 217);
        const ctx = canvas.getContext("2d");

        // Background color
        ctx.fillStyle = "#3a4f87"; // Assuming a similar blue background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Load the image (using the uploaded file path)
        const img = await loadImage('https://iili.io/JpImuVf.png');
        ctx.drawImage(img, 100, 50, 425, 425);

        // Add the title text
        const title = player.queue.current.title.length > 25 ? player.queue.current.title.slice(0, 25) + "..." : player.queue.current.title;
        ctx.fillStyle = "#f9f9f9";
        ctx.font = "bold 75px ITC,NOTO_COLOR_EMOJI";
        ctx.fillText(title, 570, 250);

        // Add the author text
        ctx.fillStyle = "#999797";
        ctx.font = "65px ITC";
        ctx.fillText(player.queue.current.track.author || "Ganna Playlist", 570, 340);

        // Add play/pause and navigation icons
        const playPauseImage = await loadImage('https://iili.io/JpImOR1.webp');
        const prevIcon = await loadImage('https://iili.io/JpImlR9.png');
        const nextIcon = await loadImage('https://iili.io/JpIp2e9.webp');
        
        // Drawing the icons
        ctx.drawImage(prevIcon, 1700, 200, 100, 100);
        ctx.drawImage(playPauseImage, 1800, 200, 100, 100);
        ctx.drawImage(nextIcon, 1900, 200, 100, 100);

        return canvas.toBuffer("image/png");

    } catch (e) {
        console.log(e);
    }
  }
}
