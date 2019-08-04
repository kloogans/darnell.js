const isReachable = require('is-reachable')

exports.downDetect = async (richEmbed, msg, command) => {
  const url = command.trim().split(' ').pop(),
        isUp = await isReachable(url)

  let message

  if (isUp) {
    message = richEmbed.setTitle(`${url} is up`)
                       .setThumbnail('https://imgur.com/fATQP1I.png')
                       .setColor('#3BCC58')
    msg.channel.send(message)
  } else {
    message = richEmbed.setTitle(`${url} is down`)
                       .setThumbnail('https://imgur.com/vX3Z7i0.png')
                       .setColor('#FF2C00')
    msg.channel.send(message)
  }
}
