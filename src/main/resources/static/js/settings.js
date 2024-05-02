const newTodo = document.getElementById("newTodo-input");
const impTodo = document.getElementById("impTodo-input");
const user_id = document.getElementById("user-id-span").textContent;

console.log(user_id);
const settings = {
  user_id: user_id
};

window.addEventListener("DOMContentLoaded", function () {
  this.fetch(`/api/user/settings?id=${user_id}`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      const settings = response["현재 설정"];
      console.log(settings);
      if (settings.impTodo_top == "1") {
        impTodo.checked = true;
      } else {
        impTodo.checked = false;
      }
      if (settings.newTodo_top == "1") {
        newTodo.checked = true;
      } else {
        newTodo.checked = false;
      }
    })
    .catch((error) => {
      console.log(error);
      this.alert(error);
    });
});

newTodo.addEventListener("change", function () {
  if (newTodo.checked) {
    settings.newTodo_top = "1";
  } else {
    settings.newTodo_top = "0";
  }

  fetch("/api/user/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings)
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
});

impTodo.addEventListener("change", function () {
  if (impTodo.checked) {
    settings.impTodo_top = "1";
  } else {
    settings.impTodo_top = "0";
  }

  fetch("/api/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings)
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
});
