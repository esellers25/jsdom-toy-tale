let addToy = false;


document.addEventListener("DOMContentLoaded", function(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(function(toyArr){
    toyArr.forEach(function(toy){
      makeToy(toy)
    })
  }
)
  
function makeToy(toy){
    let toyCard = document.createElement("div")
    toyCard.className = "card"
    let toyName = document.createElement("h2")
    let toyImage = document.createElement("img")
    toyImage.src = `${toy.image}`
    toyImage.className = "toy-avatar"
    let toyLikes = document.createElement("p")
    let toyButton = document.createElement("button")
    toyButton.className = "like-btn"
    toyCard.append(toyName, toyImage, toyLikes, toyButton)
    let toyCollection = document.querySelector("#toy-collection")
    toyCollection.append(toyCard)
  }

let toyForm = document.querySelector("form.add-toy-form")
toyForm.addEventListener("submit", function(name, imageURL){
  fetch("http://localhost:3000/toys"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": `${name}`,
      "image": `${imageURL}`,
      "like": 0
    })
  } .then(res => res.json())
  .then(result => makeToy(result))

})

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    
  });
})
}) 
