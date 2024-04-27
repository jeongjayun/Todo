const searchForm = document.getElementById("search-form");
const searchInput = document.querySelector(".search-div input");

searchForm.addEventListener("submit", handleToDoSearch);

function handleToDoSearch(event) {
  event.preventDefault(); //새로고침 막기

  const search = searchInput.value;
  if (searchInput.value === "") {
    alert("검색어가 없습니다");
    return false;
  }

  searchInput.value = ""; //input 초기화

  //스위치변경//
  isTdy = false;
  isImp = false;
  isCmplt = false;
  isScheduled = false;
  isNotCmplt = false;
  isSearch = true;

  onLoadList();

  const SearchObj = {
    todo_title: search,
    user_id: loginUserId,
  };

  fetch("/api/todo/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(SearchObj)
  })
    .then((response) => response.json())
    .then((response) => {
      let toDos = [];
      toDos = response;

      // 이전에 추가된 searchNodata 요소 제거
      const existingSearchNodata = document.querySelector(".search-no-data");
      if (existingSearchNodata) {
        existingSearchNodata.remove();
      }

      if (toDos.length > 0) {
        toDos.forEach(addTodo);
      } else {
        const searchNodata = document.createElement("div");
        searchNodata.innerText = "검색 결과가 없습니다.";
        searchNodata.className = "search-no-data";
        const listMain = document.querySelector(".list-main");
        listMain.append(searchNodata);
      }

      cmpltListDiv.classList.add("hidden");
    })
    .catch((error) => {
      alert("저장에 실패하였습니다.");
      console.log(error);
    });

}