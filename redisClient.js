let session;

// Create the proper client based on environment
if (process.env.NODE_ENV !== 'production') {
	session = require('fakeredis').createClient();
} else {
	session = require('redis').createClient(process.env.REDIS_URL);
}

module.exports = session;