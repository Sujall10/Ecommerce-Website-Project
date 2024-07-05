'use strict';

document.addEventListener("DOMContentLoaded", function() {
  // Array to store wishlist items (in a real application, this might be stored in localStorage or a backend)
  let wishlistItems = [];

  // Select all 'Add to Wishlist' buttons
  const addToWishlistButtons = document.querySelectorAll('.btn-action add-to-wishlist');

  addToWishlistButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      // Get product details
      const product = button.closest('.product');
      const productName = product.querySelector('h3').textContent;
      const productPrice = product.querySelector('p').textContent;

      // Check if the item is already in the wishlist
      const isInWishlist = wishlistItems.some(item => item.name === productName);

      if (!isInWishlist) {
        // Add item to wishlist array
        wishlistItems.push({ name: productName, price: productPrice });

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
    wishlist.innerHTML = ''; // Clear existing list

    wishlistItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price}`;
      wishlist.appendChild(li);
    });
  }
});


// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}