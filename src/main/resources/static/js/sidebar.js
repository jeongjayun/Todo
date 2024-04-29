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

      //동적으로 사이드바 안의 내용들 생성하기
      addTodoTitle(TODO_DETAIL);
      addTodayBtn(TODO_DETAIL);
      addDdln(TODO_DETAIL);
      addMemo(TODO_DETAIL);
      addTodoData(TODO_DETAIL);
      addSidebarBottom(TODO_DETAIL);
    })
    .catch((error) => {
      alert("통신에 실패하였습니다.");
      console.log(error);
    });
}

// 동적으로 사이드바에 요소 만들기
//----- todo-title 영역 -----
function addTodoTitle(TODO_DETAIL) {
  delSidebarEl();
  //----- todo-title 상단영역 -----
  const todoTitle = document.querySelector(".todo-title");

  const cmpltChk = document.createElement("input");
  cmpltChk.setAttribute("type", "checkbox");

  const todoTitleTextarea = document.createElement("textarea");
  todoTitleTextarea.innerText = TODO_DETAIL.todo_title;
  todoTitleTextarea.id = TODO_DETAIL.todo_idx;

  const impBtn = document.createElement("button");
  impBtn.className = "imp-btn";
  impBtn.innerHTML = `<i class="fab fa-star"></i>`;
  impBtn.value = "";

  const filters = {
    //filter 기본값
    todo_idx: TODO_DETAIL.todo_idx,
    user_id: loginUserId
  };

  //중요표시 불러오기
  if (TODO_DETAIL.fil_imp == "1") {
    impBtn.innerHTML = `<i class="fas fa-star"></i>`;
    impBtn.value = "imp";
  } else {
    impBtn.innerHTML = `<i class="fab fa-star"></i>`;
    impBtn.value = "";
  }

  impBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (impBtn.value == "imp") {
      //imp 중요 속성이면
      filters.fil_imp = "0"; //중요 취소
      impBtn.value = ""; //속성 없애기
      impBtn.innerHTML = `<i class="fab fa-star"></i>`;
    } else {
      //imp 중요속성이 아니면
      filters.fil_imp = "1"; //중요로 변경
      impBtn.value = "imp"; //속성 추가
      impBtn.innerHTML = `<i class="fas fa-star"></i>`;
    }

    changeFilter(filters);
  });

  //완료된 작업 불러올 시 체크박스 체크
  if (TODO_DETAIL.fil_cmplt == "1") {
    cmpltChk.checked = true;
    todoTitleTextarea.style = "text-decoration:line-through;";
  } else {
    cmpltChk.checked = false;
    todoTitleTextarea.style = "none";
  }

  cmpltChk.addEventListener("click", function () {
    if (cmpltChk.checked) {
      filters.fil_cmplt = "1";
    } else {
      filters.fil_cmplt = "0";
    }

    console.log(filters);
    changeFilter(filters);
  });

  todoTitle.append(cmpltChk);
  todoTitle.append(todoTitleTextarea);
  todoTitle.append(impBtn);
}

//----- sidebar-main 영역 -----
function addTodayBtn(TODO_DETAIL) {
  //----- 나의 하루에 추가 -----
  const todayBtnDiv = document.querySelector(".today-btn-div");

  const todayBtn = document.createElement("button");
  todayBtn.innerText = "나의 하루에 추가";
  todayBtn.id = "add-tdy-btn";
  todayBtn.value = "";

  todayBtnDiv.append(todayBtn);

  if (TODO_DETAIL.fil_tdy == "1") {
    todayBtn.innerText = "나의 하루에 추가 됨";
    todayBtn.value = "tdy";
  } else {
    todayBtn.innerText = "나의 하루에 추가";
    todayBtn.value = "";
  }

  todayBtn.addEventListener("click", function () {
    const filters = {
      //filter 기본값
      todo_idx: TODO_DETAIL.todo_idx,
      user_id: loginUserId
    };

    if (todayBtn.value == "tdy") {
      //오늘 할 일이면
      filters.fil_tdy = "0"; //오늘 할 일 취소
      todayBtn.value = ""; //속성 없애기
      todayBtn.innerText = "나의 하루에 추가";
    } else {
      //오늘 할 일 아니면
      filters.fil_tdy = "1"; //오늘 할 일
      todayBtn.value = "tdy"; //속성 추가
      todayBtn.innerText = "나의 하루에 추가 됨";
    }

    changeFilter(filters);
  });
}

