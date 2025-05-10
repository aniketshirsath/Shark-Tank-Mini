
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");


let newarr = [];
// task1 show data in ui

function GetDatafromApi() {
  fetch('http://localhost:3000/pitches')
    .then((res) => res.json())
    .then((data) => {
      newarr = data
      cardlist(data);
    }).catch((err) => {
      console.log(err);
    })
}

GetDatafromApi()

function createcard(image, title, founder, category, price, id) {
  let singlecard =
    `
    <div class="card" id=${id}>
  <div class = "card-img">
    <div class="id">${id}</div>
    <a href="des.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&category=${encodeURIComponent(category)}&founder=${encodeURIComponent(founder)}&price=${encodeURIComponent(price)}&id=${encodeURIComponent(id)}"
    style="text-decoration: none; color: black;"><img src="${image}" alt="..." style="height:300px; width:245px;">
  </div>
  <div class="card-body">
    <h4 class="card-title">${title}</h4>
    <p class="card-founder">Founder:${founder}</p>
    <p class="card-category">${category}</p>
    <p class="card-price">${price}</p></a>
    <button class="card-link" id=${id}>Edit</button>
    <button class="card-button" id=${id}>Delete</button>
  </div>
</div>`
  return singlecard;
} 

function cardlist(data) {
  let container = data.map((el) =>
    createcard(el.image, el.title, el.founder, el.category, el.price, el.id)
  );

  document.querySelector("#data-list-wrapper").innerHTML = container.join("");
}


// task 2 Add Pitch

pitchCreateBtn.addEventListener("click", () => {
  let ProductObj =
  {
    title: pitchTitleInput.value,
    image: pitchImageInput.value,
    founder: pitchfounderInput.value,
    category: pitchCategoryInput.value,
    price: pitchCategoryInput.value
  }

  fetch("http://localhost:3000/pitches", {

    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(ProductObj)
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Product Added 👍")
    })
    .catch((err) => {
      console.log(err)
    })
})

// Task 3 -- Sort On Price

sortAtoZBtn.addEventListener("click", () => {
  const sortdata = newarr.sort((a, b) => a.price - b.price);
  cardlist(sortdata);
})

sortZtoABtn.addEventListener("click", () => {
  const sortdata = newarr.sort((a, b) => b.price - a.price);
  cardlist(sortdata);
})

// TAsk 4 -- Filter 

filterFood.addEventListener("click", () => {
  let filterData = newarr.filter((el) => el.category === "Food")
  cardlist(filterData);
})

filterElectronics.addEventListener("click", () => {
  let filterData = newarr.filter((el) => el.category === "Electronics")
  cardlist(filterData);
})

filterPersonalCare.addEventListener("click", () => {
  let filterData = newarr.filter((el) => el.category === "Personal Care")
  cardlist(filterData);
})

// Task 5  -- Put Method (Update)

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-link")) {

    getsingledata(e.target.id)

  }
})

function getsingledata(currentid) {
  fetch(`http://localhost:3000/pitches/${currentid}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      updatePitchIdInput.value = data.id;
      updatePitchCategoryInput.value = data.category;
      updatePitchImageInput.value = data.image;
      updatePitchPriceInput.value = data.price;
      updatePitchTitleInput.value = data.title;
      updatePitchfounderInput.value = data.founder;
    })
    .catch((err) => {
      console.log(err)
    })
}

updatePitchBtn.addEventListener("click", () => {
  let UpdateProductData =
  {
    id: updatePitchIdInput.value,
    category: updatePitchCategoryInput.value,
    image: updatePitchImageInput.value,
    price: updatePitchPriceInput.value,
    title: updatePitchTitleInput.value,
    founder: updatePitchfounderInput.value,
  }

  fetch(`http://localhost:3000/pitches/${updatePitchIdInput.value}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(UpdateProductData)
    }
  ).then((res) => {
    console.log(res);
    alert("Updated ✅")
  })
    .catch((err) => {
      console.log(err);
    })


})

//Task 6 --  Update Price

updatePricePitchPriceButton.addEventListener("click",(e)=>
{
  let PriceUpadate =
  {
    id : updatePricePitchId.value,
    price : updatePricePitchPrice.value
  }

  fetch(`http://localhost:3000/pitches/${PriceUpadate.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(PriceUpadate)
  })
    .then((res) => {
      alert("Price Updated 👍")
    })
    .catch((err) => {
      console.log(err)
    })
}) 

//Task 7 -- Delete Product

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-button")) {
    DeleteProduct(e.target.id);
  }
});

function DeleteProduct(id) {
  fetch(`http://localhost:3000/pitches/${id}`,
    {
      method: "DELETE",
    })
    .then((res) => {
      console.log(res);
      alert("Product Deleted ✅");
    })
    .catch((err) => {
      console.log(err);
    })
}


//Task 8 -- Search input

searchByButton.addEventListener("click",()=>
{
  const searchBySelectValue = searchBySelect.value
  const searchByInputValue = searchByInput.value

  const SearchData = newarr.filter((el,i)=>{
    if(searchBySelectValue=="title")
    {
      return el.title.toLowerCase().includes(searchByInputValue.toLowerCase())
    }
    else if(searchBySelectValue=="founder")
    {
      return el.founder.toLowerCase().includes(searchByInputValue.toLowerCase())
    }
    else
    {
      return el
    }
  })

  cardlist(SearchData)
})