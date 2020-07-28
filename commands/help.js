const db = require('quick.db')
const Discord = require('discord.js')
exports.run = async (message, client, args, cmd) => {
    let avatar = client.user.displayAvatarURL()
    let prefix = "--" 
    let fetchedPrefix = await db.fetch(`serverPrefix_${message.guild.id}`)
    if(fetchedPrefix === null || fetchedPrefix === undefined) fetchedPrefix = prefix
    else prefix = fetchedPrefix

    let embed = new Discord.MessageEmbed()
    // .setThumbnail(avatar)
    .setColor("#42dba6")
    .setDescription(`This is a list of commands you can use. You can get more info about a specific command by using \`${prefix}help [command]\` (e.g. \`${prefix}help profile)\``)
    .addField("Economy", `.`)
    .addField("Config", `.`)
    .addField("Info", `.`)
    .addField("Other", `.`)
    message.channel.send(embed)
}