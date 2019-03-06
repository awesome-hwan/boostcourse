
function init () {
  // 서버요청
  var oReq = new XMLHttpRequest();
       oReq.addEventListener("load", function() {
    var jsonObj = JSON.parse(this.responseText);
    var cate = jsonObj.items;

    // console.log(jsonObj);
    // 카테고리 생성
    var cateUl = document.querySelector(".categories ul");
    var cateLi = document.querySelector("#categori-list");
    var cateResult = "";

    for(var i =0; i<cate.length; i++){
      cateResult += cateLi.innerHTML.replace('{name}', cate[i].name);
    }
    cateUl.innerHTML += cateResult;

    // 카테고리 클릭 시 활성화
    cateUl.addEventListener("click", function(evt) {
      active(evt) ;
    })
  });
  oReq.open("GET", "./src/data/categori.json");//parameter를 붙여서 보낼수있음.
  oReq.send();
}


function active(evt) {
    var url = './src/data/products.json';
    sendAjax(url);

    var activeList = document.querySelectorAll('.categories-ul a');

    for (var i=0; i<activeList.length; i++){
        activeList[i].classList.remove('active');
        if (activeList[i].innerHTML === evt.target.innerHTML ) {
            evt.target.classList.add('active');
        }
    }




}

function makeTemplate(data) {
  var a = document.querySelector("#product-list");
  var b = document.querySelector(".products ul");
    var datas = data.products;
    // console.log(datas);
    var result = "";
    for (var i=0; i< datas.length; i++){
      // console.log("#####", datas[i].description);
      result += a.innerHTML.replace("{description}", datas[i].description)
                            .replace("{placeName}",datas[i].placeName)
                            .replace("{content}",datas[i].content)
                            .replace("{id}", datas[i].fileId);
    }
    // console.log('aa', result);

    b.innerHTML = result;
}

// 클릭시 promotion을 가져온다
function sendAjax(url) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', function() {
      var data = JSON.parse(this.responseText);
      // console.log("######", data);
      makeTemplate(data);
  });
  oReq.open("GET", url);
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
      }, 2000)
}
document.addEventListener("DOMContentLoaded", function() {
    // console.log("Dom Loaded");
    init();
    promotionMove();
})