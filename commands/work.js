const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async (message, client, args, cmd) => {

    let bal = 0
    let fetchedBal = await db.fetch(`userInfo.balance_${message.author.id}`)
    if(fetchedBal == null) fetchedBal = bal
    else bal = fetchedBal

    const ayy2 = client.emojis.cache.find(emoji => emoji.name === "Diamondcurrency");
    let diamondBal = 0
    let diamondFetchedBal = await db.fetch(`userInfo.diamondBalance_${message.author.id}`)
    if(diamondFetchedBal == null) diamondFetchedBal = diamondBal
    else diamondBal = diamondFetchedBal

    let rep = 0
    let fetchedrep = await db.fetch(`userInfo.rep_${message.author.id}`)
    if(fetchedrep === null || fetchedrep === undefined) fetchedrep = rep
    else rep = fetchedrep

    let jobs = ['as \`a janitor\`', 'as \`a teacher\`', 'as \`a programmer\`', 'as \`a prostitute\`', 'as \`a gamer\`', 'as \`a waiter\`', '\`at McDonalds\`']

    let job = Math.floor(Math.random() * jobs.length)
    let earnings = Math.floor(Math.random() * 1000) + 100
    let isSuccess = (Math.random() * 2) - (0.025 * rep)
    if(isSuccess < 1) {
        let success = new Discord.MessageEmbed()
        .setTitle("Success!")
        .setDescription(`You worked ${jobs[job]} and earned \`$${earnings}\`\nYour reputation was also increased by \`1\``)
        .setColor("GREEN")
        message.reply(success)
        db.add(`userInfo.balance_${message.author.id}`, earnings)
        db.add(`userInfo.rep_${message.author.id}`, 1)
    } else {
        let fail = new Discord.MessageEmbed()
        .setTitle("Fail!")
        .setDescription("No one would hire you :(")
        .setColor("RED")
        message.reply(fail)
    }
}