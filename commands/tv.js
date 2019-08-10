const fetch = require('node-fetch')

exports.fetchTVData = async (client, richEmbed, msg, title) => {
  const url = `https://api.tvmaze.com/singlesearch/shows?q=${title.slice(1, title.length).join('-')}`
  try {
    const data = await fetch(url),
          json = await data.json()

    const genres = json.genres.join(' - '),
          regex = /(<([^>]+)>)/ig,
          summary = json.summary.replace(regex, '')

    const details = `
*${genres}*
*${json.network ? json.network.name : 'Netflix'}* - *${json.status}* - *${json.runtime}min*
-----------------
${summary}
[See more](https://imdb.com/title/${json.externals.imdb})
`
    const message = richEmbed.addField(json.name, details)
                             .setImage(json.image.medium)
                             .setThumbnail('https://imgur.com/xQpeYk2.png')
                             .setColor('#d06eff')
    msg.channel.send(message)
  } catch(e) {
    console.error('CATCH', e)
    msg.channel.send(`${title} doesn't seem to exist.`)
  }
}
