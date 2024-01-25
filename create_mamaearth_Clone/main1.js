// Function to create a product card
function createProductCard(item) {
  const article = document.createElement("article");
  article.className = "card__article swiper-slide";

  const div = document.createElement("div");
  div.className = "mani-cart-container";

  div.innerHTML = `
    <p class="seller sellers ">${item.seller}</p>
    <img class="img-cart cart-img" src="${item.image}" alt="">
    <p class="details product_details">${item.product_details}</p>
    <div class="subtitles subtitle">${item.subtitle}</div>
    <div class="rating-review">
      <span class="rating">${item.rating}</span>
    </div>
    <p class="price">₹${item.price} </p>
    <button class="AddToCart add">Add to Cart</button>
  `;

  article.appendChild(div);
  return article;
}

// Function to fetch and display product cards
function displayProductCards(container, dataUrl) {
  fetch(dataUrl)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const productCard = createProductCard(item);
        container.appendChild(productCard);
      });
    })
    .catch((err) => console.log(err));
}

// Function to add item to cart
function addToCart(item) {
  const seller = item.querySelector(".seller").textContent;
  const image = item.querySelector(".img-cart").src;
  const productDetails = item.querySelector(".details").textContent;
  const subtitle = item.querySelector(".subtitles").textContent;
  const rating = item.querySelector(".rating").textContent;
  const price = item.querySelector(".price").textContent;

  const cartItem = {
    seller,
    image,
    productDetails,
    subtitle,
    rating,
    price,
  };

  // Retrieve existing cart items from localStorage or create an empty array
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  // Add the new item to the cart
  existingCart.push(cartItem);

  // Update localStorage with the modified cart
  localStorage.setItem("cart", JSON.stringify(existingCart));

  console.log("Item added to cart:", cartItem);
}

// Event delegation to handle clicks on the "Add to Cart" button
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("AddToCart")) {
    addToCart(event.target.closest(".mani-cart-container"));
  }
});

// Display product cards for each category
const bestSellersContainer = document.querySelector("#best_sellers");
const lightningContainer = document.querySelector("#Lightning");
const makeupContainer = document.querySelector("#makeup");
const newLaunchesContainer = document.querySelector("#New_Launches");
const babyCareContainer = document.querySelector("#Baby_Care");

displayProductCards(
  bestSellersContainer,
  "./Product json/product_sellers.json"
);
displayProductCards(
  lightningContainer,
  "./Product json/product_Lightning.json"
);
displayProductCards(makeupContainer, "./Product json/product_makeup.json");
displayProductCards(
  newLaunchesContainer,
  "./Product json/NewLaunches_product.json"
);
displayProductCards(babyCareContainer, "./Product json/BabyCare_product.json");
