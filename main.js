let url = new URL(`https://stargolf.info/API_TEST/get_tasks.php?limit=100`);
let dataList = [];
let TourismDataList = [];
// 여기에 각자 리스트 만들기

let tourismPopup = false;
let tourismNum = 0;
tourismMobileNum = 0;
const getData = async () => {
  // 데이터 받아서 랜더링하는 공통부분
  try {
    const response = await fetch(url);
    // console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json(); // json은 파일 형식중 하나
    console.log(data);

    if (response.status === 200) {
      dataList = data.data;

      dataList.forEach((data) => {
        // console.log('카테고리', data.wr_1);
        if (data.wr_1 == '관광') {
          TourismDataList.push(data);
          //여기에 각자 리스트에 푸시
        }
      });
      //각자 리스트 나오는지 확인
      TourismRender();
    } else {
      throw new Error(data.message || 'Failed to fetch data');
    }
  } catch (error) {
    console.error;
  }
};

//각자 랜더함수 만들기
const TourismRender = () => {
  // 관광부분 랜더
  let newTourismList = [];
  let endNum = tourismNum + 5;
  // 화살표 버튼 누르면 바뀔 데이터 5개씩 뽑기
  for (let i = tourismNum; i < endNum; i++) {
    newTourismList.push(TourismDataList[i]);
  }
  //1열 부분
  let dataHTML = `<div class="col-lg-6 col-md-12 view-pc " >
                        <div class="col">
                            <a class="tourism-image-touch" onclick="tourismShowPopup()" target="_blank" >
                                <img class="tourism-first-img" src="${
                                  newTourismList[0].wr_link1 ||
                                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'
                                }" class="card-img-top" onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';">
                            </a>
                            <div id="tourismPopup" class="hide layer">
  <div class="content">
    <p>
     ${newTourismList[0].wr_content}
    </p>
    
  </div>
</div>
                        </div>
                        
                        <div class="col">                
                                <h3 class="tourism-title"><a href="${
                                  newTourismList[0].wr_subject
                                }" target="_blank" class="title_link">${
    newTourismList[0].wr_subject
  }</a></h3>
      
      </div>
      </div>
                       

        `;
  // 모바일 부분 슬라이드 표시
  dataHTML += `<div class="col-lg-6 col-md-12 view-mobile " >
        <div class="col">
            <a onclick="tourismShowPopup()" target="_blank">
  <img
    class="tourism-first-img"
    src="${
      TourismDataList[tourismMobileNum].wr_link1 ||
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'
    }"
    class="card-img-top"
    onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';"
  />
</a>

        </div>
        
        <div class="col">                
                <h3 class="tourism-title"><a href="${
                  TourismDataList[tourismMobileNum].wr_subject
                }" target="_blank" class="title_link">${
    TourismDataList[tourismMobileNum].wr_subject
  }</a></h3>

</div>
<div id="tourismMobilePopup" class="hide layer">
  <div class="content">
    <p>${TourismDataList[tourismMobileNum].wr_content}</p>
  </div>
  </div>
<div class="tourism-mobile-arrow-left  view-mobile"  onclick="tourismLeftMobile()">
  <i class="fa-solid fa-angles-left" style="color: white;"></i></i>
</div>
<div class="tourism-mobile-arrow-right view-mobile" onclick="tourismRightMobile()">
  <i class="fa-solid fa-angles-right" style="color: white;"></i>
</div>
</div>
 


               

`;
  //2열 부분
  let dataList_mid = [];
  for (let i = 1; i < 3; i++) {
    dataList_mid.push(newTourismList[i]);
  }
  dataHTML += `<div class="col-lg-3 col-md-6  view-pc ">`;
  dataHTML += dataList_mid
    .map(
      (data) => `<div class="col" >
                        <div class="col">
                            <a class="tourism-image-touch" onclick="tourismShowPopup()" target="_blank">
  <img
    class="tourism-img"
    src="${
      data.wr_link1 ||
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'
    }"
    class="card-img-top"
    onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';"
  />
</a>
<div id="tourismPopup" class="hide layer">
  <div class="content">
    <p>${data.wr_content}</p>
  </div>
</div>
                        </div>
                        
                        <div class="col">                
                                <h3 class="tourism-title"><a href="${
                                  data.wr_subject
                                }" target="_blank" class="title_link">${
        data.wr_subject
      }</a></h3>
      
      </div>
      </div>`
    )
    .join('');
  dataHTML += `</div>`;
  //3열 부분
  let dataList_end = [];
  for (let i = 3; i < 5; i++) {
    dataList_end.push(newTourismList[i]);
  }
  dataHTML += `<div class="col-lg-3 col-md-6 view-pc ">`;
  dataHTML += dataList_end
    .map(
      (data) => `<div class="col" >
                        <div class="col">
                            <a class="tourism-image-touch" onclick="tourismShowPopup()" target="_blank">
  <img
    class="tourism-img"
    src="${
      data.wr_link1 ||
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU'
    }"
    class="card-img-top"
    onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';"
  />
</a>
<div id="tourismPopup" class="hide layer">
  <div class="content">
    <p>${data.wr_content}</p>
  </div>
</div>
                        </div>
                        
                        <div class="col">                
                                <h3 class="tourism-title"><a href="${
                                  data.wr_subject
                                }" target="_blank" class="title_link">${
        data.wr_subject
      }</a></h3>
      
      </div>
      </div>
        `
    )
    .join('');
  dataHTML += `</div">`;
  //화살표버튼 pc
  dataHTML += `<div class="view-pc" onclick="tourismLeft()">
            <i
              class="tourism-arrow-left fa-solid fa-angles-left fa-2xl"
              style="color: rgb(89, 174, 243);"
            ></i>
          </div>
          <div class="view-pc" onclick="tourismRight()">
            <i
              class="tourism-arrow-right fa-solid fa-angles-right fa-2xl"
              style="color: rgb(89, 174, 243);"
            ></i>
          </div>`;
  //화살표버튼 모바일
  dataHTML += `<div class="tourism-mobile-arrow-left  view-mobile"  onclick="tourismLeftMobile()">
          <i class="fa-solid fa-angles-left" style="color: white;"></i></i>
        </div>
        <div class="tourism-mobile-arrow-right view-mobile" onclick="tourismRightMobile()">
          <i class="fa-solid fa-angles-right" style="color: white;"></i>
        </div>`;
  document.getElementById('tourismContainer').innerHTML = dataHTML;
};
let tourismLeft = () => {
  //관광부분 화살표 왼쪽
  tourismNum = tourismNum - 5;
  if (tourismNum < 0) tourismNum = 8;
  TourismRender();
};
const tourismRight = () => {
  //관광부분 화살표 오른쪽
  tourismNum += 5;
  if (tourismNum > 9) {
    tourismNum = 0;
  }
  TourismRender();
};
const tourismLeftMobile = () => {
  //관광부분 모바일 화살표 왼쪽
  tourismMobileNum--;
  if (tourismMobileNum < 1) {
    tourismMobileNum = 13;
  }
  TourismRender();
};
const tourismRightMobile = () => {
  //관광부분 모바일 화살표 오른쪽
  tourismMobileNum++;
  if (tourismMobileNum > 13) {
    tourismMobileNum = 0;
  }
  TourismRender();
};
const tourismShowPopup = () => {
  //관광부분 팝업
  if (tourismPopup === false) {
    document.querySelector('#tourismPopup').classList.remove('hide');
    document.querySelector('#tourismMobilePopup').classList.remove('hide');
  } else {
    document.querySelector('#tourismPopup').classList.add('hide');
    document.querySelector('#tourismMobilePopup').classList.add('hide');
  }
  tourismPopup = !tourismPopup;
};

$(document).mouseup(function (e) {
  // 관광부분 외부영역 클릭 시 팝업 닫기
  var popContent = $('#tourismPopup');
  if (popContent.has(e.target).length === 0) {
    // tourismPopup.classList.add('hide');
    popContent.addClass('hide');
  }
  // tourismPopup = true;
});
//데이터 얻기
getData();
