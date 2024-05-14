package com.eco.todo;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.eco.todo.users.form.UserJoinForm;
import com.eco.todo.users.form.UserLoginForm;

@Controller // 페이지 이동 시 사용하는 컨트롤러
public class PageController {

	@GetMapping("/")
	public String indexPage(Authentication authentication) {
		if (authentication != null && authentication.isAuthenticated()) {
			return "redirect:/list"; // 로그인 상태라면 list 화면으로
		} else {
			return "index"; // 아니면 index 페이지
		}
	}

	@GetMapping("/join")
	public String joinPage(UserJoinForm userJoinForm) {
		return "join_form"; // 회원가입 페이지
	}

	@GetMapping("/login")
	public String loginPage(UserLoginForm userLoginForm) {
		return "login_form"; // 로그인 페이지
	}

	@GetMapping("/list")
	public String listPage(Authentication authentication) {
		String user_id = authentication.getName(); // 로그인해야만 list 페이지로 이동
		return "todo_list";
	}

	@GetMapping("/settings")
	public String settingPage() { // 로그인 상태여야 설정 페이지로 이동 
		return "settings";
	}
}
