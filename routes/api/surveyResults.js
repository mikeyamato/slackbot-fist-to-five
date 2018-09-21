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

/***** POST survey results to Slack *****/
function postSurvey(){
	const methodUrlPortion	= 'https://slack.com/api/chat.postEphemeral';
	const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBot;  // update with 'bot' token from slack group's app directory
	const channelPortion = '&channel=C9FEK4T0D';
	const userPortion = '&user=U9GCKCVL7'; // recipient
	const prettyPortion = '&pretty=1';  // no documentation availble about what this does
	const textPortion = '&text=Hello There Young Man';
	const attachmentsPortion = '&attachments='+encodeURIComponent(`[{"pretext": "Results...", "text": "fist: ${fist} \n one finger: ${oneFinger} \n two fingers: ${twoFingers} \n three fingers: ${threeFingers} \n four fingers: ${fourFingers} \n five fingers: ${fiveFingers}"}]`);
	
	// [{"pretext": "pre-hello", "text": "fist: 1 \n fist: 2"}]
	// [{"pretext": "Results...", "text": "fist: 0 \n one finger: 1 \n two fingers: 2 \n three fingers: 3"}]

	

	const postSurveyResults = {
		url: methodUrlPortion+slackTokenPortion+channelPortion+ textPortion +userPortion+attachmentsPortion+prettyPortion,
		/***** select ONE *****/
		// body: '&text='+textPortion,
		// body: '&attachments='+textPortionJSON,
		/**********************/
		method: 'POST',
		headers: {
			/***** select ONE *****/
			// 'Content-Type': 'application/x-www-form-urlencoded' 
			'Content-Type': 'application/json; charset=utf-8',
			/**********************/
		}
	}
	request(postSurveyResults, function (error, response) {
		console.log('############### response', response);
		console.log('############### response.body', response.body);
		console.log('############### textPortionJSON', postSurveyResults)
		console.log('############### error', error);
		
		return;
	});
}
/****************************************/

module.exports = router;





// https://api.slack.com/methods/chat.postEphemeral/test

// https://stackoverflow.com/questions/32327858/how-to-send-a-post-request-from-node-js-express


/*
function updateClient(postData){
	var clientServerOptions = {
		uri: 'http://'+clientHost+''+clientContext,
		body: JSON.stringify(postData),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	}
	request(clientServerOptions, function (error, response) {
		console.log(error,response.body);
		return;
	});
}


*/




https://slack.com/api/chat.postEphemeral?token=xoxp-320823214209-322427437687-439677512563-a47488f71280b0b31b1e3a65e3fcca52&channel=C9FEK4T0D&text=Hello%20Hello&user=U9GCKCVL7&attachments=%5B%7B%22pretext%22%3A%20%22Results...%22%2C%20%22text%22%3A%20%22fist%3A%200%20%5Cn%20one%20finger%3A%201%20%5Cn%20two%20fingers%3A%202%20%5Cn%20three%20fingers%3A%203%22%7D%5D&pretty=1

https://slack.com/api/chat.postEphemeral&channel=C9FEK4T0D&user=U9GCKCVL7&attachments=%5B%7B%22pretext%22%3A%20%22Results...%22%2C%20%22text%22%3A%20%22fist%3A%200%20one%20finger%3A%200%20%0A%20two%20fingers%3A%200%20%0A%20three%20fingers%3A%200%20%0A%20four%20fingers%3A%200%20%0A%20five%20fingers%3A%201%22%7D%5D&pretty=1

[{"pretext": "Results...", "text": "fist: 0 \n one finger: 1 \n two fingers: 2 \n three fingers: 3 \n four fingers: 4 \n five fingers: 5"}]

https://slack.com/api/chat.postEphemeral?token=xoxb-320823214209-439103392084-L2btc7Klxwgosruoz2ypGLy6&channel=C9FEK4T0D&text=Hello%20Hello&user=U9GCKCVL7&attachments=%5B%7B%22pretext%22%3A%20%22Results...%22%2C%20%22text%22%3A%20%22fist%3A%200%20%5Cn%20one%20finger%3A%201%20%5Cn%20two%20fingers%3A%202%20%5Cn%20three%20fingers%3A%203%20%5Cn%20four%20fingers%3A%204%20%5Cn%20five%20fingers%3A%205%22%7D%5D&pretty=1