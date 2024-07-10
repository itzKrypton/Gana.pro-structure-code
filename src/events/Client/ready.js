const { ActivityType } = require("discord.js");
module.exports ={
name: "ready",
run: async (client) => {
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users`, "ready");
    let statuses = [`help`,`play Aao Na`]
        setInterval(() => {
            let status = statuses[Math.floor(Math.random()*statuses.length)];		
              client.user.setPresence({
                  activities: [
                      {
                          name: status,
                          type: ActivityType.Listening
                      }
                  ],
                  status: "online"
              });
          }, 5000);
 }
}