// ----- todo-ddln 드랍메뉴 만들기 -----
function addDdln(TODO_DETAIL) {
  //기한 선택
  //사이드바 기한 선택 요소들
  const todoDdln = document.querySelector(".todo-ddln");

  const dropdownForm = document.createElement("div");
  dropdownForm.className = "dropdown";

  const dropdownBtn = document.createElement("button");
  dropdownBtn.className = "dropdown-toggle";
  dropdownBtn.id = TODO_DETAIL.todo_idx;

  if (TODO_DETAIL.todo_ddln == null) {
    dropdownBtn.innerText = "기한 선택";
  } else {
    dropdownBtn.innerText = TODO_DETAIL.todo_ddln;
  }

  const menuList = document.createElement("ul");
  menuList.className = "dropdown-menu";

  // ----- dropdown 메뉴들 -----
  const dropdownToday = document.createElement("li"); //오늘
  dropdownToday.className = "dropdown-item";
  const optionBtnToday = document.createElement("button"); //오늘 선택 버튼
  optionBtnToday.innerText = "오늘";
  optionBtnToday.id = TODO_DETAIL.todo_idx;
  optionBtnToday.className = "dropdown-option";
  optionBtnToday.classList.add("tdy");
  dropdownToday.append(optionBtnToday);

  const dropdownTommorrow = document.createElement("li"); //내일
  dropdownTommorrow.className = "dropdown-item";
  const optionBtnTommorrow = document.createElement("button"); //내일 선택 버튼
  optionBtnTommorrow.innerText = "내일";
  optionBtnTommorrow.id = TODO_DETAIL.todo_idx;
  optionBtnTommorrow.className = "dropdown-option";
  optionBtnTommorrow.classList.add("tmrw");
  dropdownTommorrow.append(optionBtnTommorrow);

  const dropdownWeek = document.createElement("li"); //다음 주
  dropdownWeek.className = "dropdown-item";
  const optionBtnWeek = document.createElement("button"); //다음 주 선택 버튼
  optionBtnWeek.className = "dropdown-option";
  optionBtnWeek.classList.add("week");
  optionBtnWeek.id = TODO_DETAIL.todo_idx;
  optionBtnWeek.innerText = "다음 주";
  dropdownWeek.append(optionBtnWeek);

  const dropdownCalendar = document.createElement("li"); //날짜 선택
  dropdownCalendar.className = "dropdown-item";

  const optionBtnCal = document.createElement("button"); //다음 주 선택 버튼
  optionBtnCal.className = "dropdown-option";
  optionBtnCal.classList.add("calendar");
  optionBtnCal.id = TODO_DETAIL.todo_idx;
  optionBtnCal.innerText = "날짜 선택";
  dropdownCalendar.append(optionBtnCal);

  const datePicker = document.createElement("input");
  datePicker.setAttribute("type", "text");
  datePicker.id = "datepicker";
  datePicker.className = "hidden";
  dropdownCalendar.append(datePicker);

  menuList.append(dropdownToday); //ul에 li 붙이기
  menuList.append(dropdownTommorrow);
  menuList.append(dropdownWeek);
  menuList.append(dropdownCalendar);

  dropdownForm.append(dropdownBtn);
  dropdownForm.append(menuList);

  todoDdln.append(dropdownForm); //드랍다운 추가
  todoDdln.append(datePicker);
  //초기값을 오늘 날짜로 설정
}

