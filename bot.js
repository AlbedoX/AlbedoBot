const fs = require("node:fs");
const path = require("node:path");

const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./auth.json");

// Setup logger
const logger = require("./utils/log.js");
const { eventNames } = require("node:process");

// Init the client

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

// Loads commands dynamically

client.commands = {};
const commandFolders = fs.readdirSync(path.join(__dirname, "commands"));

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			logger.warn(
				`The command at ${filePath} is missing a required "data" or "execute" property.`,
			);
		}
	}
}

// Loads events dynamically

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
	.readdirSync(eventsPath)
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (!("name" in event) || !("once" in event) || !("execute" in event)) {
		logger.warn(
			`The event at ${filePath} is missing a required "name", "once" or "execute" property.`,
		);
		continue;
	}

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(token);
