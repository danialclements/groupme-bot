# groupme-bot

An npm module that makes making groupme bots easy! This is meant to be used along with the Express library.

## Setup
Just do:
```javascript
const bot = require("groupme-bot");
bot.initialize({
  bot_ID: __your_bot_id__,
  group_ID: __your_bots_group_id__,
  modules: [__module_you_want_1__, __module_you_want_2__, ...]
};
```
Then call: 
```javascript
bot.onPost(req, res)
```
in your post handler.

To see an example that works in Heroku, look at `start.js`

## Current modules
* "trump" - This module creates a satirical Trump bot, where the height of the wall is tracked, and Trump will respond to certain keywords with real-life quotes.
* "giphy" - This module allows a user to make giphy searches in messages by typing '@giphy [text to search]'.


## Creating a new module
Let's create a new module called "hello", which will just say "Hello!" whenever anyone other than a bot says anything.

1. Create a file called `hello.js` in the `modules/` folder. Note that your module's filename MUST follow the format `${module_name}.js`
2. Create a function exported under `exports.process`, with the parameters, `message` and `bot`:
```javascript
exports.process = (message, bot) => {
  if (!message.is_bot)
    bot.sendMessage("Hello!");
};
```
You're done!


### What kind of properties do the `message` and `bot` objects have?

`message` has:
* text - Contains the text of the message.
* user - Contains the id of the sender.
* is_bot - A boolean stating whether the message was sent by a bot.

`bot` has:
* request - Contains the `request` library object, if you want to make any external queries.
* api_url - Contains the default base url for GroupMe bot queries.
* bot_ID - Contains the ID of the bot.
* group_ID - Contains the ID of the group in which the bot is in.
* sendMessage(text) - A function in which the bot will send `text` to the group.

Consider submitting your module for public use by creating a pull request containing it.
