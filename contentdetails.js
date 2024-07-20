// Function to parse query string parameters
function getQueryParams() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return Object.fromEntries(urlParams.entries());
}

// Function to create content details based on item data
function createContentDetails(item) {
  let contentDetailsContainer = document.getElementById("contentDetailsContainer");

  if (!contentDetailsContainer) {
      console.error("Content details container not found.");
      return;
  }

  // Clear previous content
  contentDetailsContainer.innerHTML = '';

  // Create main details div
  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  // Create image section
  let imageSection = document.createElement("div");
  imageSection.id = "imageSection";

  let imgTag = document.createElement("img");
  imgTag.src = item.preview;
  imageSection.appendChild(imgTag);

  detailsDiv.appendChild(imageSection);

  // Create text section
  let textSection = document.createElement("div");
  textSection.id = "productDetails";

  let h3 = document.createElement("h3");
  h3.textContent = item.name;
  textSection.appendChild(h3);

  let h4 = document.createElement("h4");
  h4.textContent = item.brand;
  textSection.appendChild(h4);

  let h2 = document.createElement("h2");
  h2.textContent = "Price: Rs " + item.price; // Assuming price is in Rs
  textSection.appendChild(h2);

  let description = document.createElement("p");
  description.textContent = item.description || "No description available.";
  textSection.appendChild(description);

  // Create Add to Cart button
  let buttonTag = document.createElement("button");
  buttonTag.textContent = "Add to Cart";
  buttonTag.classList.add("add-to-cart-btn"); // Add a class for easier event delegation

  buttonTag.addEventListener("click", function() {
      addToCart(item);
  });

  textSection.appendChild(buttonTag);
  detailsDiv.appendChild(textSection);

  // Append details to container
  contentDetailsContainer.appendChild(detailsDiv);
}

// Function to add item to cart and store in local storage
function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartItem = cart.find(ci => ci.id === item.id);

  if (cartItem) {
      cartItem.quantity += 1;
  } else {
      cart.push({...item, quantity: 1});
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = `cart.html?id=${item.id}`;
}

// Function to fetch content details based on item ID
function fetchContentDetails() {
  let params = getQueryParams();
  let itemId = params['id'];

  if (!itemId) {
      console.error("No item ID found in the URL.");
      return;
  }

  fetch('content.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(contentData => {
          let item = contentData.find(item => item.id == itemId);
          if (item) {
              createContentDetails(item);
          } else {
              console.error("Item not found for ID:", itemId);
          }
      })
      .catch(error => console.error('Error fetching content details:', error));
}

// Load content details when the window is fully loaded
window.addEventListener('DOMContentLoaded', function() {
  fetchContentDetails();
});

// Function to display cart items and calculate totals
function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartContainer = document.getElementById("cartContainer");
  let totalCost = 0;
  let totalItems = 0;

  if (!cartContainer) {
      console.error("Cart container not found.");
      return;
  }

  cartContainer.innerHTML = '';

  cart.forEach(item => {
      let itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");

      let name = document.createElement("h3");
      name.textContent = item.name;
      itemDiv.appendChild(name);

      let quantity = document.createElement("p");
      quantity.textContent = `Quantity: ${item.quantity}`;
      itemDiv.appendChild(quantity);

      let price = document.createElement("p");
      price.textContent = `Price: Rs ${item.price * item.quantity}`;
      itemDiv.appendChild(price);

      cartContainer.appendChild(itemDiv);

      totalCost += item.price * item.quantity;
      totalItems += item.quantity;
  });

  // Check if the elements exist before setting text content
  const totalCostElement = document.getElementById("totalCost");
  if (totalCostElement) {
      totalCostElement.textContent = `Total Cost: Rs ${totalCost}`;
  } else {
      console.error("Total cost element not found.");
  }

  const totalItemsElement = document.getElementById("totalItems");
  if (totalItemsElement) {
      totalItemsElement.textContent = `Total Items: ${totalItems}`;
  } else {
      console.error("Total items element not found.");
  }
}

// Load cart items when cart.html is loaded
if (window.location.pathname.endsWith('cart.html')) {
  window.addEventListener('DOMContentLoaded', function() {
      displayCartItems();
  });
}