const express = require('express');
const request = require('request');
const router = express.Router();



router.post('/', (req, res, next) => {

	console.log('res.body', res.body)
	res.status(200).send(
		{
			"text": res.body.challenge
		}
	)
})

/*
router.post('/', (req, res, next) => {
	let payload = req.body;
	res.sendStatus(200);
	console.log('#### payload', payload);

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
					postSurvey()
			}
	}
} )
*/

/****************************************/
/***** POST survey results to Slack *****/
/****************************************/

function postSurvey(){
	const postMessage	= 'https://slack.com/api/chat.postMessage';
	const updateMessage = 'https://slack.com/api/chat.update';

	/***** choose one or update with different token *****/
		const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBotTonkotsu;  
		// const slackTokenPortion = '?token=' + slackTokenPath.slackTokenPersonTonkotsu;  
		// const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBotUclaBootcamp;  
	/*****************************************************/
	
	const channelPortion = `&channel=${channelId}`;  
	const textPortion = '&text=*Fist-to-Five Survey*';
	const textPortionUpdate = '&text=*Fist-to-Five Survey Updated*';
	const attachmentsPortion = '&attachments='+encodeURIComponent(`[{"pretext": "Results...", "text": "fist: ${fist} \n one finger: ${oneFinger} \n two fingers: ${twoFingers} \n three fingers: ${threeFingers} \n four fingers: ${fourFingers} \n five fingers: ${fiveFingers}"}]`);
	const tsPortion = '&ts=' + timestamp[0];
	const prettyPortion = '&pretty=1';  // no documentation availble about what this does

	if(timestamp.length){
		/***** update POST *****/
		const postUpdatedSurveyResults = {
			url: updateMessage+slackTokenPortion+channelPortion+textPortionUpdate+attachmentsPortion+tsPortion+prettyPortion,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			}
		}
		request(postUpdatedSurveyResults, function (error, response) {
			// console.log('############### response', response);
			// console.log('##############update# response.body', response.body);
			console.log('##############update# postUpdatedSurveyResults', postUpdatedSurveyResults);
			console.log('##############update# error', error);
			
			return;
		});
	} else {
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
			
			timestamp.push(postSurveyResultsJSON.ts)
			// console.log('##############initial# timestamp', timestamp);
			
			return;
		});
	}
}
/****************************************/


module.exports = router;

