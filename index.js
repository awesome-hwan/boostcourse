var baseUrl = "http://localhost:8080";

function init () {
  // 서버요청
    var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function() {
            var jsonObj = JSON.parse(this.responseText);
            var cate = jsonObj.items;

            // 카테고리 생성
            var cateUl = document.querySelector(".categories ul");
            var cateLi = document.querySelector("#categori-list");
            var cateResult = "";

            for(var i =0; i<cate.length; i++){
              cateResult += cateLi.innerHTML.replace('{name}', cate[i].name);
            }
            cateUl.innerHTML += cateResult;


           var cateCount = document.querySelector("#categori-count");
           var cateWindow = document.querySelector(".promotion-total");
           var countResult = "";
           var sum = 0;

           for(var i=0; i<cate.length; i++){
               sum += cate[i].count;
           }
           countResult += cateCount.innerHTML.replace('{count}', sum);
          cateWindow.innerHTML = countResult;
            // 카테고리 클릭 시 활성화
            cateUl.addEventListener("click", function(evt) {

              active(evt, cate);
            })
  });
  // oReq.open("GET", baseUrl+"/api/categories");//parameter를 붙여서 보낼수있음.
  oReq.open("GET", "./src/data/categori.json"); //테스트코드
  oReq.send();
}


function active(evt, cate) {
    var url = `${baseUrl}/api/products`;
    // var url = './src/data/products.json'; //테스트코드

    // 카테고리 클릭시 contents 활성화
    var activeList = document.querySelectorAll('.categories-ul a');
    for (var i=0; i<activeList.length; i++){
        activeList[i].classList.remove('active');
        if (activeList[i].innerHTML === evt.target.innerHTML ) {
            evt.target.classList.add('active');

        }

    }
    // 카테고리 클릭시 count 변경
    var cateCount = document.querySelector("#categori-count");
    var cateWindow = document.querySelector(".promotion-total");
    var countResult = "";
    var sum = 0;
      for (var i=0; i<cate.length; i++){
        if(cate[i].name === evt.target.innerHTML){
          sum = cate[i].count;
        } else if ("전체리스트" ===evt.target.innerHTML){
          sum += cate[i].count;
        }
      }
    countResult += cateCount.innerHTML.replace('{count}', sum);
    cateWindow.innerHTML = countResult;

   switch (evt.target.innerHTML) {
     case "전시":
       var param = "categoryId=1";
       break;
     case "뮤지컬":
       var param = "categoryId=2";
       break;
     case "콘서트":
       var param = "categoryId=3";
       break;
     case "클래식":
       var param = "categoryId=4";
       break;
     case "연극":
       var param = "categoryId=5";
       break;
     default:
       break;
   }

  sendAjax(url, param);  //테스트코드

}

function makeTemplate(data) {
  var productTemp = document.querySelector("#product-list");
  var productWindow = document.querySelector(".products ul");
    var datas = data.products;
    // console.log(datas);
    var result = "";
    for (var i=0; i< datas.length; i++){
      // console.log("#####", datas[i].description);
      result += productTemp.innerHTML.replace("{description}", datas[i].description)
                            .replace("{placeName}",datas[i].placeName)
                            .replace("{content}",datas[i].content)
                            .replace("{id}", datas[i].fileId);
    }

  productWindow.innerHTML = result;
}

// 클릭시 promotion을 가져온다
function sendAjax(url, param) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function() {
      var data = JSON.parse(this.responseText);
      makeTemplate(data);
  });
  oReq.open("GET", `${url}?${param}`);
  oReq.send();
}

function promotionMove() {
  var promotionImg = document.querySelectorAll(".promotion-window img");
  var promotionWindow = document.querySelector(".promotion-window");
  var current = 1;
  var per = -100;

  var firstItem = promotionImg[0];
  promotionWindow.appendChild(firstItem.cloneNode(true));

      setInterval( function() {
      current++;
      if(current > promotionImg.length){
          promotionWindow.style.transform = `translateX(${per}%)`;
          promotionWindow.style.transition = `all 1s ease-out`;
          per -= 100;

          setTimeout(function() {
              promotionWindow.style.transform = `translateX(0%)`;
              promotionWindow.style.transition = `none`;
              current = 1;
              per = -100;
          }, 1000);

      } else {

        promotionWindow.style.transform = `translateX(${per}%)`;
        promotionWindow.style.transition = `all 1s ease-out`;
          per -= 100;

        }
      }, 10000)
}

document.addEventListener("DOMContentLoaded", function() {
    // console.log("Dom Loaded");
    init();
    promotionMove();

})