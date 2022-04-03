const bookUri = "http://localhost:3000/books";
const writerUri = "http://localhost:3000/writers";
const publisherUri = "http://localhost:3000/publishers";
const transactionUri = "http://localhost:3000/transactions";
const userUri = "http://localhost:3000/users";

let config;
let token;

if (document.cookie) {
  token = document.cookie.split("=")[1];
  const decoded = jwt_decode(token);

  config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
} else {
  alert("Unauthorized");
  window.location.replace("/");
}

// Get Data From Backend & Print it /////////////////
async function printDatas(url, container, element) {
  container.innerHTML = "";
  const dataBuffer = await axios
    .get(url, config)
    .catch((err) => console.log(err));

  const datas = dataBuffer.data.data;
  console.log(datas);

  datas.forEach((data, index) => {
    container.innerHTML += element(data, index + 1);
  });
}
////////////////////////////////////////////////////

printDatas(bookUri, document.querySelector(".books-container"), bookElement);

// Click Event /////////////////////////////////

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu")) {
    menuHandle(e.target);
  }
});

function resetSection() {
  const menus = document.querySelectorAll(".menu");
  const dataContainer = document.querySelectorAll(".data-container");

  menus.forEach((m) => m.classList.remove("active"));
  dataContainer.forEach((d) => d.classList.add("hidden"));
}

function menuHandle(activeMenu) {
  resetSection();
  activeMenu.classList.add("active");
  document.querySelector(`.${activeMenu.id}`).classList.remove("hidden");

  switch (activeMenu.id) {
    case "books":
      printDatas(
        bookUri,
        document.querySelector(".books-container"),
        bookElement
      );
      break;
    case "writers":
      printDatas(
        writerUri,
        document.querySelector(".writers-container"),
        writerElement
      );
      break;
    case "publishers":
      printDatas(
        publisherUri,
        document.querySelector(".publishers-container"),
        publisherElement
      );
      break;
    case "transactions":
      printDatas(
        transactionUri,
        document.querySelector(".transactions-container"),
        transactionsElement
      );
      break;
    case "users":
      printDatas(
        userUri,
        document.querySelector(".users-container"),
        usersElement
      );
      break;
  }
}

function addBookButton() {
  resetSection();
  document.querySelector(".addBook").classList.remove("hidden");
}

// document.querySelector(".book-form").addEventListener("submit", addBook);

// function addBook(e) {
//   e.preventDefault();

//   const dataBuffer = await axios
//   .get(url, config)
//   .catch((err) => console.log(err));
// }

function logout() {
  document.cookie = "cookie=a ;max-age=0";
  window.location.replace("/");
}

async function deleteData(id, url) {
  if (confirm("Are you sure ?")) {
    await axios.delete(`${url}/${id}`, config).catch((err) => console.log(err));
    alert("delete data success");
    location.reload();
  }
}

/////////////////////////////////////////////////////////////////////////

// HTML Element ///////////////////////////////////////////////////////
function bookElement(data, index) {
  return `<tr class="border-b">
                    <td>${index}</td>
                    <td>${data.title}</td>
                    <td>${data.writer}</td>
                    <td>${data.publisher}</td>
                    <td>${data.releaseDate}</td>
                    <td>${data.genre}</td>
                    <td>${data.stock}</td>
                    <td>Rp${data.price}</td>
                    <td><a href="${data.img}" target="_blank" class="text-blue-500 border border-blue-400 p-1 m-1 hover:opacity-70">View</a></td>
                    <td><a class="text-emerald-600 border border-emerald-400 p-1 m-1 hover:opacity-70">Edit</a><a class="text-red-600 border border-red-400 p-1 m-1 cursor-pointer hover:opacity-70" onClick='deleteData("${data._id}", "${bookUri}")'>Delete</a></td>
                  </tr>`;
}

function writerElement(data, index) {
  let booksList = "";
  data.books.forEach((book) => (booksList += `<li>${book.title}</li>`));

  return `<tr class="border-b">
  <td>${index}</td>
  <td>${data.name}</td>
  <td>${data.dateOfBirth}</td>
  <td>${data.location}</td>
  <td class="text-xs"><ol class="text-left list-disc px-2">${booksList}</ol></td>
  <td><a href="#" class="text-emerald-600 border border-emerald-400 p-1 m-1 hover:opacity-70">Edit</a><a href="#" class="text-red-600 border border-red-400 p-1 m-1 hover:opacity-70">Delete</a></td>
</tr>`;
}

function publisherElement(data, index) {
  let booksList = "";
  data.books.forEach((book) => (booksList += `<li>${book.title}</li>`));

  return `<tr class="border-b">
  <td>${index}</td>
  <td>${data.name}</td>
  <td>${data.location}</td>
  <td class="text-xs"><ol class="text-left list-disc px-2">${booksList}</ol></td>
  <td><a href="#" class="text-emerald-600 border border-emerald-400 p-1 m-1 hover:opacity-70">Edit</a><a href="#" class="text-red-600 border border-red-400 p-1 m-1 hover:opacity-70">Delete</a></td>
</tr>`;
}

function transactionsElement(data, index) {
  let productsList = "";
  data.products.forEach((p) => (productsList += `<li>${p}</li>`));

  return `<tr class="border-b">
  <td>${index}</td>
  <td>${data.purchaseDate}</td>
  <td class="text-xs">${productsList}</td>
  <td>${data.total}</td>
  <td>${data.status}</td>
  <td><a href="#" class="text-emerald-600 border border-emerald-400 p-1 m-1 hover:opacity-70">Edit</a><a href="#" class="text-red-600 border border-red-400 p-1 m-1 hover:opacity-70">Delete</a></td>
</tr>`;
}

function usersElement(data, index) {
  let purchaseList = "";
  data.purchaseHistory.forEach((p) => (purchaseList += `<li>${p.title}</li>`));

  let wishlist = "";
  data.wishlist.forEach((w) => (wishlist += `<li>${w.title}</li>`));

  return `<tr class="border-b">
    <td>${index}</td>
    <td><img src="${data.image}" class="w-10 h-10" /></td>
    <td>${data.name}</td>
    <td>${data.email}</td>
    <td>${data.role}</td>
    <td class="text-xs">${wishlist}</td>
    <td class="text-xs">${purchaseList}</td>
    <td><a href="#" class="text-emerald-600 border border-emerald-400 p-1 m-1 hover:opacity-70">Edit</a><a href="#" class="text-red-600 border border-red-400 p-1 m-1 hover:opacity-70">Delete</a></td>
  </tr>`;
}
