const express = require('express');
const router = express.Router();

const surveyA = require('../../templates/surveyA');
const foodEmoji = require('../../assets/foodEmoji');


// post request
// posting survey form on slack
router.post('/', (req, res) => {
	const singleFoodEmoji = foodEmoji[Math.floor(Math.random() * foodEmoji.length)];
	const survey = JSON.parse(req.body.payload);

	console.log('**** 1', survey);
	// console.log('**** 2', req.body.payload.callback_id); 
	// console.log('**** 3', secondRequest.callback_id);

	// if(req.body.payload){
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