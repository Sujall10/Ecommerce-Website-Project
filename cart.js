document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
  
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productId = product.getAttribute('data-id');
        const productName = product.querySelector('h2').textContent;
        const productDescription = product.querySelector('p').textContent;
  
        const cartItem = {
          id: productId,
          name: productName,
          description: productDescription
        };
  
        cart.push(cartItem);
        console.log(cart);  // For debugging: logs the cart contents to the console
        alert(`${productName} has been added to your cart.`);
      });
    });
  });
  