const shoppingData = async () => {
  try {
    const url = new URL(
      "https://stargolf.info/API_TEST/get_tasks.php?page=1&limit=20&totalPages=5"
    );
    const response = await fetch(url);
    const data = await response.json();

    // 데이터에서 랜덤하게 5개 항목 선택
    const dataList = getRandomItems(data.data, 5);

    renderShoppingList(dataList);
    renderCarousel(dataList);
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

// 초기 데이터 로드 및 화면 크기에 따른 요소 제어
shoppingData();
