exports.handleVote = (bot, msg, command) => {
  const text = command.trim().split(' '),
        textCut = text.slice(1, text.length).join(' '),
        name = (msg.author.tag).substring(0, msg.author.tag.length - 5),
        message = bot.addField(name, textCut)
                     .setColor('#5bf63b')
                     .setThumbnail('https://imgur.com/YT0uxGD.png')
  msg.channel.send(message).then(sent => {
    sent.react("👍")
    setTimeout(() => {
      sent.react("👎")
    }, 500)
  }).catch(e => console.error(e))
}
