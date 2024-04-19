package com.eco.todo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.eco.todo.form.UserJoinForm;

@Controller
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
	public String loginPage() {
		return "login_form";
	}
}
