# Costa Internal Affairs Bot

A Discord bot for managing Roblox and Discord bans with a shared blacklist database.

## Features

- `/roblox-ban <username> <reason>` - Ban a user from Roblox services
- `/discord-ban <@user> <reason>` - Ban a user from the Discord server
- `/blacklist <@user|username> <reason>` - Apply both Roblox and Discord bans
- `/blacklist-database` - View all blacklisted users

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   DISCORD_TOKEN=your_discord_bot_token_here
   MONGODB_URI=your_mongodb_connection_string_here
   ```
4. Start the bot:
   ```bash
   npm start
   ```

## Requirements

- Node.js v16.9.0 or higher
- MongoDB database
- Discord Bot Token
- Discord.js v14+
- Mongoose v8+

## Permissions

The bot requires the following Discord permissions:
- Ban Members
- Send Messages
- View Channels
- Read Message History

## Usage

1. Invite the bot to your server with the required permissions
2. Use the slash commands to manage bans:
   - `/roblox-ban` - Ban a Roblox user
   - `/discord-ban` - Ban a Discord user
   - `/blacklist` - Blacklist a user from both platforms
   - `/blacklist-database` - View all blacklisted users

## Security

- All ban commands are logged in the database
- Ban reasons are required for all commands
- Duplicate bans are prevented
- All commands are ephemeral (only visible to the command user) 