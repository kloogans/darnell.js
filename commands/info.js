exports.help = (richEmbed, msg) => {
  const commands = `
    **darnell, d, or . **
  - _help_
  - vote + *your inquiry*
  - cat fact
  - dad joke
  - dank meme
  - twitter
  - film + *your movie*
  - tv + *your show*
  - crypto + *your cryptocurrecy*
  - check + *your website url*
  `
  const message = richEmbed.setTitle(`:fire: **yo i'm darnell** :fire:`)
                           .setImage('https://imgur.com/fBidC4N.jpg')
                           .setThumbnail('https://imgur.com/LkyCwm8.png')
                           .addField('commands', commands)
                           .setColor('#ff2681')
  msg.channel.send(message)
}
