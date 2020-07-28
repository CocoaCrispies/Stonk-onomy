const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async (message, client, args, cmd) => {
    const ayy = client.emojis.cache.find(emoji => emoji.name === "microcheck");
    const ayy2 = client.emojis.cache.find(emoji => emoji.name === "Diamondcurrency");

    let bal = 0
    let fetchedBal = await db.fetch(`userInfo.balance_${message.author.id}`)
    if(fetchedBal === null) fetchedBal = bal
    else bal = fetchedBal 
    
    let prefix = "--" 
    let fetchedPrefix = await db.fetch(`serverPrefix_${message.guild.id}`)
    if(fetchedPrefix === null || fetchedPrefix === undefined) fetchedPrefix = prefix
    else prefix = fetchedPrefix

    const microteam = client.emojis.cache.find(emoji => emoji.name === "Microteam");
    const shop = client.emojis.cache.find(emoji => emoji.name === "shop");

    let sEmbed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle(`${shop} **SHOP**`)
    .setDescription(`Welcome to the Shop. Here you can buy different things for your profile. You pay with your Cash/Diamonds \`${prefix}profile\``)
    .addField("Unique Badges", `These badges are unique and not buyable! \n \n ${microteam} - Staff Member \n :taco: - Beta Tester \n :crown: - Rich Beta User (more than $1,000,000 or ${ayy2}50,000 during Beta Testing)`)
    .addField("Profile Description", `$100 for a profile description \`${prefix}description <text here>\``)
    .addField("Badges", `You can buy all those badges! \`${prefix}badge <number>\` \n \n **BUY THE BADGES IN ORDER** \n \n **1** :ice_cream: *Ice cream for the win* - $1000 \n **2.** :four_leaf_clover:  *Lucky, Lucky* - $5000 \n **3** :bike: *Ring Ring* - $10000 \n **4** :taxi: *VROOM VROOM!* - $50000 \n **5** :star: *I'm a star!* -${ayy2}400 \n **6** :steam_locomotive: *I like trains* -${ayy2}1000`, false)
  
    message.channel.send(sEmbed)
}