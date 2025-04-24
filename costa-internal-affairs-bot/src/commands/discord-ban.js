const { SlashCommandBuilder } = require('discord.js');
const Blacklist = require('../models/Blacklist');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('discord-ban')
        .setDescription('Bans a user from the Discord server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the ban')
                .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        try {
            // Check if user is already banned
            const existingBan = await Blacklist.findOne({ 
                identifier: user.id,
                type: { $in: ['discord', 'both'] }
            });

            if (existingBan) {
                return await interaction.reply({
                    content: `User ${user.tag} is already banned!`,
                    ephemeral: true
                });
            }

            // Ban the user from the server
            await interaction.guild.members.ban(user, { reason });

            // Create new ban entry
            const ban = new Blacklist({
                identifier: user.id,
                type: 'discord',
                reason: reason
            });

            await ban.save();

            await interaction.reply({
                content: `Successfully banned ${user.tag} from the server. Reason: ${reason}`,
                ephemeral: true
            });
        } catch (error) {
            console.error('Error executing discord-ban command:', error);
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    },
}; 