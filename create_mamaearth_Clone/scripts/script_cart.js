let isAuth = localStorage.getItem("isAuth") || "Not Authenticated";

if (isAuth !== "Authenticated") {
  window.location.href = "./login.html";
}

// Function to update the total price display
function updateTotalPriceDisplay() {
  // Retrieve existing cart items from localStorage
  let cartDetails = JSON.parse(localStorage.getItem("cart")) || [];

  // Calculate the total price
  let totalPrice = cartDetails.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace("₹", ""));
    return isNaN(itemPrice) ? total : total + itemPrice;
  }, 0);

  // Display the total price
  const totalPriceElement = document.querySelector(".total-price");
  if (totalPriceElement) {
    totalPriceElement.textContent = `Total Price: ₹${totalPrice.toFixed(2)}`;
  }
}

// ... (rest of the code remains unchanged)

// Function to create a product card
function createProductCard(item, index) {
  const article = document.createElement("article");
  article.className = "card__article ";

  const div = document.createElement("div");
  div.className = "mani-cart-container";

  div.innerHTML = `
    <p class="seller sellers">${item.seller}</p>
    <img class="img-cart cart-img" src="${item.image}" alt="">
    <p class="details product_details">${item.productDetails}</p>
    <div class="subtitles subtitle">${item.subtitle}</div>
    <div class="rating-review">
      <span class="rating">${item.rating}</span>
    </div>
    <p class="price">₹${item.price}</p>
    <button class="RemoveFromCart remove" data-seller="${item.seller}">Remove from Cart</button>
  `;

  article.appendChild(div);
  return article;
}

// Function to remove item from cart
function removeFromCart(seller, cardContainer) {
  // Retrieve existing cart items from localStorage
  let cartDetails = JSON.parse(localStorage.getItem("cart")) || [];

  // Find the index of the item to be removed
  const index = cartDetails.findIndex((item) => item.seller === seller);

  if (index !== -1) {
    // Remove the item at the specified index
    cartDetails.splice(index, 1);

    // Update localStorage with the modified cart
    localStorage.setItem("cart", JSON.stringify(cartDetails));

    // Find the specific product card within the cart container
    const productCard = cardContainer.querySelector(".mani-cart-container");

    // Remove the specific product card from the cart container
    if (productCard && productCard.parentNode) {
      productCard.parentNode.removeChild(productCard);
    }

    // Calculate and update the total price display
    updateTotalPriceDisplay();
  }
}

// Function to display product cards
function displayProductCards(container, cartDetails) {
  // Clear the current product cards
  container.innerHTML = "";

  // Iterate over cart items and create product cards
  cartDetails.forEach((item, index) => {
    const productCard = createProductCard(item, index);
    container.appendChild(productCard);
  });

  // Calculate and update the total price display
  updateTotalPriceDisplay();
}

// Event delegation to handle clicks on the "Remove from Cart" button
document.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("RemoveFromCart")) {
    const seller = target.dataset.seller;
    removeFromCart(seller, target.closest(".card__content"));
  }
});

// Display product cards from local storage for the cart
const cartContainer = document.querySelector(".card__content");
displayProductCards(
  cartContainer,
  JSON.parse(localStorage.getItem("cart")) || []
);
