let wr_1Value = "공연"
let dataList = [];
let showList = []
let popUpScreen = document.getElementById("pop-box")
let titleText = document.querySelectorAll(".show-exp")
titleText.forEach((E)=>
E.addEventListener("click",(event) => popText(event)))

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
  let showHTML = []
  showHTML = showList.map(show=>
      `<div class="col">
          <div>
              <a id="show-img" href=${show.wr_10}>
              <img class="show-img-size" src=${show.wr_link1} onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUnvISVTYopMAy17o3mB2lfSPeEjoKfAdV2w&s';">
              </a>
          </div>
          <div class="show-exp" onclick="popUp()">
              <div id="show-title">
                  <a href=${show.wr_10} class="none-a"><h4 class="none-a">${show.wr_subject}</h4></a>
              </div>
              
             
          </div>
      </div>`    
    ).join('')

// <div id="show-time">
//   <p>${showTime(show)}</p>
// </div>
// <div id="show-address">
//     <p>address: ${showAddress(show)}</p>
// </div>
  document.getElementById("show-box").innerHTML = showHTML
}


// const showTime = (show)=>{
//   let arr = ""
//   arr = show.wr_4
//   if(arr == ""){
//       return show = "unknown"
//   }else{
//       if(arr.length > 20){
//           return arr = `time: ${arr.substring(0,15) + "..."}`
//       }else{
//           return arr = `time: ${arr}` 
//       }

//   }
// } 

// const showAddress = (show) =>{
//   let arr1 = ""
//   arr1 = show.wr_6
//   if(arr1.length > 20){
//       return arr1.substring(0,15) + "..."
//   }else{
//       return arr1 
//   }
// }

// const popUp = () =>{
//   popUpScreen.style.display = "block"

// }

// const exit = ()=>{
//   popUpScreen.style.display = "none"
// }

// const popText = (event) => {
//   console.log(event)
//   for(let i = 0; i < showList.length;i++){
//     console.log(titleText[i])

//   }
//   console.log("클릭")
  
  //각 내용을 상세히
  // document.getElementById("pop-inner").innerHTML = popupHTML
// }
console.log("그림을 클릭하면 사이트로 들어가고 이름을 클릭하면 창을 띄어서 거기에서 자세히 설명해주고 싶은데 이걸 구연할 방법을 모집중입니다")
