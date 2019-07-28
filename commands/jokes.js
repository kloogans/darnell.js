const fetch = require('node-fetch')

exports.fetchDadJoke = async msg => {
  const data = await fetch('https://icanhazdadjoke.com', {
    headers: { 'accept': 'application/json' }
  })
  try {
    const json = await data.json()
    msg.channel.send(json.joke)
  } catch(e) {
    console.error(e)
  }
}
