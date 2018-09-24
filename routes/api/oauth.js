const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	console.log('#### req.body', req.body);
	res.status(200).send(
		{
			"text": req.body.challenge
		}
	)
} )



module.exports = router;

