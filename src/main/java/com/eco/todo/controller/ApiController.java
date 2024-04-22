package com.eco.todo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eco.todo.dto.Todo;
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

		int result = userService.chkUserId(user_id); // 검색된 쿼리값
		responseData.put("아이디 검색 결과", result);

		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@PostMapping("/todo/save")
	public ResponseEntity<Map<String, Object>> saveTodo(@RequestBody Todo todo) {
		logger.info("ApiController. 할 일 저장");

		String user_id = todo.getUser_id();
		String todo_title = todo.getTodo_title();

		Map<String, Object> result = todoService.saveTodo(todo_title, user_id);
		
		System.out.println(result);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/todo/tdyList")
	public ResponseEntity<List<Todo>> filterTdy(Authentication authentication) {
		logger.info("ApiController. 오늘 할 일 불러오기");

		String user_id = authentication.getName();
		System.out.println(user_id);
		List<Todo> list = todoService.filterTdy(user_id);

		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping("/todo/impList")
	public ResponseEntity<List<Todo>> filterImp(Authentication authentication) {
		logger.info("ApiController. 중요한 일 불러오기");

		String user_id = authentication.getName();
		System.out.println(user_id);
		List<Todo> list = todoService.filterImp(user_id);

		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping("/todo/NotCmpltList")
	public ResponseEntity<List<Todo>> filterNotCmplt(Authentication authentication) {
		logger.info("ApiController. 중요한 일 불러오기");

		String user_id = authentication.getName();
		System.out.println(user_id);
		List<Todo> list = todoService.filterNotCmplt(user_id);

		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping("/todo/findMaxNum")
	public ResponseEntity<Map<String, Object>> findMaxNum() {
		// client에서 newTodoObj의 id값 구하기
		Map<String, Object> responseData = new HashMap<>();
		int max = todoService.findMaxNum();
		responseData.put("todo_idx", max);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

}