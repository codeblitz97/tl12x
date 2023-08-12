const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const config = require('../../../config');
const VouchSchema = require('../../../schemas/vouchSchema');

module.exports = {
    structure: new SlashCommandBuilder()
    .setName("vouch")
    .setDescription("Kindly vouch for our legitimacy and service excellence.")
    .addStringOption((op) =>
        op
          .setName("product")
          .setDescription("The product you have acquired.")
          .addChoices(
            { name: "Microsoft 365", value: "Microsoft 365" },
            { name: "OneDrive 5TB Storage", value: "OneDrive 5TB Storage" },
            { name: "Windows Digital Licence Key", value: "Windows Digital Licence Key" },
            { name: "OwO Coins", value: "OwO Coins" },
            { name: "Dank Coins", value: "Dank Coins" }
          )
          .setRequired(true)
      )
      .addStringOption((op) =>
      op
        .setName("user")
        .setDescription("Who give your product?")
        .addChoices(
            { name: "Mahin Rahman", value: "905784224836104262" },
            { name: "Sohom829", value: "1043709478031343647" },
            { name: "Abir Ahsan Nevil", value: "736621857196867734" },
            { name: "Arata", value: "1074981842886864896" },
            { name: "Alpha", value: "783661052738011176" },
            { name: "Shaxpartan", value: "1043709478031343647" },
            { name: "Nuhuu", value: "949953900952322069" },
            { name: "in o ce nt", value: "868738955212886056" },
          )
        .setRequired(true)
    )
      .addIntegerOption((op) =>
        op
          .setName("rating")
          .setDescription("The evaluation of the product's Rating (Choose between 10)")
          .setRequired(true)
      )
      .addStringOption((op) =>
        op
          .setName("legit")
          .setDescription("Can we confirm our legitimacy?")
          .addChoices(
              { name: "Yes, I can confirm it.", value: "Yes, they are!" },
              { name: "No, I can't confirm it.", value: "No, they are not!" }
            )
          .setRequired(true)
      )
      .addStringOption((op) =>
        op
          .setName("experience")
          .setDescription("Detail your TownLeaks experience.")
          .setRequired(false)
      ),
  
      run: async (client, interaction, args) => {
        const adminChannel = client.channels.cache.get("1139542852490252359");
        const product = interaction.options.getString("product")
        const legit = interaction.options.getString("legit")
        const rating = interaction.options.getInteger("rating")
        const experience = interaction.options.getString("experience")
        const channelId = client.channels.cache.get("1138720092088184843");
        const vouched = interaction.options.getString("user")
        const member = interaction.user

        const embed1 = new EmbedBuilder()
        .setTitle("__Vouched__")
        .setDescription("We sincerely appreciate your endorsement of our legitimacy. Your trust is invaluable to us, and we remain committed to delivering quality and authenticity.")
        .setColor("#2f3136")
        .setFooter({ text: "TownLeaks | One of the best reward server", iconURL: "https://cdn.discordapp.com/icons/989926676462977154/a_b21515e4ac7b43c6874898ecdc9ab8be.gif?size=1024" })
        .setTimestamp()
    
    await interaction.reply({ embeds: [embed1], ephemeral: true })

    if(config.user.admins.includes(interaction.user.id)) {
        const embed = new EmbedBuilder()
        .setTitle("__Admin__")
        .setDescription(`I regret to inform you that, as an administrator, I am unable to provide vouching endorsements`)
        .setColor("#2f3136")
        .setFooter({ text: "TownLeaks | One of the best reward server", iconURL: "https://cdn.discordapp.com/icons/989926676462977154/a_b21515e4ac7b43c6874898ecdc9ab8be.gif?size=1024" })
        interaction.editReply({ embeds: [embed], ephemeral: true })
      }
      if(vouched === interaction.user.id) {
        const embed = new EmbedBuilder()
        .setTitle("__Self Vouch__")
        .setDescription(`Self-vouching is not permissible as per the established guidelines. Your cooperation is appreciated.`)
        .setColor("#2f3136")
        .setFooter({ text: "TownLeaks | One of the best reward server", iconURL: "https://cdn.discordapp.com/icons/989926676462977154/a_b21515e4ac7b43c6874898ecdc9ab8be.gif?size=1024" })
        interaction.editReply({ embeds: [embed], ephemeral: true })
      }
    
      try {
        const globalVouchRecord = await VouchSchema.findOne({ userId: vouched });

        if (!globalVouchRecord) {
            const newGlobalVouchRecord = new VouchSchema({
                userId: vouched,
                totalVouch: 0
            });
            await newGlobalVouchRecord.save();
        } else {
            globalVouchRecord.totalVouch += 1;
            await globalVouchRecord.save();
        }

        const embed = new EmbedBuilder()
        .setTitle("Vouched")
        .setDescription("We sincerely appreciate your endorsement of our legitimacy. Your trust is invaluable to us, and we remain committed to delivering quality and authenticity.")
        .setColor("#2f3136")
        .setFooter({ text: "TownLeaks | One of the best reward server", iconURL: "https://cdn.discordapp.com/icons/989926676462977154/a_b21515e4ac7b43c6874898ecdc9ab8be.gif?size=1024" })
        .setTimestamp()
        .addFields(
          {
            name: "__Information__",
            value: `**\`•\` Product**: **\`${product}\`**
**\`•\` Legit**: **\`${legit}\`**
**\`•\` Rating**: **\`${rating}\`**`
          },
          {
            name: "__Vouched Information__",
            value: `**\`•\` Vouched**: <@${vouched}>
**\`•\` Vouchs**: **\`${rating}\`**`
          },
          {
            name: "__Experience__",
            value: `\`\`\`${experience || "Nothing provided (Default Message)"}\`\`\``
          },
        )
        const bcomponents = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId('torbap1')
              .setLabel(`Vouched by: ${member.displayName}`)
              .setStyle('Secondary')
              .setDisabled(true)
        )
        channelId.send({ embeds: [embed], components: [bcomponents] })


 const adminEmbed = new EmbedBuilder()
 .setTitle("__Adming Loggings__")
 .setDescription(`Show some respect to my developers! ;-;`)
 .setColor("#2f3136")
 .setFooter({ text: "TownLeaks | One of the best reward server", iconURL: "https://cdn.discordapp.com/icons/989926676462977154/a_b21515e4ac7b43c6874898ecdc9ab8be.gif?size=1024" })
 .setTimestamp()
 .addFields(
    {
      name: "__Vouched Information__",
      value: `**\`•\` Vouched**: <@${vouched}>
**\`•\` Vouchs**: **\`${globalVouchRecord.totalVouch}\`**`
    }
  )

  const b2components = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('torbap1')
      .setLabel(`Vouched by: ${member.displayName} [${member.id}]`)
      .setStyle('Secondary')
      .setDisabled(true)
)
adminChannel.send({ embeds: [adminEmbed], components: [b2components] })
        } catch (e) {
            console.log(e)
        }
  },
};