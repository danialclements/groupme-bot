// Load Environment
const env = require('dotenv').config();
console.log(env);


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bot = require("./bot.js");

const port = process.env.PORT || 3000;
const botName = process.env.BOT_NAME || "Arbiter";

//console.log(process.env)

bot.initialize({
    bot_ID: process.env.BOT_ID,
    group_ID: process.env.GROUP_ID,
    modules: [
        "giphy",
        'giphy-stickers',
        "arbys", 
        "repost-detection", 
        'twss',
        'notification-bomb',
        'duckDuckGoAnswers',
        'help'
    ]
});

app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.post("/", (req, res) => {
    bot.onPost(req, res);
});