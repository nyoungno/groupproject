const apiUrl = "https://stargolf.info/API_TEST/get_tasks.php";
const pageValue = 15; // 페이지당 항목 수
const searchKeyword = ""; // 검색어 (선택적)
const currentCategory = ""; // 카테고리 (wr_1)
let totalPages = 0; // 전체 페이지 수
let currentPage = 1; // 현재 페이지

const shoppingData = async (page = 1) => {
  try {
    const url = new URL(apiUrl);
    url.searchParams.append("page", page);
    url.searchParams.append("limit", pageValue);
    if (currentCategory) {
      url.searchParams.append("category", currentCategory);
    }
    if (searchKeyword) {
      url.searchParams.append("search", searchKeyword);
    }

    const response = await fetch(url);
    const data = await response.json();

    // 전체 페이지 수 설정
    totalPages = Math.ceil(data.total / pageValue);

    // 데이터에서 랜덤하게 10개 항목 선택
    const categoryList = getRandomItems(data.data, 15);
    renderShoppingCategory(categoryList);

    // 데이터에서 랜덤하게 5개 항목 선택
    const dataList = getRandomItems(data.data, 5);
    renderShoppingList(dataList);
    renderCarousel(dataList);
    shoppingPagination();
    handleResponsiveDisplay();
    window.addEventListener("resize", handleResponsiveDisplay);
  } catch (error) {
    console.error("데이터를 가져오거나 파싱하는 중 오류 발생:", error);
  }
};

const renderShoppingList = (dataList) => {
  const shoppingHTML = dataList
    .map(
      (data) => `
          <div class="col">
            <div class="card shopping-card-items">
              <img src="${
                data.wr_link1 || data.wr_link2
              }" class="card-img-top shopping-card-img" alt="${
        data.wr_subject || "이미지"
      }">
              <div class="shopping-body">
                <p class="card-title">${data.wr_subject}</p>
                <p class="card-text"></p>
              </div>
            </div>
          </div>
        `
    )
    .join(""); // 배열을 문자열로 결합
  document.getElementById("shopping-board").innerHTML = shoppingHTML;
};

const renderShoppingCategory = (categoryList) => {
  const shoppingCategoryHTML = categoryList
    .map(
      (data) => `
          <div class="col">
            <div class="card shopping-card-items">
              <img src="${
                data.wr_link1 || data.wr_link2
              }" class="card-img-top shopping-card-img" alt="${
        data.wr_subject || "이미지"
      }">
              <div class="shopping-body">
                <p class="card-title">${data.wr_subject}</p>
                <p class="card-text"></p>
              </div>
            </div>
          </div>
        `
    )
    .join(""); // 배열을 문자열로 결합
  document.getElementById("shopping-category").innerHTML = shoppingCategoryHTML;
};

const renderCarousel = (dataList) => {
  const carouselHTML = dataList
    .map(
      (data, index) => `
          <div class="carousel-item shopping-item ${
            index === 0 ? "active" : ""
          }" data-bs-interval="10000">
            <img src="${
              data.wr_link1
            }" class="d-block w-100 shopping-carousel-img" alt="${
        data.wr_subject || "슬라이드 이미지"
      }">
            <div class="carousel-caption d-none d-md-block shopping-carousel">
              <h5>${data.wr_subject}</h5>
            </div>
          </div>
        `
    )
    .join(""); // 배열을 문자열로 결합
  document.getElementById("shopping-carousel").innerHTML = carouselHTML;
};

const handleResponsiveDisplay = () => {
  const viewportWidth = window.innerWidth;
  const shoppingBoard = document.getElementById("shopping-board");
  const shoppingCarousel = document.getElementById(
    "carouselExampleAutoplaying"
  );

  if (viewportWidth <= 1024) {
    shoppingBoard.classList.add("d-none");
    shoppingCarousel.classList.remove("d-none");
  } else {
    shoppingBoard.classList.remove("d-none");
    shoppingCarousel.classList.add("d-none");
  }
};

// 배열에서 랜덤하게 count 개수만큼 항목 선택하는 함수
const getRandomItems = (arr, count) => {
  const shuffled = arr.sort(() => 0.5 - Math.random()); // 배열 섞기
  return shuffled.slice(0, count); // count 개수만큼 항목 반환
};

const shoppingPagination = () => {
  const pageGroup = Math.ceil(currentPage / 5);
  let lastPage = pageGroup * 5;
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  const firstPage = lastPage - 4 <= 0 ? 1 : lastPage - 4;

  let paginationHTML = "";

  if (currentPage > 1) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(1)">
      <a class="page-link">&lt;&lt;</a>
    </li>
    <li class="page-item" onclick="moveToPage(${
      currentPage - 1
    })"><a class="page-link">&lt;</a></li>`;
  }

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === currentPage ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }

  if (currentPage < totalPages) {
    paginationHTML += `<li class="page-item" onclick="moveToPage(${
      currentPage + 1
    })"><a class="page-link">&gt;</a></li>
    <li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link">&gt;&gt;</a></li>`;
  }

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  currentPage = pageNum;
  shoppingData(pageNum);
};

// 초기 데이터 로드 및 화면 크기에 따른 요소 제어
shoppingData();
