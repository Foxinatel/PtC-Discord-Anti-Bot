const fs = require('fs');
module.exports = {
    name: 'prefix',
	description: 'Change bot prefix',
	async execute (message, args) {
        const config = JSON.parse((await fs.promises.readFile('./config.json')).toString())
        config.prefix = args[0]
        await fs.promises.writeFile('./config.json', JSON.stringify(config));
        message.channel.send(`Prefix is now set to ${args[0]}`);
    }
}