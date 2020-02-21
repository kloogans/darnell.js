const fetch = require("node-fetch")
const time = require('../utils/time')
const moment = require('moment')
const formatNum = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

// 167.99.121.93


exports.getUser = async (richEmbed, msg, username) => {
  const currTime = time.getCurrDateTime()
  const user = username[username.length - 1]
  const url = `https://api.stellr.digital/instagram?username=${user}`
  try {
    const data = await fetch(url)
    const res = await data.json()

    console.log(`${currTime}: Instagram user lookup - @${res.user.username}`)

    const header = `
@${res.user.username}
Followers - Following
*${res.user.followed_by}* - *${res.user.following}*
`
    const message = richEmbed
      .addField(res.user.full_name, `@${res.user.username}`, true)
      .addField(
        "Engagement Rate",
        `**${
        res.user.is_private ? ":lock:" : res.user.totalEngagementRate + "%"
        }**`,
        true
      )
      .addField("Followers", formatNum(res.user.followed_by), true)
      .addField("Following", formatNum(res.user.following), true)
      .addField(
        "Average Likes",
        `${
        res.user.is_private
          ? ":lock:"
          : ":heart: " + formatNum(res.user.likes_avg)
        }`,
        true
      )
      .addField(
        "Average Comments",
        `${
        res.user.is_private
          ? ":lock:"
          : ":speech_balloon: " + formatNum(res.user.comments_avg)
        }`,
        true
      )
      .addField(
        "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
        `[See More](https://instagram.com/${res.user.username})`
      )
      .setFooter(
        res.user.is_private
          ? `${res.user.full_name} has a private account`
          : `public account`
      )
      .setThumbnail(res.user.profile_picture)
      .setColor("#eb15a7")

    msg.channel.send(message)
  } catch (e) {
    msg.channel.send(`Can't find that user. Try something else.`)
    console.error(`${currTime}: Instagram lookup - ${user} doesn't exist.`)
  }
}
