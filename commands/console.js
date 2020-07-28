const db = require("quick.db")
const Discord = require('discord.js')
exports.run = async  (message, client, args, cmd) => {
    const ayy = client.emojis.cache.find(emoji => emoji.name === "Microcheck");
    let database = await db.fetch(`userInfo`)
    console.log(database["balance_"])
    // for(var i = 0; i < database.length; i++) {
        
    // }
}