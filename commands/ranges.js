const fs = require('fs');
module.exports = {
    name: 'ranges',
	description: 'Display currently blocked ranges',
	async execute (message, args) {
        const ranges = JSON.parse((await fs.promises.readFile('./ranges.json')).toString());
        message.channel.send("Ranges currently blocked:" + ranges.map((range,index) => `\n${index}: ${Math.min(...range)}-${Math.max(...range)}`))
    }
}