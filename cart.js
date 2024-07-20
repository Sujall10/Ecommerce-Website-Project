document.addEventListener("DOMContentLoaded", function() {
  let cartItems = [];

  function updateCartBadge() {
      const badgeElement = document.getElementById("badge");
      if (badgeElement) {
          badgeElement.textContent = cartItems.length.toString();
      }
  }

  function addItemToCart(itemId) {
      fetch('content.json')
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok ' + response.statusText);
              }
              return response.json();
          })
          .then(contentData => {
              let itemToAdd = contentData.find(item => item.id == itemId);
              if (itemToAdd) {
                  cartItems.push(itemToAdd);
                  console.log(`Added item ${itemToAdd.name} to cart.`);
                  updateCartSummary();
                  saveCartState();
              } else {
                  console.log(`Item with ID ${itemId} not found.`);
              }
          })
          .catch(error => console.error('Error fetching content data:', error));
  }

  function saveCartState() {
      document.cookie = `cartItems=${JSON.stringify(cartItems)}; path=/`;
  }

  document.addEventListener('click', function(event) {
      const addToCartBtn = event.target.closest('.add-to-cart-btn');
      if (addToCartBtn) {
          const itemId = addToCartBtn.getAttribute('data-item-id');
          addItemToCart(itemId);
      }
  });

  function initCart() {
      const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('cartItems='))
          ?.split('=')[1];

      if (cookieValue) {
          cartItems = JSON.parse(cookieValue);
          updateCartBadge();
          updateCartSummary();
      }
  }

  function fetchCartDetails() {
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
      itemElement.textContent = `Item ID: ${item.id}, Name: ${item.name}, Price: Rs ${item.price}`;

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
      console.log(`Total Items: ${totalItems}`, `Total cost: ${totalCost}`);
  }

  fetchContentDetails();
  fetchCartDetails();
  initCart();
});

// Function to load content into the header and footer
function load(url, elementId) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onreadystatechange = function () {
      if (req.readyState === 4) {
          if (req.status === 200) {
              document.getElementById(elementId).innerHTML = req.responseText;
          } else {
              console.error('Failed to load ' + url + '. Status: ' + req.status);
          }
      }
  };
  req.send(null);
}

window.onload = function() {
  load("header.html", "header");
  load("footer.html", "footer");
};