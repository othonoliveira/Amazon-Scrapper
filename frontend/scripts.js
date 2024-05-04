const search = async (event) => {
  var searchText = document.querySelector('.search_text').value;
  var url = `http://localhost:3000/api/scrape?keyword=${searchText}`;
  const request = await fetch((url), {
    method: 'GET',
  })
  const response = await request.json();

  document.querySelector('.product_holder').innerHTML = '';

  const productHolder = document.querySelector('.product_holder');

  response.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.className = ' product_div'

    const imageDiv = document.createElement('div');
    const image = document.createElement('img');
    imageDiv.appendChild(image)
    image.src = product.image;
    image.className = 'product_image'
    imageDiv.className = 'image_div'
    productDiv.appendChild(imageDiv);

    const title = document.createElement('h3');
    title.innerText = product.title;
    title.className = 'product_title'
    productDiv.appendChild(title);

    const rating = document.createElement('h4');
    rating.innerText = product.rating;
    rating.className = 'product_rating'
    productDiv.appendChild(rating);

    const reviews = document.createElement('h4');
    reviews.innerText = `${product.reviews} reviews`;
    reviews.className = 'product_reviews'
    productDiv.appendChild(reviews);

    productHolder.appendChild(productDiv)
  });

  const pageDiv = document.querySelector('.page')
  pageDiv.appendChild(productHolder)
}

var button = document.querySelector('.search-btn');
button.addEventListener('click', search);

const checkKey = (event) => {
  if (event.keyCode == '13') search();
}

var searchBar = document.querySelector('.search_text');
searchBar.addEventListener('keypress', checkKey);

