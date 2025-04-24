const { SlashCommandBuilder } = require('discord.js');
const Blacklist = require('../models/Blacklist');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Applies both Roblox and Discord bans for a user')
        .addStringOption(option =>
            option.setName('identifier')
                .setDescription('The Roblox username or Discord user to blacklist')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the blacklist')
                .setRequired(true)),

    async execute(interaction) {
        const identifier = interaction.options.getString('identifier');
        const reason = interaction.options.getString('reason');

        try {
            // Check if identifier is a Discord mention
            const discordUser = identifier.match(/<@!?(\d+)>/);
            let userId = null;
            
            if (discordUser) {
                userId = discordUser[1];
                // Ban the Discord user
                const user = await interaction.client.users.fetch(userId);
                await interaction.guild.members.ban(user, { reason });
            }

            // Check if user is already blacklisted
            const existingBan = await Blacklist.findOne({ 
                identifier: userId || identifier,
                type: 'both'
            });

            if (existingBan) {
                return await interaction.reply({
                    content: `User ${identifier} is already blacklisted!`,
                    ephemeral: true
                });
            }

            // Create new blacklist entry
            const ban = new Blacklist({
                identifier: userId || identifier,
                type: 'both',
                reason: reason
            });

            await ban.save();

            await interaction.reply({
                content: `Successfully blacklisted ${identifier}. Reason: ${reason}`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Error executing blacklist command:', error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    },
}; 