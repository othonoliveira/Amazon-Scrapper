// This is the router for the scrappe API, responsible for all the sub routes of /api/scrape

const express = require('express');
const scrapeController = require('../controllers/scrape.controller');

const scrapeRouter = express.Router();

// From here it's possible to create any future chieldren routes of /api/scrape

scrapeRouter.get('/scrape', scrapeController.getAmazonProducts,);

module.exports = scrapeRouter;