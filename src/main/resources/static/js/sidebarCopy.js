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

// sidebar > todo-data
const todoData = document.querySelector(".todo-data p");

// sidebar > bottom
const createdData = document.querySelector(".sidebar-bottom span");
const delBtn = document.querySelector(".sidebar-bottom button");

function changeImpBtn(TODO_DETAIL) {
  const filters = {
    //filter 기본값
    todo_idx: TODO_DETAIL.todo_idx,
    user_id: loginUserId
  };

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
}

// 메세지창 길이
todoMemoTextarea.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

// dropdownBtn 클릭하면 menuList 나오고 사라진다.
dropdownBtn.addEventListener("click", function () {
  menuList.classList.toggle("show");
});

dropdownBtn.addEventListener("blur", function () {
  alert("click");
  menuList.classList.remove("show");
});

///////////////////////////////////////////////////////////////////////////////////

//사이드바에 데이터 불러오기
function loadTodoDetail(todoIdx) {
  fetch(`/api/todo/${todoIdx}`)
    .then((response) => response.json())
    .then((response) => {
      const TODO_DETAIL = response.result;
      if (TODO_DETAIL.fil_cmplt == "1") {
        compltChk.checked = true;
        todoTitleTextarea.style = "text-decoration:line-through;";
      } else {
        compltChk.checked = false;
        todoTitleTextarea.style = "";
      }

      todoTitleTextarea.textContent = TODO_DETAIL.todo_title;

      if (TODO_DETAIL.fil_imp == "1") {
        //imp 중요 속성이면
        impBtn.innerHTML = `<i class="fas fa-star"></i>`;
      } else {
        //imp 중요속성이 아니면
        impBtn.innerHTML = `<i class="fab fa-star"></i>`;
      }

      if (TODO_DETAIL.fil_tdy == "1") {
        todayBtn.innerText = "나의 하루에 추가 됨";
        todayBtn.value = "tdy";
      } else {
        todayBtn.innerText = "나의 하루에 추가";
        todayBtn.value = "";
      }

      todoMemoTextarea.textContent = TODO_DETAIL.todo_memo;

      if (TODO_DETAIL.updated_time != null) {
        todoData.innerText = `${elapsedTime(TODO_DETAIL.updated_time)} 수정됨.`;
      }

      if (TODO_DETAIL.fil_dlt == "1") {
        todoData.innerText = `${elapsedTime(
          TODO_DETAIL.deleted_time
        )}에 삭제됨.`;
      }

      createdData.innerText = `${elapsedTime(
        TODO_DETAIL.created_time
      )} 작성됨.`;
    })
    .catch((error) => {
      console.log(error);
    });
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
      })
      .catch((error) => {
        alert("변경에 실패하였습니다.");
        console.log(error);
      });
  }
}
