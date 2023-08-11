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
      let mention = message.mentions.users.first();
    if (!mention) return message.channel.send({content: 'You need to mention a user. i.e: `tlvouch @{user}`'});
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
                    totalVouch: 1
                });
                await newGlobalVouchRecord.save();
            } else {
                globalVouchRecord.totalVouch += 1;
                await globalVouchRecord.save();
            }

          console.log(globalVouchRecord);
            await message.channel.send({ content: `Thanks for vouching <@${mention.id}> ${message.member.displayName}! Now ${mention.displayName} has ${globalVouchRecord.totalVouch} vouches`});
        } catch (error) {
            console.error(error);
        }
    }
};
