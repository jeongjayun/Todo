package com.eco.todo.controller;

import java.sql.Date;
import java.util.ArrayList;
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
import com.eco.todo.dto.Todo;
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

	@PostMapping("/todo/update")
	public ResponseEntity<Map<String, Object>> updateTodo(@RequestBody Todo todo) {

		System.out.println(todo);

		Map<String, Object> responseData = new HashMap<>();
		responseData = todoService.updateTodo(todo);

		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@PostMapping("/todo/filterUpdate")
	public ResponseEntity<Map<String, Object>> updateFilters(@RequestBody Filters filters) {
		System.out.println(filters);

		Map<String, Object> responseData = new HashMap<>();
		responseData = todoService.updateFilters(filters);

		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@PostMapping("/todo/delete/{todo_idx}")
	public ResponseEntity<Map<String, Object>> deleteTodo(@PathVariable("todo_idx") int todo_idx,
			Authentication authentication) {
		System.out.println(todo_idx);

		Map<String, Object> responseData = new HashMap<>();
		responseData = todoService.deleteTodo(todo_idx);

		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@GetMapping("/todo/{todo_idx}")
	public ResponseEntity<Map<String, Object>> getTodoDetail(@PathVariable("todo_idx") int todo_idx,
			Authentication authentication) {
		Map<String, Object> responseData = new HashMap<>();

		String user_id = authentication.getName();
		TodoAndFilter todoAndFilter = todoService.getTodoDetail(user_id, todo_idx);

		responseData.put("result", todoAndFilter);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@PostMapping("/todo/search")
	public ResponseEntity<List<TodoAndFilter>> searchTitle(@RequestBody TodoAndFilter todoAndFilter) {
		logger.info("ApiController. 검색하기");

		String user_id = todoAndFilter.getUser_id();
		String todo_title = todoAndFilter.getTodo_title();

		List<TodoAndFilter> list = todoService.search(user_id, todo_title);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	

	@GetMapping("/todo/scheduledList/{user_id}")
	public ResponseEntity<Map<String, List<TodoAndFilter>>> scheduledList(
			@PathVariable("user_id") String user_id) {

		Map<String, List<TodoAndFilter>> responseData = new HashMap<>();
		
		List<TodoAndFilter> ddlnTodayList = new ArrayList<>();
		ddlnTodayList = todoService.ddlnToday(user_id);
		
		List<TodoAndFilter> ddlnTommorrowList = new ArrayList<>();
		ddlnTommorrowList = todoService.ddlnTommorrow(user_id);

		List<TodoAndFilter> ddlnYesterDayList = new ArrayList<>();
		ddlnYesterDayList = todoService.ddlnYesterDay(user_id);
		
		List<TodoAndFilter> ddlnLastWeekList = new ArrayList<>();
		ddlnLastWeekList = todoService.ddlnLastWeek(user_id);
		
		List<TodoAndFilter> ddlnNextWeekList = new ArrayList<>();
		ddlnNextWeekList = todoService.ddlnNextWeek(user_id);
		
		List<TodoAndFilter> ddlnAfterList = new ArrayList<>();
		ddlnAfterList = todoService.ddlnAfter(user_id);
		
		List<TodoAndFilter> ddlnBeforeList = new ArrayList<>();
		ddlnBeforeList = todoService.ddlnBefore(user_id);
		
		responseData.put("마감기한 이전에", ddlnBeforeList);
		responseData.put("마감기한 일주일 전", ddlnLastWeekList);
		responseData.put("마감기한 어제", ddlnYesterDayList);
		responseData.put("마감기한 오늘", ddlnTodayList);
		responseData.put("마감기한 내일", ddlnTommorrowList);
		responseData.put("마감기한 일주일 후", ddlnNextWeekList);
		responseData.put("마감기한 나중에", ddlnAfterList);

		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

}