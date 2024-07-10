const { MessageActionRow, MessageButton, EmbedBuilder, WebhookClient } = require("discord.js");
const web1 = new WebhookClient({ url: `https://discord.com/api/webhooks/1182733663780216832/0BF-DF7C3r9wVZk993Ykc568kWf1fJCTqBC52nIJe32csEq643UTniKKQRgiftnrA6w_` });
const { KazagumoPlayer } = require("kazagumo")

module.exports = {
    name: "playerCreate",

    /**
	 * 
	 * @param {Client} client 
	 * @param {KazagumoPlayer} player 
	 */

    run: async (client, player) => {
        
        let name = client.guilds.cache.get(player.guildId).name;

        const embed2 = new EmbedBuilder()
    .setColor(client.sahilcolor)
    .setAuthor({name: `Player Started` , iconURL: client.user.displayAvatarURL()})
    .setDescription(`**Server Name:** ${name}\n**Server Id:** ${player.guildId}`)
     .setTimestamp()
    web1.send({embeds: [embed2]})

        client.logger.log(`Player Create in ${name} [ ${player.guildId} ]`, "log");


    }
};