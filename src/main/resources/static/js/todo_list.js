// 페이지 로딩 시 Today 기능 켜기
window.addEventListener("DOMContentLoaded", onLoadList);

const listTitle = document.querySelector(".list-title h1");
const todoList = document.querySelector(".list-todo ul");
const cmpltList = document.querySelector(".list-todo div ul");

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
  impBtn.innerHTML = `<i class="fab fa-star"></i>`;
  impBtn.value = "";

  //중요 표시 된 작업들
  if (newTodo.fil_imp == "1") {
    impBtn.innerHTML = `<i class="fas fa-star"></i>`;
    impBtn.value = "imp";
  }

  li.appendChild(cmpltChk);
  li.appendChild(span);

  if (newTodo.todo_ddln != "" && newTodo.todo_ddln != null) {
    const todoDdln = document.createElement("span");
    todoDdln.innerText = newTodo.todo_ddln;
    li.append(todoDdln);
  }

  li.appendChild(impBtn);
  todoList.append(li);
}

// section 만들기
function addSection(title) {
  const section = document.createElement("div");
  section.className = "todo-section";

  const sectionHeader = document.createElement("h2");

  sectionHeader.innerText = title;
  section.appendChild(sectionHeader);
  todoList.appendChild(section);
}

// 완료표시 불러올 작업들
function addCmpltTodo(newTodo) {
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
  impBtn.innerHTML = `<i class="fab fa-star"></i>`;
  impBtn.value = "";

  //중요 표시 된 작업들
  if (newTodo.fil_imp == "1") {
    impBtn.innerHTML = `<i class="fas fa-star"></i>`;
    impBtn.value = "imp";
  }

  li.appendChild(cmpltChk);
  li.appendChild(span);

  if (newTodo.todo_ddln != "" && newTodo.todo_ddln != null) {
    const todoDdln = document.createElement("span");
    todoDdln.innerText = newTodo.todo_ddln;
    li.append(todoDdln);
  }

  li.appendChild(impBtn);
  cmpltList.append(li);
}

//동적으로 그린 li 전부 지우기
function delTodoList() {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  // 이전에 추가된 searchNodata 요소 제거
  const existingSearchNodata = document.querySelector(".search-no-data");
  if (existingSearchNodata) {
    existingSearchNodata.remove();
  }
}

function delCmpltList() {
  while (cmpltList.firstChild) {
    cmpltList.removeChild(cmpltList.firstChild);
  }
}
//동적으로 그린 li 안의 요소에 이벤트 할당
document.querySelector(".list-todo ul").addEventListener("click", function (event) {
  const filters = {
    //filter 기본값
    todo_idx: event.target.parentElement.id,
    user_id: loginUserId
  };

  //완료버튼
  if (event.target.nodeName == "INPUT") {
    if (event.target.checked) {
      filters.fil_cmplt = "1";
    } else {
      filters.fil_cmplt = "0";
    }
  }

  //중요버튼
  if (event.target.nodeName == "BUTTON") {
    if (event.target.value == "imp") {
      //imp 중요 속성이면
      filters.fil_imp = "0"; //중요 취소
      event.target.value = ""; //속성 없애기
      event.target.innerText = "중요X";
    } else {
      //imp 중요속성이 아니면
      filters.fil_imp = "1"; //중요로 변경
      event.target.value = "imp"; //속성 추가
      event.target.innerText = "중요O";
    }
  }
  //사이드바
  if (event.target.nodeName == "SPAN") {
    const wrap = document.querySelector(".wrap");
    wrap.classList.remove("collapse");

    delSidebarEl();
    loadTodoDetail(filters.todo_idx);
    return false;
  }

  changeFilter(filters);
  delTodoList();
  delCmpltList();
  onLoadList();
});

document.querySelector(".list-todo div ul").addEventListener("click", function (event) {
  const filters = {
    //filter 기본값
    todo_idx: event.target.parentElement.id,
    user_id: loginUserId
  };

  //완료버튼
  if (event.target.nodeName == "INPUT") {
    if (event.target.checked) {
      filters.fil_cmplt = "1";
    } else {
      filters.fil_cmplt = "0";
    }
  }

  //중요버튼
  if (event.target.nodeName == "BUTTON") {
    if (event.target.value == "imp") {
      //imp 중요 속성이면
      filters.fil_imp = "0"; //중요 취소
      event.target.value = ""; //속성 없애기
      event.target.innerText = "중요X";
    } else {
      //imp 중요속성이 아니면
      filters.fil_imp = "1"; //중요로 변경
      event.target.value = "imp"; //속성 추가
      event.target.innerText = "중요O";
    }
  }
  //사이드바
  if (event.target.nodeName == "SPAN") {
    const wrap = document.querySelector(".wrap");
    wrap.classList.remove("collapse");

    delSidebarEl();
    loadTodoDetail(filters.todo_idx);
    return false;
  }

  changeFilter(filters);
  delTodoList();
  delCmpltList();
  onLoadList();
});

