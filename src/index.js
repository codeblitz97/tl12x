require('dotenv').config();
const ExtendedClient = require('./class/ExtendedClient');
require("./server");
const { AntiAltClient } = require("discord-antialts");
const { EmbedBuilder } = require("discord.js")

const client = new ExtendedClient();

const c = new AntiAltClient({
    debug: false,
    altDays: 7, 
  });
  client.on("guildMemberAdd", (member) => {
    c.init(member, {
      action: "kick"
    });
  });
  client.on("altAction", (member, date, action) => {
    const embed = new EmbedBuilder()
      .setTitle("__Security__")
      .setDescription(`Encountered an alternate account attempting to join? We're committed to maintaining a secure and genuine community. I just suspected a alt, My vigilance helps TownLeaks uphold the quality of our server experience for all members.`)
      .setColor("#2f3136")
      .setFooter({ text: "TownLeaks | One of the best reward server", iconURL: "https://cdn.discordapp.com/icons/989926676462977154/a_b21515e4ac7b43c6874898ecdc9ab8be.gif?size=1024" })
      .setTimestamp()
      .addFields(
        {
            name: "__Alt Information__",
            value: `\`»\` **Name**: \`${member.displayName} (${member.tag})\`
\`»\` **ID**: \`${member.id}\`
\`»\` **Account Created**: \`${date.createdAt} day(s) ago\`
\`»\` **Account Creation Date**: ${date.createdAtDate}`
        },
        {
            name: "__Join Gate__",
            value: `\`»\` **Join Position**: \`${member.guild.memberCount}\`
\`»\` **Join Date**: \`${date.joinAt}\`
\`»\` **Account Created**: \`${date.createdAt} day(s) ago\`
\`»\` **Account Creation Date**: ${date.createdAtDate}`
        },
      )
    client.channels.cache.get("1139542852490252359").send({ embeds: [embed] });
  });

client.start();
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);