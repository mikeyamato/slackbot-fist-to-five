const express = require('express');
const bodyParser = require('body-parser');

const slashCommand = require('./routes/api/slashCommand');
const survey = require('./routes/api/survey');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use routes
app.use('/api/slash', slashCommand);
app.use('/api/survey', survey);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(
	`Server Running on Port ${port}`
));