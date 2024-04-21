// 할 일 저장하기 (filter 아직)
const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form input");

todoForm.addEventListener("submit", handleToDoSubmit);

const loginUserId = document.querySelector(".user-detail span:first-child").textContent;

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";

  const newTodoObj = {
    "todo_title": newTodo,
    "user_id": loginUserId
  }

  fetch("/api/todo/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodoObj)
  })
    .then((response) => response.json())
    .then((response) => {
      alert("저장에 성공하였습니다.");
      console.log(response);
    })
    .catch((error) => {
      alert("저장에 실패하였습니다.");
      console.log(error);
    });

}

// 날짜 가져오기
const today = document.querySelector("#today h2")

getDate();

function getDate() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  today.innerText = `${month}월 ${day}일`;
}

// 리스트 받아오기 

const listTitle = document.querySelector(".list-title h1")

let Todos = [];

//1. 오늘 할 일
const filTdy = document.getElementById("fil-tdy");

filTdy.addEventListener("click", changeFilTdyList);

function changeFilTdyList(event) {
  listTitle.innerText = "오늘 할 일";
  today.classList.remove("hidden");

  fetch(`/api/todo/list`)
    .then((response) => response.json())
    .then((response) => {
      Todos.push(response);
      console.log("Todos", Todos);
      //json화 해서 Todos 에 넣은 값들을 li로 뽑아내야 됨 ~~
    })
    .catch(error => console.log(error));
}

//2. 중요한 일
const filImp = document.getElementById("fil-imp");

filImp.addEventListener("click", changeFilImpList);

function changeFilImpList(event) {
  listTitle.innerText = "중요한 일";
  today.classList.add("hidden");
}

//3. 계획된 일
const filScheduled = document.getElementById("fil-scheduled");

filScheduled.addEventListener("click", changeFilScheduledList);

function changeFilScheduledList(event) {
  listTitle.innerText = "계획된 일";
  today.classList.add("hidden");
}

//4. 완료된 일
const filCmplt = document.getElementById("fil-cmplt");

filCmplt.addEventListener("click", changeFilCmpltList);

function changeFilCmpltList(event) {
  listTitle.innerText = "완료된 일";
  today.classList.add("hidden");
}

//5. 작업 (미완료)
const filNotCmplt = document.getElementById("fil-notCmplt");

filNotCmplt.addEventListener("click", changeFilNotCmpltList);

function changeFilNotCmpltList(event) {
  listTitle.innerText = "작업";
  today.classList.add("hidden");
}