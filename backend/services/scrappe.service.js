const scrappe = require('../models/scrappe')
const { JSDOM } = require('jsdom')

const getAmazonProducts = async (keyword) => {
  const data = await scrappe(keyword);

  const html = new JSDOM(data)
  const htmlProducts = html.window.document.getElementsByClassName("a-section a-spacing-base");
  var arr = [].slice.call(htmlProducts)

  const products = [];

  arr.forEach((element, index) => {
    const image = html.window.document.getElementsByClassName("s-image")[index].getAttribute('src');
    const title = html.window.document.getElementsByClassName("a-size-base-plus a-color-base a-text-normal")[index].innerHTML;
    const rating = html.window.document.getElementsByClassName("a-icon-alt")[index].innerHTML;
    const reviwes = html.window.document.getElementsByClassName("a-size-base s-underline-text")[index].innerHTML;

    products.push({ image, title, rating, reviwes })
  });

  return { status: 200, message: products };
};

module.exports = { getAmazonProducts }