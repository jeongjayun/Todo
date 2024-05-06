//목록 플래그 기본값
let isTdy = true; // 로그인 후 메인화면이 '오늘 할 일' 이도록 하는 변수
let isImp = false;
let isScheduled = false;
let isCmplt = false;
let isAll = false;
let isSearch = false;

let url;

window.addEventListener("DOMContentLoaded", onLoadList);

const listTitle = document.querySelector(".list-title h1");
const todoList = document.querySelector(".list-todo ul");
const cmpltList = document.querySelector(".list-todo div ul");
const cmpltListDiv = document.querySelector(".list-todo div");

// 메뉴항목
const filTdy = document.getElementById("fil-tdy");
const filImp = document.getElementById("fil-imp");
const filScheduled = document.getElementById("fil-scheduled");
const filCmplt = document.getElementById("fil-cmplt");
const filNotCmplt = document.getElementById("fil-notCmplt");

filTdy.addEventListener("click", changeTdy);
filImp.addEventListener("click", changeImp);
filScheduled.addEventListener("click", changeScheduled);
filCmplt.addEventListener("click", changeCmplt);
filNotCmplt.addEventListener("click", changeNotCmplt);

//동적으로 그린 li 안의 요소에 이벤트 할당
document.querySelector(".list-todo ul").addEventListener("click", clickLi); //todoList
document.querySelector(".list-todo div ul").addEventListener("click", clickLi); //cmpltList

let toDos = [];

//1. 오늘 할 일
function changeTdy() {
  isTdy = true;
  isImp = false;
  isScheduled = false;
  isCmplt = false;
  isAll = false;
  isSearch = false;
  onLoadList();
}

//2. 중요한 일
function changeImp() {
  isTdy = false;
  isImp = true;
  isScheduled = false;
  isCmplt = false;
  isAll = false;
  isSearch = false;
  onLoadList();
}

//3. 계획된 일
function changeScheduled() {
  isTdy = false;
  isImp = false;
  isScheduled = true;
  isCmplt = false;
  isAll = false;
  isSearch = false;
  onLoadList();
}

//4. 완료된 일
function changeCmplt() {
  isTdy = false;
  isImp = false;
  isScheduled = false;
  isCmplt = true;
  isAll = false;
  isSearch = false;
  onLoadList();
}

//5. 작업 (미완료)
function changeNotCmplt() {
  isTdy = false;
  isImp = false;
  isScheduled = false;
  isCmplt = false;
  isAll = true;
  isSearch = false;
  onLoadList();
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
      loadTodoDetail(filters.todo_idx);
      onLoadList();
    })
    .catch((error) => {
      alert("변경에 실패하였습니다.");
      console.log(error);
    });
}

// 동적으로 그린 li에 이벤트
function clickLi(event) {
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
  } else if (event.target.nodeName == "BUTTON") {
    //중요버튼
    if (event.target.value == "imp") {
      //imp 중요 속성이면
      filters.fil_imp = "0"; //중요 취소
      event.target.value = ""; //속성 없애기
      event.target.innerHTML = `<i class="fa fa-star-o"></i>`;
    } else {
      //imp 중요속성이 아니면
      filters.fil_imp = "1"; //중요로 변경
      event.target.value = "imp"; //속성 추가
      event.target.innerHTML = `<i class="fa fa-star"></i>`;
    }
  } else if (event.target.nodeName == "SPAN") {
    //사이드바
    const wrap = document.querySelector(".wrap");
    wrap.classList.remove("collapse");
    // delSidebarEl();
    loadTodoDetail(filters.todo_idx);
    return false;
  } else {
    //span, input, button 외 클릭막기
    return false;
  }

  changeFilter(filters);
}

