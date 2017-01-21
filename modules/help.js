const helpMessage = 'https://github.com/danialclements/groupme-bot/blob/master/help.md'

exports.process = (message, bot) => {
	const toSearchFor = "@help";
	const index = message.text.toLowerCase().indexOf(toSearchFor);

	if (message.is_bot) {
        return;
    }


    //If we found the string we're looking for get results and send them
    if (index != -1) {
        bot.sendMessage(helpMessage);
    }
};