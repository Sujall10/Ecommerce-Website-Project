document.addEventListener("DOMContentLoaded", function() {
  let cartItems = [];

  function updateCartBadge() {
    const badgeElement = document.getElementById("badge");
    if (badgeElement) {
      badgeElement.textContent = cartItems.length.toString();
    }
  }

  function addItemToCart(itemId) {
    let itemToAdd = jsonData.find(item => item.id === itemId);
    if (itemToAdd) {
      cartItems.push(itemToAdd);
      console.log(`Added item ${itemToAdd.name} to cart.`);
      updateCartSummary(); // Update cart summary after adding item
    } else {
      console.log(`Item with ID ${itemId} not found.`);
    }
  }

  function saveCartState() {
    document.cookie = `cartItems=${JSON.stringify(cartItems)}; path=/`;
    updateCartSummary(); // Update cart summary after saving state
  }

  document.addEventListener('click', function(event) {
    const addToCartBtn = event.target.closest('.add-to-cart-btn');
    if (addToCartBtn) {
      const itemId = generateItemId(); // Replace with your item ID generation logic
      addItemToCart(itemId);
    }
  });

  function generateItemId() {
    return Math.floor(Math.random() * 1000); // Example: Generate a random number
  }

  function initCart() {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('cartItems='))
      ?.split('=')[1];

    if (cookieValue) {
      cartItems = JSON.parse(cookieValue);
      updateCartBadge();
      updateCartSummary(); // Update cart summary after initializing
    }
  }

  function getQueryParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return Object.fromEntries(urlParams.entries());
  }

  function fetchCartDetails() {
    let params = getQueryParams();
    let itemId = params['id'];

    if (!itemId) {
      console.error("No item ID found in the URL.");
      return;
    }

    console.log('Item ID from URL:', itemId);

    fetch('content.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(contentData => {
        let item = contentData.find(item => item.id == itemId);
        if (item) {
          createCartDetails(item);
        } else {
          console.error("Item not found for ID:", itemId);
        }
      })
      .catch(error => console.error('Error fetching cart details:', error));
  }

  function createCartDetails(item) {
    let cartDetailsContainer = document.getElementById("cartDetailsContainer");

    if (!cartDetailsContainer) {
      console.error("Cart details container not found.");
      return;
    }

    let itemElement = document.createElement("div");
    itemElement.textContent = `Item ID: ${item.id}, Name: ${item.name}, Price: ${item.price}`;

    cartDetailsContainer.appendChild(itemElement);

    updateCartSummary();
  }

  function updateCartSummary() {
    let totalCost = cartItems.reduce((acc, item) => {
      return acc + (item ? item.price : 0);
    }, 0);

    let totalItems = cartItems.length;

    document.getElementById("totalCost").textContent = `Total Cost: Rs ${totalCost}`;
    document.getElementById("totalItems").textContent = `Total Items: ${totalItems}`;
    console.log(`Total Items: ${totalItems}`,`Total cost: ${totalCost}`)
  }

  fetchCartDetails();
  initCart();
});

// Function to load content into the header and footer
function load(url, elementId) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onreadystatechange = function () {
    if (req.readyState === 4 && req.status === 200) {
      document.getElementById(elementId).innerHTML = req.responseText;
    } else if (req.readyState === 4) {
      console.error('Failed to load ' + url + '. Status: ' + req.status);
    }
  };
  req.send(null);
}

window.onload = function() {
  load("header.html", "header");
  load("footer.html", "footer");
};




