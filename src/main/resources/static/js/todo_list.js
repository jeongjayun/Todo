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
// API로 리스트도 가져올 수 있고 ...
// 뷰에 뿌려주면 목록은 만들 수 있을 것 같음 ...