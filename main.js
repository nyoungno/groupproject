let wr_1Value = "공연"
let dataList = [];
let showList = []
let popUpScreen = document.getElementById("pop-box")

const url = new URL(
  `https://stargolf.info/API_TEST/get_tasks.php?category=${wr_1Value}`
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
  
  showList = dataList
  let showHTML = showList.map(show=>
      `<div class="col">
          <div>
              <a id="show-img" href=${show.wr_10}>
              <img class="show-img-size" src=${show.wr_link1} onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUnvISVTYopMAy17o3mB2lfSPeEjoKfAdV2w&s';">
              </a>
          </div>
          <div class="show-exp">
              <div id="show-title">
                  <h4>${show.wr_subject}</h4>
              </div>
              <div id="show-time">
                  <p>${showTime(show)}</p>
              </div>
              <div id="show-address">
                  <p>address: ${showAddress(show)}</p>
              </div>
              <button class="more-inFor" onclick="popUp(); popText()">
              </button>
          </div>
      </div>`    
  ).join('')
  
  document.getElementById("show-box").innerHTML = showHTML
}


const showTime = (show)=>{
  let arr = ""
  arr = show.wr_4
  if(arr == ""){
      return show = "unknown"
  }else{
      if(arr.length > 20){
          return arr = `time: ${arr.substring(0,15) + "..."}`
      }else{
          return arr = `time: ${arr}` 
      }

  }
} 

const showAddress = (show) =>{
  let arr1 = ""
  arr1 = show.wr_6
  if(arr1.length > 20){
      return arr1.substring(0,15) + "..."
  }else{
      return arr1 
  }
}

const popUp = () =>{
  popUpScreen.style.display = "block"

}

const exit = ()=>{
  popUpScreen.style.display = "none"
}

const popText = () => {
  
  //각 내용을 상세히
  // document.getElementById("pop-inner").innerHTML = popupHTML
}