package com.eco.todo.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
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
	public String postJoin(@Valid UserJoinForm userJoinForm, BindingResult bindingResult) {
		
		//검증하기
		if(!userJoinForm.getUser_pw().equals(userJoinForm.getUser_pw2())) {
			bindingResult.rejectValue("user_pw2","passwordInCorrect", "2개의 패스워드가 일치하지 않습니다.");
			return "join_form";
		}
		
		//검증 실패 시 입력폼으로 되돌아가기 
		if(bindingResult.hasErrors()) {
			logger.info("Errors = {}", bindingResult);
			return "join_form";
		}
		
		service.join(userJoinForm.getUser_id(), userJoinForm.getUser_pw(), userJoinForm.getUser_nm()); //회원가입 로직 실행
		
		return "redirect:/";
	}

}
