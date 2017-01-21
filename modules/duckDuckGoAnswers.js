const DDG = require('node-ddg-api').DDG;
const ddg = new DDG('groupme-bot');
const htmlToText = require('html-to-text');

exports.process = (message, bot) => {
	const toSearchFor = "@? ";
    const index = message.text.toLowerCase().indexOf(toSearchFor);

	if (message.is_bot) {
        return;
    }

    //If we found the string we're looking for get results and send them
    if (index != -1) {
        //Get the string we are searching for.
        const toSearch = message.text.substring(index + toSearchFor.length);
        console.log('doing stuff')
		ddg.instantAnswer(toSearch, { skip_disambig: '0' }, function(err, response) {
			let message;
			response.RelatedTopics.forEach((topic) => console.log(topic.Text));
			if (response.Answer) {
				message = response.Answer;
			} else if (response.AbstractText) {
				message = response.AbstractText;
			} else if (response.RelatedTopics.length) {
				message = `${response.RelatedTopics[0].Text} (${response.RelatedTopics[0].FirstURL})`
			} else if (response.Redirect) {
				message = response.Redirect;
			} else {
				message = `Didn't find anything matching '${toSearch}'`
			}
			
			// Some answers come in as html, this cleans them up
			message = htmlToText.fromString(message);

			bot.sendMessage(message);
		});
    }
};