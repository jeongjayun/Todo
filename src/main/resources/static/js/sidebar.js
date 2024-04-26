// 사이드바에서 메뉴 상태 변경 버튼 누르면 main_container의 상태 변경하도록
window.addEventListener("load", function () {
  this.document.querySelector(".toggle").addEventListener("click", function () {
    document.querySelector(".wrap").classList.toggle("collapse");
  });
});

//사이드바에 데이터 불러오고 수정도 해야됨
function loadTodoDetail(todoIdx) {
  fetch(`/api/todo/${todoIdx}`)
    .then((response) => response.json())
    .then((response) => {
      const TODO_DETAIL = response.result;
      console.log(TODO_DETAIL);

      addSidebar(TODO_DETAIL); //동적으로 사이드바 안의 내용들 생성하기

      //클릭하면 입력창 , 엔터치면 저장되기
      // todoTitleSpan.addEventListener("click", function () {
      //   todoTitleSpan.classList.add("hidden");
      //   todoTitleInput.classList.remove("hidden");
      // });

      // todoTitle.addEventListener("submit", function (event) {
      //   event.preventDefault();
      // });

      // if (TODO_DETAIL.fil_imp == "1") {
      //   impBtn.innerText = "중요O";
      //   impBtn.value = "imp";
      // } else {
      //   impBtn.innerText = "중요X";
      //   impBtn.value = "";
      // }

      //나의 하루에 추가
      const addTdy = document.getElementById("add-tdy-btn");

      if (TODO_DETAIL.fil_tdy == "1") {
        addTdy.innerText = "나의 하루에 추가 됨";
      } else {
        addTdy.innerText = "오늘 하루에 추가";
      }

      addTdy.addEventListener("click", function (event) {
        event.preventDefault();
        //클릭하면 수정되어야 됨
      });

      //메모
      const sideMemo = document.querySelector(".todo-memo textarea");
      sideMemo.innerText = TODO_DETAIL.todo_memo;

      //수정시간
      const sidebarTime = document.querySelector(".todo-memo p");

      if (TODO_DETAIL.fil_dlt == "1") {
        sidebarTime.innerText = `${TODO_DETAIL.deleted_time}에 삭제됨.`;
      } else if (TODO_DETAIL.updated_time != null) {
        sidebarTime.innerText = `${TODO_DETAIL.updated_time}에 수정됨.`;
      }

      //생성시간
      const createdTime = document.querySelector(".sidebar-bottom div");
      createdTime.innerText = TODO_DETAIL.created_time;

      //삭제버튼
      const deleteBtn = document.querySelector(".sidebar-bottom button");
      // deleteBtn.addEventListener("click", deleteTodo());
    })
    .catch((error) => {
      alert("통신에 실패하였습니다.");
      console.log(error);
    });
}

// 동적으로 사이드바에 요소 만들기
function addSidebar(TODO_DETAIL) {
  //-----todo-title 상단영역 ------
  const todoTitle = document.querySelector(".todo-title");

  const cmpltChk = document.createElement("input");
  cmpltChk.setAttribute("type", "checkbox");

  const todoTitleInput = document.createElement("input");
  todoTitleInput.setAttribute("type", "text");
  todoTitleInput.value = TODO_DETAIL.todo_title;
  todoTitleInput.classList.add("hidden"); //처음에 불러올 때는 숨겨서 가져오기

  const todoTitleSpan = document.createElement("span");
  todoTitleSpan.innerText = TODO_DETAIL.todo_title;

  const impBtn = document.createElement("button");
  impBtn.className = "imp-btn";
  impBtn.innerText = "중요X";
  impBtn.value = "";

  todoTitle.append(cmpltChk);
  todoTitle.append(todoTitleInput);
  todoTitle.append(todoTitleSpan);
  todoTitle.append(impBtn);

  //----- sidebar-main 영역 -----
  const sidebarMain = document.querySelector(".sidebar-main");
  console.log(sidebarMain);

  const tdyBtn = document.createElement("button");
  tdyBtn.innerText = "나의 하루에 추가";
  tdyBtn.id = "add-tdy-btn";

  sidebarMain.append(tdyBtn);

  // ----- todo-ddln 드랍메뉴 만들기 ----
  //기한 선택
  //사이드바 기한 선택 요소들
  const todoDdln = document.querySelector(".todo-ddln");

  const dropdownForm = document.createElement("div");
  dropdownForm.className = "dropdown";

  const dropdownBtn = document.createElement("button");
  dropdownBtn.className = "dropdown-toggle";
  dropdownBtn.innerText = "기한 선택";

  dropdownForm.append(dropdownBtn);
  todoDdln.append(dropdownForm); //드랍다운 추가

  const menuList = document.querySelector(".dropdown-menu");
  const itemList = document.querySelector(".dropdown-item");
  const optionBtn = document.querySelectorAll(".dropdown-option");

  // dropdownBtn 클릭하면, menuList 나온다
  dropdownBtn.addEventListener("click", function () {
    menuList.classList.toggle("show");
  });

  // menuList는 사라진다
  dropdownBtn.addEventListener("blur", function () {
    menuList.classList.remove("show");
  });

  // menuList 중 하나를 클릭하면,
  optionBtn.forEach(function (item) {
    item.addEventListener("click", function (e) {
      // 선택한 값 지정
      const selectValue = e.currentTarget.textContent.trim();
      // 지정 값 출력
      dropdownBtn.textContent = selectValue;
      // 색깔 변화
      dropdownBtn.classList.add("selected");
    });
  });

  //완료된 작업 불러올 시 체크박스 체크
  if (TODO_DETAIL.fil_cmplt == "1") {
    cmpltChk.checked = true;
    todoTitleSpan.style = "text-decoration:line-through;";
  } else {
    cmpltChk.checked = false;
    todoTitleSpan.style = "none";
  }
}

// 사이드바에서 데이터 삭제하기
// function deleteTodo() {
//   if (
//     confirm("작업을 삭제하시겠습니까?\n삭제하면 데이터는 복구할 수 없습니다.")
//   ) {
//     fetch(`/api/todo/delete/${TODO_DETAIL.todo_idx}`, {
//       method: "POST",
//       data: {
//         todo_idx: TODO_DETAIL.todo_idx
//       }
//     })
//       .then((response) => response.json())
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         alert("통신에 실패하였습니다.");
//         console.log(error);
//       });
//   }
// }
