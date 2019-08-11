# Darnell.js
![Darnell Film](https://media.giphy.com/media/THUEXowAvmoVTt2Yix/giphy.gif)

[Invocations](#invocations) | [Commands](#commands) | [Examples](#examples) | [Installation](#installation)

Darnell is a multipurpose, Node powered Discord bot that can be used to fetch
data about films, tv shows, cryptocurrencies, reddit posts, and more.

## Invocations
Darnell can be invoked by using one of three prefixes:
`darnell`, `d`, or `.` followed by your command.


## Commands
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


![Darnell Help](https://media.giphy.com/media/Jrw7FDaVVOzpLXsN1y/giphy.gif)

## Examples
`darnell help`

`d film ready to rumble`

`. crypto ethereum`

`darnell vote should I rent ready to rumble`

`d cat fact`

`. tv angry beavers`


![Darnell Vote](https://media.giphy.com/media/YSlCzh6zd3tQqdqcWs/giphy.gif)
## Installation

Clone this repo:
`git clone https://github.com/notjamesobrien/darnell.js.git`

Move into the directory:
`cd darnell.js`

Install dependencies:
`npm install`

You'll need to create a new application and bot on the [Discord Developers page](https://discordapp.com/developers/applications/) so we can get an API token for Darnell.
[This guide](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
explains how to set up a Discord bot with your server.

You'll also need an API for the film database. You can get a key [here](http://www.omdbapi.com/apikey.aspx).

Once you have your tokens, create a .env file:
`touch .env` or just create the file in your IDE.

In your `.env` file, add your tokens:
```
DISCORD_TOKEN = <YOUR_TOKEN>
FILM_TOKEN = <YOUR_TOKEN>
```

Start Darnell:
`node .`


![Darnell Logo](https://images-ext-2.discordapp.net/external/-JmTLkN7zT_eZSkQMZ9sFiOSzVNZjiJgy60RJgYtK1g/https/imgur.com/fBidC4N.jpg)
