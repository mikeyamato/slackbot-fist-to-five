const express = require('express');
const router = express.Router();

const surveyQ = require('../../templates/surveyQ');
const foodEmoji = require('../../assets/foodEmoji');


// post request
// posting survey form on slack
router.post('/', (req, res) => {
	const singleFoodEmoji = foodEmoji[Math.floor(Math.random() * foodEmoji.length)];
	const requestType = req.body.command;
	const channelId = req.body.channel_id;  // this will be used for the running the survey in the appropraite channel

	// console.log('**** 1', req)
	console.log('**** 2', req.body);
	// console.log('**** 3', requestType);

	if(requestType === '/fist-to-five'){
		// TODO: reset values on `surveyResults.js` to zero
		// TODO: find out what channel it's being evoked from and create it as a variable to send it back to that. 
		// TODO: create a helper, `/fist-to-five clear` that will clear all variables

		res.status(200).send(
			surveyQ
		)} else {
			res.status(200).send(
		{
			"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${singleFoodEmoji}`
		}
	)}
})

module.exports = router;