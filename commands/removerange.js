const fs = require('fs');
module.exports = {
    name: 'removerange',
	description: 'Remove a range of blocked IDs',
	async execute (message, args) {
        const ranges = JSON.parse((await fs.promises.readFile('./ranges.json')).toString())
        ranges.splice(args[0],1)
        await fs.promises.writeFile('./ranges.json', JSON.stringify(ranges));
        message.channel.send(`Removed range from blacklist`)
    }
}