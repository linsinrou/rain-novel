const books = [
  {
    title: "渲染色彩的雨",
    author: "作者名稱",
    description: "她在黑暗裡醒來，在謊言中尋找真相。",
    cover: "rain-in-colors/cover.png",
    url: "rain-in-colors/index.html",
    status: "連載中"
  },
  /*{
    title: "第二本小說",
    author: "作者名稱",
    description: "第二本小說的故事簡介。",
    cover: "second-novel/cover.jpg",
    url: "second-novel/index.html",
    status: "連載中"
  }*/

  /*
  新增小說時，複製下面這一段：

  ,{
    title: "第二本小說",
    author: "作者名稱",
    description: "第二本小說的故事簡介。",
    cover: "images/second-novel-cover.jpg",
    url: "books/second-novel/index.html",
    status: "連載中"
  }
  */
];

const bookList = document.getElementById("bookList");
const bookCount = document.getElementById("bookCount");
const bookSearch = document.getElementById("bookSearch");
const clearSearch = document.getElementById("clearSearch");
const emptyMessage = document.getElementById("emptyMessage");

const themeButton = document.getElementById("themeButton");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

function displayBooks(bookData) {
  bookList.innerHTML = "";
  bookCount.textContent = bookData.length;
  emptyMessage.hidden = bookData.length !== 0;

  bookData.forEach(function (book) {
    const article = document.createElement("article");
    article.className = "book-card";

    article.innerHTML = `
      <a
        class="book-cover-link"
        href="${book.url}"
        target="_blank"
        rel="noopener"
        aria-label="開啟《${book.title}》"
      >
        <img
          class="book-cover"
          src="${book.cover}"
          alt="${book.title}封面"
          loading="lazy"
        >
      </a>

      <div class="book-information">
        <span class="book-status">${book.status}</span>

        <h3>${book.title}</h3>
        <p class="book-author">作者｜${book.author}</p>
        <p class="book-description">${book.description}</p>

        <a
          class="book-button"
          href="${book.url}"
          target="_blank"
          rel="noopener"
        >
          <span>查看作品</span>
          <span>→</span>
        </a>
      </div>
    `;

    bookList.appendChild(article);
  });
}

bookSearch.addEventListener("input", function () {
  const keyword = bookSearch.value.trim().toLowerCase();

  const results = books.filter(function (book) {
    return book.title.toLowerCase().includes(keyword);
  });

  displayBooks(results);
});

clearSearch.addEventListener("click", function () {
  bookSearch.value = "";
  displayBooks(books);
  bookSearch.focus();
});

function updateThemeButton() {
  const isLight = document.body.classList.contains("light-theme");

  themeIcon.textContent = isLight ? "☾" : "☀";
  themeText.textContent = isLight ? "暗色" : "亮色";
}

if (localStorage.getItem("libraryTheme") === "light") {
  document.body.classList.add("light-theme");
}

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");

  localStorage.setItem(
    "libraryTheme",
    isLight ? "light" : "dark"
  );

  updateThemeButton();
});

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

updateThemeButton();
displayBooks(books);
