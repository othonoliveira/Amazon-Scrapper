// This is the services layer, responsible for extracting and formating the data

const scrape = require('../models/scrape')
const jsdom = require('jsdom');
const { JSDOM } = jsdom

// The creation of the a virtual console for jsdom, needed to add this to the jsdom initialization to solve errors from CSS stylesheet not loading

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.sendTo(console, { omitJSDOMErrors: true });
virtualConsole.on("jsdomError", (err) => {
  if (err.message !== "Could not parse CSS stylesheet") {
    console.error(err);
  }
});

const getAmazonProducts = async (keyword) => {
  const data = await scrape(keyword);

  // Then use the data from the application model layer + the virtual console and start a jsdom instance

  const { window: { document } } = new JSDOM(data, { virtualConsole })

  const productsCount = document.getElementsByClassName("a-section a-spacing-base").length;

  // This return a status 404 to the controller layer, when no products are found, this is only here because we need to check if there are products before getting the required data

  if (productsCount <= 0) return { status: 404, message: 'No products found' };

  // Than create a array so store the products info, and go through all the existing products on the page and pushing the info to the array, while also place a NOT FOUND when the information is not displayed

  const products = [];

  for (var index = 0; index < productsCount; index++) {
    const image = document.getElementsByClassName("s-image")[index]
      .getAttribute('src') ?? 'Not Found';

    // This have if statements because its needed to check if the they exist, because if not it will throw a error since we need to get the innerHTML

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

    if (image.endsWith('.jpg')) { products.push({ image, title, rating, reviews }) }
  }

  // Than return the array of products with the status 200

  return { status: 200, message: products };
};

module.exports = { getAmazonProducts }