$(document).ready(function () {
  $(document).on("click", ".calendar", function () {
    let todo_idx = $(this)
      .closest(".dropdown")
      .find(".dropdown-toggle")
      .attr("id");
    console.log(todo_idx);

    $("#datepicker").datepicker({
      dateFormat: "yy-mm-dd", //달력 날짜 형태
      showOtherMonths: true, //빈 공간에 현재월의 앞뒤월의 날짜를 표시
      showMonthAfterYear: true, // 월- 년 순서가아닌 년도 - 월 순서
      changeYear: true, //option값 년 선택 가능
      changeMonth: true, //option값  월 선택 가능
      showOn: "both", //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
      buttonImage:
        "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif", //버튼 이미지 경로
      buttonImageOnly: true, //버튼 이미지만 깔끔하게 보이게함
      buttonText: "선택", //버튼 호버 텍스트
      yearSuffix: "년", //달력의 년도 부분 뒤 텍스트
      monthNamesShort: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월"
      ], //달력의 월 부분 텍스트
      monthNames: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월"
      ], //달력의 월 부분 Tooltip
      dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"], //달력의 요일 텍스트
      dayNames: [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일"
      ], //달력의 요일 Tooltip
      minDate: "-5Y", //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
      maxDate: "+5y", //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)

      onSelect: function (dateString) {
        console.log(dateString);
        $.ajax({
          type: "POST",
          url: "api/todo/update",
          async: true,
          headers: {
            "Content-Type": "application/json"
          },
          dataType: "json",
          data: JSON.stringify({
            todo_idx: todo_idx, // 클릭된 .calendar 요소에 연결된 .dropdown-toggle 버튼의 id 사용
            todo_ddln: dateString,
            user_id: loginUserId
          }),
          success: function (result) {
            console.log(result);
            onLoadList();
            loadTodoDetail(filters.todo_idx);
          },
          error: function (error) {
            alert("실패");
            console.log(error);
          }
        });
      }
    });

    $("#datepicker").datepicker("setDate", "today"); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
  });
});

// ----- memo -----
function addMemo(TODO_DETAIL) {
  const todoMemo = document.querySelector(".todo-memo");
  const memoTextarea = document.createElement("textarea");
  memoTextarea.className = "memo-textarea";
  memoTextarea.innerText = TODO_DETAIL.todo_memo;
  memoTextarea.id = TODO_DETAIL.todo_idx;
  memoTextarea.placeholder = "메모를 입력하세요.";

  // textarea의 높이를 자동으로 조절하는 이벤트 핸들러 추가
  memoTextarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });

  todoMemo.append(memoTextarea);
}

// ----- 수정시간 정보 -----
function addTodoData(TODO_DETAIL) {
  const todoMemo = document.querySelector(".todo-data");
  const dataP = document.createElement("p");

  if (TODO_DETAIL.fil_dlt == "1") {
    dataP.innerText = `${elapsedTime(TODO_DETAIL.deleted_time)}에 삭제됨.`;
  } else if (TODO_DETAIL.updated_time != null) {
    dataP.innerText = `${elapsedTime(TODO_DETAIL.updated_time)} 수정됨.`;
  }

  todoMemo.append(dataP);
}

// ----- sidebar-bottom 영역 -----
function addSidebarBottom(TODO_DETAIL) {
  const sidebarBottom = document.querySelector(".sidebar-bottom");

  const createdTime = document.createElement("div");
  createdTime.innerText = `${elapsedTime(TODO_DETAIL.created_time)} 작성됨.`;

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  deleteBtn.className = "button";
  deleteBtn.id = TODO_DETAIL.todo_idx;

  sidebarBottom.append(createdTime);
  sidebarBottom.append(deleteBtn);
}

const elapsedTime = (date) => {
  const start = new Date(date);
  const end = new Date();

  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (seconds < 60) {
    return "방금 전";
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return `${Math.floor(minutes)}분 전`;
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return `${Math.floor(hours)}시간 전`;
  }

  const days = hours / 24;
  if (days < 7) {
    return `${Math.floor(days)}일 전`;
  }

  return `${start.toLocaleDateString()}`;
};

// 동적으로 그린 사이드바 요소에 이벤트 할당
// ----- 텍스트박스 -----
document.querySelector(".todo-title").addEventListener("click", function () {
  const todoTitleTextarea = document.querySelector("textarea");
  todoTitleTextarea.onkeyup = function (event) {
    let updateTitle = todoTitleTextarea.value;

    const todoObj = {
      todo_idx: todoTitleTextarea.id,
      user_id: loginUserId,
      todo_title: updateTitle
    };
    mykeydown(event, todoObj);
  };
});

// ----- 메모박스 -----
document
  .querySelector("form .todo-memo")
  .addEventListener("click", function () {
    const todoMemoTextarea = document.querySelector(".memo-textarea");

    todoMemoTextarea.onkeydown = function (event) {
      let updateMemo = todoMemoTextarea.value;

      const todoObj = {
        todo_idx: todoMemoTextarea.id,
        user_id: loginUserId,
        todo_memo: updateMemo
      };
      mykeydown(event, todoObj);
    };
  });

