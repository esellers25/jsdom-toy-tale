let addToy = false;

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
    toyCard.innerText = toy.name
    let toyName = document.createElement("h2")
    let toyImage = document.createElement("img")
    toyImage.src = `${toy.image}`
    toyImage.className = "toy-avatar"
    let toyLikes = document.createElement("p")
    toyLikes.innerText = `${toy.likes} Likes`
    let toyButton = document.createElement("button")
    toyButton.className = "like-btn"
    toyButton.innerText = "Like"
    toyCard.append(toyName, toyImage, toyLikes, toyButton)
    let toyCollection = document.querySelector("#toy-collection")
    toyCollection.append(toyCard)

    toyButton.addEventListener("click", function(){
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: toy.likes + 1 
        })
      }).then(res => res.json())
        .then(function(updatedLike){
          toy.likes = updatedLike.likes
          toyLikes.innerText = `${updatedLike.likes} Likes`
        })
    })
  }

let toyForm = document.querySelector("form.add-toy-form")
toyForm.addEventListener("submit", function(evt){
  evt.preventDefault()
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": evt.target.name.value,
      "image": evt.target.image.value,
      "like": 0
    })
  })
  .then(res => res.json())
  .then(function(newToyObj){
    makeToy(newToyObj)
  })
})

}) 
