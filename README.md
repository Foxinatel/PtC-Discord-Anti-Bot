# PtC-Discord-Anti-Bot
A bot made for removing bulk advertising bots.
Since most self-bots are made in bulk with very similar origin dates, it's possible to identify possible bots by looking at the timestamp in their User ID.
The purpose of this project is to create a bot that will kick anyone who joins with an ID within a certain range.
Since it is possible that this would also impact genuine users, the bot will send a message containing a server link to the member before kicking them.
After being kicked, the user will also remain on a whitelist that stops them from being kicked the second time they join.

# Setup
* First we need to install discord.js
  * Open a new bash (cmd/git) into the bot directory
  * Now, type
    > npm install discord.js --save
* We also need to enter the bot token into the config.json file
