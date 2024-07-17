// -----------변수-----------
let restaurantdataList = [];


// -----------API 호출-----------
const getrestaurantData = async () =>{
    const url = new URL('https://stargolf.info/API_TEST/get_tasks.php?page=1&limit=101');
    const response = await fetch(url);
    console.log(response);
    restaurantdata = await response.json();
    restaurantdataList = restaurantdata.data;

    restaurantList =
    restaurantdataList.filter((e)=>{
    return e.wr_1 === "식당"
    })
    console.log(restaurantList)

    restaurantrender();
    console.log(restaurantdataList);
}


// -----------render-----------
const restaurantrender = () => {    
    let restaurantdataHTML = restaurantList.slice(i+1, i+5).map((data) => 
    `<div class="restaurant col-3">
    <div class="restaurant-box">
        <img src="${data.wr_link1}" class="restaurant-img-top" alt="${data.wr_subject}">
        <h5 class="restaurant-title">${data.wr_subject.substring(0, 15)}</h5>
        <p class="restaurant-text"><strong>Type:</strong> ${data.wr_1}</p>
        <p class="restaurant-text2"><strong>Number:</strong> ${data.wr_3}</p>
        <p class="restaurant-text"><strong>Address:</strong> ${data.wr_6.substring(0, 20)}...</p>
    </div>    
    </div>`).join('');
    
    
    document.getElementById("restaurant-data-board").innerHTML = restaurantdataHTML;
    let restaurantdataHTML2 = restaurantList.slice(i, i+1).map((data) => 
        `<div class="restaurant">
        <div class="restaurant-box2">
            <img src="./images/1.png" id="restaurant-pagenation1" onclick="moveTorestaurantPage1()" alt="">
            <img src="${data.wr_link1}" class="restaurant-img-top2"  alt="${data.wr_subject}">
            <div>
            <h5 class="restaurant-title2">${data.wr_subject.substring(0, 40)}</h5>
            <h4 class="restaurant-text2"><strong>Type:</strong> ${data.wr_1}</h4>
            <h4 class="restaurant-text2"><strong>Number:</strong> ${data.wr_3}</h4>
            <h4 class="restaurant-text2"><strong>Address:</strong> ${data.wr_6}</h4>
            <h3 class="restaurant-text2">${data.wr_content}</h3>
            </div>
            <img src="./images/2.png" id="restaurant-pagenation2" onclick="moveTorestaurantPage2()" alt="">
        </div>    
        </div>`).join('');
        
        
        document.getElementById("restaurant-data-board2").innerHTML = restaurantdataHTML2;
};
// -----------moveTorestaurantPage 함수-----------
let i = 0;
  let moveTorestaurantPage1 = () =>{
    if(i==0){
        return;
    }
    else{i--}
    console.log(i)
    restaurantrender();
  }
  let moveTorestaurantPage2 = () =>{
    if(i==9){
        return;
    }
    else{i++}
    console.log(i)
    restaurantrender();
  }

getrestaurantData();