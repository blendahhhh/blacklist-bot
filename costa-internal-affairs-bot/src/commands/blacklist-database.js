const { SlashCommandBuilder } = require('discord.js');
const Blacklist = require('../models/Blacklist');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist-database')
        .setDescription('Displays all blacklisted users from the database'),

    async execute(interaction) {
        try {
            const blacklistedUsers = await Blacklist.find().sort({ bannedAt: -1 });

            if (blacklistedUsers.length === 0) {
                return await interaction.reply({
                    content: 'No users are currently blacklisted.',
                    ephemeral: true
                });
            }

            const embed = {
                title: 'Blacklist Database',
                color: 0xFF0000,
                fields: blacklistedUsers.map(ban => ({
                    name: `ID: ${ban.identifier}`,
                    value: `Type: ${ban.type}\nReason: ${ban.reason}\nBanned At: ${ban.bannedAt.toLocaleString()}`,
                    inline: false
                })),
                timestamp: new Date()
            };

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error executing blacklist-database command:', error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    },
}; 