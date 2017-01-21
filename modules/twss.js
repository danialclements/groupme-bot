const _ = require('lodash');
const joke = "http://i.giphy.com/ToMjGpMhVjTvjX5nLs4.gif";
const phrases = [
	/(is|was) so hard/,
	/can fit (it|that) in/,
	/take it out slowly/,
	/put your mouth on that/
];

exports.process = (message, bot) => {
	if (message.is_bot) {
        return;
    }
	
	// Check if any of the phrases match the message, if so send the joke text
	if ( _.some(phrases, (phrase) => phrase.test(message.text))) {
		bot.sendMessage(joke);
	}
}