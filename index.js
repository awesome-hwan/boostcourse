
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

    // 카테고리 클릭 시 활성화
    cateUl.addEventListener("click", function(evt) {
      active(evt) ;
    })
  });
  // oReq.open("GET", "http://localhost:8080/api/promotions");//parameter를 붙여서 보낼수있음.
  oReq.open("GET", "./src/data/categori.json");//parameter를 붙여서 보낼수있음.
  oReq.send();


}

function active(evt) {
  // evt.target;
  if (evt.target.className !== "active" ) {
    evt.target.className = "active"
  } else {

    evt.target.className = ""
  }
}






document.addEventListener("DOMContentLoaded", function() {
    console.log("Dom Loaded");
    init();
})