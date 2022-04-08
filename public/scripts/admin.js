const bookUri = "https://haku-library-api.herokuapp.com/books";
const writerUri = "https://haku-library-api.herokuapp.com/writers";
const publisherUri = "https://haku-library-api.herokuapp.com/publishers";
const transactionUri = "https://haku-library-api.herokuapp.com/transactions";
const userUri = "https://haku-library-api.herokuapp.com/users";

let config;
let token;

if (document.cookie) {
  token = document.cookie.split("=")[1];
  const decoded = jwt_decode(token);

  if (decoded.role !== "admin") {
    alert("Unauthorized");
    window.location.replace("/");
  }

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
async function getDatas(url) {
  const data = await axios.get(url, config).catch((err) => console.log(err));
  return data;
}

async function printDatas(url, container, element) {
  container.innerHTML = "";
  const dataBuffer = await getDatas(url);

  const datas = dataBuffer.data.data;
  //console.log(datas);

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

async function addButton(e) {
  resetSection();

  let element = "";
  let data = {};

  switch (e.id) {
    case "addBook":
      element = addBookElement;
      const writerData = await getDatas(writerUri);
      const publihserData = await getDatas(publisherUri);
      data.writer = writerData.data.data;
      data.publisher = publihserData.data.data;
      break;
    case "addWriter":
      element = addWriterElement;
      break;
    case "addPublisher":
      element = addPublisherElement;
      break;
    case "addTransaction":
      element = addTranasctionElement;
      const bookData = await getDatas(bookUri);
      const userData = await getDatas(userUri);
      data.books = bookData.data.data;
      data.users = userData.data.data;
      break;
    case "addUser":
      element = addUserElement;
      break;
  }

  document.querySelector(`.${e.id}`).innerHTML = element(data);
  document.querySelector(`.${e.id}`).parentElement.classList.remove("hidden");
}

// POST & PUT Handling //////////////////////////////////

document.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("formUpdate")) {
    let formData = new FormData();
    let jsonData = {};

    if (
      e.target.classList.contains("addBook") ||
      e.target.classList.contains("addUser")
    ) {
      e.target.querySelectorAll(`.userInput`).forEach((d) => {
        if (d.id === "img" || d.id === "image") {
          if (d.files.length !== 0) formData.append(d.id, d.files[0]);
        } else if (d.value) {
          formData.append(d.id, d.value);
        }
      });
    } else {
      e.target.querySelectorAll(`.userInput`).forEach(function (el) {
        jsonData[el.id] = el.value;
      });
    }

    let URI = "";
    let data = {};
    switch (true) {
      case e.target.classList.contains("addBook"):
        URI = bookUri;
        data = formData;
        break;
      case e.target.classList.contains("addWriter"):
        URI = writerUri;
        data = jsonData;
        break;
      case e.target.classList.contains("addPublisher"):
        URI = publisherUri;
        data = jsonData;
        break;
      case e.target.classList.contains("addTransaction"):
        URI = transactionUri;
        data = jsonData;
        break;
      case e.target.classList.contains("addUser"):
        URI = userUri;
        data = formData;
        break;
    }

    sendDataToServer(URI, "POST", data);
  }
});

/////////////////////////////////////////////////////////////////////////

const sendDataToServer = async (url, method, data) => {
  await axios({
    url,
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  })
    .then(() => {
      alert("success");
      location.reload();
    })
    .catch((err) => alert("Bad Request. Please Insert Valid Data"));
};

// HTML Element ///////////////////////////////////////////////////////
function bookElement(data, index) {
  const publisherName = data.publisher ? data.publisher.name : "";
  const writerName = data.writer ? data.writer.name : "";

  return `<tr class="border-b">
                    <td>${index}</td>
                    <td><a href="${data.img}" target="_blank"><img src="${data.img}" class="w-10 h-15" /></a></td>
                    <td>${data.title}</td>
                    <td>${writerName}</td>
                    <td>${publisherName}</td>
                    <td>${data.releaseDate}</td>
                    <td>${data.genre}</td>
                    <td>${data.stock}</td>
                    <td>Rp${data.price}</td>
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
  <td><a href="#" class="text-emerald-600 border border-emerald-400 p-1 m-1 hover:opacity-70">Edit</a><a href="#" class="text-red-600 border border-red-400 p-1 m-1 hover:opacity-70" onClick='deleteData("${data._id}", "${writerUri}")'>Delete</a></td>
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
  <td><a href="#" class="text-emerald-600 border border-emerald-400 p-1 m-1 hover:opacity-70">Edit</a><a href="#" class="text-red-600 border border-red-400 p-1 m-1 hover:opacity-70" onClick='deleteData("${data._id}", "${publisherUri}")'>Delete</a></td>
</tr>`;
}

