const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    structure: new SlashCommandBuilder()
    .setName("setup")
    .setDescription("Settings for admins."),
  
      run: async (client, interaction, args) => {

        const embed1 = new EmbedBuilder()
        .setTitle("__Rewards__")
        .setDescription("Are you ready to be rewarded for sharing the TownLeaks experience with your friends? Introducing our exciting Invite Rewards Program, where you can earn exclusive perks and unlock hidden treasures just by bringing more members into our vibrant community.")
        .setColor("#2f3136")
        .addFields(
            {
                "name": "__Microsoft Office 365__",
                "value": "```yml\n- 3 Invites```"
              },
              {
                "name": "__OneDrive 5TB Storage__",
                "value": "```yml\n- 5 Invites```",
                "inline": true
              },
              {
                "name": "__Windows Digital License Key__",
                "value": "```yml\n- 8 Invites```",
                "inline": true
              }
        )
        .setFooter({ text: "TownLeaks | One of the best reward server", iconURL: "https://cdn.discordapp.com/icons/989926676462977154/a_b21515e4ac7b43c6874898ecdc9ab8be.gif?size=1024" })
        .setTimestamp()

        const bcomponents = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setURL('https://discord.gg/gu5XZdhvbc')
              .setLabel(`Click to claim your rewards!`)
              .setStyle('Link')
        )

     interaction.channel.send({ embeds: [embed1], components: [bcomponents] })

  },
};