const config = require('../../config');
const { log } = require('../../functions');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    event: 'interactionCreate',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {import('discord.js').Interaction} interaction 
     * @returns 
     */
    run: (client, interaction) => {
        if (config.handler.commands.slash === false && interaction.isChatInputCommand()) return;
        if (config.handler.commands.user === false && interaction.isUserContextMenuCommand()) return;
        if (config.handler.commands.message === false && interaction.isMessageContextMenuCommand()) return;

        const command = client.collection.interactioncommands.get(interaction.commandName);

        if (!command) return;

      if(command.developers) {
        if(!config.user.developers.includes(interaction.user.id)) {
          return interaction.reply({ content: "You are not permitted to use this command. Only developers can use this command.", ephemeral: true })
        }
      }

      if(command.admins) {
        if(!config.user.admins.includes(interaction.user.id)) {
          return interaction.reply({ content: "You are not permitted to use this command. Only admins can use this command.", ephemeral: true })
        }
      }

        try {
            command.run(client, interaction);
        } catch (error) {
            log(error, 'err');
        }
    },
};
