const express = require('express');
const router = express.Router();

const surveyA = require('../../templates/surveyA');
const foodEmoji = require('../../assets/foodEmoji');

// note: need to zero out results when slash command gets called
const fist = 0;
const oneFinger = 0;
const twoFingers = 0;
const threeFingers = 0;
const fourFingers = 0;
const fiveFingers = 0;

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
			);
			fist += 1;
			console.log('result - fist', fist);
			break;
    case 'one_finger':
			res.status(200).send(
				surveyA
			);
			oneFinger += 1;
			console.log('result - oneFinger', oneFinger);
			break;
		case 'two_finger':
			res.status(200).send(
				surveyA
			);
			twoFingers += 1;
			console.log('result - twoFingers', twoFingers);
			break;
		case 'three_finger':
			res.status(200).send(
				surveyA
			);
			threeFingers += 1;
			console.log('result - threeFingers', threeFingers);
			break;
		case 'four_finger':
			res.status(200).send(
				surveyA
			);
			fourFingers += 1;
			console.log('result - fourFingers', fourFingers);
			break;
		case 'five_finger':
			res.status(200).send(
				surveyA
			);
			fiveFingers += 1;
			console.log('result - fiveFingers', fiveFingers);
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