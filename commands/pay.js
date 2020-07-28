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

    let error = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle("Missing Parameters")
    .setDescription(`Correct usage: \`${prefix}pay <money> <user> [diamonds? (true or false)]\``)

    let syntaxError = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle("Syntax Error")
    .setDescription(`\`${args[0]}\` is not a valid number`)
    
    let user = message.mentions.users.first()
    if(!user) return message.channel.send(error)
    if(!args[0]) return message.channel.send(error)
    if(isNaN(args[0])) return message.channel.send(syntaxError)
    if (args[2] == "true" || args[2] == "d") {
        if(parseInt(args[0]) > diamondBal) return message.channel.send(notEnoughEmbed)
        else {
            const diamondEmoji = client.emojis.cache.find(emoji => emoji.name === "Diamondcurrency");
            db.subtract(`userInfo.diamondBalance_${message.author.id}`, parseInt(args[0].replace(/"/g,'')))
            db.add(`userInfo.diamondBalance_${user.id}`, parseInt(args[0].replace(/"/g,'')))
            let moneyEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .addField("Transition Complete", `:outbox_tray: <@${message.author.id}> **-${args[0]}${diamondEmoji}** \n \n :inbox_tray: <@${user.id}> **+${args[0]}${diamondEmoji}**`)
            message.reply(moneyEmbed)
        }
    } else {
        if(parseInt(args[0]) > bal) { 
            return message.channel.send(notEnoughEmbed)
        } else {
            db.subtract(`userInfo.balance_${message.author.id}`, parseInt(args[0].replace(/"/g,'')))
            db.add(`userInfo.balance_${user.id}`, parseInt(args[0].replace(/"/g,'')))
            let moneyEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .addField("Transition Complete", `:outbox_tray: <@${message.author.id}> **-${args[0]}$** \n \n :inbox_tray: <@${user.id}> **+${args[0]}$**`)
            message.reply(moneyEmbed)
        }
    }
    
    
    
    }

    // var userText = ""
    // var calcVal = 0
    // var prevVal = db.fetch(`userInfo.balance_${}`)
    // try {
    //     var throway = db.fetch(`userInfo.balance_${arg[0].id()}`)
    //     calcVal = fetchedBal-arg[1]
    //     try{
    //         otherVal = db.fetch(`userInfo.balance_${arg[0].id()}`)
    //     } catch(err){
    //         otherVal = 0
    //     }
    //     db.set(`userInfo.balance_${message.author.id}`, calcVal)
    //     db.set(`userInfo.balance_${arg[0].id()}`,throway + parseInt(arg[1]))
    // } catch(err) {
    //     userText = "User doesn't exist!"
    // }
