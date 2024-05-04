const scrappe = require('../models/scrappe')
const jsdom = require('jsdom');
const { JSDOM } = jsdom
const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.sendTo(console, { omitJSDOMErrors: true });
virtualConsole.on("jsdomError", (err) => {
  if (err.message !== "Could not parse CSS stylesheet") {
    console.error(err);
  }
});

const getAmazonProducts = async (keyword) => {
  const data = await scrappe(keyword);

  const { window: { document } } = new JSDOM(data, { virtualConsole })

  const productsCount = document.getElementsByClassName("a-section a-spacing-base").length;

  if (productsCount <= 0) return { status: 404, message: 'No products found' }

  const products = [];

  for (var index = 0; index < productsCount; index++) {
    const image = document.getElementsByClassName("s-image")[index]
      .getAttribute('src') ?? 'Not Found';

    var title = 'Not Found'
    if (document.getElementsByClassName("a-size-base-plus a-color-base a-text-normal")[index]) {
      var title = document
        .getElementsByClassName("a-size-base-plus a-color-base a-text-normal")[index].innerHTML;
    }

    var rating = 'Not Found';
    if (document.getElementsByClassName("a-icon-alt")[index]) {
      var rating = document.getElementsByClassName("a-icon-alt")[index].innerHTML;
    }

    var reviews = 'Not Found';
    if (document.getElementsByClassName("a-size-base s-underline-text")[index]) {
      var reviews = document.getElementsByClassName("a-size-base s-underline-text")[index]
        .innerHTML;
    }
    
    products.push({ image, title, rating, reviews });
  }

  return { status: 200, message: products };
};

module.exports = { getAmazonProducts }