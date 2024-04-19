// 회원 가입 시 유효성 검사 변수
let idOk = false;
let pwOk = false;
let nmOk = false;

//아이디 중복확인
const idDplCkBtn = document.getElementById("id-duplication-btn");
const idChkMsg = document.querySelector("#userIdDiv span");
const idInput = document.getElementById("user_id");

idDplCkBtn.addEventListener("click", onIdDplChk);

function onIdDplChk(event) {
  event.preventDefault();

  fetch(`/api/user/chkId/${idInput.value}`)
    .then((response) => response.json())
    .then((response) => {
      idChkMsg.innerText = `${Object.values(response)}`;

      if (idChkMsg.innerText === "사용 가능한 아이디입니다.") {
        idOk = true;
      } else {
        idInput.focus();
      }
      // TODO : 이후 중복되는 값 입력 후 버튼 클릭 시 true 가 되버림
    });
}

//비밀번호 확인
const pwInput1 = document.getElementById("user_pw");
const pwInput2 = document.getElementById("user_pw2");

let msg;
const pw1ChkMsg = document.querySelector("#userPw1Div span");
const pw2ChkMsg = document.querySelector("#userPw2Div span");

pwInput2.addEventListener("change", onPwDblCk);

function onPwDblCk(event) {
  if (pwInput1.value != pwInput2.value) {
    msg = "비밀번호가 일치하지 않습니다.";
    pw2ChkMsg.innerText = msg;
    pwInput2.focus();
  } else {
    pwOk = true;
    msg = "";
    pw2ChkMsg.innerText = msg;
  }
}

const nmInput = document.getElementById("user_nm");

//등록 버튼
const joinBtn = document.getElementById("join_btn");

joinBtn.addEventListener("click", onJoin);

function onJoin(event) {
  event.preventDefault();
  // 가입 전 유효성 검사

  if (nmInput.value.length > 0) {
    nmOk = true;
  }

  console.log(idOk);
  console.log(pwOk);
  console.log(nmOk);

  if (idOk && pwOk && nmOk) {
    alert("pass");

    fetch("/api/user/join", {
      method: "POST",
      headers: {
        "Content-Tpe": "application/json"
      },
      body: JSON.stringify({
        user_id: `${idInput.value}`,
        user_pw: `${pwInput1.value}`,
        user_nm: `${nmInput.value}`
      })
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
    // 전부 pass일 때 fetch 로 회원가입
  } else {
    if (idOk == false) {
      idInput.classList.add("error");
    }

    if (pwOk == false) {
      pwInput1.classList.add("error");
      pwInput2.classList.add("error");
    }

    if (nmOk == false) {
      nmInput.classList.add("error");
    }
    return false;
  }
}
