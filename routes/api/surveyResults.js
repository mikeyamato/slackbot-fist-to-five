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

	const methodUrlPortion	= 'https://slack.com/api/chat.postEphemeral';
	const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBot;  // update with 'bot' token from slack group's app directory
	const channelPortion = '&channel=C9FEK4T0D';
	const textPortion = `results... fist: ${fist}, one finger: ${oneFinger}, two fingers: ${twoFingers}, three fingers: ${threeFingers}, four fingers: ${fourFingers}, five fingers: ${fiveFingers}`;
	const userPortion = '&user=U9GCKCVL7'; // recipient
	const prettyPortion = '&pretty=1';

	switch (handGesture) {
		case 'fist':
			res.status(200).send(
				surveyA
			)
			fist += 1;

			// const methodUrlPortion	= 'https://slack.com/api/chat.postEphemeral';
			// const slackTokenPortion = '?token=' + slackTokenPath.slackTokenBot;  // update with 'bot' token from slack group's app directory
			// const channelPortion = '&channel=C9FEK4T0D';
			// const textPortion = `results... fist: ${fist}, one finger: ${oneFinger}, two fingers: ${twoFingers}, three fingers: ${threeFingers}, four fingers: ${fourFingers}, five fingers: ${fiveFingers}`;
			// const userPortion = '&user=U9GCKCVL7'; // recipient
			// const prettyPortion = '&pretty=1';
			
			
			var clientServerOptions = {
				uri: methodUrlPortion+slackTokenPortion+channelPortion+userPortion,
				body: '&text='+textPortion,
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
			request(clientServerOptions, function (error, response) {
				console.log('**** error,response', error,response.body);
				return;
			});
			


			break;
    case 'one_finger':
			res.status(200).send(
				surveyA
			);
			oneFinger += 1;
			console.log('results... fist: ' + fist + ', one finger: ' + oneFinger + ', two fingers: ' + twoFingers + ', three fingers: ' + threeFingers + ', four fingers: ' + fourFingers + ', five fingers: ' + fiveFingers);
			break;
		case 'two_finger':
			res.status(200).send(
				surveyA
			);
			twoFingers += 1;
			console.log('results... fist: ' + fist + ', one finger: ' + oneFinger + ', two fingers: ' + twoFingers + ', three fingers: ' + threeFingers + ', four fingers: ' + fourFingers + ', five fingers: ' + fiveFingers);
			break;
		case 'three_finger':
			res.status(200).send(
				surveyA
			);
			threeFingers += 1;
			console.log('results... fist: ' + fist + ', one finger: ' + oneFinger + ', two fingers: ' + twoFingers + ', three fingers: ' + threeFingers + ', four fingers: ' + fourFingers + ', five fingers: ' + fiveFingers);
			break;
		case 'four_finger':
			res.status(200).send(
				surveyA
			);
			fourFingers += 1;
			console.log('results... fist: ' + fist + ', one finger: ' + oneFinger + ', two fingers: ' + twoFingers + ', three fingers: ' + threeFingers + ', four fingers: ' + fourFingers + ', five fingers: ' + fiveFingers);
			break;
		case 'five_finger':
			res.status(200).send(
				surveyA
			);
			fiveFingers += 1;
			console.log('results... fist: ' + fist + ', one finger: ' + oneFinger + ', two fingers: ' + twoFingers + ', three fingers: ' + threeFingers + ', four fingers: ' + fourFingers + ', five fingers: ' + fiveFingers);
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