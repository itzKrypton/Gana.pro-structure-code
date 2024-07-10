const { EmbedBuilder } = require('discord.js');
const FavPlay = require('../../models/playlist');

module.exports = {
  name: 'like',
  category: 'Favourite',
  description: 'Get information about your saved playlist.',
  args: false,
  cooldown: 5,
  usage: '<playlist name>',
  userParams: [],
  botParams: ['EmbedLinks'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client) => {
    const player = client.manager.players.get(message.guild.id);
        const Name = "Fav";
        let data = await FavPlay.findAll({ where: { userId: message.author.id, playlistName: Name } });

        if (data.length <= 0) {
         await FavPlay.create({
            userName: message.author.username,
            userId: message.author.id,
            playlistName: Name,
            playlist: [],
        });
    
        try {
            data = await FavPlay.findAll({ where: { userId: message.author.id, playlistName: Name } });
            //console.log('Fetched data after creation:', data);
        } catch (error) {
            //console.error('Error fetching data after creation:', error);
            return message.reply({ content: 'An error occurred while fetching your playlist after creation.', ephemeral: true });
          }
        }

        let userData = await FavPlay.findAll({
              where: { userId: message.author.id },
        });
        if (userData.length >= 10) {
            return message.reply({
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
                    userId: message.author.id,
                    playlistName: Name,
                },
            }
        );
        //console.log(`Updated playlist for user: ${interaction.user.id} with song: ${song.title}`);
      } catch (error) {
       // console.error('Error updating playlist:', error);
        return message.reply({ content: 'An error occurred while updating your playlist.', ephemeral: true });
      }

      const emd = new AttachmentBuilder(`https://iili.io/dFIw5I1.png`)
    message.reply({ files: [emd], ephemeral: true });
  }
}