//STARLING

//----
const version = "1.0.0"
const PREFIX = '*' //*ling
//-----------------------------
const Discord = require('discord.js')
const bot = new Discord.Client();
const token = 'NjAyOTc4OTQzODUwNTEyNDAz.XTY_Tg.jwQlC_7Lb083Nt-hbIWWzmhWzbY';
bot.login(token);
//-----------------------------

bot.on('ready', () => console.log ('online'))
//------------------


bot.on('message', msg => {

  let cont = msg.content.substring(PREFIX.length).split(" ");

  if (cont[0] === 'test') msg.react('602167310710472734')

  switch(cont[0]) {
    //help
    case 'help':
      msg.channel.sendMessage('s̸t̸i̵l̷l̵ ̴i̶n̶i̷t̵i̸a̴l̸i̶z̴i̷n̸g̸')
      break
    //poof
    case 'poof':
      if(!args[1]) msg.channel.sendMessage('ĭ̸̥n̴̰̅v̶̭̀a̵͔͝l̵̒ͅḭ̷͝d̴̗͌ ̵͈̇ȇ̵͇ń̴̞t̸̬̓ŕ̸͕y̴͈̓.̴̥̅')
        msg.channel.bulkDelete(args[1]);
      break
  }
})
