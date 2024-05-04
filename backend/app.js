// Here it's the initialization of express

const express = require('express');
const scrapeRouter = require('./routes/router.scrape')

const app = express();


app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// Than it's added the router to the aplication

app.use('/api', scrapeRouter);

module.exports = app;
