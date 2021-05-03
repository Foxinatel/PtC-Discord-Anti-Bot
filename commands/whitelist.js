const fs = require('fs');
module.exports = {
    name: 'whitelist',
	description: 'Display users on the whitelist',
	async execute (message, args) {
        const whitelist = JSON.parse((await fs.promises.readFile('./whitelist.json')).toString())
        message.channel.send("Users currently on the whitelist:" + whitelist.map((id,index) => `\n${index}: ${id}`))
    }
}