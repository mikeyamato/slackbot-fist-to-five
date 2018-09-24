const http = require('http');
const bodyParser = require('body-parser');
const { createEventAdapter } = require('@slack/events-api');
const slackTokenPath = require('./config/keys_prod');

const slackEvents = createEventAdapter(slackTokenPath.tonkotsuSlackWorkspaceSigningSecret);

const port = process.env.PORT || 4000;
const express = require('express');
const app = express();




// const slashCommand = require('./routes/api/slashCommand');
// const surveyResults = require('./routes/api/surveyResults');
const index = require('./routes/api');
const oauth = require('./routes/api/oauth');


// Body Parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// use routes
// app.use('/api/slash', slashCommand);
// app.use('/api/survey', surveyResults);
app.use('/api/index', index);
app.use('/api/oauth', slackEvents.expressMiddleware());

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event)=> {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start the express application
http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});


app.listen(port, () => console.log(
	`Server Running on Port ${port}`
));