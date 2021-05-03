const fs = require('fs');
module.exports = {
    name: 'addrange',
	description: 'Add a new range of blocked IDs',
	async execute (message, args) {
        const ranges = JSON.parse((await fs.promises.readFile('./ranges.json')).toString())
        ranges.push(args.slice(0,2))
        await fs.promises.writeFile('./ranges.json', JSON.stringify(ranges));
        message.channel.send(`Added new range to blacklist: ${args.slice(0,2)}`)
    }
}