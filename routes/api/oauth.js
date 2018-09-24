const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	console.log('#### req', req);
	res.status(200).send()
} )



module.exports = router;

