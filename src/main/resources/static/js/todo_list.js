// 페이지 로딩 시 Today 기능 켜기
window.addEventListener("DOMContentLoaded", FilTdyList);

// 수정해야됨 ㅠㅠㅠㅠㅠㅠ
function FilTdyList() {
  listTitle.innerText = "오늘 할 일";
  today.classList.remove("hidden");

  fetch(`/api/todo/tdyList`)
    .then((response) => response.json())
    .then((response) => {
      // console.log(response);
      toDos = response;
      toDos.forEach(function (response) {
        // !! addTodo 함수와 거의 내용 일치함. 함수화 하기
        const li = document.createElement("li");
        li.id = response.todo_idx;

        const cmpltBtn = document.createElement("button");
        cmpltBtn.innerText = "클릭시완료";

        const span = document.createElement("span");
        span.innerText = response.todo_title;

        const impBtn = document.createElement("button");
        impBtn.innerText = "클릭시중요";

        li.appendChild(cmpltBtn);
        li.appendChild(span);
        li.appendChild(impBtn);

        todoList.append(li);
      });
    })
    .catch((error) => console.log(error));
}

// 리스트 타이틀 받아오기
const listTitle = document.querySelector(".list-title h1");

// JS에서 list element 만들기
const todoList = document.querySelector(".list-todo ul");

function addTodo(newTodo) {
  const li = document.createElement("li");
  // console.log("newTodo의 값 받아오기", newTodo);
  li.id = newTodo.id;

  const cmpltBtn = document.createElement("button");
  cmpltBtn.innerText = "클릭시완료";

  const span = document.createElement("span");
  span.innerText = newTodo.todo_title;

  const impBtn = document.createElement("button");
  impBtn.innerText = "클릭시중요";

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

function changeListBtn() {
  toDos.length = 0; //배열 초기화
  delTodoList(); //todo 삭제후 및의 함수에서 새로 그리기

  if (isTdy) {
    const url = "tdyList";
    listTitle.innerText = "오늘 할 일";
    today.classList.remove("hidden");
    onChangeList(url);
  }

  if (isImp) {
    const url = "impList";
    listTitle.innerText = "중요한 일";
    today.classList.add("hidden");
    onChangeList(url);
  }

  if (isScheduled) {
    // const url = "tdyList";
    listTitle.innerText = "계획된 일";
    today.classList.add("hidden");
    // onChangeList(url);
  }

  if (isCmplt) {
    const url = "cmpltList";
    listTitle.innerText = "완료된 일";
    today.classList.add("hidden");
    onChangeList(url);
  }

  if (isNotCmplt) {
    const url = "NotCmpltList";
    listTitle.innerText = "작업";
    today.classList.add("hidden");
    onChangeList(url);
    // FilNotCmpltList();
  }
}

// paintTodo로 그린 list 삭제하기
function delTodoList() {
  let ul = document.querySelector(".list-todo ul");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

function onChangeList(url) {
  fetch(`/api/todo/${url}`)
    .then((response) => response.json())
    .then((response) => {
      toDos = response;
      toDos.forEach(function (response) {
        // !! addTodo 함수와 거의 내용 일치함. 함수화 하기
        const li = document.createElement("li");
        li.id = response.todo_idx;

        const cmpltBtn = document.createElement("button");
        cmpltBtn.value = "notCmplt";
        cmpltBtn.innerText = "미완료";

        const span = document.createElement("span");
        span.innerText = response.todo_title;

        const impBtn = document.createElement("button");
        impBtn.innerText = "클릭시중요";

        li.appendChild(cmpltBtn);
        li.appendChild(span);
        li.appendChild(impBtn);

        todoList.append(li);

        cmpltBtn.addEventListener("click", function (event) {
          if (event.target.innerText == "미완료") {
            alert("클릭!!");
            event.target.value = "cmplt";
            event.target.innerText = "완료";

            const filters = {
              todo_idx: li.id,
              user_id: loginUserId,
              fil_tdy: "0",
              fil_imp: "0",
              fil_cmplt: "1",
              fil_del: "0"
            };

            changeFilter(filters);

            //e.target.어쩌고 ~~~.click으로 꺼내기 꺼내기 꺼내기

            console.log("fetch 밖에서 filter 로그찍기", filters);
          } else {
            event.target.innerText = "미완료";
            cmpltBtn.value = "notCmplt";
          }
        });
      });
    })
    .catch((error) => {
      alert("불러오기에 실패하였습니다.");
      console.log(error);
    });
}

// filter 변경 Fetch 함수
function changeFilter(filters) {
  fetch("/api/todo/filterUpdate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters)
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("fetch 내에서 filter 로그찍기", filters);
      console.log(response);
    })
    .catch((error) => {
      alert("변경에 실패하였습니다.");
      console.log(error);
    });
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
  changeListBtn();
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
  changeListBtn();
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
  changeListBtn();
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
  changeListBtn();
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
  changeListBtn();
}

// 각 투두의 버튼 이벤트 확인
