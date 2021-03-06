const express = require('express');
const request = require('request');
const router = express.Router();

const surveyQ = require('../../templates/surveyQ');
const surveyA = require('../../templates/surveyA');
const foodEmoji = require('../../assets/foodEmoji');

const slackTokenPath = require('../../config/keys_prod');

let fist = 0;
let oneFinger = 0;
let twoFingers = 0;
let threeFingers = 0;
let fourFingers = 0;
let fiveFingers = 0;
let timestamp = [];
let recordSurvey = {"fist": [],"one_finger": [],"two_fingers": [],"three_fingers": [],"four_fingers": [],"five_fingers": []};
let channelId = '';  // this will be used for the running the survey in the appropriate channel


// TODO: add GET request to grab member names https://api.slack.com/methods/conversations.members

// post request
// posting survey form on slack
router.post('/', (req, res) => {
	const singleFoodEmoji = foodEmoji[Math.floor(Math.random() * foodEmoji.length)];
	const requestType = req.body || null;
	
	// console.log('**** 1', req)
	// console.log('**** 2', req.body);
	// console.log('**** 3', requestType);
	
	
	// reset variables
	if(requestType.text === 'reset'){  
		channelId = requestType.channel_id;
		console.log('**** channelId', channelId);

		fist = 0;
		oneFinger = 0;
		twoFingers = 0;
		threeFingers = 0;
		fourFingers = 0;
		fiveFingers = 0;
		timestamp = [];
		recordSurvey = {"fist": [],"one_finger": [],"two_fingers": [],"three_fingers": [],"four_fingers": [],"five_fingers": []};

		// console.log('**** resetting variables ****');
		// console.log('**** fist', fist);
		// console.log('**** oneFinger', oneFinger);
		// console.log('**** twoFingers', twoFingers);
		// console.log('**** threeFingers', threeFingers);
		// console.log('**** fourFingers', fourFingers);
		// console.log('**** fiveFingers', fiveFingers);
		// console.log('**** timestamp', timestamp);
		// console.log('**** recordSurvey', recordSurvey);
		// console.log('**** channelId', channelId);
		// console.log('*****************************');

		res.status(200).send(
			{
				"text": "All reset.\n Now run `/fist-to-five` to start the poll. \n :thumbsup_all:",
			}
		)
		return null;
	}


	// hit this with initial slack command
	if(requestType.command === '/fist-to-five' && requestType.text === ''){

		// send survey out
		res.status(200).send(
			surveyQ
			// surveyToClass()
		)
	} else {
		res.status(200).send(
			{
				"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${singleFoodEmoji}`
			}
		)
	}
})
				
/************************************************/

// function surveyToClass() {

// 	const postMessage	= 'https://slack.com/api/chat.postMessage';

// 	/***** choose one or update with different token *****/
// 	const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBotTonkotsu;   
// 	// const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBotUclaBootcamp;  
// 	/*****************************************************/
	
// 	const channelPortion = `&channel=${channelId}`;  
// 	const textPortion = '&text=What time is it? It\'s Fist-to-Five survey time! Yay! :tada:';
// 	const attachmentPortion = '&attachments='+encodeURIComponent(`[{
// 		"title": "How well do you understand this material? \n \n As always, responses are 100% anonymous.\n",
// 		"callback_id": "fist_results",
// 		"attachment_type": "default",
// 		"color": "#FF9DBB",
// 		"actions": [
// 			{
// 				"name": "fist_select",
// 				"text": "Select one...",
// 				"type": "select",
// 				"options": [
// 					{
// 						"text": "Fist  (Help, I'm lost)",
// 						"value": "fist"
// 					},
// 					{
// 						"text": "1  (I barely understand)",
// 						"value": "one_finger"
// 					},
// 					{
// 						"text": "2  (I'm starting to understand)",
// 						"value": "two_fingers"
// 					},
// 					{
// 						"text": "3  (I somewhat get it)",
// 						"value": "three_fingers"
// 					},
// 					{
// 						"text": "4  (I'm comfortable with the idea)",
// 						"value": "four_fingers"
// 					},
// 					{
// 						"text": "5  (I understand this 100%)",
// 						"value": "five_fingers"
// 					},
// 				],
// 				"confirm": {
// 					"title": "Are you sure?",
// 					"text": "Just confirming your selection. :nerd_face:",
// 					"ok_text": "Yes, I'm sure",
// 					"dismiss_text": "No, I'm not sure"
// 				}
// 			}
// 		]
// 	}]`);
// 	const prettyPortion = '&pretty=1';  // no documentation availble about what this does