// ----- 기한 선택 -----
document.querySelector(".todo-ddln").addEventListener("click", function () {
  const menuList = document.querySelector(".dropdown-menu");
  const dropdownBtn = document.querySelector(".dropdown-toggle");
  // dropdownBtn 클릭하면 menuList 나오고 사라진다.
  dropdownBtn.addEventListener("click", function () {
    menuList.classList.toggle("show");
  });

  dropdownBtn.addEventListener("blur", function () {
    menuList.classList.remove("show");
  });

  const tdyBtn = document.querySelector(".tdy");
  const tmrwBtn = document.querySelector(".tmrw");
  const weekBtn = document.querySelector(".week");
  const calBtn = document.querySelector(".calendar");

  // 오늘, 내일, 다음 주, 날짜선택 버튼 클릭 이벤트 핸들러
  tdyBtn.addEventListener("click", function () {
    const formatDate = changeDdln("today");
    dropdownBtn.innerText = formatDate;
    updateDdln(formatDate);
  });

  tmrwBtn.addEventListener("click", function () {
    const formatDate = changeDdln("tomorrow");
    dropdownBtn.innerText = formatDate;
    updateDdln(formatDate);
  });

  weekBtn.addEventListener("click", function () {
    const formatDate = changeDdln("nextWeek");
    dropdownBtn.innerText = formatDate;
    updateDdln(formatDate);
  });

  const datePicker = document.querySelector("#datepicker");

  calBtn.addEventListener("click", function () {
    dropdownBtn.innerText = "날짜 선택";
    datePicker.classList.remove("hidden");
  });

  // fetch 함수호출
  function updateDdln(formatDate) {
    let requestData = {
      todo_idx: dropdownBtn.id,
      todo_ddln: formatDate,
      user_id: loginUserId
    };

    fetch("/api/todo/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert("실패");
        console.log(error);
      });
  }
});

// 기한 변경 함수
function changeDdln(option) {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // 날짜 포맷팅
  if (option === "today") {
    // 그대로 유지
  } else if (option === "tomorrow") {
    day += 1;
  } else if (option === "nextWeek") {
    day += 7;
  }

  // 날짜가 현재 월을 벗어난 경우 처리
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) {
    day -= daysInMonth;
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  // 날짜를 yyyy-MM-dd 형식으로 반환
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

// ----- 삭제 버튼에 기능 추가 -----
document
  .querySelector(".sidebar-bottom")
  .addEventListener("click", function (event) {
    const deleteBtn = document.querySelector(".button");

    deleteBtn.addEventListener("click", function () {
      if (
        confirm(
          "작업을 삭제하시겠습니까?\n삭제하면 데이터는 복구할 수 없습니다."
        )
      ) {
        fetch(`/api/todo/delete/${deleteBtn.id}`, {
          headers: { "Content-Type": "application/json" },
          method: "POST"
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            alert("삭제되었습니다.");
          })
          .catch((error) => {
            alert("통신에 실패하였습니다.");
            console.log(error);
          });
      }
    });
  });

// 동적으로 그린 요소들 모두 삭제
function delSidebarEl() {
  const todoTitle = document.querySelector(".todo-title");
  while (todoTitle.firstChild) {
    todoTitle.removeChild(todoTitle.firstChild);
  }

  const todayBtnDiv = document.querySelector(".today-btn-div");
  while (todayBtnDiv.firstChild) {
    todayBtnDiv.removeChild(todayBtnDiv.firstChild);
  }

  const todoDdln = document.querySelector(".todo-ddln");
  while (todoDdln.firstChild) {
    todoDdln.removeChild(todoDdln.firstChild);
  }

  const todoMemo = document.querySelector(".todo-memo");
  while (todoMemo.firstChild) {
    todoMemo.removeChild(todoMemo.firstChild);
  }

  const todoData = document.querySelector(".todo-data");
  while (todoData.firstChild) {
    todoData.removeChild(todoData.firstChild);
  }

  const sidebarBottom = document.querySelector(".sidebar-bottom");
  while (sidebarBottom.firstChild) {
    sidebarBottom.removeChild(sidebarBottom.firstChild);
  }
}

// textarea 엔터키 이벤트
function mykeydown(event, todoObj) {
  if (event.keyCode == 13) {
    //enter 일 경우
    fetch("/api/todo/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoObj)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        //textarea focus blur
        const todoMemoTextarea = document.querySelector(".memo-textarea");
        const todoTitleTextarea = document.querySelector("textarea");
        todoTitleTextarea.blur();
        todoMemoTextarea.blur();
      })
      .catch((error) => {
        alert("변경에 실패하였습니다.");
        console.log(error);
      });
  }
}
