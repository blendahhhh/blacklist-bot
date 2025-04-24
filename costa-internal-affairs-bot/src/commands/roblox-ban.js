const { SlashCommandBuilder } = require('discord.js');
const Blacklist = require('../models/Blacklist');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roblox-ban')
        .setDescription('Bans a user from all Roblox-related services')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('The Roblox username to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the ban')
                .setRequired(true)),

    async execute(interaction) {
        const username = interaction.options.getString('username');
        const reason = interaction.options.getString('reason');

        try {
            // Check if user is already banned
            const existingBan = await Blacklist.findOne({ 
                identifier: username,
                type: { $in: ['roblox', 'both'] }
            });

            if (existingBan) {
                return await interaction.reply({
                    content: `User ${username} is already banned!`,
                    ephemeral: true
                });
            }

            // Create new ban entry
            const ban = new Blacklist({
                identifier: username,
                type: 'roblox',
                reason: reason
            });

            await ban.save();

            await interaction.reply({
                content: `Successfully banned ${username} from Roblox services. Reason: ${reason}`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Error executing roblox-ban command:', error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    },
}; 