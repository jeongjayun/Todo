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

import com.eco.todo.dto.Filters;
import com.eco.todo.dto.TodoAndFilter;
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
	public ResponseEntity<Map<String, Object>> saveTodo(@RequestBody TodoAndFilter todoAndFilter) {
		logger.info("ApiController. 할 일 저장");
		
		System.out.println(todoAndFilter);

		Map<String, Object> result = todoService.saveTodo(todoAndFilter);

		System.out.println(result);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/todo/tdyList")
	public ResponseEntity<List<TodoAndFilter>> filterTdy(Authentication authentication) {
		logger.info("ApiController. 오늘 할 일 불러오기");

		String user_id = authentication.getName();
		List<TodoAndFilter> list = todoService.filterTdy(user_id);

		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping("/todo/impList")
	public ResponseEntity<List<TodoAndFilter>> filterImp(Authentication authentication) {
		logger.info("ApiController. 중요한 일 불러오기");

		String user_id = authentication.getName();
		List<TodoAndFilter> list = todoService.filterImp(user_id);

		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping("/todo/cmpltList")
	public ResponseEntity<List<TodoAndFilter>> filterCmplt(Authentication authentication) {
		logger.info("ApiController. 완료된 일 불러오기");

		String user_id = authentication.getName();
		List<TodoAndFilter> list = todoService.filterCmplt(user_id);

		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@GetMapping("/todo/NotCmpltList")
	public ResponseEntity<List<TodoAndFilter>> filterNotCmplt(Authentication authentication) {
		logger.info("ApiController. 작업 불러오기");

		String user_id = authentication.getName();
		List<TodoAndFilter> list = todoService.filterNotCmplt(user_id);

		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@PostMapping("/todo/filterUpdate")
	public ResponseEntity<Map<String, Object>> updateFilters(@RequestBody Filters filters) {
		System.out.println(filters);

		Map<String, Object> responseData = new HashMap<>();
		int result = todoService.updateFilters(filters);

		String message;
		if (result > 0) {
			message = "변경에 성공했습니다.";
		} else {
			message = "변경에 실패했습니다.";
		}
		responseData.put("result", message);

		return new ResponseEntity<>(responseData, HttpStatus.OK);

	}

}