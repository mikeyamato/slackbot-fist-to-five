const express = require('express');
const bodyParser = require('body-parser');

// const slashCommand = require('./routes/api/slashCommand');
// const surveyResults = require('./routes/api/surveyResults');
const index = require('./routes/api');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use routes
// app.use('/api/slash', slashCommand);
// app.use('/api/survey', surveyResults);
app.use('/api/index', index);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(
	`Server Running on Port ${port}`
));