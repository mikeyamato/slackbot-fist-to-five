const express = require('express');
const router = express.Router();

const surveyQ = require('../../templates/surveyQ.json');
const foodEmoji = require('../../assets/foodEmoji');


// post request
router.post('/', (req, res) => {
	const singleFoodEmoji = foodEmoji[Math.floor(Math.random() * foodEmoji.length)];



	// const requestType = req.body.text;
	// console.log('**** 1', req)
	console.log('**** 2', req.body);
	// console.log('**** 3', requestType);

	// if(req.body){
	// 	res.status(200).send(
	// 		surveyQ `\n${singleFoodEmoji}`
	// )} else {
	// 	res.status(200).send(
	// 	{
	// 		"text": `Zoinks! \nSomething doesn't look right. \nPlease try again. \n${singleFoodEmoji}`
	// 	}
	// )}
})

module.exports = router;