// 동적으로 li 그리기
function addTodo(newTodo) {
  // DOM 생성
  const li = document.createElement("li");
  li.id = newTodo.todo_idx;

  const cmpltChk = document.createElement("input");
  cmpltChk.setAttribute("type", "checkbox");

  const span = document.createElement("span");
  span.innerText = newTodo.todo_title;

  const impBtn = document.createElement("button");
  impBtn.className = "imp-btn";
  impBtn.innerHTML = `<i class="fa fa-star-o"></i>`;
  impBtn.value = "";

  const todoDdln = document.createElement("span");
  todoDdln.innerText = newTodo.todo_ddln;

  //완료된 작업 불러올 시 체크박스 체크
  if (newTodo.fil_cmplt == "1") {
    cmpltChk.checked = true;
    span.style = "text-decoration:line-through;";
  }

  //중요 표시 된 작업들
  if (newTodo.fil_imp == "1") {
    impBtn.innerHTML = `<i class="fa fa-star"></i>`;
    impBtn.value = "imp";
  }

  li.appendChild(cmpltChk);
  li.appendChild(span);

  if (newTodo.todo_ddln != "" && newTodo.todo_ddln != null) {
    li.append(todoDdln);
  }

  li.appendChild(impBtn);

  if (newTodo.fil_cmplt == "1") {
    if (isCmplt) {
      todoList.append(li);
    } else {
      //완료된 항목이면 완료 list div 에 붙이고
      cmpltList.append(li);
    }
  } else {
    //아닐 시 todolist div 에 붙이기
    todoList.append(li);
  }
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

// 리스트 플래그 변경
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
    url = "today";
    listTitle.innerText = "오늘 할 일";
    today.classList.remove("hidden");
    onChangeList(url);
  }

  if (isImp) {
    url = "important";
    listTitle.innerText = "중요한 일";
    today.classList.add("hidden");
    onChangeList(url);
  }

  if (isScheduled) {
    url = `scheduled?id=${loginUserId}`;
    listTitle.innerText = "계획된 일";
    today.classList.add("hidden");
    onChangeList(url);
  }

  if (isCmplt) {
    url = "complete";
    listTitle.innerText = "완료된 일";
    today.classList.add("hidden");
    onChangeList(url);
  }

  if (isAll) {
    url = "all";
    listTitle.innerText = "작업";
    today.classList.add("hidden");
    onChangeList(url);
  }
}

// 리스트 변경하는 함수
function onChangeList(url) {
  fetch(`/api/list/${url}`)
    .then((response) => response.json())
    .then((response) => {
      toDos = response;

      let hasFilCmplt = false; //플래그

      if (isScheduled) {
        const ddlnBeforeData = response["마감기한 이전에"];
        const ddlnLastWeekData = response["마감기한 일주일 전"];
        const ddlnYesterDayData = response["마감기한 어제"];
        const ddlnTodayData = response["마감기한 오늘"];
        const ddlnTommorrowData = response["마감기한 내일"];
        const ddlnNextWeekData = response["마감기한 일주일 후"];
        const ddlnAfterData = response["마감기한 나중에"];

        separateSection(ddlnBeforeData, "이전에");
        separateSection(ddlnLastWeekData, "지난 주");
        separateSection(ddlnYesterDayData, "어제");
        separateSection(ddlnTodayData, "오늘");
        separateSection(ddlnTommorrowData, "내일");
        separateSection(ddlnNextWeekData, "다음 주");
        separateSection(ddlnAfterData, "나중에");

        chkCmpltListDiv(hasFilCmplt);

        //완료체크가 안된 요소가 있는지 확인
        function checkFilCmplt(element) {
          if (element.fil_cmplt == "0") {
            return true;
          }
        }

        //기간 별 섹션 나누기
        function separateSection(toDos, title) {
          if (toDos.length > 0) {
            let sectionChk = toDos.filter(checkFilCmplt); //sectionChk라는 이름의 완료체크가 안된 요소로 배열 재생성

            if (sectionChk.length > 0) {
              //완료체크가 안된 요소가 1개라도 존재하면 섹션 타이틀 달기
              addSection(title);
            }

            toDos.forEach((data) => {
              if (data.fil_cmplt == "1") {
                hasFilCmplt = true;
              }
              addTodo(data);
            });
          }
        }
      } else if (isTdy || isImp || isAll) {
        let hasFilCmplt = false; // 플래그 변수

        // toDos 배열을 순회하며 조건에 맞는 항목이 있는지 확인
        toDos.forEach((todo) => {
          if (
            (isTdy && todo.fil_tdy == "1") ||
            (isImp && todo.fil_imp == "1") ||
            isAll
          ) {
            if (todo.fil_cmplt == "1") {
              hasFilCmplt = true; // fil_cmplt가 '1'인 경우가 존재함을 표시
            }
            addTodo(todo);
          }
        });

        chkCmpltListDiv(hasFilCmplt);
      } else {
        hasFilCmplt = false;
        toDos.forEach(addTodo);
        chkCmpltListDiv(hasFilCmplt);
      }

      // fil_cmplt가 '1'인 경우가 없으면 div를 숨김
      function chkCmpltListDiv(hasFilCmplt) {
        if (!hasFilCmplt) {
          cmpltListDiv.classList.add("hidden");
        } else {
          cmpltListDiv.classList.remove("hidden");
        }
      }
    })
    .catch((error) => {
      alert("불러오기에 실패하였습니다.");
      console.log(error);
    });
}
