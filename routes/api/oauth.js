const express = require('express');
const request = require('request');
const router = express.Router();



router.post('/', (req, res, next) => {
	/**
	|--------------------------------------------------
	| initially run this only in order to verify "event subscriptions" for a workspace app
	|--------------------------------------------------
	*/
	
	// console.log('**** req.body', req.body)
	// res.status(200).send(
	// 	{
	// 		"text": req.body.challenge 
	// 	}
	// )

	console.log('req', req);
	console.log('req.body', req.body);

	
	// let payload = JSON.parse(req.body);
	// console.log('#### payload', payload);
	// console.log('#### req.body.payload', payload.payload);
	let channelId = payload.event.channel;
	
	res.sendStatus(200);

	if (payload.event.type === "message") {
			let response_text;
			if (payload.event.text.includes("<@UCYHGRB3M>") && payload.event.text.includes("tell me a joke")) {
					response_text = `Hello <@${payload.event.user}>! Knock, knock.`
					console.log('#### response_text', response_text);
			}
			if (payload.event.text.includes("Who's there?")) {
					response_text = "A bot user";
			}
			if (payload.event.text.includes("Bot user who?")) {
					response_text = "No, I'm a bot user. I don't understand jokes.";
			}
			if (response_text !== undefined) {
					// Make call to chat.postMessage sending response_text using bot's token
					// postSurvey()
			}
	}
} )


/****************************************/
/***** POST survey results to Slack *****/
/****************************************/

function postSurvey(){
	const postMessage	= 'https://slack.com/api/chat.postMessage';
	const updateMessage = 'https://slack.com/api/chat.update';

	/***** choose one or update with different token *****/
		// const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBotTonkotsu;  
		const slackTokenPortion = '?token=' + payload.token;  
		// const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBotUclaBootcamp;  
	/*****************************************************/
	
	let channelPortion = `&channel=${channelId}`;  
	const textPortion = '&text=*Fist-to-Five Survey*';
	const textPortionUpdate = '&text=*Fist-to-Five Survey Updated*';
	const attachmentsPortion = '&attachments='+encodeURIComponent(response_text);
	const tsPortion = '&ts=' + timestamp[0];
	const prettyPortion = '&pretty=1';  // no documentation availble about what this does

	
	/***** initial POST *****/
	const postSurveyResults = {
		url: postMessage+slackTokenPortion+channelPortion+textPortion+attachmentsPortion+prettyPortion,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		}
	}
	request(postSurveyResults, function (error, response) {
		const postSurveyResultsJSON = JSON.parse(response.body);
		// console.log('############### response', response);
		// console.log('##############initial# response.body', response.body);
		// console.log('##############initial# response.body.ts', postSurveyResultsJSON.ts);
		// console.log('##############initial# response.body.ts', response.body.messages.ts);
		console.log('##############initial# postSurveyResults', postSurveyResults);
		console.log('##############initial# error', error);
		
		// timestamp.push(postSurveyResultsJSON.ts)
		// console.log('##############initial# timestamp', timestamp);
		
		return;
	});
}
/****************************************/


module.exports = router;

