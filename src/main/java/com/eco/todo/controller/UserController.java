package com.eco.todo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.eco.todo.form.UserJoinForm;
import com.eco.todo.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class UserController {

	private final UserService service;
	private static Logger logger = LoggerFactory.getLogger("UserController.class");

	@PostMapping("/join")
	public String postJoin(@Valid @ModelAttribute("userJoinForm") UserJoinForm userJoinForm,
			BindingResult bindingResult, Model model) {

		// 아이디 중복검사
		int idChk = service.chkUserId(userJoinForm.getUser_id());

		if (idChk != 0) {
			bindingResult.rejectValue("user_id", "idDuplicate", "이미 사용 중인 아이디 입니다.");
			return "join_form";
		}

		// 비밀번호 확인
		if (!userJoinForm.getUser_pw().equals(userJoinForm.getUser_pw2())) {
			bindingResult.rejectValue("user_pw2", "passwordInCorrect", "2개의 패스워드가 일치하지 않습니다.");
			return "join_form";
		}

		// 검증 실패 시 입력폼으로 되돌아가기
		if (bindingResult.hasErrors()) {
			logger.info("Errors = {}", bindingResult);
			return "join_form";
		}

		service.join(userJoinForm.getUser_id(), userJoinForm.getUser_pw(), userJoinForm.getUser_nm()); // 회원가입 로직 실행
		return "redirect:/";
	}

}
