//ExpenseTracker App

function reload() {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";

  window.addEventListener("DOMContentLoaded", initialize());
}

reload();

function initialize() {
  const items = JSON.parse(localStorage.getItem("allItems")) || [];

  items.map((item) => {
    display(item);
  });
  sessionStorage.removeItem("itemId");
}

function deleteItem(item, li) {
  const items = JSON.parse(localStorage.getItem("allItems")) || [];

  let newItemList = [];

  items.map((allItems) => {
    if (allItems.id !== item.id) {
      newItemList.push(allItems);
    }
  });
  li.remove();
  console.log(newItemList);
  localStorage.setItem("allItems", JSON.stringify(newItemList));
}

function display(item) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  const del = document.createElement("button");
  const edit = document.createElement("button");

  li.textContent =
    item.amount + "-" + item.description + "-" + item.category + "   ";

  del.textContent = "Delete" + "    ";
  edit.textContent = "Edit" + "     ";

  del.addEventListener("click", () => {
    deleteItem(item, li);
  });

  edit.addEventListener("click", () => {
    let btn = document.getElementById("btn");

    console.log(btn);

    btn.textContent = "Update";
    EditItem(item);
  });

  li.appendChild(del);
  li.appendChild(edit);

  ul.appendChild(li);
}

function EditItem(item) {
  sessionStorage.setItem("itemId", item.id);
}

function handleForm(event) {
  event.preventDefault();

  console.log(event.target);

  const amount = event.target.ExpAmount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;
  console.log(category);
  let btn = document.getElementById("btn");

  let items = JSON.parse(localStorage.getItem("allItems")) || [];

  console.log(items);

  const id = Date.now();

  const editId = sessionStorage.getItem("itemId");

  if (editId) {
    items.map((item) => {
      if (item.id == editId) {
        item.amount = amount;
        item.description = description;
        item.category = category;
      }
      sessionStorage.removeItem("itemId");
    });
    btn.textContent = "Submit";
  } else {
    const data = {
      amount,
      description,
      category,
      id,
    };

    items.push(data);
  }

  localStorage.setItem("allItems", JSON.stringify(items));
  reload();
}
