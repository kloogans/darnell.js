require('dotenv').config()
const token = process.env.DISCORD_TOKEN,
      getMedia = require('./commands/getMedia'),
      crypto = require('./commands/crypto'),
      films = require('./commands/films'),
      jokes = require('./commands/jokes'),
      vote = require('./commands/vote'),
      status = require('./commands/downDetect'),
      info = require('./commands/info'),
      Discord = require('discord.js'),
      fetch = require('node-fetch'),
      client = new Discord.Client(),
      filmKey = process.env.FILM_TOKEN

client.login(token)
client.on('ready', () => console.log('running'))
client.on('message', msg => {
  let message = msg.content.toLowerCase(),
      richEmbed = new Discord.RichEmbed(),
      prefix

  if (message.startsWith('darnell ')) prefix = 'darnell '
  if (message.startsWith('d ')) prefix = 'd '
  if (message.startsWith('. ')) prefix = '. '

  if (prefix) {
    const command = message.replace(prefix, ''),
        splitMessage = command.trim().split(' ')

    if (command.startsWith('film'))
      films.fetchFilmData(client, richEmbed, msg, splitMessage, filmKey)

    if (command.startsWith('crypto'))
      crypto.fetchCryptoPrice(richEmbed, msg, splitMessage[1])

    if (command.startsWith('vote')) vote.handleVote(richEmbed, msg, command)
    if (command.startsWith('check')) status.downDetect(richEmbed, msg, command)
    if (command === 'dank meme') getMedia.fetchRedditDankMeme(richEmbed, msg)
    if (command === 'twitter') getMedia.fetchRedditWPT(richEmbed, msg)
    if (command === 'cat fact') getMedia.fetchCatFact(msg)
    if (command === 'dad joke') jokes.fetchDadJoke(msg)
    if (command === 'help') info.help(richEmbed, msg)
  }
})
