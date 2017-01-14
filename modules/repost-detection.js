const _ = require('lodash');
const posts = {};
const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

function addPost(message = {}) {
	let user = message.user;
	if (user) {
		let userPosts = posts[message.user] || [];

		userPosts.push(_.extend(message, {
			time: Date.now()
		}));

		posts[message.user] = userPosts;
	}
}

function compareMessages(a = "", b = "") {
	return a.toLowerCase().trim() === b.toLowerCase().trim();
}

function hasPost(message = {}) {
	let user = message.user,
		userPosts = posts[user];

	if (user && userPosts) {
		return _.any(userPosts, (post) => compareMessages(message.text, post.text));
	}

	return false;
}

exports.process = (message, bot) => {
    if (message.is_bot) {
        return;
    }

	if (urlRegexp.test(message.text)) {
		console.log('found a url', message);
		if (hasPost(message)) {
			bot.sendMessage("You have reposted")
		}

		addPost(message)
	}
};