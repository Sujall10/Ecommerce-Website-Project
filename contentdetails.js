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
        let order = item.id;
        let counter = 1;

        // Check if orderId and counter are already in cookies
        let cookies = document.cookie.split(';').map(cookie => cookie.trim());
        cookies.forEach(cookie => {
            if (cookie.startsWith('orderId=')) {
                order = cookie.split('=')[1];
            }
            if (cookie.startsWith('counter=')) {
                counter = Number(cookie.split('=')[1]);
            }
        });

        // Update orderId and counter in cookies
        document.cookie = `orderId=${order}; path=/`;
        document.cookie = `counter=${counter + 1}; path=/`;

        // Redirect to cart.html with itemId as parameter
        window.location.href = `cart.html?id=${item.id}`;
    });

    textSection.appendChild(buttonTag);
    detailsDiv.appendChild(textSection);

    // Append details to container
    contentDetailsContainer.appendChild(detailsDiv);
}

// Function to fetch content details based on item ID
function fetchContentDetails() {
    let params = getQueryParams();
    let itemId = params['id'];

    if (!itemId) {
        console.error("No item ID found in the URL.");
        return;
    }

    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                try {
                    let contentData = JSON.parse(this.responseText);
                    let item = contentData.find(item => item.id == itemId);
                    if (item) {
                        createContentDetails(item);
                    } else {
                        console.error("Item not found for ID:", itemId);
                    }
                } catch (e) {
                    console.error("Error parsing JSON response: ", e);
                }
            } else {
                console.error("HTTP request failed with status:", this.status);
            }
        }
    };

    // Replace 'content.json' with your actual endpoint
    httpRequest.open("GET", "content.json", true);
    httpRequest.send();
}

// Load content details when the window is fully loaded
window.addEventListener('DOMContentLoaded', function() {
    fetchContentDetails();
});

