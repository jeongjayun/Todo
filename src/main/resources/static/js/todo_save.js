const todoForm = document.getElementById("todo-form");
const todoInput = document.querySelector("#todo-form .todo-input");
const ddlnInput = document.querySelector("#todo-form .todoCalendar");
const cmpltInput = document.querySelector("#todo-form .cmpltChk");

const loginUserId = document.querySelector(
  ".user-detail span:first-child"
).textContent;

todoForm.addEventListener("submit", handleToDoSubmit);

function handleToDoSubmit(event) {
  event.preventDefault();

  const newTodo = todoInput.value;

  if (newTodo == "") {
    alert("저장할 내용이 없습니다.");
    todoInput.focus();
    return false;
  }

  todoInput.value = "";
  const newDdln = new Date(ddlnInput.value); // 문자열로부터 날짜 객체 생성

  //기본값
  const newTodoObj = {
    todo_title: newTodo,
    user_id: loginUserId,
    fil_tdy: isTdy ? "1" : "0",
    fil_imp: isImp ? "1" : "0"
  };

  if (cmpltInput.checked) {
    newTodoObj.fil_cmplt = "1";
  }

  if (ddlnInput.value != "") {
    newTodoObj.todo_ddln = newDdln.toISOString();
  }

  fetch("/api/todo/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodoObj)
  })
    .then((response) => response.json())
    .then((response) => {
      const jsonData = JSON.stringify(response);
      const parsedData = JSON.parse(jsonData);
      newTodoObj.todo_idx = parsedData.todo_idx;
      addTodo(newTodoObj);
      console.log(newTodoObj);
      onLoadList();
    })
    .catch((error) => {
      alert("저장에 실패하였습니다.");
      console.log(error);
    });
}
