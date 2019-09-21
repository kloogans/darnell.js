require("dotenv").config()
const token = process.env.DISCORD_TOKEN,
  getMedia = require("./commands/getMedia"),
  status = require("./commands/downDetect"),
  spotify = require("./commands/spotify"),
  crypto = require("./commands/crypto"),
  instagram = require("./commands/instagram"),
  films = require("./commands/films"),
  jokes = require("./commands/jokes"),
  vote = require("./commands/vote"),
  info = require("./commands/info"),
  Discord = require("discord.js"),
  fetch = require("node-fetch"),
  tv = require("./commands/tv"),
  client = new Discord.Client(),
  filmKey = process.env.FILM_TOKEN

client.login(token)
client.on("ready", () => console.log("running"))
client.on("message", msg => {
  let message = msg.content.toLowerCase(),
    richEmbed = new Discord.RichEmbed(),
    prefix

  if (message.startsWith("darnell ")) prefix = "darnell "
  if (message.startsWith("d ")) prefix = "d "
  if (message.startsWith(". ")) prefix = ". "

  if (message === "darnell" || message === "d" || message === ".")
    msg.channel.send("what lol")

  if (prefix) {
    const command = message.replace(prefix, ""),
      splitMessage = command.trim().split(" ")

    if (command.startsWith("film"))
      films.fetchFilmData(client, richEmbed, msg, splitMessage, filmKey)
    if (command.startsWith("crypto"))
      crypto.fetchCryptoPrice(richEmbed, msg, splitMessage[1])
    if (command.startsWith("tv"))
      tv.fetchTVData(client, richEmbed, msg, splitMessage)
    if (command.startsWith("check")) status.downDetect(richEmbed, msg, command)
    if (command.startsWith("vote")) vote.handleVote(richEmbed, msg, command)
    if (command.startsWith("spotify")) spotify.handlePlaylist(richEmbed, msg)
    if (command.startsWith("instagram") || command.startsWith("ig"))
      instagram.getUser(richEmbed, msg, splitMessage)
    if (command === "dank meme") getMedia.fetchRedditDankMeme(richEmbed, msg)
    if (command === "twitter") getMedia.fetchRedditWPT(richEmbed, msg)
    if (command === "cat fact") getMedia.fetchCatFact(msg)
    if (command === "dad joke") jokes.fetchDadJoke(msg)
    if (command === "help") info.help(richEmbed, msg)
  }
})