//목록 스위치 초기화
let isTdy = true;
let isImp = false;
let isScheduled = false;
let isCmplt = false;
let isNotCmplt = false;
let isSearch = false;

function onLoadList() {
  delTodoList(); //todo 삭제 후 밑의 함수에서 새로 그리기
  delCmpltList();

  const listTop = document.querySelector(".list-top");

  if (isSearch) {
    listTop.classList.add("hidden");
  } else {
    listTop.classList.remove("hidden");
  }

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
    const url = `scheduledList/${loginUserId}`;
    listTitle.innerText = "계획된 일";
    today.classList.add("hidden");
    onChangeList(url);
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

const cmpltListDiv = document.querySelector(".list-todo div");

function onChangeList(url) {
  fetch(`/api/todo/${url}`)
    .then((response) => response.json())
    .then((response) => {
      toDos = response;

      if (isScheduled) {

        const ddlnBeforeData = response["마감기한 이전에"];
        if (ddlnBeforeData.length > 0) {
          addSection("이전에");
          ddlnBeforeData.forEach(data => {
            addTodo(data);
          });
        }

        const ddlnLastWeekData = response["마감기한 일주일 전"];
        if (ddlnLastWeekData.length > 0) {
          addSection("일주일 전");
          ddlnLastWeekData.forEach(data => {
            addTodo(data);
          });
        }

        const ddlnYesterDayData = response["마감기한 어제"];
        if (ddlnYesterDayData.length > 0) {
          addSection("어제");
          ddlnYesterDayData.forEach(data => {
            addTodo(data);
          });
        }

        const ddlnTodayData = response["마감기한 오늘"];
        if (ddlnTodayData.length > 0) {
          addSection("오늘");
          ddlnTodayData.forEach(data => {
            addTodo(data);
          });
        }

        const ddlnTommorrowData = response["마감기한 내일"];
        if (ddlnTommorrowData.length > 0) {
          addSection("내일");
          ddlnTommorrowData.forEach(data => {
            addTodo(data);
          });
        }

        const ddlnNextWeekData = response["마감기한 일주일 후"];
        if (ddlnNextWeekData.length > 0) {
          addSection("다음 주");
          ddlnNextWeekData.forEach(data => {
            addTodo(data);
          });
        }


        const ddlnAfterData = response["마감기한 나중에"];
        if (ddlnAfterData.length > 0) {
          addSection("나중에");
          ddlnAfterData.forEach(data => {
            addTodo(data);
          });
        }

      }

      if (isTdy || isImp) {
        // 리스트를 추가할지 여부를 결정하기 위한 플래그 변수
        let hasFilCmplt = false;

        // toDos 배열을 순회하며 조건에 맞는 항목이 있는지 확인
        toDos.forEach(todo => {
          // todo가 isTdy 또는 isImp 조건을 만족하고, fil_cmplt가 '1'인 경우에만 리스트 추가
          if ((isTdy && todo.fil_tdy == "1") || (isImp && todo.fil_imp == "1")) {
            if (todo.fil_cmplt == "1") {
              addCmpltTodo(todo);
              hasFilCmplt = true; // fil_cmplt가 '1'인 경우가 존재함을 표시
            } else {
              addTodo(todo);
            }
          }
        });

        // fil_cmplt가 '1'인 경우가 없으면 div를 숨김
        if (!hasFilCmplt || isScheduled) {
          cmpltListDiv.classList.add("hidden");
        } else {
          cmpltListDiv.classList.remove("hidden");
        }
      } else if (!isScheduled) {
        cmpltListDiv.classList.add("hidden");
        toDos.forEach(addTodo);
      }

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
  isSearch = false;

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
  isSearch = false;

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
  isSearch = false;

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
  isSearch = false;

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
  isSearch = false;

  onLoadList();
}
