const newTodoInput = document.querySelector(".new-todo-div input");

newTodoInput.addEventListener("change", onWriteTodo);

function onWriteTodo(event) {
  console.log(event.target.value);
}