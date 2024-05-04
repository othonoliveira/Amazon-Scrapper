// This is the search function, responsable for fetching the data and creating the elements in the page

const search = async (event) => {
  // Using the endpoint to get the datar from the backend
  
  var searchText = document.querySelector('.search_text').value;
  var url = `http://localhost:3000/api/scrape?keyword=${searchText}`;
  const request = await fetch((url), {
    method: 'GET',
  })
  const response = await request.json();

  // This two lines are for cleaning the page, either if it's from messages or products, preparing for a new search

  document.querySelector('.product_holder').innerHTML = '';
  document.querySelector('.warnings').innerHTML = '';

  // Here we check if there are product to show from the response, if there is not it simply show a No products found message on screen

  if (response == 'No products found') {
    document.querySelector('.warnings').innerHTML = 'No products found';
    return 0;
  }

  // Here we get the div where the products elements are gonna be placed and start the iteration through all the products from the response

  const productHolder = document.querySelector('.product_holder');

  response.forEach((product) => {
    // Here we create a element for each of the products information image, title, rating and reviews and every one to the product div, which is gonna represent a single product

    const productDiv = document.createElement('div');
    productDiv.className = ' product_div';

    const imageDiv = document.createElement('div');
    const image = document.createElement('img');
    imageDiv.appendChild(image)
    image.src = product.image;
    image.className = 'product_image'
    imageDiv.className = 'image_div';
    productDiv.appendChild(imageDiv);

    const title = document.createElement('h3');
    title.innerText = product.title;
    title.className = 'product_title';
    productDiv.appendChild(title);
    
    const rating = document.createElement('h4');
    rating.innerText = product.rating;
    rating.className = 'product_rating';
    productDiv.appendChild(rating);
    
    const reviews = document.createElement('h4');
    reviews.innerText = `${product.reviews} reviews`;
    reviews.className = 'product_reviews';
    productDiv.appendChild(reviews);

    // Here when the whole product div is assemble it's pushed to the parent dive declared outside the forEach loop
    
    productHolder.appendChild(productDiv);
  });

  // Finally the div that holds all the products divs is appeded to the page div

  const pageDiv = document.querySelector('.page');
  pageDiv.appendChild(productHolder);
}

// This is the function checks if you pressed the enter key, and if you do it call the search function

const checkKey = (event) => {
  if (event.keyCode == '13') search();
}

// This are the two events being used, the first one if you click on the icon, the other one if you press enter

var button = document.querySelector('.search-btn');
button.addEventListener('click', search);

var searchBar = document.querySelector('.search_text');
searchBar.addEventListener('keypress', checkKey);

