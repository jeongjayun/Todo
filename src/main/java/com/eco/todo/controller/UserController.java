package com.eco.todo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eco.todo.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
	private static Logger logger = LoggerFactory.getLogger("UserController.class");
	private final UserService userService;
		
	@PostMapping("/join")
	public String postJoin(String user_id, String user_pw, String user_nm) {
		logger.info("postJoin");
		userService.join(user_id, user_pw, user_nm);
		return "ok";
	}

}