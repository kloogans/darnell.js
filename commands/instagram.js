const fetch = require("node-fetch")

const formatNum = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

// 167.99.121.93

exports.getUser = async (richEmbed, msg, username) => {
  const user = username[username.length - 1]
  const url = `http://167.99.121.93:5000/instagram?username=${user}`
  try {
    const data = await fetch(url)
    //   json = await data.json()
    const res = await data.json()
    console.log(res.user)

    const header = `
@${res.user.username}
Followers - Following
*${res.user.followed_by}* - *${res.user.following}*
`
    const message = richEmbed
      .addField(res.user.full_name, `@${res.user.username}`, true)
      .addField("Engagement Rate", `**${res.user.totalEngagementRate}%**`, true)
      .addField("Followers", formatNum(res.user.followed_by), true)
      .addField("Following", formatNum(res.user.following), true)
      .addField(
        "Average Likes",
        `:heart: ${formatNum(res.user.likes_avg)}`,
        true
      )
      .addField(
        "Average Comments",
        `:speech_balloon: ${formatNum(res.user.comments_avg)}`,
        true
      )
      .addField(
        "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
        `[See More](https://instagram.com/${res.user.username})`
      )
      .setThumbnail(res.user.profile_picture)
      .setColor("#eb15a7")

    msg.channel.send(message)
  } catch (e) {
    msg.channel.send(`Can't find that user. Try something else lol.`)
    console.error(`User ${user} doesn't exist.`)
  }
}
