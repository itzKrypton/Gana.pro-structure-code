const { AttachmentBuilder, InteractionType, EmbedBuilder } = require("discord.js");
const Prefix = require('../../models/prefix');
const FavPlay = require("../../models/playlist");

module.exports = {
  name: 'interactionCreate',
  run: async (client, interaction) => {
    let prefix = client.prefix;
    const ress = await Prefix.findOne({ Guild: interaction.guildId });
    if (ress && ress.prefix) prefix = ress.prefix;

    if (interaction.type === InteractionType.ApplicationCommand) {
      const command = client.slashCommands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.run(client, interaction, prefix);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: `An unexpected error occurred.`,
          ephemeral: true,
        }).catch(() => { });
      }
    }

    const prev = new ButtonBuilder()
     .setCustomId("prev")
     .setEmoji(`<:nutzprev:1195760316710133862>`)
     .setStyle(ButtonStyle.Secondary)
    const pause = new ButtonBuilder()
     .setCustomId("pause")
     .setEmoji(`<:icons8pause1001:1209853976217129032>`)
     .setStyle(ButtonStyle.Secondary)
    const resume = new ButtonBuilder()
     .setCustomId("resume")
     .setEmoji(`<:icons8play1001:1209853974174244896>`)
     .setStyle(ButtonStyle.Success)
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
    const shuffle = new ButtonBuilder()
     .setCustomId("shuffle")
     .setEmoji(`<:nutzshuffle:1195762929862197290>`)
     .setStyle(ButtonStyle.Secondary)
    const loop = new ButtonBuilder()
     .setCustomId("like")
     .setEmoji(`<:icons8meltingheart100:1209853940192120832>`)
     .setStyle(ButtonStyle.Secondary)
    const loop1 = new ButtonBuilder()
     .setCustomId("loop")
       .setLabel(
         `Loop - ${
           player.loop == "none"
             ? "Off"
             : player.loop == "track"
             ? "Track"
             : "Queue"
         }`
       )
     .setStyle(ButtonStyle.Secondary)

    let row = new ActionRowBuilder().addComponents(prev,resume,skip,stop,vup);
    let row1 = new ActionRowBuilder().addComponents(prev,pause,skip,stop,vup);
    let row2 = new ActionRowBuilder().addComponents(vdwn,loop,shuffle,like);
    let row3 = new ActionRowBuilder().addComponents(vdwn,loop1,shuffle,like);
    if (interaction.isButton()) {
      const player = client.manager.players.get(interaction.guild.id);
      const notInvc = new AttachmentBuilder(`https://iili.io/d2bJi0b.png`);
      const samevc = new AttachmentBuilder(`https://iili.io/d2bd1Eu.png`); 

      if (!player) return interaction.message.delete();

      if (!interaction.member.voice.channelId && interaction.user.id !== client.user.id && interaction.user.id !== client.config.ownerID)
        return interaction.reply({ files: [notInvc], ephemeral: true });
      if (interaction.member.voice.channelId !== player.voiceId && interaction.user.id !== client.user.id && interaction.user.id !== client.config.ownerID)
        return interaction.reply({ files: [samevc], ephemeral: true });

      switch (interaction.customId) {
        case "skip":
          if (player.paused) {
            const file = new AttachmentBuilder(`https://iili.io/d2b2A6g.png`);
            interaction.reply({ files: [file], ephemeral: true });
          } else {
            player.skip();
            const file2 = new AttachmentBuilder(`https://iili.io/d2b2XFs.png`)
            interaction.reply({ files: [file2], ephemeral: true });
          }
          break;
        case "stop":
          player.destroy();
          const file3 = new AttachmentBuilder(`https://iili.io/d2b2QDB.png`)
          interaction.reply({ files: [file3], ephemeral: true });
          break;
        case "prev":
          let seektime = player.position - 10000;
          if (seektime >= player.queue.current.duration - player.position || seektime < 0) {
           seektime = 0;
          }
          player.seek(Number(seektime));
          const em = new AttachmentBuilder(`https://iili.io/dFzmiyN.png`);
          interaction.reply({ files: [em], ephemeral: true });
          break;
        case "pause":
          player.pause(true);
          try {
            interaction.update({ components: [row,row2]})
          } catch (e) {
            console.log(e);
          }
          break;
          case "resume":
            player.pause(false);
            try {
              interaction.update({ components: [row1,row2]})
            } catch (e) {
              console.log(e);
            }
            break;
        case "like":
          const Name = "Fav";
          let data = await FavPlay.findAll({ where: { userId: interaction.member.user.id, playlistName: Name } });

          if (data.length <= 0) {
            await FavPlay.create({
                userName: interaction.user.tag,
                userId: interaction.user.id,
                playlistName: Name,
                playlist: [],
          });
    
          try {
            data = await FavPlay.findAll({ where: { userId: interaction.member.user.id, playlistName: Name } });
            //console.log('Fetched data after creation:', data);
          } catch (error) {
            //console.error('Error fetching data after creation:', error);
            return interaction.reply({ content: 'An error occurred while fetching your playlist after creation.', ephemeral: true });
          }
        }

          let userData = await FavPlay.findAll({
              where: { userId: interaction.user.id },
          });
          if (userData.length >= 10) {
            return interaction.editReply({
              files: [
                new AttachmentBuilder(`https://iili.io/dFI0eRa.png`)
              ],
            });
          }
        const song = player.queue.current;
        let oldSong = [];
        if (data[0] && Array.isArray(data[0].playlist)) {
            oldSong = data[0].playlist;
        }
        oldSong.push({
          title: song.title,
          uri: song.uri,
          author: song.author,
          duration: song.length,
        });

        try {
          await FavPlay.update(
            { playlist: oldSong },
            {
                where: {
                    userId: interaction.user.id,
                    playlistName: Name,
                },
            }
        );
        //console.log(`Updated playlist for user: ${interaction.user.id} with song: ${song.title}`);
      } catch (error) {
       // console.error('Error updating playlist:', error);
        return interaction.reply({ content: 'An error occurred while updating your playlist.', ephemeral: true });
      }

      const emd = new AttachmentBuilder(`https://iili.io/dFIw5I1.png`)
      interaction.reply({ files: [emd], ephemeral: true });
          break;
        case "volup":
          const currentVolume = player.volume * 100;
           if (player.volume === 150) {
            const emd = new AttachmentBuilder(`https://iili.io/dFI5WPe.png`)
            interaction.reply({ files: [emd], ephemeral: true });
          }
          player.setVolume(currentVolume + 10);
          const e = new AttachmentBuilder(`https://iili.io/dFIYdEF.png`)
          interaction.reply({ files: [e]})
          break;
          case "voldown":
            const Volume = player.volume * 100;
            if (player.volume === 0) {
            const emdd = new AttachmentBuilder(`https://iili.io/dFI5QNp.png`)
             return interaction.reply({ files: [emdd], ephemeral: true });
            }
            player.setVolume(Volume - 10);
            const ee = new AttachmentBuilder(`https://iili.io/dFIYcj2.png`)
            interaction.reply({ files: [ee], ephemeral: true });
            break;
            case "loop":
              if (player.loop == "queue" && player.loop != "track") {
                player.setLoop("track");
              }
              if (player.loop == "none" && player.loop != "queue") {
                player.setLoop("queue");
              }
              if (player.loop == "track" && player.loop != "none") {
                player.setLoop("none");
              }
              interaction.update({ components: [row1,row3], ephemeral: true });
              break;
            case "shuffle":
              if (player.queue.length < 3) {
                interaction.reply({ files: [new AttachmentBuilder(`https://iili.io/JpTvVZF.png`)], ephemeral: true });
              }
              player.queue.shuffle();
              interaction.reply({ files: [new AttachmentBuilder(`https://iili.io/JpTvsa4.png`)], ephemeral: true });
              break;
        default:
          break;
      }
    }
  }
}