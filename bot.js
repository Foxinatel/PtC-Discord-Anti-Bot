const fs = require('fs');
const Discord = require('discord.js');
const {token} = require('./config.json')

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('guildMemberAdd', async member => {
    const whitelist = JSON.parse((await fs.promises.readFile('./whitelist.json')).toString());
    const whitelistid = whitelist.find(id => id == member.id)
    if (whitelistid) {
        await fs.promises.writeFile('./whitelist.json', JSON.stringify(whitelist.filter(a => a != whitelistid)));
        return;
    }
    const ranges = JSON.parse((await fs.promises.readFile('./ranges.json')).toString());
    inrange = false;
    ranges.forEach(range => {
        if ((BigInt(range[0]) <= BigInt(member.id) && BigInt(member.id) <= BigInt(range[1])) || (BigInt(range[1]) <= BigInt(member.id) && BigInt(member.id) <= BigInt(range[0]))) {
            inrange = true;
        }
    });
    if(inrange) {
        var room = await member.createDM()
        try {
            await room.send("Due to the creation time of your account, you have been identified as a possible advertising bot.\nIf this is incorrect, please join back using the invite link: https://discord.gg/ZUv2gwM");
        } catch (error){console.log(error);}
        member.kick();
        whitelist.push(member.id);
        await fs.promises.writeFile('./whitelist.json', JSON.stringify(whitelist));
    }
})

client.on('message', async message => {
    const config = JSON.parse((await fs.promises.readFile('./config.json')).toString());
    if (!message.content.startsWith(config.prefix) || message.author.bot) {return;}
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    client.commands.get(command)?.execute(message,args);
})

client.login(token);