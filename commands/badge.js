const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async (message, client, args, cmd) => {

    const ayy = client.emojis.cache.find(emoji => emoji.name === "microcheck");

    let prefix = "--" 
    let fetchedPrefix = await db.fetch(`serverPrefix_${message.guild.id}`)
    if(fetchedPrefix === null || fetchedPrefix === undefined) fetchedPrefix = prefix
    else prefix = fetchedPrefix

    let bal = 0
    let fetchedBal = await db.fetch(`userInfo.balance_${message.author.id}`)
    if(fetchedBal == null) fetchedBal = bal
    else bal = fetchedBal

    const ayy2 = client.emojis.cache.find(emoji => emoji.name === "Diamondcurrency");
    let diamondBal = 0
    let diamondFetchedBal = await db.fetch(`userInfo.diamondBalance_${message.author.id}`)
    if(diamondFetchedBal == null) diamondFetchedBal = diamondBal
    else diamondBal = diamondFetchedBal

    let badges = []
    let fetchedBadges = await db.fetch(`userInfo.items_${message.author.id}`)
    if(fetchedBadges == null) fetchedBadges = badges
    else badges = fetchedBadges

    let notEnoughEmbed = new Discord.MessageEmbed()
    .setTitle("Not Enough Money")
    .setColor("RED")

    let alreadyHas = new Discord.MessageEmbed()
    .setTitle("You already have this item")
    .setColor("RED")
    
    if(args == "1") {
        if(badges.includes(":ice_cream:")) return message.channel.send(alreadyHas)
        if(bal < 1000) return message.channel.send(notEnoughEmbed)
        if(bal >= 1000) {
            db.subtract(`userInfo.balance_${message.author.id}`, 1000)
            db.push(`userInfo.items_${message.author.id}`, ":ice_cream:")
            let purchased = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`${ayy} Purchase Successful`)
            .setDescription("Bought badge ``Ice Cream`` - :ice_cream:")
            message.channel.send(purchased)
        }
    } else if(args == "2") {
        if(badges.includes(":four_leaf_clover:")) return message.channel.send(alreadyHas)
        if(bal < 5000) return message.channel.send(notEnoughEmbed)
        if(bal >= 5000) {
            db.subtract(`userInfo.balance_${message.author.id}`, 5000)
            db.push(`userInfo.items_${message.author.id}`, ":four_leaf_clover:")
            let purchased = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`${ayy} Purchase Successful`)
            .setDescription("Bought badge ``Clover`` - :four_leaf_clover:")
            message.channel.send(purchased)
        }
    } else if(args == "3") {
        if(badges.includes(":bike:")) return message.channel.send(alreadyHas)
        if(bal < 10000) return message.channel.send(notEnoughEmbed)
        if(bal >= 10000) {
            db.subtract(`userInfo.balance_${message.author.id}`, 10000)
            db.push(`userInfo.items_${message.author.id}`, ":bike:")
            let purchased = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`${ayy} Purchase Successful`)
            .setDescription("Bought badge ``Bike`` - :bike:")
            message.channel.send(purchased)
        }
    } else if(args == "4") {
        if(badges.includes(":taxi:")) return message.channel.send(alreadyHas)
        if(bal < 50000) return message.channel.send(notEnoughEmbed)
        if(bal >= 50000) {
            db.subtract(`userInfo.balance_${message.author.id}`, 50000)
            db.push(`userInfo.items_${message.author.id}`, ":taxi:")
            let purchased = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`${ayy} Purchase Successful`)
            .setDescription("Bought badge ``Car`` - :taxi:")
            message.channel.send(purchased)
        }
    } else if(args == "5") {
        if(badges.includes(":star:")) return message.channel.send(alreadyHas)
        if(diamondBal < 400) return message.channel.send(notEnoughEmbed)
        if(diamondBal >= 400) {
            db.subtract(`userInfo.diamondBalance_${message.author.id}`, 400)
            db.push(`userInfo.items_${message.author.id}`, ":star:")
            let purchased = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`${ayy} Purchase Successful`)
            .setDescription("Bought badge ``Star`` - :star:")
            message.channel.send(purchased)
        }
    } else if(args == "6") {
        if(badges.includes(":steam_locomotive:")) return message.channel.send(alreadyHas)
        if(diamondBal < 1000) return message.channel.send(notEnoughEmbed)
        if(diamondBal >= 1000) {
            db.subtract(`userInfo.diamondBalance_${message.author.id}`, 1000)
            db.push(`userInfo.items_${message.author.id}`, ":steam_locomotive:")
            let purchased = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`${ayy} Purchase Successful`)
            .setDescription("Bought badge ``Train`` - :steam_locomotive:")
            message.channel.send(purchased)
        }
    } else {
        let noArgs = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Missing Parameters")
        .setDescription(`Correct usage: \`${prefix}badge <badge number>\``)
        let argsHave = new Discord.MessageEmbed()
        .setTitle("This badge does not exist")
        .setColor("RED")
        if(args[0]) return message.channel.send(argsHave)
        else return message.channel.send(noArgs)
    }
}