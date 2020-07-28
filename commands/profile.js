const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async (message, client, args, cmd) => {

    let user = message.mentions.users.first()

    let prefix = "--" 
    let fetchedPrefix = await db.fetch(`serverPrefix_${message.guild.id}`)
    if(fetchedPrefix === null || fetchedPrefix === undefined) fetchedPrefix = prefix
    else prefix = fetchedPrefix

    if(user) {
        let bal = 0
        let fetchedBal = await db.fetch(`userInfo.balance_${user.id}`)
        if(fetchedBal == null) fetchedBal = bal
        else bal = fetchedBal

        const ayy2 = client.emojis.cache.find(emoji => emoji.name === "Diamondcurrency");
        let diamondBal = 0
        let diamondFetchedBal = await db.fetch(`userInfo.diamondBalance_${user.id}`)
        if(diamondFetchedBal == null) diamondFetchedBal = diamondBal
        else diamondBal = diamondFetchedBal

        let description = `Get a description by using \`${prefix}description <description>\``
        let fetchedDescription = await db.fetch(`userInfo.description_${user.id}`)
        if(fetchedDescription == null) fetchedDescription = description
        else description = fetchedDescription

        let rep = 0
        let fetchedrep = await db.fetch(`userInfo.rep_${user.id}`)
        if(fetchedrep === null || fetchedrep === undefined) fetchedrep = rep
        else rep = fetchedrep

        let badges = []
        let fetchedBadges = await db.fetch(`userInfo.items_${user.id}`)
        if(fetchedBadges == null) fetchedBadges = badges
        else badges = fetchedBadges

        if(badges.length <= 0) {
            let embed = new Discord.MessageEmbed()
            .setThumbnail(user.avatarURL())
            .setColor("BLUE")
            .setTitle(`${user.tag}'s Profile`)
            .setDescription(description)
            .addField("Badges:", `No badges, do \`${prefix}shop\` to view some options`)
            .addField("Currency Balance", `$${bal}`)
            .addField("Diamond Balance", `${ayy2}${diamondBal}`)
            .addField("Reputation", `:chart_with_upwards_trend: ${rep}`)
            message.channel.send(embed)
        } else if(user.id == "425624104901541888" || user.id == "594975379501088780") {
            const microteam = client.emojis.cache.find(emoji => emoji.name === "Microteam");
            let embed = new Discord.MessageEmbed()
            .setThumbnail(user.avatarURL())
            .setColor("BLUE")
            .setTitle(`${user.tag}'s Profile\n> **BOT DEVELOPER**`)
            .setDescription(description)
            .addField("Badges:", `:ice_cream: | :four_leaf_clover: | :bike: | :taxi: | :star: | :steam_locomotive: | ${microteam} | :taco: | :crown:`)
            // .addField("Badges:", badgesText)
            .addField("Currency Balance", `$${bal}`)
            .addField("Diamond Balance", `${ayy2}${diamondBal}`)
            .addField("Reputation", `:chart_with_upwards_trend: ${rep}`)
            message.channel.send(embed)
        } else {
            var badgesText = ""
            for(var i = 0; i < badges.length; i++) {
                if(badges[i] == badges[(badges.length-1)]) {
                    badgesText += `${badges[i]}`
                } else {
                    badgesText += `${badges[i]} | `
                }
            }
            const microteam = client.emojis.cache.find(emoji => emoji.name === "Microteam");
            let embed = new Discord.MessageEmbed()
            .setThumbnail(user.avatarURL())
            .setColor("BLUE")
            .setTitle(`${user.tag}'s Profile`)
            .setDescription(description)
            //.addField("Badges:", `:ice_cream: | :four_leaf_clover: | :bike: | :taxi: | :star: | :steam_locomotive: | ${microteam} | :taco: | :crown:`)
            .addField("Badges:", badgesText)
            .addField("Currency Balance", `$${bal}`)
            .addField("Diamond Balance", `${ayy2}${diamondBal}`)
            .addField("Reputation", `:chart_with_upwards_trend: ${rep}`)
            message.channel.send(embed)
        }
    } else {
        let bal = 0
        let fetchedBal = await db.fetch(`userInfo.balance_${message.author.id}`)
        if(fetchedBal == null) fetchedBal = bal
        else bal = fetchedBal

        const ayy2 = client.emojis.cache.find(emoji => emoji.name === "Diamondcurrency");
        let diamondBal = 0
        let diamondFetchedBal = await db.fetch(`userInfo.diamondBalance_${message.author.id}`)
        if(diamondFetchedBal == null) diamondFetchedBal = diamondBal
        else diamondBal = diamondFetchedBal

        let description = `Get a description by using \`${prefix}description <description>\``
        let fetchedDescription = await db.fetch(`userInfo.description_${message.author.id}`)
        if(fetchedDescription == null) fetchedDescription = description
        else description = fetchedDescription

        let rep = 0
        let fetchedrep = await db.fetch(`userInfo.rep_${message.author.id}`)
        if(fetchedrep === null || fetchedrep === undefined) fetchedrep = rep
        else rep = fetchedrep

        let badges = []
        let fetchedBadges = await db.fetch(`userInfo.items_${message.author.id}`)
        if(fetchedBadges == null) fetchedBadges = badges
        else badges = fetchedBadges

        if(badges.length <= 0) {
            let embed = new Discord.MessageEmbed()
            .setThumbnail(message.author.avatarURL())
            .setColor("BLUE")
            .setTitle(`${message.author.tag}'s Profile`)
            .setDescription(description)
            .addField("Badges:", `No badges, do \`${prefix}shop\` to view some options`)
            .addField("Currency Balance", `$${bal}`)
            .addField("Diamond Balance", `${ayy2}${diamondBal}`)
            .addField("Reputation", `:chart_with_upwards_trend: ${rep}`)
            message.channel.send(embed)
        } else if(message.author.id == "425624104901541888" || message.author.id == "594975379501088780") {
            const microteam = client.emojis.cache.find(emoji => emoji.name === "Microteam");
            let embed = new Discord.MessageEmbed()
            .setThumbnail(message.author.avatarURL())
            .setColor("BLUE")
            .setTitle(`${message.author.tag}'s Profile\n> **BOT DEVELOPER**`)
            .setDescription(description)
            .addField("Badges:", `:ice_cream: | :four_leaf_clover: | :bike: | :taxi: | :star: | :steam_locomotive: | ${microteam} | :taco: | :crown:`)
            // .addField("Badges:", badgesText)
            .addField("Currency Balance", `$${bal}`)
            .addField("Diamond Balance", `${ayy2}${diamondBal}`)
            .addField("Reputation", `:chart_with_upwards_trend: ${rep}`)
            message.channel.send(embed)
        } else {
            var badgesText = ""
            for(var i = 0; i < badges.length; i++) {
                if(badges[i] == badges[(badges.length-1)]) {
                    badgesText += `${badges[i]}`
                } else {
                    badgesText += `${badges[i]} | `
                }
            }
            const microteam = client.emojis.cache.find(emoji => emoji.name === "Microteam");
            let embed = new Discord.MessageEmbed()
            .setThumbnail(message.author.avatarURL())
            .setColor("BLUE")
            .setTitle(`${message.author.tag}'s Profile`)
            .setDescription(description)
            //.addField("Badges:", `:ice_cream: | :four_leaf_clover: | :bike: | :taxi: | :star: | :steam_locomotive: | ${microteam} | :taco: | :crown:`)
            .addField("Badges:", badgesText)
            .addField("Currency Balance", `$${bal}`)
            .addField("Diamond Balance", `${ayy2}${diamondBal}`)
            .addField("Reputation", `:chart_with_upwards_trend: ${rep}`)
            message.channel.send(embed)
        }
    }

   //const microteam = client.emojis.find(emoji => emoji.name === "Microteam");
}