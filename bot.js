var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    if (message.substring(0, 1) == '/') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'Fucky':
                bot.sendMessage({
                    to: channelID,
                    message: 'Wucky!'
                });
                break; // This is to quit out of the switch statement
            case 'Mom´s':
                bot.sendMessage({
                    to: channelID,
                    message: 'Spaghetti!'
                });
                break;
                case 'Tim':
                    bot.sendMessage({
                        to: channelID,
                        message: 'is my Father!'
                    });
                    break;
        }
    }
});
