require('dotenv').config()
const token = process.env.DISCORD_TOKEN,
      getMedia = require('./commands/getMedia'),
      crypto = require('./commands/crypto'),
      films = require('./commands/films'),
      jokes = require('./commands/jokes'),
      vote = require('./commands/vote'),
      info = require('./commands/info'),
      Discord = require('discord.js'),
      fetch = require('node-fetch'),
      client = new Discord.Client(),
      movieKey = process.env.FILM_TOKEN,
      prefix = 'darnell '

client.login(token)
client.on('ready', () => console.log('running'))
client.on('message', msg => {
  let message = msg.content.toLowerCase(),
      richEmbed = new Discord.RichEmbed()
  if (message.startsWith('darnell ')) {
    const command = message.replace('darnell ', ''),
        splitMessage = command.trim().split(' ')
        
    if (command.startsWith('film'))
      films.fetchFilmData(client, richEmbed, msg, splitMessage, movieKey)

    if (command.startsWith('crypto'))
      crypto.fetchCryptoPrice(richEmbed, msg, splitMessage[1])

    if (command.startsWith('vote')) vote.handleVote(richEmbed, msg, command)
    if (command === 'dank meme') getMedia.fetchRedditDankMeme(richEmbed, msg)
    if (command === 'twitter') getMedia.fetchRedditWPT(richEmbed, msg)
    if (command === 'cat facts') getMedia.fetchCatFact(msg)
    if (command === 'dad joke') jokes.fetchDadJoke(msg)
    if (command === 'help') info.help(richEmbed, msg)
  }
})
