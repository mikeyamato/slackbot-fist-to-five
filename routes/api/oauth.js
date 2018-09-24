const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	let payload = req.body;
	res.sendStatus(200);

	if (payload.event.type === "message") {
			let response_text;
			if (payload.event.text.includes("<@UBJTTTDRT>") && payload.event.text.includes("tell me a joke")) {
					response_text = `Hello <@${payload.event.username}>! Knock, knock.`
			}
			if (payload.event.text.includes("Who's there?")) {
					response_text = "A bot user";
			}
			if (payload.event.text.includes("Bot user who?")) {
					response_text = "No, I'm a bot user. I don't understand jokes.";
			}
			if (response_text !== undefined) {
					// Make call to chat.postMessage sending response_text using bot's token
			}
	}
} )



module.exports = router;

