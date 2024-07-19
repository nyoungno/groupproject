
let dataList = [];
let showList = []
let popUpScreen = document.getElementById("pop-box")
let page = 0

const url = new URL(
  `https://stargolf.info/API_TEST/get_tasks.php?limit=111`
);

const getData = async () => {
  // 데이터 받아서 랜더링하는 공통부분
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json(); // json은 파일 형식중 하나
    if (response.status === 200) {
      data.forEach;
      dataList = data.data;
      console.log('news', dataList);
      showRender();
    } else {
      // throw new Error(data.message);
      console.log('rrr', response.status);
      throw new Error(data.message || 'Failed to fetch data');
    }
  } catch (error) {
    console.error;
  }
};
getData()

const showRender = () => {
  showList = dataList.filter((e)=>{
    return e.wr_1 == "공연"
})
  console.log("aaa",showList)
  let showHTML = []
  showHTML = showList.map(show=>
      `<div class="col">
          <div>
              <a id="show-img" href=${show.wr_10}>
              <img class="show-img-size" src=${show.wr_link1} onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUnvISVTYopMAy17o3mB2lfSPeEjoKfAdV2w&s';">
              </a>
          </div>
          <div class="show-exp" onclick="popUp();popText('${show.wr_link1}','${show.wr_link2}','${show.wr_subject}','${show.wr_1}','${show.wr_3}','${show.wr_4}','${show.wr_6}','${show.wr_10}')">
              <div id="show-title">
                  <h4 class="none-a">${show.wr_subject}</h4>
              </div>
          </div>
      </div>`    
    ).join('')


  document.getElementById("show-box").innerHTML = showHTML
}


const popUp = () =>{
  popUpScreen.style.display = "block"

}

const exit = ()=>{
  popUpScreen.style.display = "none"
}

const popText = (img1,img2,title,type,phone,time,address,homepage) => {
  
  console.log("클릭",img1,img2,title,type,phone,time,address,homepage)
  
  let popupHTML = `<div>
          <div>
              <a id="show-img" href=${homepage}>
              <img class="show-img-size block" src=${img1} onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUnvISVTYopMAy17o3mB2lfSPeEjoKfAdV2w&s';">
              <img class="show-img-size block " src=${img2} https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUnvISVTYopMAy17o3mB2lfSPeEjoKfAdV2w&s>
              </a>
          </div>
          <div class="show-exp" >
              <div id="show-title">
                  <h5>${title}</h5>
                  <p>${type}</p>
                  <p>${time}</p>
                  <p>${phone}</p>
                  <p>${address}</p>
              </div>
          </div>
      </div>` 



  document.getElementById("pop-inner").innerHTML = popupHTML
}

const pageCount = () =>{
  //여기에 만들려고 하고있어요
}
