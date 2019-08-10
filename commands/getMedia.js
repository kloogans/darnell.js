const fetch = require('node-fetch')

exports.fetchRedditDankMeme = async (richEmbed, msg) => {
  const url = `https://www.reddit.com/r/dankmemes.json?sort=controversial&t=week&type=link`
  try {
    const data = await fetch(url),
          json = await data.json()

    const rand = Math.ceil(Math.random() * (json.data.children.length - 1) + 1),
          post = json.data.children[rand].data,
          message = richEmbed.setTitle(post.title).setImage(post.url)
    msg.channel.send(message)
  } catch(e) {
    msg.channel.send('Something went wrong, try again!')
    console.error('Reddit Dank Meme Error: ', e)
  }
}

exports.fetchRedditWPT = async (richEmbed, msg) => {
  const url = `https://www.reddit.com/r/whitepeopletwitter.json?sort=controversial&t=week&type=link`
  try {
    const data = await fetch(url),
          json = await data.json()

    const rand = Math.ceil(Math.random() * (json.data.children.length - 1) + 1),
          post = json.data.children[rand].data

    if (post.post_hint === 'image' || post.post_hint === 'link') {
      const message = richEmbed.setTitle(post.title).setImage(post.url)
      msg.channel.send(message)
    } else {
      fetchRedditWPT()
    }
  } catch(e) {
    msg.channel.send('Something went wrong, try again!')
    console.error('Reddit WPT Error: ', e)
  }
}

exports.fetchCatFact = async msg => {
  try {
    const data = await fetch('https://catfact.ninja/facts?limit=1'),
          json = await data.json()
    msg.channel.send(json.data[0].fact)
  } catch(e) {
    msg.channel.send('Something went wrong, try again!')
    console.error('Cat Fact Error: ', e)
  }
}
