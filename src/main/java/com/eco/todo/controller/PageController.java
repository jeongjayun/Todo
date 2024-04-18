package com.eco.todo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
	@GetMapping("/")
	public String indexPage() {
		return "index";
	}
	
	@GetMapping("/join")
	public String joinPage() {
		return "join_form";
	}
	
	@GetMapping("/login")
	public String loginPage() {
		return "login_form";
	}
}
