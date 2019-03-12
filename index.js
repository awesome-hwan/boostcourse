var baseUrl = "http://localhost:8080";

function initOne () {
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
  oReq.open("GET", baseUrl+"/api/categories");//parameter를 붙여서 보낼수있음.
  // oReq.open("GET", "./src/data/categori.json"); //테스트코드
  oReq.send();

}

function initTwo () {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function() {
    var jsonObj = JSON.parse(this.responseText);
    var promotion = jsonObj.items;

    var promotionWindow = document.querySelector(".promotion-window");
    var promotionTemp = document.querySelector("#promotion-img");
    var promotionResult = "";
    for(var i =0; i<promotion.length/2; i++){
      promotionResult  += promotionTemp.innerHTML.replace('{id}', promotion[i].fileId);

    }
    promotionWindow.innerHTML += promotionResult;
    promotionMove();
    });

  oReq.open("GET", baseUrl+"/api/promotions");//parameter를 붙여서 보낼수있음.
  // oReq.open("GET", "./src/data/promotions.json"); //테스트코드
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
  sendAjax(url, param);
}


function makeTemplate(data) {
  var productTemp = document.querySelector("#product-list");
  var productWindow = document.querySelector(".products ul");
  var datas = data.products;
  var result = "";

  for (var i=0; i< datas.length; i++){
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

      viewMoreSendAjax(param);
}

function promotionMove() {
  var promotionImg = document.querySelectorAll(".promotion-window img");
  var promotionWindow = document.querySelector(".promotion-window");
  var firstItem = promotionImg[0];

  var current = 1;
  var per = -100;
  var setTime = 2000;

      promotionWindow.appendChild(firstItem.cloneNode());

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
            }, setTime/2);

        } else {

          promotionWindow.style.transform = `translateX(${per}%)`;
          promotionWindow.style.transition = `all 1s ease-out`;
          per -= 100;

          }
      }, setTime)
}

function vireMoreTemplate(datas) {

  var result = "";
  var productTemp = document.querySelector("#product-list");
  var productWindow = document.querySelector(".products ul");

    for (var i=0; i< datas.length; i++){
      result += productTemp.innerHTML.replace("{description}", datas[i].description)
          .replace("{placeName}",datas[i].placeName)
          .replace("{content}",datas[i].content)
          .replace("{id}", datas[i].fileId);
    }
    productWindow.innerHTML += result;
}

function viewMoreSendAjax(param) {
  var more = document.querySelector(".more_view button");
  var start = 0;

  var oReq = new XMLHttpRequest();
      oReq.addEventListener('load', function() {

  var data = JSON.parse(this.responseText);
  var datas = data.products;

    more.addEventListener("click", function() {
      if (start >= 0){
        start += 4;
      }
      console.log("start#########",start);
      vireMoreTemplate(datas);
    })


  });
  var moreUrl = `${baseUrl}/api/products?${param}&start=${start}`;
  console.log("moreUrl", moreUrl);
  oReq.open("GET", moreUrl);
  oReq.send();
}



function topMove() {
  var movebtn = document.querySelector(".top_move");
  movebtn.addEventListener("click", function () {
    window.scrollTo(0,0);

  })
}

document.addEventListener("DOMContentLoaded", function() {
    initOne();
    initTwo();
    topMove();

})