function transactionsElement(data, index) {
  let productsList = "";
  data.products.forEach((p) => (productsList += `<li>${p.title}</li>`));
  const nama = data.orderBy ? data.orderBy.name : "guest";

  return `<tr class="border-b">
  <td>${index}</td>
  <td>${data.purchaseDate}</td>
  <td>${nama}</td>
  <td class="text-xs text-left">${productsList}</td>
  <td>Rp${data.totalPrice}</td>
  <td>${data.status}</td>
  <td><a href="#" class="text-emerald-600 border border-emerald-400 p-1 m-1 hover:opacity-70">Edit</a><a href="#" class="text-red-600 border border-red-400 p-1 m-1 hover:opacity-70" onClick='deleteData("${data._id}", "${transactionUri}")'>Delete</a></td>
</tr>`;
}

function usersElement(data, index) {
  let purchaseList = "";
  data.purchaseHistory.forEach(
    (p) => (purchaseList += `<li>${p.purchaseDate}</li>`)
  );

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
    <td><a href="#" class="text-emerald-600 border border-emerald-400 p-1 m-1 hover:opacity-70">Edit</a><a href="#" class="text-red-600 border border-red-400 p-1 m-1 hover:opacity-70" onClick='deleteData("${data._id}", "${userUri}")'>Delete</a></td>
  </tr>`;
}

// Add New Data Element /////////////////////////////////////////////////
function addBookElement(data) {
  let writerList = "";
  let publisherList = "";

  data.writer.forEach((w) => {
    writerList += `<option value="${w._id}">${w.name}</option>`;
  });

  data.publisher.forEach((p) => {
    publisherList += `<option value="${p._id}">${p.name}</option>`;
  });

  return `<div class="flex gap-4 flex-wrap">
      <div class="flex justify-between w-[420px]">
        <label class="text-slate-600" for="title"
          >Title<span class="text-red-600">*</span></label
        >
        <input
          class="userInput border rounded py-1 px-2 text-sm w-80"
          type="text"
          name="title"
          id="title"
          required
        />
      </div>
      <div class="flex justify-between w-[420px]">
        <label class="text-slate-600" for="writer">Writer</label>
        <select
          class="userInput border rounded py-1 px-2 text-sm w-80"
          name="writer"
          id="writer"
        >
          <option value="" selected="selected"></option>
          ${writerList}
        </select>
      </div>
      <div class="userInput flex justify-between w-[420px]">
        <label class="text-slate-600" for="publisher"
          >Publisher</label
        >
        <select
          class="userInput border rounded py-1 px-2 text-sm w-80"
          name="publisher"
          id="publisher"
        >
          <option value="" selected="selected"></option>
          ${publisherList}
        </select>
      </div>
      <div class="flex justify-between w-[420px]">
        <label class="text-slate-600" for="genre"
          >Genre<span class="text-red-600">*</span></label
        >
        <input
          class="userInput border rounded py-1 px-2 text-sm w-80"
          type="text"
          name="genre"
          id="genre"
          required
        />
      </div>
      <div class="flex justify-between w-[420px]">
        <label class="text-slate-600" for="description"
          >Description</label
        >
        <input
          class="userInput border rounded py-1 px-2 text-sm w-80"
          type="text"
          name="description"
          id="description"
        />
      </div>
      <div class="flex justify-between w-[420px]">
        <label class="text-slate-600" for="releaseDate"
          >Release Date</label
        >
        <input
          class="userInput border rounded py-1 px-2 text-sm w-80"
          type="text"
          name="releaseDate"
          id="releaseDate"
        />
      </div>
      <div class="flex justify-between w-[420px]">
        <label class="text-slate-600" for="price"
          >Price<span class="text-red-600">*</span></label
        >
        <input
          class="userInput border rounded py-1 px-2 text-sm w-80"
          type="number"
          name="price"
          id="price"
          required
        />
      </div>
      <div class="flex justify-between w-[420px]">
        <label class="text-slate-600" for="stock"
          >Stock<span class="text-red-600">*</span></label
        >
        <input
          class="userInput border rounded py-1 px-2 text-sm w-80"
          type="number"
          name="stock"
          id="stock"
          required
        />
      </div>
      <div class="flex justify-between w-[420px]">
        <label class="text-slate-600" for="img">Image</label>
        <input
          class="userInput border rounded py-1 px-2 text-sm w-80"
          type="file"
          name="img"
          id="img"
        />
      </div>
    </div>
    <button
      class="bg-emerald-500 text-slate-50 p-2 rounded hover:opacity-80 mt-3"
      type="submit"
    >
      Submit
    </button>`;
}

const addWriterElement = () => {
  return `<div class="flex gap-4 flex-wrap">
    <div class="flex justify-between w-[420px]">
      <label class="text-slate-600" for="name"
        >Name<span class="text-red-600">*</span></label
      >
      <input
        class="userInput border rounded py-1 px-2 text-sm w-80"
        type="text"
        name="name"
        id="name"
        required
      />
    </div>
    <div class="flex justify-between w-[420px]">
      <label class="text-slate-600" for="dateOfBirth"
        >Birth Date</label
      >
      <input
        class="userInput border rounded py-1 px-2 text-sm w-80"
        type="text"
        name="dateOfBirth"
        id="dateOfBirth"
      />
    </div>
    <div class="flex justify-between w-[420px]">
      <label class="text-slate-600" for="location">Location</label>
      <input
        class="userInput border rounded py-1 px-2 text-sm w-80"
        type="text"
        name="location"
        id="location"
      />
    </div>
  </div>

  <button
    class="bg-emerald-500 text-slate-50 p-2 rounded hover:opacity-80 mt-3"
    type="submit"
  >
    Submit
  </button>`;
};

const addPublisherElement = () => {
  return `<div class="flex gap-4 flex-wrap">
    <div class="flex justify-between w-[420px]">
      <label class="text-slate-600" for="name"
        >Name<span class="text-red-600">*</span></label
      >
      <input
        class="userInput border rounded py-1 px-2 text-sm w-80"
        type="text"
        name="name"
        id="name"
        required
      />
    </div>
    <div class="flex justify-between w-[420px]">
      <label class="text-slate-600" for="location">Location</label>
      <input
        class="userInput border rounded py-1 px-2 text-sm w-80"
        type="text"
        name="location"
        id="location"
      />
    </div>
  </div>

  <button
    class="bg-emerald-500 text-slate-50 p-2 rounded hover:opacity-80 mt-3"
    type="submit"
  >
    Submit
  </button>`;
};

const addTranasctionElement = (data) => {
  let userList = "";
  let bookList = "";

  data.books.forEach((b) => {
    bookList += `<option value="${b._id}">${b.title}</option>`;
  });

  data.users.forEach((u) => {
    userList += `<option value="${u._id}">${u.name}</option>`;
  });

  return `<div class="flex gap-4 flex-wrap">
  <div class="userInput flex justify-between w-[420px]">
  <label class="text-slate-600" for="orderBy"
    >Order By</label
  >
  <select
    class="userInput border rounded py-1 px-2 text-sm w-80"
    name="orderBy"
    id="orderBy"
  >
    <option value="" selected="selected" disabled></option>
    ${userList}
  </select>
</div>
  <div class="userInput flex justify-between w-[420px]">
  <label class="text-slate-600" for="products"
    >Book</label
  >
  <select
    class="userInput border rounded py-1 px-2 text-sm w-80"
    name="products"
    id="products"
  >
    <option value="" selected="selected" disabled></option>
    ${bookList}
  </select>
</div>
<div class="userInput flex justify-between w-[420px]">
  <label class="text-slate-600" for="status"
    >Status</label
  >
  <select
    class="userInput border rounded py-1 px-2 text-sm w-80"
    name="status"
    id="status"
  >
    <option value="pending" selected="selected">Pending</option>
    <option value="proses">Proses</option>
    <option value="done">Done</option>
    <option value="canceled">Canceled</option>
  </select>
</div>

    
  </div>

  <button
    class="bg-emerald-500 text-slate-50 p-2 rounded hover:opacity-80 mt-3"
    type="submit"
  >
    Make Transaction
  </button>`;
};

const addUserElement = () => {
  return `<div class="flex gap-4 flex-wrap">
    <div class="flex justify-between w-[420px]">
      <label class="text-slate-600" for="name"
        >Name<span class="text-red-600">*</span></label
      >
      <input
        class="userInput border rounded py-1 px-2 text-sm w-80"
        type="text"
        name="name"
        id="name"
        required
      />
    </div>
    <div class="userInput flex justify-between w-[420px]">
        <label class="text-slate-600" for="role"
          >Role</label
        >
        <select
          class="userInput border rounded py-1 px-2 text-sm w-80"
          name="role"
          id="role"
        >
          <option value="" selected="selected"></option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    <div class="flex justify-between w-[420px]">
      <label class="text-slate-600" for="email"
        >Email<span class="text-red-600">*</span></label
      >
      <input
        class="userInput border rounded py-1 px-2 text-sm w-80"
        type="text"
        name="email"
        id="email"
        required
      />
    </div>
    <div class="flex justify-between w-[420px]">
      <label class="text-slate-600" for="password"
        >Password<span class="text-red-600">*</span></label
      >
      <input
        class="userInput border rounded py-1 px-2 text-sm w-80"
        type="text"
        name="password"
        id="password"
        required
      />
    </div>
    <div class="flex justify-between w-[420px]">
          <label class="text-slate-600" for="image">Image</label>
          <input
            class="userInput border rounded py-1 px-2 text-sm w-80"
            type="file"
            name="image"
            id="image"
          />
        </div>
  </div>

  <button
    class="bg-emerald-500 text-slate-50 p-2 rounded hover:opacity-80 mt-3"
    type="submit"
  >
    Submit
  </button>`;
};
