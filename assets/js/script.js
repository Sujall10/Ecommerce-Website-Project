'use strict';

document.addEventListener("DOMContentLoaded", function() {
  // Array to store wishlist items (in a real application, this might be stored in localStorage or a backend)
  let wishlistItems = [];

  // Select all 'Add to Wishlist' buttons
  const addToWishlistButtons = document.querySelectorAll('.btn-action.add-to-wishlist');

  addToWishlistButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      // Get product details
      const product = button.closest('.product');
      if (!product) {
        console.error("Product not found for button:", button);
        return;
      }
      
      const productName = product.querySelector('h3');
      const productPrice = product.querySelector('p');

      if (!productName || !productPrice) {
        console.error("Product name or price element not found for product:", product);
        return;
      }

      const productNameText = productName.textContent.trim();
      const productPriceText = productPrice.textContent.trim();

      // Check if the item is already in the wishlist
      const isInWishlist = wishlistItems.some(item => item.name === productNameText);

      if (!isInWishlist) {
        // Add item to wishlist array
        wishlistItems.push({ name: productNameText, price: productPriceText });

        // Update the UI (wishlist display)
        updateWishlistUI();
      } else {
        alert('This item is already in your wishlist.');
      }
    });
  });

  // Function to update the UI with current wishlist items
  function updateWishlistUI() {
    const wishlist = document.getElementById('wishlist-items');
    if (!wishlist) {
      console.error("Wishlist container not found.");
      return;
    }
    
    wishlist.innerHTML = ''; // Clear existing list

    wishlistItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price}`;
      wishlist.appendChild(li);
    });
  }
});


// Modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// Ensure modal and its components exist before adding event listeners
if (modal && modalCloseBtn && modalCloseOverlay) {
  // Modal function
  const modalCloseFunc = function () { modal.classList.add('closed') };

  // Modal event listeners
  modalCloseOverlay.addEventListener('click', modalCloseFunc);
  modalCloseBtn.addEventListener('click', modalCloseFunc);
} else {
  console.error("Modal elements not found.");
}


// Notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// Ensure notification toast elements exist before adding event listeners
if (notificationToast && toastCloseBtn) {
  // Notification toast event listener
  toastCloseBtn.addEventListener('click', function () {
    notificationToast.classList.add('closed');
  });
} else {
  console.error("Notification toast elements not found.");
}


// Mobile menu variables
const mobileMenuOpenBtns = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenus = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtns = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtns.length; i++) {
  const mobileMenuOpenBtn = mobileMenuOpenBtns[i];
  const mobileMenu = mobileMenus[i];
  const mobileMenuCloseBtn = mobileMenuCloseBtns[i];

  if (!mobileMenuOpenBtn || !mobileMenu || !mobileMenuCloseBtn || !overlay) {
    console.error(`Mobile menu elements not found for index ${i}`);
    continue;
  }

  // Mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
  };

  // Mobile menu event listeners
  mobileMenuOpenBtn.addEventListener('click', function () {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn.addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);
}


// Accordion variables
const accordionBtns = document.querySelectorAll('[data-accordion-btn]');
const accordions = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtns.length; i++) {
  const accordionBtn = accordionBtns[i];
  const accordion = accordions[i];

  if (!accordionBtn || !accordion) {
    console.error(`Accordion elements not found for index ${i}`);
    continue;
  }

  accordionBtn.addEventListener('click', function () {
    const isAccordionActive = accordion.classList.contains('active');

    for (let j = 0; j < accordions.length; j++) {
      accordions[j].classList.remove('active');
      accordionBtns[j].classList.remove('active');
    }

    if (!isAccordionActive) {
      accordion.classList.add('active');
      accordionBtn.classList.add('active');
    }
  });
}
