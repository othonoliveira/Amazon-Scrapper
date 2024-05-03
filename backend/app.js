const express = require('express');
const scrappeRouter = require('./routes/router.scrappe')

const app = express();


app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/api/scrape', scrappeRouter);

module.exports = app;
