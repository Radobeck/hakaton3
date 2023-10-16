let API = " http://localhost:8000/products";

//? элементы для модалки
let addBtn = document.querySelector(".navbar_add-btn");
let modalWindow = document.querySelector("#modalWindow");
let closeModalBtn = document.querySelector("#closeModal");
let addModalBtn = document.querySelector("#addProduct");
let closeModal = document.querySelector(".close");
//? элементы для функционала CREATE
let inpTitle = document.querySelector("#inp-title");
let inpDesc = document.querySelector("#inp-desc");
let inpPrice = document.querySelector("#inp-price");
let inpImage = document.querySelector("#inp-image");
//? элементы для функционала EDIT
let editInpTitle = document.querySelector("editIinp-title");
let editInpDesc = document.querySelector("#editInp-desc");
let editInpPrice = document.querySelector("#editInp-price");
let editInpImage = document.querySelector("#editInp-image");
let editId = null;
let EditModalBtn = document.querySelector("#addEditBtn");
let editBtn = document.querySelector("#editBtn"); //! change
//? элементы для функции SEARCH
let inpSearch = document.querySelector("#search-products");
let searchBtn = document.querySelector("#search-btn");
let searchValue = "";

let productsBottom = document.querySelector(".products-bottom");

// ! CREATE
async function createProduct(newProduct) {
  try {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  } catch (error) {
    console.log(error, "you are fucked up in CREATE");
  }
}

addBtn.onclick = function () {
  modalWindow.style.display = "block";
};

addModalBtn.addEventListener("click", () => {
  if (
    !inpTitle.value.trim() ||
    !inpDesc.value.trim() ||
    !inpPrice.value.trim() ||
    !inpImage.value.trim()
  ) {
    alert("Заполните поле сука!");
    return;
  }
  let newProduct = {
    title: inpTitle.value,
    description: inpDesc.value,
    price: inpPrice.value,
    imageUrl: inpImage.value,
  };
  createProduct(newProduct);
  renderProducts();
  (inpTitle.value = ""),
    (inpDesc.value = ""),
    (inpPrice.value = ""),
    (inpImage.value = "");
});
// ! CREATE

//! MODAL FUNCTION

closeModalBtn.onclick = function () {
  modalWindow.style.display = "none";
};
closeModal.onclick = function () {
  modalWindow.style.display = "none";
};
//! MODAL FUNCTION

//! READ
async function renderProducts() {
  try {
    let res = await fetch(`${API}?q=${searchValue}`);
    let data = await res.json();

    productsBottom.innerHTML = "";
    data.forEach((item) => {
      productsBottom.innerHTML += ` 
      <div class="cardContainer">
          <img
            src="${item.imageUrl}"
            alt="${item.id}"
            class="card-image"
          />
          <h4 class="card-title">${item.title}</h4>
          <p class="card-description">${item.description}</p>
          <p class="card-price">${item.price} som</p>
            <button onclick="deleteProduct(${item.id})" class="delete-btn">Delete</button>
            <button onclick="${item.id}" class="edit-btn" id="editBtn">Edit</button>
        </div>`;
    });
  } catch (error) {
    console.log(error, "you are fucked up in READ");
  }
}
renderProducts();
//! READ

//! DELETE
async function deleteProduct(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  renderProducts();
}
//! DELETE

//! EDIT
async function editProduct(id) {
  try {
    let res = await fetch(`${API}/${id}`);
    let data = await res.json();
    (editInpTitle.value = data.title),
      (editInpDesc.value = data.description),
      (editInpPrice.value = data.price),
      (editInpImage.value = data.imageUrl);
    editId = id;
  } catch (error) {
    console.log(error, "you are fucked up in EDIT");
  }
}

editBtn.addEventListener("click", () => {
  let editedProduct = {
    title: editInpTitle.value,
    description: editInpDesc.value,
    price: editInpPrice.value,
    imageUrl: editInpImage.value,
  };
  saveChanges(editedProduct);
});

async function saveChanges(editedProduct) {
  try {
    await fetch(`${API}/${editId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedProduct),
    });
    let editModal = document.querySelector(".modal");
    renderProducts();
  } catch (error) {
    console.log(error, "you are fucked up in saveChanges");
  }
}
//! EDIT

//! SEARCH
inpSearch.addEventListener("input", (e) => {
  searchValue = e.target.value;
});
searchBtn.addEventListener("click", () => {
  renderProducts();
});
//! SEARCH
