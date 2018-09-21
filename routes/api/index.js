const express = require('express');
const request = require('request');
const router = express.Router();

const surveyQ = require('../../templates/surveyQ');
const surveyA = require('../../templates/surveyA');
const foodEmoji = require('../../assets/foodEmoji');

const slackTokenPath = require('../../config/keys_prod');

// TODO: need to zero out results when `slashCommand.js` gets called
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
	channelId = requestType.channel_id || null;
	console.log('**** channelId', channelId);

	// console.log('**** 1', req)
	console.log('**** 2', req.body);
	// console.log('**** 3', requestType);


	// reset variables
	if(requestType.text === 'clear'){  // TODO: double check what the 'requestType' is

		fist = 0;
		oneFinger = 0;
		twoFingers = 0;
		threeFingers = 0;
		fourFingers = 0;
		fiveFingers = 0;
		timestamp = [];
		recordSurvey = {"fist": [],"one_finger": [],"two_fingers": [],"three_fingers": [],"four_fingers": [],"five_fingers": []};

		console.log('**** resetting variables ****');
		console.log('**** fist', fist);
		console.log('**** oneFinger', oneFinger);
		console.log('**** twoFingers', twoFingers);
		console.log('**** threeFingers', threeFingers);
		console.log('**** fourFingers', fourFingers);
		console.log('**** fiveFingers', fiveFingers);
		console.log('**** timestamp', timestamp);
		console.log('**** recordSurvey', recordSurvey);
		console.log('*****************************');

		res.status(200).send(
			{
				"text": "All clear.\n Now run `/fist-to-five` to start the poll. \n :thumbsup_all:",
			}
		)
		return null;
	}


	// hit this with initial slack command
	if(requestType.command === '/fist-to-five'){
		// TODO: find out what channel it's being evoked from and create it as a variable to send it back to that. 

		// send survey out
		res.status(200).send(
			surveyQ
		)} else {
			res.status(200).send(
		{
			"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${singleFoodEmoji}`
		}
	)}
})


// posting survey form on slack
router.post('/survey', (req, res) => {
	const singleFoodEmoji = foodEmoji[Math.floor(Math.random() * foodEmoji.length)];
	const survey = JSON.parse(req.body.payload);
	const handGesture = survey.actions[0].selected_options[0].value;

	// hit this after selecting answer
	switch (handGesture) {
		case 'fist':

			/***** uncomment if you do want to know who *****/
			recordSurvey["fist"].push(survey.user.name);
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
			recordSurvey["one_finger"].push(survey.user.name);
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
			recordSurvey["two_fingers"].push(survey.user.name);
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
			recordSurvey["three_fingers"].push(survey.user.name);
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
			recordSurvey["four_fingers"].push(survey.user.name);
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
			recordSurvey["five_fingers"].push(survey.user.name);
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
	const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBot;  // update with 'bot' token from slack group's app directory
	const channelPortion = `&channel=${channelId}`;  // TODO: update id with invoking id
	const textPortion = '&text=Initial';
	const textPortionUpdate = '&text=Subsequent';
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
			// console.log('##############update# textPortionJSON', postUpdatedSurveyResults);
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
			// console.log('##############initial# textPortionJSON', postSurveyResults);
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