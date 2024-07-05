let contentTitle;

function dynamicClothingSection(ob) {
    let boxDiv = document.createElement("div");
    boxDiv.classList.add("box");

    let boxLink = document.createElement("a");
    boxLink.href = "/contentdetails.html?" + ob.id;

    let imgTag = document.createElement("img");
    imgTag.src = ob.preview;

    let detailsDiv = document.createElement("div");
    detailsDiv.classList.add("details");

    let h3 = document.createElement("h3");
    let h3Text = document.createTextNode(ob.name);
    h3.appendChild(h3Text);

    let h4 = document.createElement("h4");
    let h4Text = document.createTextNode(ob.brand);
    h4.appendChild(h4Text);

    let h2 = document.createElement("h2");
    let h2Text = document.createTextNode("Rs " + ob.price);
    h2.appendChild(h2Text);

    boxDiv.appendChild(boxLink);
    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(h4);
    detailsDiv.appendChild(h2);

    return boxDiv;
}

let mainContainer = document.getElementById("mainContainer");
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");

let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if (this.readyState === 4) {
        if (this.status === 200) {
            contentTitle = JSON.parse(this.responseText);
            if (document.cookie.indexOf(",counter=") >= 0) {
                let counter = document.cookie.split(",")[1].split("=")[1];
                document.getElementById("badge").innerHTML = counter;
            }
            for (let i = 0; i < contentTitle.length; i++) {
                if (contentTitle[i].isAccessory) {
                    containerAccessories.appendChild(
                        dynamicClothingSection(contentTitle[i])
                    );
                } else {
                    containerClothing.appendChild(
                        dynamicClothingSection(contentTitle[i])
                    );
                }
            }
        } else {
            console.log("Failed to fetch content from content.json");
        }
    }
};

httpRequest.open("GET", "content.json", true);
httpRequest.send();
