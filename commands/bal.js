const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async (message, client, args, cmd) => {
    let commandFile = require(`./profile.js`)
    commandFile.run(message, client, args, cmd)
    // let user = message.mentions.users.first()
    // if(user) {
    //     let bal = 0
    //     let fetchedBal = await db.fetch(`userInfo.balance_${user.id}`)
    //     if(fetchedBal == null) fetchedBal = bal
    //     else bal = fetchedBal

    //     const ayy2 = client.emojis.cache.find(emoji => emoji.name === "Diamondcurrency");
    //     let diamondBal = 0
    //     let diamondFetchedBal = await db.fetch(`userInfo.diamondBalance_${user.id}`)
    //     if(diamondFetchedBal == null) diamondFetchedBal = diamondBal
    //     else diamondBal = diamondFetchedBal

    //     let embed = new Discord.MessageEmbed()
    //     .setTitle(`${user.tag}'s Balance`)
    //     .setThumbnail(user.avatarURL())
    //     .addField("Currency Balance", `$${bal}`, true)
    //     .addField("Diamond Balance", `${ayy2}${diamondBal}`, true)

    //     message.channel.send(embed)
    // } else {
    //     let bal = 0
    //     let fetchedBal = await db.fetch(`userInfo.balance_${message.author.id}`)
    //     if(fetchedBal == null) fetchedBal = bal
    //     else bal = fetchedBal

    //     const ayy2 = client.emojis.cache.find(emoji => emoji.name === "Diamondcurrency");
    //     let diamondBal = 0
    //     let diamondFetchedBal = await db.fetch(`userInfo.diamondBalance_${message.author.id}`)
    //     if(diamondFetchedBal == null) diamondFetchedBal = diamondBal
    //     else diamondBal = diamondFetchedBal

    //     let embed = new Discord.MessageEmbed()
    //     .setTitle(`${message.author.tag}'s Balance`)
    //     .setThumbnail(message.author.avatarURL())
    //     .addField("Currency Balance", `$${bal}`, true)
    //     .addField("Diamond Balance", `${ayy2}${diamondBal}`, true)

    //     message.channel.send(embed)
    // }
}