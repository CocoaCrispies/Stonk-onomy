const db = require('quick.db')
const Discord = require('discord.js')
exports.run = (message, client, args, command) => {
  
  function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  
  let fail = new Discord.MessageEmbed()
.setColor("RED")
.addField("Insufficent Permissions", "You require the permission: ``BOT OWNER``")
  
    if(message.author.id == "425624104901541888" || message.author.id == "594975379501088780") {
        try {
        const code = args.join(" ");
        let evaled = eval(code);
    
        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
    
        message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    } else {
        message.channel.send(fail)
        console.log(message.author.tag + " tried to run the Eval Command")
    }
}