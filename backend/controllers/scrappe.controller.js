const scrappeService = require('../services/scrappe.service')

// This is the controller layer responsible for sending the response data and dealing with any additional errors

const getAmazonProducts = async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) return res.status(400).json("Bad Request")

  const { status, message } = await scrappeService.getAmazonProducts(keyword);

  return res.status(status).json(message);
};

module.exports = { getAmazonProducts }