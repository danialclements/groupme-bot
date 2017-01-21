exports.process = (message, bot) => {
    const toSearchFor = "@sticker ";
    const index = message.text.toLowerCase().indexOf(toSearchFor);

	if (message.is_bot) {
        return;
    }

    //If we found the string we're looking for get results and send them
    if (index != -1) {
        //Get the string we are searching for.
        const toSearch = message.text.substring(index + toSearchFor.length);
        
        //Get the total, encoded URL we're going to pass to Giphy to search
        const giphyurl = `http://api.giphy.com/v1/stickers/search?limit=5&q=${encodeURIComponent(toSearch)}&api_key=dc6zaTOxFJmzC&rating=r`;
        
        //Get the giphy result, and send it, if found
        bot.request.get(giphyurl, (error, response, body) => {
            const results = JSON.parse(body)["data"];
            //Get up to the top five
            if (error || results.length === 0) {
                bot.sendMessage("Nothing found 😥");
            } else {
                const selected = results[0].images.original.url;
                console.log(`${toSearch}=>${selected}`);
                bot.sendMessage(selected);
            }
        });
    }
};