// 	const postSurveyResults = {
// 		url: postMessage+slackTokenPortion+channelPortion+textPortion+attachmentPortion+prettyPortion,
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json; charset=utf-8',
// 		}
// 	}

// 	request(postSurveyResults, function (error, response) {
		
// 		console.log('##############initial# error', error);
// 		console.log('############## attachment Portion', attachmentPortion)
		
// 		return;
// 	});
// }



/************************************************/
							


// posting survey form on slack
router.post('/survey', (req, res) => {
	const singleFoodEmoji = foodEmoji[Math.floor(Math.random() * foodEmoji.length)];
	const survey = JSON.parse(req.body.payload);
	const handGesture = survey.actions[0].selected_options[0].value;

	// hit this after selecting answer
	switch (handGesture) {
		case 'fist':

			/***** uncomment if you do want to know who *****/
			// recordSurvey["fist"].push(survey.user.name);
			// console.log('*** recordSurvey ***', recordSurvey);
			/************************************************/

			res.status(200).send(
				surveyA
			)
			fist += 1;
			postSurvey();
			break;
		case 'one_finger':
		
			/***** uncomment if you do want to know who *****/
			// recordSurvey["one_finger"].push(survey.user.name);
			// console.log('*** recordSurvey ***', recordSurvey);
			/************************************************/

			res.status(200).send(
				surveyA
			);
			oneFinger += 1;
			postSurvey()
			break;
		case 'two_fingers':
			
			/***** uncomment if you do want to know who *****/
			// recordSurvey["two_fingers"].push(survey.user.name);
			// console.log('*** recordSurvey ***', recordSurvey);
			/************************************************/

			res.status(200).send(
				surveyA
			);
			twoFingers += 1;
			postSurvey()
			break;
		case 'three_fingers':
			
			/***** uncomment if you do want to know who *****/
			// recordSurvey["three_fingers"].push(survey.user.name);
			// console.log('*** recordSurvey ***', recordSurvey);
			/************************************************/

			res.status(200).send(
				surveyA
			);
			threeFingers += 1;
			postSurvey()
			break;
		case 'four_fingers':
			
			/***** uncomment if you do want to know who *****/
			// recordSurvey["four_fingers"].push(survey.user.name);
			// console.log('*** recordSurvey ***', recordSurvey);
			/************************************************/

			res.status(200).send(
				surveyA
			);
			fourFingers += 1;
			postSurvey()
			break;
		case 'five_fingers':

			/***** uncomment if you do want to know who *****/
			// recordSurvey["five_fingers"].push(survey.user.name);
			// console.log('*** recordSurvey ***', recordSurvey);
			/************************************************/

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
})

/****************************************/
/***** POST survey results to Slack *****/
/****************************************/
function postSurvey(){
	const postMessage	= 'https://slack.com/api/chat.postMessage';
	const updateMessage = 'https://slack.com/api/chat.update';

	/***** choose one or update with different token *****/
		const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBotTonkotsu;   
		// const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBotUclaBootcamp;  
	/*****************************************************/
	
	const channelPortion = `&channel=${channelId}`;  
	const textPortion = '&text=*Fist-to-Five Survey*';
	const textPortionUpdate = '&text=*Fist-to-Five Survey Updated*';
	const attachmentsPortion = '&attachments='+encodeURIComponent(`[{"pretext": "Results...", "text": "fist: ${fist} \n one: ${oneFinger} \n two: ${twoFingers} \n three: ${threeFingers} \n four: ${fourFingers} \n five: ${fiveFingers}"}]`);
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

// https://api.slack.com/custom-integrations/legacy-tokens

// https://api.slack.com/methods/chat.postEphemeral
// https://api.slack.com/methods/chat.postMessage

// https://stackoverflow.com/questions/32327858/how-to-send-a-post-request-from-node-js-express

