// Load Environment
require('dotenv').load();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bot = require("./bot.js");

const port = process.env.PORT || 3000;
const botName = process.env.BOT_NAME || "Arbiter";

bot.initialize({
    bot_ID: process.env.BOT_ID,
    group_ID: process.env.GROUP_ID,
    modules: ["giphy", "trump", "arbys", "repost-detection", 'morality-control']
});

app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.post("/", (req, res) => {
    bot.onPost(req, res);
});

bot.sendMessage(`${botName} is online`);