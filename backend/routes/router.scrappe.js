const express = require('express');
const scrappeController = require('../controllers/scrappe.controller');

const scrappeRouter = express.Router();

scrappeRouter.get('', scrappeController.getAmazonProducts,);

module.exports = scrappeRouter;