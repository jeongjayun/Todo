package com.eco.todo.todos;

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

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/todo")
@RequiredArgsConstructor
public class TodoApiController {
	private static Logger logger = LoggerFactory.getLogger("TodoApiController.class");
	private final TodoService todoService;

	@PostMapping("/save")
	public ResponseEntity<Map<String, Object>> saveTodo(@RequestBody TodoAndFilter todoAndFilter) {
		// 오늘 할 일 목록 또는 중요 목록에서 투두 작성 시 카테고리에 맞게 저장됨
		Map<String, Object> result = todoService.saveTodo(todoAndFilter);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PostMapping("/update")
	public ResponseEntity<Map<String, Object>> updateTodo(@RequestBody Todo todo) {
		Map<String, Object> responseData = new HashMap<>();
		responseData = todoService.updateTodo(todo);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@PostMapping("/filterUpdate")
	public ResponseEntity<Map<String, Object>> updateFilters(@RequestBody Filters filters) {
		Map<String, Object> responseData = new HashMap<>();
		responseData = todoService.updateFilters(filters);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@PostMapping("/delete/{todo_idx}")
	public ResponseEntity<Map<String, Object>> deleteTodo(@PathVariable("todo_idx") int todo_idx,
			Authentication authentication) {
		Map<String, Object> responseData = new HashMap<>();
		responseData = todoService.deleteTodo(todo_idx);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@GetMapping("/{todo_idx}")
	public ResponseEntity<Map<String, Object>> getTodoDetail(@PathVariable("todo_idx") int todo_idx,
			Authentication authentication) {
		Map<String, Object> responseData = new HashMap<>();
		String user_id = authentication.getName();
		TodoAndFilter todoAndFilter = todoService.getTodoDetail(user_id, todo_idx);
		responseData.put("result", todoAndFilter);
		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@PostMapping("/search")
	public ResponseEntity<List<TodoAndFilter>> searchTitle(@RequestBody TodoAndFilter todoAndFilter) {
		String user_id = todoAndFilter.getUser_id();
		String todo_title = todoAndFilter.getTodo_title();
		List<TodoAndFilter> list = todoService.search(user_id, todo_title);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	

}