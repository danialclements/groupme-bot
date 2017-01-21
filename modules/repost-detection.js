const _ = require('lodash');
const key = "urlPosts";
const urlRegexp = /.*https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*).*/i;
const redis = require('../redisClient');

function addPost(message = {}) {
	return new Promise((resolve, reject) => {
		let userId = message.user;
		if (userId) {
			getUserPosts(userId).then((posts) => {
				posts.push(_.extend(message, {
					time: Date.now()
				}));
				redis.set(getKey(userId), JSON.stringify(posts), (err, reply) => {
					if (err) return reject(err);
					resolve(reply);
				});
			});
		}
	});
}

function getKey(userId) {
	return `${key}:${userId}`
}

function compareMessages(a = "", b = "") {
	return a.toLowerCase().trim() === b.toLowerCase().trim();
}

function getUserPosts(userId) {
	return new Promise((resolve, reject) => {
		redis.get(getKey(userId), (err, reply) => {
			if (err) return reject(err);
			if (reply) {
				try {
					resolve(JSON.parse(reply));
				} catch (e) {
					return reject(e);
				}
			} else {
				resolve([]);
			}
		});
	});
}

function checkPost(message = {}) {
	return new Promise((resolve, reject) => {
		let userId = message.user;
		getUserPosts(userId).then((posts) => {
			const matchingPosts = _.filter(posts, (post) => compareMessages(message.text, post.text))
			resolve(matchingPosts);
		}).catch(reject)
	});
}

exports.process = (message, bot) => {
    if (message.is_bot) {
        return;
    }

	if (urlRegexp.test(message.text)) {
		console.log('found a url', message);
		
		checkPost(message).then((posts) => {
			if (posts.length) {
				_.sortBy(posts, (post) => post.time);
				let recentPost = posts.pop();
				let sendTime = new Date(recentPost.time).toLocaleString();
				let length = posts.length + 1;
				bot.sendMessage(`${message.name} you have already posted this URL ${length} time${(length) === 1 ? '' : 's'}. You originally posted the url '${message.text}' on ${sendTime}.  You are hearby required to temporarily change your name to acknowledge this infraction.  You may change your name after another member reposts content or 14 days pass.`);
			}
		});

		addPost(message)
	}
};