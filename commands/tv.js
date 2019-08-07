const fetch = require('node-fetch')

exports.fetchTVData = async (client, richEmbed, msg, film, movieKey) => {
  const emojis = {
    rotten: (client.emojis.get('604098654445502472')).toString(),
    metacritic: (client.emojis.get('604099414017048683')).toString(),
    imdb: (client.emojis.get('604100171130994701')).toString()
  }
  const url = `http://www.omdbapi.com/?apikey=${movieKey}&t=${film.slice(1, film.length).join('-')}`,
        data = await fetch(url),
        json = await data.json()

  try {
    if (json) {
      let emojiArr = [emojis.rotten, emojis.metacritic, emojis.imdb],
          ratings
      if (json.Ratings.length != 3) {
        ratings = null
      } else {
        ratings = `${emojis.rotten} ${json.Ratings[0].Value}   ${emojis.metacritic} ${json.Ratings[1].Value}  ${emojis.imdb} ${json.Ratings[2].Value}`
      }
      const details = `
      *${json.Genre}*
      *${json.Year}* - *${json.Rated}* - *${json.Runtime}*
      ${ratings ? ratings : '*No Ratings*'}
      Box Office: **${json.BoxOffice === 'N/A' || !json.BoxOffice ? '¯\\_(ツ)_/¯' : json.BoxOffice}**
      -----------------
      ${json.Plot}
      [See more](https://imdb.com/title/${json.imdbID})
      `
      const message = richEmbed.addField(json.Title, details)
                               .setImage(json.Poster)
                               .setThumbnail('https://imgur.com/F3COVih.png')
                               .setColor('#6e6fff')
      msg.channel.send(message)
    } else {
      msg.channel.send(`Couldn't find that one!`)
    }
  } catch(e) {
    console.error(e)
  }
}
