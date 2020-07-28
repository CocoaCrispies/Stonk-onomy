const Discord = require('discord.js');
const db = require('quick.db')
const client = new Discord.Client();

const cooldowns = new Discord.Collection()

client.on("ready", () => {
  console.log("torbado")
  client.user.setActivity("with my money poorly", {
  type: "PLAYING"
});
})

client.on("message", async message => {
  
  let prefix = "--" 
  let fetchedPrefix = await db.fetch(`serverPrefix_${message.guild.id}`)
  if(fetchedPrefix === null || fetchedPrefix === undefined) fetchedPrefix = prefix
  else prefix = fetchedPrefix
  
  let args = message.content.slice(prefix.length).trim().split(" ")
  let cmd = args.shift().toLowerCase()
  
  if(message.author.bot) return
  
  if(message.content == "<@725745327172223049>" || message.content == "<@!725745327172223049>") {
    message.reply("My prefix for this server is ``" + prefix + "``") 
  }
  if(!message.content.startsWith(prefix)) return

  function fancyTimeFormat(duration)
  {   
      // Hours, minutes and seconds
      var hrs = ~~(duration / 3600);
      var mins = ~~((duration % 3600) / 60);
      var secs = ~~duration % 60;

      // Output like "1:01" or "4:03:59" or "123:03:59"
      var ret = "";

      if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }

      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
  }

  if(!cooldowns.has(message.author.id)) {
    cooldowns.set(message.author.id, new Discord.Collection())
  }

  const now = Date.now()
  const timestamps = cooldowns.get(message.author.id)
  const cooldownAmount = 300000
  
  if(timestamps.has(message.author.id) && cmd === 'work') {
    const experationTime = timestamps.get(message.author.id) + cooldownAmount

    if(now < experationTime) {
      const timeLeft = (experationTime - now) / 1000
      let timeLeftEmbed = new Discord.MessageEmbed()
      .setTitle("You are on cooldown!")
      .setDescription(`:stopwatch: You must wait ${fancyTimeFormat(timeLeft.toFixed(1))} before working again`)
      return message.reply(timeLeftEmbed)
      // return message.reply(`please wait ${fancyTimeFormat(timeLeft.toFixed(1))} before using \`${cmd}\` again`)
    }
  }
  if(cmd === 'work') {
    // console.log("ok")
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  try {
    //message.channel.send("My money database has been reset, I am sorry for the inconvenience. If you have any concerns")
    let commandFile = require(`./commands/${cmd}.js`)
    commandFile.run(message, client, args, cmd)
    
  } catch(e) {
   console.log(e.stack) 
  }
  
})

client.login(process.env.SECRET)