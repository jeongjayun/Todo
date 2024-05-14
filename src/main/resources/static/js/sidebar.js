// 사이드바에서 메뉴 상태 변경 버튼 누르면 main_container의 상태 변경하도록
window.addEventListener("load", function () {
  this.document.querySelector(".toggle").addEventListener("click", function () {
    document.querySelector(".wrap").classList.toggle("collapse");
  });
});

// sidebar > todo-title
const compltChk = document.querySelector(".todo-title input");
const todoTitleTextarea = document.querySelector(".todo-title textarea");
const impBtn = document.querySelector(".todo-title button");

// sidebar > today-btn-div
const todayBtn = document.querySelector(".today-btn-div button");

// sidebar > todo-memo
const todoMemoTextarea = document.querySelector(".todo-memo textarea");

// sidebar > dropdown
const menuList = document.querySelector(".dropdown-menu");
const dropdownBtn = document.querySelector(".dropdown-toggle");

const dropdownToday = document.querySelector(".dropdown-menu .tdy");
const dropdownTommorrow = document.querySelector(".dropdown-menu .tommorow");
const dropdownNextweek = document.querySelector(".dropdown-menu .nextweek");
const dropdownSelect = document.querySelector(".dropdown-menu .selectCal");
const datePicker = document.getElementById("datepicker");
const dateResetBtn = document.querySelector(".dropdown-menu .date-reset-btn");

// sidebar > todo-data
const todoData = document.querySelector(".todo-data p");

// sidebar > bottom
const createdData = document.querySelector(".sidebar-bottom span");
const delBtn = document.querySelector(".sidebar-bottom button");

compltChk.addEventListener("click", changeCompltChk);
impBtn.addEventListener("click", changeImpBtn);
todayBtn.addEventListener("click", changeTdyBtn);
delBtn.addEventListener("click", deleteTodo);

dropdownToday.addEventListener("click", function () {
  const formatDate = changeDdln("today");
  dropdownBtn.innerText = formatDate;
  updateDdln(formatDate);

  menuList.classList.remove("show");
});

dropdownTommorrow.addEventListener("click", function () {
  const formatDate = changeDdln("tommorrow");
  dropdownBtn.innerText = formatDate;
  updateDdln(formatDate);

  menuList.classList.remove("show");
});

dropdownNextweek.addEventListener("click", function () {
  const formatDate = changeDdln("nextWeek");
  dropdownBtn.innerText = formatDate;
  updateDdln(formatDate);

  menuList.classList.remove("show");
});

dropdownSelect.addEventListener("click", function () {
  datePicker.classList.toggle("hidden");
});

datePicker.addEventListener("blur", function () {
  menuList.classList.remove("show");
});

//엔터키 이벤트 적용
todoTitleTextarea.onkeydown = function (event) {
  let updateTitle = todoTitleTextarea.value;

  todoObj = getTodoObj(todoTitleTextarea);
  todoObj.todo_title = updateTitle;
  mykeydown(event, todoObj);
};

todoMemoTextarea.onkeydown = function (event) {
  let updateMemo = todoMemoTextarea.value;

  todoObj = getTodoObj(todoMemoTextarea);
  todoObj.todo_memo = updateMemo;
  mykeydown(event, todoObj);
};

// 메세지창 길이
todoMemoTextarea.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

// dropdownBtn 클릭하면 menuList 나오고 사라진다.
dropdownBtn.addEventListener("click", function () {
  menuList.classList.toggle("show");
});

dateResetBtn.addEventListener("click", function () {
  menuList.classList.remove("show");
  dropdownBtn.innerText = "기간 선택";
  formatDate = "";
  updateDdln(formatDate);
});

$(document).ready(function () {
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
    beforeShow: function () {
      setTimeout(function () {
        $(".ui-datepicker").css("z-index", 99999999999999);
      }, 0);
    },
    onSelect: function (dateString) {
      updateDdln(dateString);
      dropdownBtn.innerText = dateString;
    }
  });

  $("#datepicker").datepicker("setDate", "today"); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
});

// 나의 하루에 추가
function changeTdyBtn() {
  filters = getFilters(todayBtn);

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
}

function changeCompltChk() {
  filters = getFilters(compltChk);

  if (compltChk.checked) {
    filters.fil_cmplt = "1";
  } else {
    filters.fil_cmplt = "0";
  }

  changeFilter(filters);
}

