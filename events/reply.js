const { Events } = require("discord.js");
const { replies } = require("../settings.json");
const logger = require("../utils/log.js");

module.exports = {
	name: Events.MessageCreate,
	once: false,
	async execute(message, client) {
		splitString = message.content.toLowerCase().split(" ");

		if (client.user.id === message.author.id) {
			return;
		}

		for (let i = 0; i < splitString.length; i++) {
			if (splitString[i] in replies) {
				message.reply({
					content: replies[splitString[i]],
					allowedMentions: { repliedUser: false },
				});
				logger.info(
					`${message.author.tag} triggered keyword ${splitString[i]}, replied with ${replies[splitString[i]]}`,
				);
				return;
			}
		}
	},
};
