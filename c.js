// console.clear();
let contentTitle;

function dynamicClothingSection(ob) {
    let boxDiv = document.createElement("div");
    boxDiv.id = "box";
  
    let boxLink = document.createElement("a");
    boxLink.href = "/contentDetails.html?id=" + ob.id; // Ensure the id parameter is correctly set
  
    let imgTag = document.createElement("img");
    imgTag.src = ob.preview;
  
    let detailsDiv = document.createElement("div");
    detailsDiv.id = "details";
  
    let h3 = document.createElement("h3");
    h3.textContent = ob.name;
  
    let h4 = document.createElement("h4");
    h4.textContent = ob.brand;
  
    let h2 = document.createElement("h2");
    h2.textContent = "rs " + ob.price;
  
    boxDiv.appendChild(boxLink);
    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    detailsDiv.appendChild(h3);
    detailsDiv.appendChild(h4);
    detailsDiv.appendChild(h2);
  
    return boxDiv;
  }

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicClothingSection());

// console.log(boxDiv)

let mainContainer = document.getElementById("mainContainer");
let containerClothing = document.getElementById("containerClothing");
let containerAccessories = document.getElementById("containerAccessories");
// mainContainer.appendChild(dynamicClothingSection('hello world!!'))

// BACKEND CALLING

let httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function() {
  if (this.readyState === 4) {
    if (this.status == 200) {
      // console.log('call successful');
      contentTitle = JSON.parse(this.responseText);
      if (document.cookie.indexOf(",counter=") >= 0) {
        var counter = document.cookie.split(",")[1].split("=")[1];
        document.getElementById("badge").innerHTML = counter;
      }
      for (let i = 0; i < contentTitle.length; i++) {
        if (contentTitle[i].isAccessory) {
          console.log(contentTitle[i]);
          containerAccessories.appendChild(
            dynamicClothingSection(contentTitle[i])
          );
        } else {
          console.log(contentTitle[i]);
          containerClothing.appendChild(
            dynamicClothingSection(contentTitle[i])
          );
        }
      }
    } else {
      console.log("call failed!");
    }
  }
};
httpRequest.open(
  "GET",
  "content.json",
  true
);
httpRequest.send();