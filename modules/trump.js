let heightOfWall = 0;
const trumpChinaQuotes = ["We can’t continue to allow China to rape our country",
    "Listen, you motherfuckers, we’re going to tax you 25 percent!",
    "They are taking our jobs. China is taking our jobs. It is not going to happen anymore, folks!",
    "We’ve gone from a tremendous power that is respected all over the world to somewhat of a laughing stock and all of a sudden, people are talking about China and India and other places. That was the beginning of China.",
    "You have to bring in jobs, you have to take the jobs back from China, you have to take the jobs back from Mexico."];

const dict = new Map();
dict.set("who do we have", "We got some BAD HOMBRES. OUT, OUT, OUT!");
dict.set("kick", "We got some BAD HOMBRES. OUT, OUT, OUT!");
dict.set("global warming", "Believe me, the concept of global warming was created by and for the Chinese in order to make U.S. manufacturing non-competitive.");
dict.set("daughter", "https://i.redd.it/y0mscagubhdx.jpg");
dict.set("china", trumpChinaQuotes);
dict.set("marco", "Don't worry about it, Little Marco.");
dict.set("jeb", ["Excuse me, JEB!", "Please clap."]);
dict.set("immigrant", "They're not sending their best. They're bringing drugs, they're bringing crime, they're rapists... And some, I assume, are good people.");
dict.set("mexico", "When are we going to beat Mexico at the border? They're laughing at us.");
dict.set("hillary", "Crooked Hillary is a disgrace. Sad!");
dict.set("sad", "SAD!");
dict.set("ted", "Lyin' Ted would have been a total DISASTER");
dict.set("lying", "Lyin' Ted is a complete and total failure.");
dict.set("muslim", "Donald J. Trump is calling for a total and complete shutdown of Muslims entering the United States until our country's representatives can figure out what the hell is going on.");


exports.process = (message, bot) => {
    if (!message.is_bot) {
        const buildTheWall = "the wall";
        const wallIndex = message.text.toLowerCase().indexOf(buildTheWall);
        if (wallIndex != -1) {
            heightOfWall += 10;
            bot.sendMessage(`The wall just got 10ft higher. It's now ${heightOfWall}ft high.`);
        }
        for (const [key, value] of dict) {
            let index;
            if (!key.includes(" ")) {
                index = message.text.toLowerCase().split(/[\W\d]+/).indexOf(key);
            } else {
                index = message.text.toLowerCase().indexOf(key);
            }
            if (index != -1) {
                if (typeof(value) === "string") {
                    bot.sendMessage(value);
                } else if (typeof(value) === "object") {
                    bot.sendMessage(value[Math.floor(Math.random() * (value.length))]);
                } else {
                    console.log("Type error.");
                }
            }
        }
    }
};