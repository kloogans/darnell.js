const Twit = require('twit')
const T = new Twit({
    consumer_key: process.env.TW_CONSUMER,
    consumer_secret: process.env.TW_CONSUMER_SECRET,
    access_token: process.env.TW_ACCESS_TOKEN,
    access_token_secret: process.env.TW_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: true
})

exports.fetchTwitterProfile = (richEmbed, msg, username) => {
    T.get('users/lookup', { screen_name: username[1] }, (err, data, response) => {
        // console.log('user data: ', data[0])
        const res = data[0]
        const message = richEmbed
            .setURL(`https://twitter.com/${res.screen_name}`)
            .addField(res.name, `[@${res.screen_name}](https://twitter.com/${res.screen_name})`)
            .addField("Tweets", res.statuses_count, true)
            .addField('Followers', res.followers_count, true)
            .addField('Following', res.friends_count, true)
            .addField(
                "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
                `[See More](https://twitter.com/${res.screen_name})`
            )
            .setThumbnail(res.profile_image_url_https)
            .setColor('#1da0f2')

        msg.channel.send(message)
    })
}


exports.fetchTwitterLatestPost = (richEmbed, msg, username) => {
    console.log('fetching post')
    T.get('statuses/user_timeline', { screen_name: username[1], include_rts: false, exclude_replies: true, count: 1 }, (err, data, response) => {
        msg.channel.send(`https://twitter.com/${username[1]}/status/${data[0].id_str}`)
    })
}
