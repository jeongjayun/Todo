package com.eco.todo.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eco.todo.service.TodoService;
import com.eco.todo.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiController {
	private static Logger logger = LoggerFactory.getLogger("ApiController.class");
	private final UserService userService;
	private final TodoService todoService;

	@GetMapping("/join/chkId/{user_id}")
	public ResponseEntity<Map<String, Object>> chkUserId(@PathVariable("user_id") String user_id) {
		logger.info("ApiController. 회원가입");
		Map<String, Object> responseData = new HashMap<>();

		int result = userService.chkUserId(user_id); // 검색된 쿼리값에 따른 문구
		responseData.put("아이디 검색 결과", result);

		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@PostMapping("/todo/save")
	public void saveTodo(@RequestParam("todo_title") String todo_title, Authentication authentication) {
		logger.info("ApiController. 할 일 저장");
		
		String user_id = authentication.getName();
		todoService.saveTodo(todo_title, user_id);
	}

}