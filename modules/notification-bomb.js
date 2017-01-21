const commandRegex = /@([A-z]+)\s*([0-9]+)\s*([0-9]*)/;
const keyword = "bomb";

function parse(string) {
	let result = commandRegex.exec(string);
	if (result) {
		return {
			name: result[1],
			numTimes: parseInt(result[2], 10) || 5,
			delay: result[3] * 1000 || 3000
		};
	}

	return {};
}

exports.process = (message, bot) => {
	let result = parse(message.text),
		count = result.numTimes,
		delay = result.delay;

	if (message.is_bot) {
        return;
    }

	function sendMessage() {
		if (count >= 0) {
			if (count === 0) {
				bot.sendMessage("http://i.imgur.com/Aj9MbyI.gif")
			} else if (count >= 1) {
				bot.sendMessage(`[${count}00 meters] Rate of Decent: -9.${Math.floor(Math.random() * 1000)} m/s`);
				setTimeout(sendMessage, delay);
			}
			count = count - 1;
		}
	}

	if (result.name === keyword) {
		if (count <= 15) {
			bot.sendMessage(`💣 Bombs Away!! (courtesy of ${message.name})`)
			setTimeout(sendMessage, delay);
		} else {
			bot.sendMessage(`Whats wrong with you?!  ${count}?!  Thats way to many!`);
		}

	}
}