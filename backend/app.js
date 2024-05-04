// Here it's the initialization of express

const cors = require("cors");
const express = require('express');
const scrapeRouter = require('./routes/router.scrape')

const app = express();

app.use(cors());

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// Than it's added the router to the aplication

app.use('/api', scrapeRouter);

module.exports = app;
