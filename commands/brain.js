const brain = require('brain.js')
const net = new brain.recurrent.LSTM()

net.train([
	{input: "yo", output: "hi!"},
  {input: "how are you?", output: "thuper!"},
  {input: "where are you?", output: "next to you"}
], { iterations: 20 })

exports.brainMe = (richEmbed, msg, command) => {
  const output = net.run(command)
	msg.channel.send(output)
}
