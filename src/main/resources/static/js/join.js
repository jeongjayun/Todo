
// 회원 가입 시 유효성 검사 변수
let idOk = false;
let pwOk = false;
let nmOk = false;

//아이디 확인
const idChkMsg = document.getElementById("id-chk-msg");
const idInput = document.getElementById("user_id");
const idDplCkBtn = document.getElementById("id-duplication-btn");

//아이디 확인
idInput.addEventListener("change", function () {
  if (idInput.value.length < 3) {
    idChkMsg.textContent = `아이디는 최소 3글자부터 20자까지 가능합니다.`;
    idInput.focus();
    idDplCkBtn.disabled = true; //비활성화
  } else {
    idDplCkBtn.disabled = false; //활성화
  }
});

//중복 확인
idDplCkBtn.addEventListener("click", onIdDplChk);

function onIdDplChk(event) {
  event.preventDefault();

  fetch(`/api/join/chkId/${idInput.value}`)
    .then((response) => response.json())
    .then((response) => {
      let idDplResult = Object.values(response);

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

//비밀번호 확인
const pwInput1 = document.getElementById("user_pw");
const pwInput2 = document.getElementById("user_pw2");

let msg;
const pwChkMsg = document.getElementById("pw-chk-msg");
const pwChk2Msg = document.getElementById("pw-chk2-msg");

pwInput1.addEventListener("change", onPwChk);

function onPwChk(event) {
  if (pwInput1.value.length < 8) {
    msg = "비밀번호는 최소 8글자여야 합니다.";
    pwChkMsg.textContent = msg;
    pwInput1.focus();
  }
}

pwInput2.addEventListener("change", onPwDblChk);

function onPwDblChk(event) {
  if (pwInput1.value != pwInput2.value) {
    msg = "비밀번호가 일치하지 않습니다.";
    pwChk2Msg.textContent = msg;
    pwInput2.focus();
  } else {
    pwOk = true;
    msg = "";
    pwChk2Msg.textContent = msg;
  }
}

const nmInput = document.getElementById("user_nm");

//등록 버튼
const submitBtn = document.getElementById("submit-btn");
const nmChkMsg = document.getElementById("nm-chk-msg");
const form = document.querySelector("form");
const formBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  // 가입 전 유효성 검사

  console.log(idOk);
  console.log(pwOk);
  console.log(nmOk);

  if (nmInput.value.length > 0) {
    nmOk = true;
  }

  if (idOk && pwOk && nmOk) {
    console.log("pass");
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