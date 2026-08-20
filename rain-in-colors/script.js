/*
  ========================================
  1. 章節資料
  ========================================

  每一章的小說內容會放在獨立的 HTML 裡。

  id：
  章節編號，不可以重複。

  title：
  顯示在首頁目錄中的章節名稱。

  file：
  點擊章節後要開啟的 HTML 檔案名稱。

  要增加新章節時，只要複製一組資料，
  修改 id、title 和 file 即可。
*/
const chapters = [
  {
    id: 1,
    title: "第一章",
    file: "chapter-01.html"
  },
  {
    id: 2,
    title: "第二章",
    file: "chapter-02.html"
  },
  {
    id: 3,
    title: "第三章",
    file: "chapter-03.html"
  },
  {
    id: 4,
    title: "第四章",
    file: "chapter-04.html"
  },
  {
    id: 5,
    title: "第五章",
    file: "chapter-05.html"
  },
  {
    id: 6,
    title: "第六章",
    file: "chapter-06.html"
  },
  {
    id: 7,
    title: "第七章",
    file: "chapter-07.html"
  }
];


/*
  ========================================
  2. 取得網頁元素
  ========================================
*/

/*
  有些元素只會出現在首頁。
  如果是章節頁面，找不到這些元素也不會發生錯誤。
*/
const chapterList = document.getElementById("chapterList");
const chapterCount = document.getElementById("chapterCount");
const searchInput = document.getElementById("searchInput");
const clearSearchButton = document.getElementById("clearSearchButton");
const emptyMessage = document.getElementById("emptyMessage");

const themeButton = document.getElementById("themeButton");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

const backToTopButton = document.getElementById("backToTopButton");
const currentYear = document.getElementById("currentYear");


/*
  ========================================
  3. 建立章節目錄
  ========================================
*/

function displayChapterList(chapterData) {
  /* 如果這個頁面沒有章節目錄，就停止執行 */
  if (!chapterList) {
    return;
  }

  /* 清空原本的章節卡片 */
  chapterList.innerHTML = "";

  /* 更新顯示的章節數量 */
  chapterCount.textContent = chapterData.length;

  /* 找不到章節時顯示提示 */
  if (chapterData.length === 0) {
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  chapterData.forEach(function (chapter) {
    const chapterLink = document.createElement("a");

    /*
      chapter.file 是該章節的 HTML 檔案。

      target="_blank" 代表點擊後，
      會使用新分頁開啟章節。
    */
    chapterLink.href = chapter.file;
    chapterLink.target = "_blank";
    chapterLink.rel = "noopener";
    chapterLink.className = "chapter-card";

    /* 讓 1 顯示成 01 */
    const numberText = String(chapter.id).padStart(2, "0");

    chapterLink.innerHTML = `
      <span class="chapter-number">${numberText}</span>

      <span class="chapter-information">
        <small>CHAPTER</small>
        <span class="chapter-name">${chapter.title}</span>
      </span>

      <span class="chapter-arrow">→</span>
    `;

    chapterList.appendChild(chapterLink);
  });
}


/*
  ========================================
  4. 搜尋章節
  ========================================
*/

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const keyword = searchInput.value.trim().toLowerCase();

    /* 控制清除按鈕是否顯示 */
    if (keyword !== "") {
      clearSearchButton.style.display = "block";
    } else {
      clearSearchButton.style.display = "none";
    }

    const searchResult = chapters.filter(function (chapter) {
      const idText = String(chapter.id);
      const titleText = chapter.title.toLowerCase();

      return (
        idText.includes(keyword) ||
        titleText.includes(keyword)
      );
    });

    displayChapterList(searchResult);
  });
}

/* 清除搜尋內容 */
if (clearSearchButton) {
  clearSearchButton.addEventListener("click", function () {
    searchInput.value = "";
    clearSearchButton.style.display = "none";

    displayChapterList(chapters);
    searchInput.focus();
  });
}


/*
  ========================================
  5. 亮色與暗色切換
  ========================================
*/

/*
  localStorage 可以記住讀者選擇的顏色。
  即使重新整理或開啟其他章節，
  網頁也會保留原本選擇的模式。
*/
const savedTheme = localStorage.getItem("novelTheme");

/* 如果之前選擇亮色模式，就直接套用亮色 */
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

