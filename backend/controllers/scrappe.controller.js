const scrappeService = require('../services/scrappe.service')

const getAmazonProducts = async (req, res) => {
  const keyword = req.query.keyword;

  const { status, message } = await scrappeService.getAmazonProducts(keyword);

  return res.status(status).json(message);
};

module.exports = { getAmazonProducts }