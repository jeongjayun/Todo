// 페이지 로딩 시 Today 기능 켜기
window.addEventListener("DOMContentLoaded", FilTdyList);

// 할 일 저장하기 (filter 아직)
const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form input");

todoForm.addEventListener("submit", handleToDoSubmit);

const loginUserId = document.querySelector(
  ".user-detail span:first-child"
).textContent;

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";

  const newTodoObj = {
    todo_title: newTodo,
    user_id: loginUserId
  };

  fetch("/api/todo/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodoObj)
  })
    .then((response) => response.json())
    .then((response) => {
      const jsonData = JSON.stringify(response);
      const parsedData = JSON.parse(jsonData);
      console.log(parsedData.todo_idx);

      newTodoObj.id = parsedData.todo_idx;
      paintTodo(newTodoObj);
    })
    .catch((error) => {
      alert("저장에 실패하였습니다.");
      console.log(error);
    });
}

// Todo테이블에서 idx 가장 큰 수 = 저장되는 값
function findTodoIdx() {
  fetch("/api/todo/findMaxNum")
    .then((response) => response.json())
    .then((response) => {
      const todoIdx = response.todo_idx;
      console.log("findMaxNum() 함수 내의 response 출력, 최대값:", todoIdx);
      return todoIdx;
    })
    .catch((error) => console.log(error));
}

// 날짜 가져오기
const today = document.querySelector("#today h2");

getDate();

function getDate() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  today.innerText = `${month}월 ${day}일`;
}

// 리스트 타이틀 받아오기
const listTitle = document.querySelector(".list-title h1");

// JS에서 list element 만들기
const todoList = document.querySelector(".list-todo ul");

function paintTodo(newTodo) {
  const li = document.createElement("li");
  // console.log("newTodo의 값 받아오기", newTodo);
  li.id = newTodo.id;

  const cmpltBtn = document.createElement("button");
  cmpltBtn.innerText = "완료체크";

  const span = document.createElement("span");
  span.innerText = newTodo.todo_title;

  const impBtn = document.createElement("button");
  impBtn.innerText = "중요체크";

  li.appendChild(cmpltBtn);
  li.appendChild(span);
  li.appendChild(impBtn);

  todoList.append(li);
}

let toDos = [];

//목록 스위치
let isTdy = false;
let isImp = false;
let isScheduled = false;
let isCmplt = false;
let isNotCmplt = false;

function changeList() {
  toDos.length = 0; //배열 초기화
  delTodoList();

  if (isTdy) {
    FilTdyList();
  }

  if (isImp) {
    FilImpList();
  }

  if (isScheduled) {
    FilScheduledList();
  }

  if (isCmplt) {
    FilCmpltList();
  }

  if (isNotCmplt) {
    FilNotCmpltList();
  }
}

// paintTodo로 그린 list 삭제하기
function delTodoList() {
  let ul = document.querySelector(".list-todo ul");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

//1. 오늘 할 일
const filTdy = document.getElementById("fil-tdy");

filTdy.addEventListener("click", changeTdy);

function changeTdy(event) {
  isTdy = true;
  isImp = false;
  isScheduled = false;
  isCmplt = false;
  isNotCmplt = false;
  changeList();
}

function FilTdyList() {
  listTitle.innerText = "오늘 할 일";
  today.classList.remove("hidden");

  fetch(`/api/todo/tdyList`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      toDos = response;
      toDos.forEach(paintTodo); //여기서 undefined 이슈
    })
    .catch((error) => console.log(error));
}

//2. 중요한 일
const filImp = document.getElementById("fil-imp");

filImp.addEventListener("click", changeImp);

function changeImp(event) {
  isTdy = false;
  isImp = true;
  isScheduled = false;
  isCmplt = false;
  isNotCmplt = false;
  changeList();
}

function FilImpList() {
  listTitle.innerText = "중요한 일";
  today.classList.add("hidden");

  fetch(`/api/todo/impList`)
    .then((response) => response.json())
    .then((response) => {
      toDos = response;
      toDos.forEach(paintTodo);
    })
    .catch((error) => console.log(error));
}

//3. 계획된 일
const filScheduled = document.getElementById("fil-scheduled");

filScheduled.addEventListener("click", changeSchduled);

function changeSchduled(event) {
  isTdy = false;
  isImp = false;
  isScheduled = true;
  isCmplt = false;
  isNotCmplt = false;
  changeList();
}

function FilScheduledList() {
  listTitle.innerText = "계획된 일";
  today.classList.add("hidden");
}

//4. 완료된 일
const filCmplt = document.getElementById("fil-cmplt");

filCmplt.addEventListener("click", changeCmplt);

function changeCmplt(event) {
  isTdy = false;
  isImp = false;
  isScheduled = false;
  isCmplt = true;
  isNotCmplt = false;
  changeList();
}

function FilCmpltList() {
  listTitle.innerText = "완료된 일";
  today.classList.add("hidden");
}

//5. 작업 (미완료)
const filNotCmplt = document.getElementById("fil-notCmplt");

filNotCmplt.addEventListener("click", changeNotCmplt);

function changeNotCmplt(event) {
  isTdy = false;
  isImp = false;
  isScheduled = false;
  isCmplt = false;
  isNotCmplt = true;
  changeList();
}

function FilNotCmpltList() {
  listTitle.innerText = "작업";
  today.classList.add("hidden");

  fetch(`/api/todo/NotCmpltList`)
    .then((response) => response.json())
    .then((response) => {
      toDos = response;
      toDos.forEach(paintTodo);
    })
    .catch((error) => console.log(error));
}
