const { Message, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const VouchSchema = require('../../../schemas/vouchSchema');

module.exports = {
    structure: {
        name: 'vouch',
        description: 'vouch us!',
        aliases: ['v']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {

      const adminChannel = client.channels.cache.get("1139542852490252359");
      let mention = message.mentions.users.first();
    if (!mention) return message.channel.send({content: 'You need to mention a user. i.e: `tlvouch @{user}`'});

      const product = args[1];
      const opinion = args.slice(2).join(" ");
      if(config.user.admins.includes(message.author.id)) {
        return message.reply({ content: "You are an admin and you cannot vouch."});
      }
      if(mention.id === message.author.id) {
        return message.reply({ content: "You cannot voucu yoursef."})
      }
        try {
            const globalVouchRecord = await VouchSchema.findOne({ userId: mention.id });

            if (!globalVouchRecord) {
                const newGlobalVouchRecord = new VouchSchema({
                    userId: mention.id,
                    totalVouch: 0
                });
                await newGlobalVouchRecord.save();
            } else {
                globalVouchRecord.totalVouch += 1;
                await globalVouchRecord.save();
            }

          console.log(globalVouchRecord);
            await message.channel.send({ content: `Thanks for vouching <@${mention.id}> ${message.member.displayName}! Now ${mention.displayName} has ${globalVouchRecord.totalVouch} vouches`});
          await adminChannel.send({ content: `${message.member.displayName} vouched ${mention.id} now ${mention.displayName} has ${globalVouchRecord.totalVouch} vouches.\n> **Item sold:** \`${product}\`\n> **Users Review:** "**${opinion}**"` })
        } catch (error) {
            console.error(error);
        }
    }
};
