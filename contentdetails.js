// Function to get query parameters
// Function to get query parameters
function getQueryParams() {
    let params = {};
    let queryString = window.location.search.substring(1);
    console.log("Query String:", queryString); // Debugging statement
    queryString.split("&").forEach(function(part) {
        let param = part.split("=");
        params[param[0]] = decodeURIComponent(param[1]);
    });
    console.log("Parsed Params:", params); // Debugging statement
    return params;
}

function createContentDetails(item) {
    let contentDetailsContainer = document.getElementById("contentDetailsContainer");

    let detailsDiv = document.createElement("div");
    detailsDiv.id = "details";

    let imageSection = document.createElement("div");
    imageSection.id = "imageSection";

    let imgTag = document.createElement("img");
    imgTag.src = item.preview;
    imageSection.appendChild(imgTag);

    detailsDiv.appendChild(imageSection);

    let textSection = document.createElement("div");
    textSection.id = "productDetails";

    let h3 = document.createElement("h3");
    h3.textContent = item.name;
    textSection.appendChild(h3);

    let h4 = document.createElement("h4");
    h4.textContent = item.brand;
    textSection.appendChild(h4);

    let h2 = document.createElement("h2");
    h2.textContent = "Price: rs " + item.price;
    textSection.appendChild(h2);

    let description = document.createElement("p");
    description.textContent = item.description || "No description available.";
    textSection.appendChild(description);

    detailsDiv.appendChild(textSection);

    contentDetailsContainer.appendChild(detailsDiv);
}

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
                        console.error("Item not found.");
                    }
                } catch (e) {
                    console.error("Error parsing JSON response: ", e);
                }
            } else {
                console.error("HTTP request failed with status:", this.status);
            }
        }
    };

    httpRequest.open("GET", "content.json", true);
    httpRequest.send();
}

window.onload = function() {
    fetchContentDetails();
};
