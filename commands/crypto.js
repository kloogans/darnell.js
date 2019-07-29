const fetch = require('node-fetch'),
      numbers = require('../utils/numbers')

exports.fetchCryptoPrice = async (richEmbed, msg, coin) => {
  const data = await fetch(`https://api.coincap.io/v2/assets/${coin}`),
        json = await data.json()
  try {
      const change = Number(json.data.changePercent24Hr),
            arrow = change > 0 ? ':small_red_triangle:' : ':small_red_triangle_down:',
            m = richEmbed.setColor("#50bbff")
                         .setThumbnail('https://imgur.com/vp4yF13.png')
                         .addField(json.data.name, `$${numbers.formatNum(Number(json.data.priceUsd).toFixed(2))}`)
                         .addField('24hr Change', `${arrow} ${(change).toFixed(2)}%`)
                         .addField('Traded Today', `$${numbers.formatNum(Number(json.data.volumeUsd24Hr).toFixed(2))}`)
      msg.channel.send(m)
  } catch(e) {
    console.error(e)
  }
}
