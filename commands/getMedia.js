const fetch = require('node-fetch')

exports.fetchRedditDankMeme = async (richEmbed, msg) => {
  const url = `https://www.reddit.com/r/dankmemes.json?sort=controversial&t=week&type=link`,
        data = await fetch(url),
        json = await data.json()
  try {
    if (json) {
      const rand = Math.ceil(Math.random() * (json.data.children.length - 1) + 1),
            post = json.data.children[rand].data,
            message = richEmbed.setTitle(post.title).setImage(post.url)
      msg.channel.send(message)
    }
  } catch(e) {
    console.error(e)
  }
}

exports.fetchRedditWPT = async (richEmbed, msg) => {
  const url = `https://www.reddit.com/r/whitepeopletwitter.json?sort=controversial&t=week&type=link`,
        data = await fetch(url),
        json = await data.json()
  try {
    if (json) {
      const rand = Math.ceil(Math.random() * (json.data.children.length - 1) + 1),
            post = json.data.children[rand].data
      if (post.post_hint === 'image' || post.post_hint === 'link') {
        const message = richEmbed.setTitle(post.title)
                                 .setImage(post.url)
         msg.channel.send(message)
      } else {
        fetchRedditWPT()
      }
      console.log('Twitter: ', post.url, post.post_hint)
    }
  } catch(e) {
    console.error(e)
  }
}

exports.fetchCatFact = async msg => {
  const data = await fetch('https://catfact.ninja/facts?limit=1'),
        json = await data.json()
  try {
    if (json) {
      msg.channel.send(json.data[0].fact)
    } else {
      msg.channel.send('Something went wrong, try again.')
    }
  } catch(e) {
    console.error(e)
  }
}
