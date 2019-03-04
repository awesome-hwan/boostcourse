
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

function click() {
  var a = document.querySelectorAll(".promotion-window img");
  var b = document.querySelector(".promotion-window");
  var current = 1;
  // console.log("#######", a);
  var firstItem = a[0];
  b.appendChild(firstItem.cloneNode(true));
  var per = -100;
  for(var i=0; i<a.length; i++){
    a[i].addEventListener("click", function(evt) {


      console.log("#######current", current);
      console.log("#@@#@@ a.length", a.length);
      current++;
      console.log("perperper", per);
      if(current > a.length){
          evt.target.parentNode.style.transform = `translateX(${per}%)`;
          evt.target.parentNode.style.transition = `all 1s ease-out`;
          per -= 100;

          setTimeout(function() {
              evt.target.parentNode.style.transform = `translateX(0%)`;
              evt.target.parentNode.style.transition = `none`;
              current = 1;
              per = -100;
          }, 1000);

      } else {

        evt.target.parentNode.style.transform = `translateX(${per}%)`;
        evt.target.parentNode.style.transition = `all 1s ease-out`;
          per -= 100;

      }

    })
  }
}
document.addEventListener("DOMContentLoaded", function() {
    // console.log("Dom Loaded");
    init();
    click();
})