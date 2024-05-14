// 날짜 가져오기
const today = document.querySelector("#today h2");

getDate();

function getDate() {
  const date = new Date(); // 자바스크립트에서 Date 생성
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let weekday = new Array();
  weekday[0] = "일";
  weekday[1] = "월";
  weekday[2] = "화";
  weekday[3] = "수";
  weekday[4] = "목";
  weekday[5] = "금";
  weekday[6] = "토";

  today.innerText = `${month}월 ${day}일 ${weekday[date.getDay()]}요일`;
}
