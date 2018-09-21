const express = require('express');
var request = require('request');
const router = express.Router();

const surveyA = require('../../templates/surveyA');
const foodEmoji = require('../../assets/foodEmoji');

const slackTokenPath = require('../../config/keys_prod');

// TODO: need to zero out results when `slashCommand.js` gets called
// TODO: push to object?
let fist = 0;
let oneFinger = 0;
let twoFingers = 0;
let threeFingers = 0;
let fourFingers = 0;
let fiveFingers = 0;
let timestamp = [];


// post request
// posting survey form on slack
router.post('/', (req, res) => {
	const singleFoodEmoji = foodEmoji[Math.floor(Math.random() * foodEmoji.length)];
	const survey = JSON.parse(req.body.payload);
	const handGesture = survey.actions[0].selected_options[0].value;

	// console.log('**** -1 req', req);
	// console.log('**** 0 req.body', req.body);
	// console.log('**** 1', survey);
	// console.log('**** 2', survey.actions); 
	// console.log('**** 3', survey.actions[0].selected_options);
	// console.log('**** 4', survey.actions[0].selected_options[0].value);  // logs the action
	// console.log('**** 5', survey.user.name);  // logs who made the action



	switch (handGesture) {
		case 'fist':
			res.status(200).send(
				surveyA
			)
			fist += 1;
			postSurvey();
			break;
    case 'one_finger':
			res.status(200).send(
				surveyA
			);
			oneFinger += 1;
			postSurvey()
			break;
		case 'two_finger':
			res.status(200).send(
				surveyA
			);
			twoFingers += 1;
			postSurvey()
			break;
		case 'three_finger':
			res.status(200).send(
				surveyA
			);
			threeFingers += 1;
			postSurvey()
			break;
		case 'four_finger':
			res.status(200).send(
				surveyA
			);
			fourFingers += 1;
			postSurvey()
			break;
		case 'five_finger':
			res.status(200).send(
				surveyA
			);
			fiveFingers += 1;
			postSurvey()
			break;
    default:
			res.status(200).send(
				{
					"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${singleFoodEmoji}`
				}
			)
	} 

	// if(survey){
	// 	res.status(200).send(
	// 		surveyA
	// 	)} else {
	// 		res.status(200).send(
	// 	{
	// 		"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${singleFoodEmoji}`
	// 	}
	// )}
})

/****************************************/
/***** POST survey results to Slack *****/
/****************************************/
function postSurvey(){
	const postMessage	= 'https://slack.com/api/chat.postMessage';
	const updateMessage = 'https://slack.com/api/chat.update';
	const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBot;  // update with 'bot' token from slack group's app directory
	const channelPortion = '&channel=C9FEK4T0D';
	const textPortion = '&text=Initial';
	const textPortionUpdate = '&text=Subsequent';
	const attachmentsPortion = '&attachments='+encodeURIComponent(`[{"pretext": "Results...", "text": "fist: ${fist} \n one finger: ${oneFinger} \n two fingers: ${twoFingers} \n three fingers: ${threeFingers} \n four fingers: ${fourFingers} \n five fingers: ${fiveFingers}"}]`);
	const tsPortion = '&ts=' + timestamp[0];
	const prettyPortion = '&pretty=1';  // no documentation availble about what this does

	if(Array.isArray(timestamp) || timestamp.length){
		// update POST
		const postUpdatedSurveyResults = {
			url: updateMessage+slackTokenPortion+channelPortion+textPortionUpdate+attachmentsPortion+tsPortion+prettyPortion,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			}
		}
		request(postUpdatedSurveyResults, function (error, response) {
			// console.log('############### response', response);
			console.log('############### response.body', response.body);
			console.log('############### textPortionJSON', postUpdatedSurveyResults)
			console.log('############### error', error);
			
			return;
		});
	} else {
		// initial POST
		const postSurveyResults = {
			url: postMessage+slackTokenPortion+channelPortion+textPortion+attachmentsPortion+prettyPortion,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			}
		}
		request(postSurveyResults, function (error, response) {
			// console.log('############### response', response);
			console.log('############### response.body', response.body);
			console.log('############### response.body.ts', response.body.ts);
			console.log('############### timestamp', timestamp);
			console.log('############### textPortionJSON', postSurveyResults)
			console.log('############### error', error);

			timestamp.push(response.body.ts)
			
			return;
		});
	}
}
/****************************************/

module.exports = router;




// https://api.slack.com/custom-integrations/legacy-tokens

// https://api.slack.com/methods/chat.postEphemeral
// https://api.slack.com/methods/chat.postMessage

// https://stackoverflow.com/questions/32327858/how-to-send-a-post-request-from-node-js-express





