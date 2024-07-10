const { Message, MessageEmbed, Client, TextChannel, MessageButton, MessageActionRow, EmbedBuilder, Attachment, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { convertTime } = require("./convert");
const { KazagumoPlayer, KazagumoTrack } = require("kazagumo");
const SpotiPro = require("spoti-pro");
const clientId = "a63f6f18680747e39e52d10a38a080f5";
const clientSecret = "ac2a98c25c94440a8a803eab6e56c24c";
const spoti = new SpotiPro(clientId, clientSecret);
const axios = require('axios');
const config = require('../config')
/**
 * 
 * @param {TextChannel} channel 
 * @param {String} args 
 */

async function oops(channel, args, client) {
    try {
        let embed1 = new MessageEmbed().setColor("#2f3136").setDescription(`${args}`);

        const m = await channel.send({
            embeds: [embed1]
        });

        setTimeout(async () => await m.delete().catch(() => { }), 12000);
    } catch (e) {
        return console.error(e)
    }
};
/**
 * 
 * @param {KazagumoPlayer} player 
 * @param {Client} client
 * @returns 
 */
async function autoplay(player, client) {
    try {
    const limit = 10;
    const country = "IN";
    const track = player.data.get("autoplaySystem");
    const q = "different Songs";
    let requester = player.data.get("requester");
    const trackUrl = await spoti.searchSpotify(q, limit, country);
    if (trackUrl) {
      const randomIndex = Math.floor(Math.random() * trackUrl.length);
      const randomTrack = trackUrl[randomIndex];
      let res = await player.search(randomTrack, {
        engine: "youtube",
        requester: requester,
      });
      if (!res || !res.tracks.length) return;
      player.queue.add(res.tracks[0]);
      if (!player.playing && !player.paused) player.play();
    }
    } catch (error) {
        console.log(error)
    }
}

async function buttonReply(int, args, client) {

    if (int.replied) {
        await int.editReply({ embeds: [new MessageEmbed().setColor("2f3136").setAuthor({ name: int.member.user.tag, iconURL: int.member.user.displayAvatarURL() }).setDescription(args)] })
    } else {
        await int.editReply({ embeds: [new MessageEmbed().setColor("2f3136").setAuthor({ name: int.member.user.tag, iconURL: int.member.user.displayAvatarURL() }).setDescription(args)] })
    };

    setTimeout(async () => {
        if (int && !int.ephemeral) {
            await int.deleteReply().catch(() => { });
        };
    }, 2000);
};

/**
 * Function to update Rich Presence for a user.
 */


module.exports = {
    buttonReply,
    oops,
    autoplay
};
