const { Message, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const VouchSchema = require('../../../schemas/vouchSchema');

module.exports = {
    admins: true,
    structure: {
        name: 'clearvouch',
        description: 'Clear vouch of a poor guy!',
        aliases: ['cv']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
      let mention = message.mentions.users.first();
    if (!mention) return message.channel.send({content: 'You need to mention a user. i.e: `tlclearvouch @{user}`'});

      const globalVouchRecord = await VouchSchema.findOne({ userId: mention.id });
      globalVouchRecord.totalVouch = 0;
await globalVouchRecord.save();

    await message.channel.send({ content: `Successfully cleared the vouches of <@${mention.id}>. I feel so bad about ${mention.globalName}. Poor guy.`})
    }
};
