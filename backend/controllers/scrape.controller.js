// This is the controller layer responsible for sending the response data and dealing with any additional errors

const scrapeService = require('../services/scrape.service')

const getAmazonProducts = async (req, res) => {
  const keyword = req.query.keyword;

  // Here i check if there is a keyword if not return a 400 status for BAD REQUEST

  if (!keyword) return res.status(400).json("Bad Request");

  // Than if theres a keyword i call the services layer to start the scrppe process

  const { status, message } = await scrapeService.getAmazonProducts(keyword);

  // Than return the status and data for the router

  return res.status(status).json(message);
};

module.exports = { getAmazonProducts }