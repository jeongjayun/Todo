// 날짜 가져오기
const today = document.querySelector("#today h2");

getDate();

function getDate() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  today.innerText = `${month}월 ${day}일`;
}