function changeImpBtn() {
  filters = getFilters(impBtn);

  if (impBtn.value == "imp") {
    //imp 중요 속성이면
    filters.fil_imp = "0"; //중요 취소
    impBtn.value = ""; //속성 없애기
    impBtn.innerHTML = `<i class="fa fa-star-o"></i>`;
  } else {
    //imp 중요속성이 아니면
    filters.fil_imp = "1"; //중요로 변경
    impBtn.value = "imp"; //속성 추가
    impBtn.innerHTML = `<i class="fa fa-star"></i>`;
  }

  changeFilter(filters);
}

function getFilters(object) {
  const filters = {
    todo_idx: object.id,
    user_id: loginUserId
  };
  return filters;
}

function getTodoObj(object) {
  const todoObj = {
    todo_idx: object.id,
    user_id: loginUserId
  };
  return todoObj;
}
//사이드바에 데이터 불러오기
function loadTodoDetail(todoIdx) {
  fetch(`/api/todo/${todoIdx}`)
    .then((response) => response.json())
    .then((response) => {
      const TODO_DETAIL = response.result;

      // 각 요소 별 id에 todo_idx값 넣어주기
      compltChk.id = TODO_DETAIL.todo_idx;
      todoTitleTextarea.id = TODO_DETAIL.todo_idx;
      impBtn.id = TODO_DETAIL.todo_idx;
      todayBtn.id = TODO_DETAIL.todo_idx;
      todoMemoTextarea.id = TODO_DETAIL.todo_idx;
      dropdownBtn.id = TODO_DETAIL.todo_idx;
      delBtn.id = TODO_DETAIL.todo_idx;

      // 완료 체크유무
      if (TODO_DETAIL.fil_cmplt == "1") {
        compltChk.checked = true;
        todoTitleTextarea.style = "text-decoration:line-through;";
      } else {
        compltChk.checked = false;
        todoTitleTextarea.style = "";
      }

      // 투두 할일 내용
      todoTitleTextarea.textContent = TODO_DETAIL.todo_title;

      // 투두 중요여부
      if (TODO_DETAIL.fil_imp == "1") {
        //imp 중요 속성이면
        impBtn.innerHTML = `<i class="fa fa-star"></i>`;
      } else {
        //imp 중요속성이 아니면
        impBtn.innerHTML = `<i class="fa fa-star-o"></i>`;
      }

      //나의 하루에 추가여부
      if (TODO_DETAIL.fil_tdy == "1") {
        todayBtn.innerText = "나의 하루에 추가 됨";
        todayBtn.value = "tdy";
      } else {
        todayBtn.innerText = "나의 하루에 추가";
        todayBtn.value = "";
      }

      // 마감일이 있으면
      if (TODO_DETAIL.todo_ddln > "0") {
        dropdownBtn.innerText = TODO_DETAIL.todo_ddln;
      }

      //메모 여부
      todoMemoTextarea.textContent = TODO_DETAIL.todo_memo;

      //수정시간이 있으면
      if (TODO_DETAIL.updated_time != null) {
        todoData.innerText = `${elapsedTime(TODO_DETAIL.updated_time)} 수정됨.`;
      }

      //삭제가 되었으면
      if (TODO_DETAIL.fil_dlt == "1") {
        todoData.innerText = `${elapsedTime(
          TODO_DETAIL.deleted_time
        )}에 삭제됨.`;
      }

      //작성시간
      createdData.innerText = `${elapsedTime(
        TODO_DETAIL.created_time
      )} 작성됨.`;
    })
    .catch((error) => {
      console.log(error);
    });
}

// 현재 시간과 입력된 시간을 비교
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

// 기한 변경 함수
function changeDdln(option) {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // 날짜 포맷팅
  if (option === "today") {
    // 그대로 유지
  } else if (option === "tommorrow") {
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
      onLoadList();
      loadTodoDetail(requestData.todo_idx);
    })
    .catch((error) => {
      alert("실패");
      console.log(error);
    });
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
        todoTitleTextarea.blur();
        todoMemoTextarea.blur();

        onLoadList();
        loadTodoDetail(todoObj.todo_idx);
      })
      .catch((error) => {
        alert("변경에 실패하였습니다.");
        console.log(error);
      });
  }
}

// 할 일 삭제
function deleteTodo() {
  if (
    confirm("작업을 삭제하시겠습니까?\n삭제하면 데이터는 복구할 수 없습니다.")
  ) {
    fetch(`/api/todo/delete/${delBtn.id}`, {
      headers: { "Content-Type": "application/json" },
      method: "POST"
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        alert("삭제되었습니다.");
        loadTodoDetail(delBtn.id);
        onLoadList();
        document.querySelector(".wrap").classList.toggle("collapse");
      })
      .catch((error) => {
        alert("통신에 실패하였습니다.");
        console.log(error);
      });
  }
}
