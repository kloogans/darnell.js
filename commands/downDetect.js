const fetch = require('node-fetch')

exports.downDetect = async (richEmbed, msg, command) => {
  const url = command.trim().split(' ').pop(),
        res = await fetch(`https://isitdown.site/api/v3/${url}`),
        json = await res.json(),
        isDown = json.isitdown

  let message

  if (!isDown) {
    message = richEmbed.setDescription(`**${url}** is up`)
                       .setThumbnail('https://imgur.com/fATQP1I.png')
                       .setColor('#3BCC58')
    msg.channel.send(message)
  } else {
    message = richEmbed.setDescription(`**${url}** is down`)
                       .setThumbnail('https://imgur.com/vX3Z7i0.png')
                       .setColor('#FF2C00')
    msg.channel.send(message)
  }
}
