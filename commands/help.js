const fs = require('fs');
module.exports = {
    name: 'help',
	description: 'Show this help command',
	async execute (message, args) {
        message.channel.send(`\`\`\`\n${message.client.commands.map(command => `${command.name}: ${command.description}`).join('\n')}\n\`\`\``)
    }
}