/* 更新切換按鈕上的文字和圖示 */
function updateThemeButton() {
  if (!themeButton) {
    return;
  }

  const isLightTheme =
    document.body.classList.contains("light-theme");

  if (isLightTheme) {
    themeIcon.textContent = "☾";
    themeText.textContent = "暗色";
    themeButton.setAttribute("aria-label", "切換成暗色模式");
  } else {
    themeIcon.textContent = "☀";
    themeText.textContent = "亮色";
    themeButton.setAttribute("aria-label", "切換成亮色模式");
  }
}

updateThemeButton();

/* 點擊按鈕後切換模式 */
if (themeButton) {
  themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    const isLightTheme =
      document.body.classList.contains("light-theme");

    /* 儲存讀者選擇的模式 */
    if (isLightTheme) {
      localStorage.setItem("novelTheme", "light");
    } else {
      localStorage.setItem("novelTheme", "dark");
    }

    updateThemeButton();
  });
}


/*
  ========================================
  6. 手機版選單
  ========================================
*/

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("open");

    const isOpen = mobileMenu.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);
  });

  /* 點擊選單連結後關閉選單 */
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");

  mobileMenuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}


/*
  ========================================
  7. 回到最上方
  ========================================
*/

if (backToTopButton) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


/*
  ========================================
  8. 自動顯示現在年份
  ========================================
*/

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/*
  ========================================
  9. 首頁載入時顯示全部章節
  ========================================
*/

displayChapterList(chapters);


/* =========================
  10. 小說字體大小控制
========================= */

const novelContent = document.querySelector(".novel-content");

const decreaseFontButton = document.getElementById(
  "decreaseFontButton"
);

const increaseFontButton = document.getElementById(
  "increaseFontButton"
);

const resetFontButton = document.getElementById(
  "resetFontButton"
);

const fontSizeValue = document.getElementById(
  "fontSizeValue"
);

/* 字體限制與預設值 */
const defaultFontSize = 18;
const minimumFontSize = 14;
const maximumFontSize = 30;

/* 讀取讀者之前選擇的大小 */
let currentFontSize = Number(
  localStorage.getItem("novelFontSize")
) || defaultFontSize;

/* 避免儲存的數字超出範圍 */
currentFontSize = Math.min(
  maximumFontSize,
  Math.max(minimumFontSize, currentFontSize)
);

/* 套用字體大小 */
function updateNovelFontSize() {
  if (!novelContent || !fontSizeValue) {
    return;
  }

  novelContent.style.fontSize = `${currentFontSize}px`;
  fontSizeValue.textContent = currentFontSize;

  localStorage.setItem(
    "novelFontSize",
    currentFontSize
  );

  if (decreaseFontButton) {
    decreaseFontButton.disabled =
      currentFontSize <= minimumFontSize;
  }

  if (increaseFontButton) {
    increaseFontButton.disabled =
      currentFontSize >= maximumFontSize;
  }
}

/* 縮小，每次減 1px */
if (decreaseFontButton) {
  decreaseFontButton.addEventListener("click", function () {
    if (currentFontSize > minimumFontSize) {
      currentFontSize -= 1;
      updateNovelFontSize();
    }
  });
}

/* 放大，每次加 1px */
if (increaseFontButton) {
  increaseFontButton.addEventListener("click", function () {
    if (currentFontSize < maximumFontSize) {
      currentFontSize += 1;
      updateNovelFontSize();
    }
  });
}

/* 回到預設大小 */
if (resetFontButton) {
  resetFontButton.addEventListener("click", function () {
    currentFontSize = defaultFontSize;
    updateNovelFontSize();
  });
}

/* 開啟頁面時套用設定 */
updateNovelFontSize();


/* =========================
  11. 載入小說純文字
========================= */

const novelTextArea = document.getElementById("novelContent");

if (novelTextArea) {
  const textFile = novelTextArea.dataset.textFile;

  if (textFile) {
    fetch(textFile)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("小說內容載入失敗");
        }

        return response.text();
      })
      .then(function (novelText) {
        novelTextArea.innerHTML = "";

        /*
          只要純文字中間空一行，
          就會自動建立一個段落。
        */
        const paragraphs = novelText
          .trim()
          .split(/\r?\n\s*\r?\n/);

        paragraphs.forEach(function (paragraphText) {
          const paragraph = document.createElement("p");

          paragraph.textContent = paragraphText.trim();

          novelTextArea.appendChild(paragraph);
        });
      })
      .catch(function (error) {
        novelTextArea.innerHTML = "";

        const errorMessage = document.createElement("p");

        errorMessage.className = "loading-message";
        errorMessage.textContent =
          "小說內容暫時無法載入，請稍後再試。";

        novelTextArea.appendChild(errorMessage);

        console.error(error);
      });
  }
}