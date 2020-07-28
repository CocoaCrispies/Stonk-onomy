const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async (message, client, args, cmd) => {
    const ayy = client.emojis.cache.find(emoji => emoji.name === "microcheck");

    let prefix = "--" 
    let fetchedPrefix = await db.fetch(`serverPrefix_${message.guild.id}`)
    if(fetchedPrefix === null || fetchedPrefix === undefined) fetchedPrefix = prefix
    else prefix = fetchedPrefix

    let description = `Get a description by using \`${prefix}description <description>\``
    let fetchedDescription = await db.fetch(`userInfo.description_${message.author.id}`)
    if(fetchedDescription == null) fetchedDescription = description
    else description = fetchedDescription

    let bal = 0
    let fetchedBal = await db.fetch(`userInfo.balance_${message.author.id}`)
    if(fetchedBal == null) fetchedBal = bal
    else bal = fetchedBal

    let notEnoughEmbed = new Discord.MessageEmbed()
    .setTitle("Not Enough Money")
    .setColor("RED")

    let error = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle("Missing Parameters")
    .setDescription(`Correct usage: \`${prefix}description <text here>\``)

    if(!args[0]) return message.channel.send(error)
    if(bal < 100) return message.channel.send(notEnoughEmbed) 
    else if(bal >= 100) {
        db.subtract(`userInfo.balance_${message.author.id}`, 100)
        await db.set(`userInfo.description_${message.author.id}`, args.join(" "))
        let success = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`${ayy} Success!`)
        .setDescription("Description set to ``" + args.join(" ") + "``")
        message.channel.send(success)
    }
}