package com.eco.todo.controller;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.eco.todo.form.UserJoinForm;
import com.eco.todo.form.UserLoginForm;

@Controller // 페이지 이동 시 사용하는 컨트롤러 
public class PageController {
	@GetMapping("/")
	public String indexPage() {
		return "index";
	}
	
	@GetMapping("/join")
	public String joinPage(UserJoinForm userJoinForm) {
		return "join_form";
	}
	
	@GetMapping("/login")
	public String loginPage(UserLoginForm userLoginForm) {
		return "login_form";
	}
	
	@GetMapping("/list")
	public String listPage(Authentication authentication) {
		if(authentication !=null&&authentication.isAuthenticated()) {
			 String user_id = authentication.getName();
		}
		return "todo_list";
	}
}
