const fetch = require('node-fetch'),
      Discord = require('discord.js'),
      client = new Discord.Client(),
      token = 'NjAyOTQ4MDk0MDYxMTgyOTc3.XTZvjA.cDE2b1MO5wBLUzwF5zs7GBY1bqo',
      movieKey = '360827b4'
      prefix = 'darnell '

let carbonLevel,
    cryptoData,
    catFact,
    dadJoke,
    filmFacts

const formatNum = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

let emojis

setTimeout(() => {
  emojis = {
    rotten: (client.emojis.get('604098654445502472')).toString(),
    metacritic: (client.emojis.get('604099414017048683')).toString(),
    imdb: (client.emojis.get('604100171130994701')).toString()
  }
}, 3000)

const fetchCarbonContent = async () => {
  const data = await fetch('http://www.hqcasanova.com/co2'),
        ppm = await data.text()
  try {
    carbonLevel = ppm
    return ppm
  } catch(e) {
    console.error(e)
  }
}

fetchCarbonContent()

const fetchCryptoPrice = async coin => {
  const data = await fetch(`https://api.coincap.io/v2/assets/${coin}`),
        json = await data.json()

  try {
    cryptoData = json
  } catch(e) {
    console.error(e)
  }
}

const fetchCatFact = async () => {
  const data = await fetch('https://catfact.ninja/facts?limit=1'),
        json = await data.json()

  try {
    if (json) {
      catFact = json.data[0].fact
    } else {
      catFact = 'something went wrong, try again unless you\'re a candy corn bitch'
    }
  } catch(e) {
    console.error(e)
  }
}

const fetchDadJoke = async () => {
  const data = await fetch('https://icanhazdadjoke.com', {
    headers: {
  		'accept': 'application/json'
  	}
  })
  try {
    const json = await data.json()
    dadJoke = json.joke
  } catch(e) {
    console.error(e)
  }
}

fetchDadJoke()

fetchFilmData = async film => {
  const url = `http://www.omdbapi.com/?apikey=${movieKey}&t=${film}`
  const data = await fetch(url),
        json = await data.json()

  try {
    if (json && json.Title) {
      const emojiArr = [emojis.rotten, emojis.metacritic, emojis.imdb]
      let ratings
      if (json.Ratings.length != 3) {
        ratings = null
      } else {
        ratings = `${emojis.rotten} ${json.Ratings[0].Value}  ${emojis.metacritic} ${json.Ratings[1].Value} ${emojis.imdb} ${json.Ratings[2].Value}`
      }
      filmFacts = `
**${json.Title}**
*${json.Year}* - *${json.Rated}* - *${json.Runtime}*
${ratings ? ratings : '*No Ratings*'}
${json.Genre}
Box Office: **${json.BoxOffice}**
-----------------
${json.Plot}
${json.Poster}
      `
    } else {
      filmFacts = `couldn't find that one, try again without being so fucken stupid`
    }
  } catch(e) {
    console.error(e)
  }
}

client.login(token)
client.on('ready', () => console.log('working'))
client.on('message', msg => {
  let coin
  let film
  let messg = msg.content.toLowerCase()
  let args = messg.substring(prefix.length).split(" ")

  let command = messg.replace('darnell ', '')
  if (command.includes('crypto')) {
    const splitCommand = command.trim().split(' ')
    coin = splitCommand[1]
    fetchCryptoPrice(coin).then(() => {
      const change = Number(cryptoData.data.changePercent24Hr),
            arrow = change > 0 ? ':arrow_up:' : ':arrow_down:',
            message = `
**${cryptoData.data.name}**
$${formatNum(Number(cryptoData.data.priceUsd).toFixed(2))}
${arrow} ${(change).toFixed(2)}%
$${formatNum(Number(cryptoData.data.volumeUsd24Hr).toFixed(2))} traded today
`
      if (cryptoData) msg.channel.send(message)
    }).catch(e => console.error(e))
  } else if (messg.includes('darnell film')) {
    let splitMessage = messg.trim().split(' '),
        film = splitMessage.slice(2, splitMessage.length).join('-')
    fetchFilmData(film).then(() => {
      msg.channel.send(filmFacts)
    }).catch(e => console.error(e))
  } else if (command === 'play despacito') {
    msg.channel.send('how about fucking no')
  } else if (command === 'cat fact') {
    fetchCatFact().then(() => msg.channel.send(catFact)).catch(e => console.error(e))
  } else if ( command === 'dad joke' ) {
      fetchDadJoke()
      msg.channel.send(dadJoke)
  } else if (command === 'help') {
    const message = `
**yo i'm darnell**
i love cocaine
i don't know how to read
but here's some commands
that you might need
  _-darnell nascar pepsi darnell_

**darnell**
- _help_
- hello
- cat fact
- dad joke
- film + your movie
- crypto + your cryptocurrecy
- carbon
https://imgur.com/fBidC4N.jpg
`
    msg.channel.send(message)

  } else if (command === 'cocaine') {
    msg.channel.send('https://tenor.com/view/thad-castle-blue-mountain-state-alan-ritchson-cocaine-gif-14605274')
  } else {
    null
  }

  switch (args[0]) {
    case 'hello':
      msg.reply('_sup_ lmao')
      break
    case 'carbon':
      msg.channel.send(`Current atmospheric carbon is **${carbonLevel}**`)
      break
    case 'darnell':
      msg.reply('that\'s **darnell nascar pepsi darnell** to you')
      break
  }
})
