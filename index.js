require('dotenv').config()
const token = 'NjAyOTQ4MDk0MDYxMTgyOTc3.XT04sw.ZCtGJJVqYoHVLwk3mPw3VWhaHOc',
      getMedia = require('./commands/getMedia'),
      crypto = require('./commands/crypto'),
      films = require('./commands/films'),
      jokes = require('./commands/jokes'),
      vote = require('./commands/vote'),
      info = require('./commands/info'),
      fetch = require('node-fetch'),
      Discord = require('discord.js'),
      client = new Discord.Client(),
      movieKey = '360827b4'
      prefix = 'darnell '

let emojis

setTimeout(() => {
  emojis = {
    rotten: (client.emojis.get('604098654445502472')).toString(),
    metacritic: (client.emojis.get('604099414017048683')).toString(),
    imdb: (client.emojis.get('604100171130994701')).toString()
  }
}, 3000)

client.login(token)
client.on('ready', () => console.log('working'))
client.on('message', msg => {
  let message = msg.content.toLowerCase(),
      command = message.replace('darnell ', ''),
      richEmbed = new Discord.RichEmbed()

  if (message.includes('darnell crypto')) {
    const splitCommand = command.trim().split(' ')
    crypto.fetchCryptoPrice(richEmbed, msg, splitCommand[1])
  } else if (message.includes('darnell film')) {
    let splitMessage = message.trim().split(' '),
        film = splitMessage.slice(2, splitMessage.length).join('-')
    films.fetchFilmData(richEmbed, msg, film, movieKey, emojis)
  } else if (message.includes('darnell vote')) {
    vote.handleVote(richEmbed, msg, command)
  } else if (command === 'cat fact') {
    getMedia.fetchCatFact(msg)
  } else if ( command === 'dad joke' ) {
    jokes.fetchDadJoke(msg)
  } else if (command === 'dank meme') {
    getMedia.fetchRedditDankMeme(richEmbed, msg)
  } else if (command === 'twitter') {
    getMedia.fetchRedditWPT(richEmbed, msg)
  } else if (command === 'help') {
    info.help(richEmbed, msg)
  } else if (command === 'cocaine') {
    msg.channel.send('https://tenor.com/view/thad-castle-blue-mountain-state-alan-ritchson-cocaine-gif-14605274')
  } else {
    null
  }
})
