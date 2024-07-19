let url = new URL(`https://stargolf.info/API_TEST/get_tasks.php?limit=100`);
let dataList = [];
let TourismDataList = [];
let restaurantList = [];
let shoppingList = [];
let performanceList = [];
let hotelList = [];
let tourismPopup = false;
let tourismNum = 0;
let tourismMobileNum = 0;

const getData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    console.log(data);

    if (response.status === 200) {
      dataList = data.data;

      dataList.forEach((data) => {
        if (data.wr_1 == '관광') {
          TourismDataList.push(data);
        } else if (data.wr_1 == '식당') {
          restaurantList.push(data);
        } else if (data.wr_1 == '쇼핑') {
          shoppingList.push(data);
        } else if (data.wr_1 == '공연') {
          performanceList.push(data);
        } else {
          hotelList.push(data);
        }
      });
      tourismRender();
    } else {
      throw new Error(data.message || 'Failed to fetch data');
    }
  } catch (error) {
    console.error(error);
  }
};
const tourismRender = () => {
  // console.log('1:', TourismDataList);
  // console.log('2:', restaurantList);
  // console.log('3:', shoppingDataList);
  // console.log('4:', performanceDataList);
  // console.log('0:', hotelDataList);
  let newTourismList = [];
  for (let i = 0; i < 10; i++) {
    newTourismList.push(
      TourismDataList[(tourismNum + i) % TourismDataList.length]
    );
  }

  let dataHTML = `
    <div class="container-fluid">
      <div class="row">
        <!-- 데스크톱 뷰 -->
        <div class="col-lg-12 d-none d-lg-block">
          <div class="row">
            <!-- 첫 번째 col-md-6 박스 -->
            <div class="col-md-6">
              <div class="row">
                <!-- 첫 번째 아이템 (큰 이미지) -->
                <div class="col-md-12 mb-3">
                  <a class="tourism-image-touch" onclick="tourismShowPopup(0)" target="_blank">
                    <img class="tourism-first-img img-fluid" src="${
                      newTourismList[0].wr_link1 ||
                      'https://via.placeholder.com/400x300'
                    }" alt="Tourism Image">
                  </a>
                  <h3 class="tourism-title mt-2"><a href="${
                    newTourismList[0].wr_subject
                  }" target="_blank" class="title_link">${
    newTourismList[0].wr_subject
  }</a></h3>
                </div>
                <!-- 4개의 작은 아이템 -->
                ${newTourismList
                  .slice(1, 5)
                  .map(
                    (item, index) => `
                  <div class="col-md-6 col-sm-3 mb-3">
                    <a class="tourism-image-touch" onclick="tourismShowPopup(${
                      index + 1
                    })" target="_blank">
                      <img class="tourism-img img-fluid" src="${
                        item.wr_link1 || 'https://via.placeholder.com/200x150'
                      }" alt="Tourism Image">
                    </a>
                    <h5 class="tourism-title mt-2"><a href="${
                      item.wr_subject
                    }" target="_blank" class="title_link">${
                      item.wr_subject
                    }</a></h5>
                  </div>
                `
                  )
                  .join('')}
                  <div class="view-pc" onclick="tourismLeft()">
            <i
              class="tourism-arrow-left fa-solid fa-angles-left fa-2xl"
              ;"
            ></i>
          </div>
          <div class="view-pc" onclick="tourismRight()">
            <i
              class="tourism-arrow-right fa-solid fa-angles-right fa-2xl"
              ;"
            ></i>
          </div>
              </div>
            </div>
            
            <!-- 두 번째 col-md-6 박스 -->
            <div class="col-md-6">
              <div class="row">
                <!-- 첫 번째 아이템 (큰 이미지) -->
                <div class="col-md-12 mb-3">
                  <a class="tourism-image-touch" onclick="tourismShowPopup(5)" target="_blank">
                    <img class="tourism-first-img img-fluid" src="${
                      newTourismList[5].wr_link1 ||
                      'https://via.placeholder.com/400x300'
                    }" alt="Tourism Image">
                  </a>
                  <h3 class="tourism-title mt-2"><a href="${
                    newTourismList[5].wr_subject
                  }" target="_blank" class="title_link">${
    newTourismList[5].wr_subject
  }</a></h3>
                </div>
                <!-- 4개의 작은 아이템 -->
                ${newTourismList
                  .slice(6, 10)
                  .map(
                    (item, index) => `
                  <div class="col-md-6 col-sm-3 mb-3">
                    <a class="tourism-image-touch" onclick="tourismShowPopup(${
                      index + 6
                    })" target="_blank">
                      <img class="tourism-img img-fluid" src="${
                        item.wr_link1 || 'https://via.placeholder.com/200x150'
                      }" alt="Tourism Image">
                    </a>
                    <h5 class="tourism-title mt-2"><a href="${
                      item.wr_subject
                    }" target="_blank" class="title_link">${
                      item.wr_subject
                    }</a></h5>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- 태블릿 뷰 -->
        <div class="col-md-12 d-none d-md-block d-lg-none">
          <div class="row">
            <!-- 하나의 col-md-6 박스 -->
            <div class="col-md-12 mx-auto">
              <div class="row">
                <!-- 첫 번째 아이템 (큰 이미지) -->
                <div class="col-md-12 mb-3">
                  <a class="tourism-image-touch" onclick="tourismShowPopup(0)" target="_blank">
                    <img class="tourism-first-img img-fluid" src="${
                      newTourismList[0].wr_link1 ||
                      'https://via.placeholder.com/400x300'
                    }" alt="Tourism Image">
                  </a>
                  <h3 class="tourism-title mt-2"><a href="${
                    newTourismList[0].wr_subject
                  }" target="_blank" class="title_link">${
    newTourismList[0].wr_subject
  }</a></h3>
                </div>
                <!-- 4개의 작은 아이템 -->
                ${newTourismList
                  .slice(1, 5)
                  .map(
                    (item, index) => `
                  <div class="col-md-6 col-sm-3 mb-3">
                    <a class="tourism-image-touch" onclick="tourismShowPopup(${
                      index + 1
                    })" target="_blank">
                      <img class="tourism-img img-fluid" src="${
                        item.wr_link1 || 'https://via.placeholder.com/200x150'
                      }" alt="Tourism Image">
                    </a>
                    <h5 class="tourism-title mt-2"><a href="${
                      item.wr_subject
                    }" target="_blank" class="title_link">${
                      item.wr_subject
                    }</a></h5>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
            
          </div>
        </div>

    <!-- 모바일 슬라이드 시스템 -->
    <div class="col-12 d-md-none">
      <div id="tourismMobileCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          ${newTourismList
            .map(
              (item, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <div class="mobile-slide-image" onclick="tourismShowPopup(${
                index + 1
              })" style="background-image: url('${
                item.wr_link1 || 'https://via.placeholder.com/300x200'
              }')"></div>
              <div class="carousel-caption">
                <h5 class="tourism-title">${item.wr_subject}</h5>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#tourismMobileCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#tourismMobileCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  `;

  //팝업창
  dataHTML += `<div id="tourismPopup" class="hide layer">
  <div class="content">
  </div>
</div>`;

  document.getElementById('tourismContainer').innerHTML = dataHTML;
};
function tourismLeft() {
  tourismNum =
    (tourismNum - 5 + TourismDataList.length) % TourismDataList.length;
  tourismRender();
}

function tourismRight() {
  tourismNum = (tourismNum + 5) % TourismDataList.length;
  tourismRender();
}

function tourismShowPopup(index) {
  const item = TourismDataList[(tourismNum + index) % TourismDataList.length];
  const popupContent = `
    <div class="tourism-popup">
      <h3>${item.wr_subject}</h3>
      <img src="${
        item.wr_link1 || 'https://via.placeholder.com/400x300'
      }" alt="Tourism Image" class="img-fluid mb-3">
      <p>${item.wr_content}</p>
    </div>
  `;
  console.log('확인', popupContent);
  document.getElementById('tourismPopup').classList.remove('hide');
  document.getElementById('tourismPopup').innerHTML = popupContent;
}

$(document).mouseup(function (e) {
  var popContent = $('#tourismPopup');
  if (popContent.has(e.target).length === 0) {
    popContent.addClass('hide');
  }
});

getData();
