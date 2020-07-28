const db = require("quick.db")
const Discord = require('discord.js')
exports.run = async  (message, client, args, cmd) => {
  let user = message.mentions.users.first()

  let bal = 0
  let fetchedBal = await db.fetch(`userInfo.balance_${message.author.id}`)
  if(fetchedBal === null) fetchedBal = bal
  else bal = fetchedBal
  
  let bal2 = 0
  let fetchedBal2 = await db.fetch(`userInfo.balance_${user.id}`)
  if(fetchedBal2 === null) fetchedBal2 = bal2
  else bal2 = fetchedBal2
  
  let fail = new Discord.MessageEmbed()
    .setColor("RED")
    .addField("Insufficent Permissions", "You require the permission: ``BOT OWNER``")
  
  if(message.author.id == "425624104901541888" || message.author.id == "594975379501088780") {
  
    if(!user) return message.channel.send("Please mention a user to send money to")
    if(!args[0]) return message.channel.send("Please provide an ammount of money to send")
    
    
    db.add(`userInfo.balance_${user.id}`, parseInt(args[0].replace(/"/g,'')))
    
  let moneyEmbed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .addField("Transition Complete", `:inbox_tray: <@${user.id}> **+${args[0]}$**`)
    //message.channel.send(`Sucessfully sent $${args[0]} to ${user.tag}`)
    message.reply(moneyEmbed)  

} else {
  return message.channel.send(fail)
}
  
}