exports.process = (message, bot) => {
	if (!message.is_bot) {
		bot.sendMessage(message.text);
	}
};