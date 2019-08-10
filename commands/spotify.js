require('dotenv').config()
const SpotifyWebApi = require('spotify-web-api-node'),
      token = process.env.SPOTIFY_TOKEN

const spotify = new SpotifyWebApi({
  clientId: '1aeafb8b95624e78ac86adb2f16bf06d',
  clientSecret: '02d9983979424b75bf3875c3ac979813'
})



exports.handlePlaylist = (richEmbed, msg) => {
  spotify.setAccessToken(token)
  spotify.searchArtists('Prince', {  limit: 1 })
         .then(r => console.log(r.body.artists.items))
         .catch(e => console.log('SPOTIFY ERROR: ', e))
}
