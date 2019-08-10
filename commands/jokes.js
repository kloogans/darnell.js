const fetch = require('node-fetch')

exports.fetchDadJoke = async msg => {
  try {
    const data = await fetch('https://icanhazdadjoke.com', {
      headers: { 'accept': 'application/json' }
    }),
          json = await data.json()
    msg.channel.send(json.joke)
  } catch(e) {
    msg.channel.send('Something went wrong, try again!')
    console.error('Dad Joke Error: ', e)
  }
}
