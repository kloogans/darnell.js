exports.help = (richEmbed, msg) => {

  const description = `
  i love cocaine
  i don't know how to read
  but here's some commands
  that you might need
  _-darnell nascar pepsi darnell_
  `

  const commands = `
  - _help_
  - vote + *your inquiry*
  - cat fact
  - dad joke
  - dank meme
  - twitter
  - film + *your movie*
  - crypto + *your cryptocurrecy*
  `

  const message = richEmbed.setTitle(`:fire: **yo i'm darnell** :fire:`)
                           .setImage('https://imgur.com/fBidC4N.jpg')
                           .setThumbnail('https://imgur.com/LkyCwm8.png')
                           .addField('commands', commands)
                           .setColor('#ff2681')
  msg.channel.send(message)
}
