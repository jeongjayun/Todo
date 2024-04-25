// 사이드바에서 메뉴 상태 변경 버튼 누르면 main_container의 상태 변경하도록
window.addEventListener("load", function (e) {
  this.document
    .querySelector(".toggle")
    .addEventListener("click", function (event) {
      document.querySelector(".wrap").classList.toggle("collapse");
    });
});
