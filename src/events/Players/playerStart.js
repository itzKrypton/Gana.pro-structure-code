const { EmbedBuilder, ActionRowBuilder, AttachmentBuilder, Client, ButtonBuilder, ButtonStyle, SelectMenuBuilder, PermissionsBitField } = require('discord.js');
const { KazagumoPlayer, KazagumoTrack } = require("kazagumo");
const { REST } = require("@discordjs/rest");
module.exports = {
	name: "playerStart",
	/**
	 * 
	 * @param {Client} client 
	 * @param {KazagumoPlayer} player 
	 * @param {KazagumoTrack} track 
	 */
	run: async (client, player, track) => {
    let guild = client.guilds.cache.get(player.guildId);
    if (!guild) return;

    let channel = guild.channels.cache.get(player.textId);
    if (!channel) return;

    if (track.uri.includes("https://cdn.discordapp.com/attachments/")) {
      return;
    }

    track.requester = player.previous
      ? player.queue.previous.requester
      : player.queue.current.requester;


        const author1 = track.author;
        const voiceId = player.voiceId;
        const status = `${author1} - **${track.title}**`;
        const rest = new REST({ version: '10' }).setToken(client.config.token);
            await rest.put(`/channels/${voiceId}/voice-status`, {
                body: {
                    status: status
                }
            });
            
    const currentVolume = Math.round(player.volume * 100);
    const queueNumber = player.queue.length;
    const searchQuery = track.author;
    const url = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    const serverName = guild.name;
    const buffer = await client.canvas.build(track);
    const attachment = new AttachmentBuilder(buffer, {
      name: 'nowplaying.png',
    });

    const embed = new EmbedBuilder()
    .setColor(client.sahilcolor)
      .setAuthor({
        name: `${serverName} - Now Playing`,
        iconURL: `https://i.imgur.com/rvVp2Zd.gif`,
      })
    .setDescription(`[${
          track.title.length > 15
            ? track.title.slice(0, 15) + "....."
            : track.title + "....."
        }](https://gaanabot.vercel.app) By [${track.author}](${url}) from the queue.`)
        .setImage('attachment://nowplaying.png')
    
    const prev = new ButtonBuilder()
    .setCustomId("prev")
    .setEmoji(`<:nutzprev:1195760316710133862>`)
    .setStyle(ButtonStyle.Secondary)
    const pause = new ButtonBuilder()
    .setCustomId("pause")
    .setEmoji(`<:nutzpause:1195761397624213634>`)
    .setStyle(ButtonStyle.Secondary)
    const skip = new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji(`<:nutzskip:1195761323707994242>`)
    .setStyle(ButtonStyle.Secondary)
    const stop = new ButtonBuilder()
    .setCustomId("stop")
    .setEmoji(`<:nutzstop:1195762955749429319>`)
    .setStyle(ButtonStyle.Danger)
    const like = new ButtonBuilder()
    .setCustomId("like")
    .setLabel(`Like 🤍`)
    .setStyle(ButtonStyle.Success)

    const vup = new ButtonBuilder()
    .setCustomId("volup")
    .setEmoji(`<:nutzvolup:1195762981112393819>`)
    .setStyle(ButtonStyle.Secondary)
    const vdwn = new ButtonBuilder()
    .setCustomId("voldown")
    .setEmoji(`<:nutzvoldown:1195763004013281380>`)
    .setStyle(ButtonStyle.Secondary)
    const loop = new ButtonBuilder()
    .setCustomId("like")
    .setEmoji(`<:icons8meltingheart100:1209853940192120832>`)
    .setStyle(ButtonStyle.Secondary)
    const shuffle = new ButtonBuilder()
    .setCustomId("shuffle")
    .setEmoji(`<:nutzshuffle:1195762929862197290>`)
    .setStyle(ButtonStyle.Secondary)

    let row = new ActionRowBuilder().addComponents(prev,pause,skip,stop,vup);
    let row1 = new ActionRowBuilder().addComponents(vdwn,loop,shuffle,like);
    if(channel){
      return channel?.send({ files: [attachment], components: [row,row1]}).then(x => player.data.set("message", x))
    }
		await player.data.set("autoplaySystem", track.identifier);
	}
};