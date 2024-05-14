// 회원 가입 시 유효성 검사 변수
let idOk = false;
let pwOk = false;
let nmOk = false;

let msg;

// 아이디 입력, 메세지, 중복확인 버튼
const idChkMsg = document.getElementById("id-chk-msg");
const idInput = document.getElementById("user_id");
const idDplCkBtn = document.getElementById("id-duplication-btn");

// 비밀번호, 비밀번호 확인 메세지
const pwInput1 = document.getElementById("user_pw");
const pwInput2 = document.getElementById("user_pw2");
const pwChkMsg = document.getElementById("pw-chk-msg");
const pwChk2Msg = document.getElementById("pw-chk2-msg");

// 이름입력값
const nmInput = document.getElementById("user_nm");
const nmChkMsg = document.getElementById("nm-chk-msg");

//등록 버튼
const form = document.querySelector("form");
const submitBtn = document.getElementById("submit-btn");

// 아이디 검증
idInput.addEventListener("change", function () {
  if (idInput.value.length < 3) {
    idChkMsg.textContent = `아이디는 최소 3글자부터 20자까지 가능합니다.`;
    idInput.focus();
    idDplCkBtn.disabled = true; //비활성화
  } else {
    idDplCkBtn.disabled = false; //활성화
  }
});

// 아이디 중복검사
idDplCkBtn.addEventListener("click", onIdDplChk);

// 비밀번호 검증
pwInput1.addEventListener("change", onPwChk);
pwInput2.addEventListener("change", onPwDblChk);

// 이름 입력확인
nmInput.addEventListener("change", function () {
  if (nmInput.value.length > 10 || nmInput.value.length <= "1") {
    nmChkMsg.textContent = `이름은 2~10자리여야 합니다.`;
    nmInput.focus();
  } else {
    nmOk = true;
    nmChkMsg.textContent = ``;
  }
});

// 가입 버튼
submitBtn.addEventListener("click", onSubmit);

// 아이디 중복검사 함수
function onIdDplChk(event) {
  event.preventDefault();
  fetch(`/api/user/chkId?id=${idInput.value}`)
    .then((response) => response.json())
    .then((response) => {
      console.log("onIdDplChk", response);
      let idDplResult = Object.values(response); //자바에서 반환된 결과값

      if (idDplResult > 0) {
        idChkMsg.textContent = `이미 중복된 아이디 입니다.`;
        idInput.focus();
      } else if (idDplResult == 0) {
        idChkMsg.textContent = `사용 가능한 아이디 입니다.`;
        idOk = true;
      } else {
        idChkMsg.textContent = `입력된 아이디가 없습니다.`;
        idInput.focus();
      }
    })
    .catch((error) => console.log(error));
}

// 비밀번호 입력 메서드
function onPwChk() {
  if (pwInput1.value.length < 8) {
    msg = "비밀번호는 최소 8글자여야 합니다.";
    pwChkMsg.textContent = msg;
    pwInput1.focus();
  } else {
    msg = "";
    pwChkMsg.textContent = msg;
  }
}

// 비밀번호 입력 확인 메서드
function onPwDblChk() {
  if (pwInput1.value != pwInput2.value) {
    msg = "비밀번호가 일치하지 않습니다.";
    pwChk2Msg.textContent = msg;
    pwInput2.focus();
  } else {
    // 일치하면 pwOk
    pwOk = true;
    msg = "";
    pwChk2Msg.textContent = msg;
  }
}

function onSubmit(event) {
  event.preventDefault();
  // 가입 전 유효성 검사

  if (idOk && pwOk && nmOk) {
    form.submit();
    alert("회원가입이 완료되었습니다.");
  } else {
    if (idOk == false) {
      idInput.classList.add("error");

      if (idInput.value == "") {
        idChkMsg.textContent = `아이디가 입력되지 않았습니다.`;
      }
    }

    if (pwOk == false) {
      if (pwInput1.value.length == "" && pwInput2.value.length == "") {
        pwChkMsg.textContent = `비밀번호가 입력되지 않았습니다.`;
      }
      pwInput2.classList.add("error");
      pwInput1.classList.add("error");

      pwChk2Msg.textContent = `비밀번호를 확인해주세요.`;
    }

    if (nmOk == false) {
      nmInput.classList.add("error");
      nmChkMsg.textContent = `이름을 확인해주세요.`;
    }

    return false;
  }
}
