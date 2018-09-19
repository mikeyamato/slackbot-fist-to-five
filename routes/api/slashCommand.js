const express = require('express');
const router = express.Router();

const surveyQ = require('../../templates/surveyQ');
const foodEmoji = require('../../assets/foodEmoji');


// post request
// posting survey form on slack
router.post('/', (req, res) => {
	const singleFoodEmoji = foodEmoji[Math.floor(Math.random() * foodEmoji.length)];
	const requestType = req.body.command;

	// console.log('**** 1', req)
	// console.log('**** 2', req.body);
	// console.log('**** 3', requestType);

	if(requestType === '/fist'){
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