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
      addTodo(newTodoObj);
    })
    .catch((error) => {
      alert("저장에 실패하였습니다.");
      console.log(error);
    });
}
