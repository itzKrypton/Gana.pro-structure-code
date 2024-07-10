const { MessageEmbed } = require('discord.js');
module.exports = {
	name: "playerEnd",
	run: async (client, player) => {
		
		if (player.data.get("message") && player.data.get("message").deletable ) player.data.get("message").delete().catch(() => null);
		
		let guild = client.guilds.cache.get(player.guildId);
		if (!guild) return;

	}
};