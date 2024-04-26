// 페이지 로딩 시 Today 기능 켜기
window.addEventListener("DOMContentLoaded", onLoadList);

const listTitle = document.querySelector(".list-title h1");
const todoList = document.querySelector(".list-todo ul");

//동적으로 li 데이터 생성
function addTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.todo_idx;

  const cmpltChk = document.createElement("input");
  cmpltChk.setAttribute("type", "checkbox");

  const span = document.createElement("span");
  span.innerText = newTodo.todo_title;

  //완료된 작업 불러올 시 체크박스 체크
  if (newTodo.fil_cmplt == "1") {
    cmpltChk.checked = true;
    span.style = "text-decoration:line-through;";
  }

  const impBtn = document.createElement("button");
  impBtn.className = "imp-btn";
  impBtn.innerText = "중요X";
  impBtn.value = "";

  //중요 표시 된 작업들
  if (newTodo.fil_imp == "1") {
    impBtn.innerText = "중요O";
    impBtn.value = "imp";
  }

  li.appendChild(cmpltChk);
  li.appendChild(span);
  li.appendChild(impBtn);

  todoList.append(li);
}

//동적으로 그린 li 전부 지우기
function delTodoList() {
  let ul = document.querySelector(".list-todo ul");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}

//동적으로 그린 li 안의 요소에 이벤트 할당
document.querySelector(".list-todo ul").addEventListener("click", function (e) {
  const filters = {
    //filter 기본값
    todo_idx: e.target.parentElement.id,
    user_id: loginUserId
  };

  //완료버튼
  if (e.target.nodeName == "INPUT") {
    if (e.target.checked) {
      filters.fil_cmplt = "1";
    } else {
      filters.fil_cmplt = "0";
    }

    changeFilter(filters);
    onLoadList();
  }

  //중요버튼
  if (e.target.nodeName == "BUTTON") {
    if (e.target.value == "imp") {
      //imp 중요 속성이면
      filters.fil_imp = "0"; //중요 취소
      e.target.value = ""; //속성 없애기
      e.target.innerText = "중요X";
    } else {
      //imp 중요속성이 아니면
      filters.fil_imp = "1"; //중요로 변경
      e.target.value = "imp"; //속성 추가
      e.target.innerText = "중요O";
    }

    changeFilter(filters);
    onLoadList();
  }

  //사이드바
  if (e.target.nodeName == "SPAN") {
    const wrap = document.querySelector(".wrap");
    wrap.classList.remove("collapse");
    loadTodoDetail(filters.todo_idx);
  }
});

//목록 스위치
let isTdy = true;
let isImp = false;
let isScheduled = false;
let isCmplt = false;
let isNotCmplt = false;

function onLoadList() {
  delTodoList(); //todo 삭제 후 밑의 함수에서 새로 그리기

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
    alert("기능 구현 아직");
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
  }
}

let toDos = [];

function onChangeList(url) {
  fetch(`/api/todo/${url}`)
    .then((response) => response.json())
    .then((response) => {
      toDos = response;
      toDos.forEach(addTodo);
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

  onLoadList();
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

  onLoadList();
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

  onLoadList();
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

  onLoadList();
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

  onLoadList();
}
