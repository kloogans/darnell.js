const fetch = require('node-fetch')

const request = require('request')

exports.downDetect = (richEmbed, msg, command) => {
  const url = command.trim().split(' ').pop()

  if (isValidURL(url)) {
    let message
    request('https://' + url, (error, res, body) => {

      if (error) console.log(error)
      if (res) {
        if (res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 202) {
          message = richEmbed.setTitle(res.statusCode)
                             .setDescription(`**${url}** is up`)
                             .setThumbnail('https://imgur.com/fATQP1I.png')
                             .setColor('#3BCC58')
          msg.channel.send(message)
        } else if (res.statusCode === 300 || res.statusCode === 301) {
          message = richEmbed.setTitle(res.statusCode)
                             .setDescription(`**${url}** is redirecting`)
                             .setThumbnail('https://imgur.com/vX3Z7i0.png')
                             .setColor('#fffc00')
          msg.channel.send(message)
        } else {
          message = richEmbed.setTitle(res.statusCode)
                             .setDescription(`**${url}** is down`)
                             .setThumbnail('https://imgur.com/vX3Z7i0.png')
                             .setColor('#FF2C00')
          msg.channel.send(message)
        }
      } else {
        msg.channel.send('Either the URL doesn\'t exist or something went wrong.')
      }
    })

  } else {
    msg.channel.send('not a valid URL')
  }












  //
  // if (!isDown) {
  //   message = richEmbed.setDescription(`**${url}** is up`)
  //                      .setThumbnail('https://imgur.com/fATQP1I.png')
  //                      .setColor('#3BCC58')
  //   msg.channel.send(message)
  // } else {
  //   message = richEmbed.setDescription(`**${url}** is down`)
  //                      .setThumbnail('https://imgur.com/vX3Z7i0.png')
  //                      .setColor('#FF2C00')
  //   msg.channel.send(message)
  // }
}


const isValidURL = url => {
  let input = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
  return (input !== null)
}
