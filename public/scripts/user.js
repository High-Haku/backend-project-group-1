const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY0ODU0ODY4Nn0.5GQYfPWVOPqJDppEdAsAcWviGw2y0trXeboN_ClCCw0 `,
  },
};

async function printDatas(url, container, element) {
  container.innerHTML = "";
  const dataBuffer = await axios
    .get(url, config)
    .catch((err) => console.log(err));

  const datas = dataBuffer.data.data;

  datas.forEach((data, index) => {
    container.innerHTML += element(data, index + 1);
  });
}

async function printDetail() {}

const bookElement = (book, number) => {
  return `<div class="book my-1">
  <a href="#">
    <span class="hover:text-slate-800"
      >${number}. ${book.title} (${book.releaseDate})</span
    >
    <button
      class="text-white text-sm bg-emerald-500 px-1 rounded-md hover:opacity-70 transition"
    >
      detail
    </button>
  </a>
</div>`;
};

const writerElement = (writter, number) => {
  return `<div class="book my-1">
    <a href="#">
      <span class="hover:text-slate-800"
        >${number}. ${writter.name}</span
      >
      <button
        class="text-white text-sm bg-emerald-500 px-1 rounded-md hover:opacity-70 transition"
      >
        detail
      </button>
    </a>
  </div>`;
};

printDatas(
  "http://localhost:3000/books",
  document.querySelector(".books"),
  bookElement
);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu")) {
    menuHandle(e.target);
  }
});

function menuHandle(activeMenu) {
  const menus = document.querySelectorAll(".menu");
  const dataContainer = document.querySelectorAll(".data-container");

  menus.forEach((m) => m.classList.remove("active"));
  dataContainer.forEach((d) => d.classList.add("hidden"));

  activeMenu.classList.add("active");
  document.querySelector(`.${activeMenu.id}`).classList.remove("hidden");

  switch (activeMenu.id) {
    case "books":
      printDatas(
        "http://localhost:3000/books",
        document.querySelector(".books"),
        bookElement
      );
    case "writers":
      printDatas(
        "http://localhost:3000/writers",
        document.querySelector(".writers"),
        writerElement
      );
    case "publishers":
      printDatas(
        "http://localhost:3000/publishers",
        document.querySelector(".publishers"),
        writerElement
      );
    case "transactions":
      printDatas(
        "http://localhost:3000/transactions",
        document.querySelector(".transactions"),
        writerElement
      );
  }
}
