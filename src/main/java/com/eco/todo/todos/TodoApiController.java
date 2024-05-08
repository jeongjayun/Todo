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

	@PostMapping("/save") // 저장하기
	public ResponseEntity<Map<String, Object>> saveTodo(@RequestBody TodoAndFilter todoAndFilter) {
		logger.info("할 일 저장하기");
		Map<String, Object> result = todoService.saveTodo(todoAndFilter);
		return ResponseEntity.ok(result);
	}

	@PostMapping("/update") // 수정하기
	public ResponseEntity<Map<String, Object>> updateTodo(@RequestBody Todo todo) {
		logger.info("수정하기");
		Map<String, Object> responseData = todoService.updateTodo(todo);
		return ResponseEntity.ok(responseData);
	}

	@PostMapping("/filterUpdate") // 필터 수정하기(나의 하루에 추가, 중요한 일 추가, 완료체크)
	public ResponseEntity<Map<String, Object>> updateFilters(@RequestBody Filters filters) {
		logger.info("필터 수정하기");
		Map<String, Object> responseData = todoService.updateFilters(filters);
		return ResponseEntity.ok(responseData);
	}

	@PostMapping("/delete/{todo_idx}") // 삭제하기
	public ResponseEntity<Map<String, Object>> deleteTodo(@PathVariable("todo_idx") int todo_idx,
			Authentication authentication) {
		logger.info("할 일 삭제하기");
		Map<String, Object> responseData = todoService.deleteTodo(todo_idx);
		return ResponseEntity.ok(responseData);
	}

	@GetMapping("/{todo_idx}") // 상세조회
	public ResponseEntity<Map<String, Object>> getTodoDetail(@PathVariable("todo_idx") int todo_idx,
			Authentication authentication) {
		logger.info("상세 조회하기");
		Map<String, Object> responseData = new HashMap<>();

		String user_id = authentication.getName();
		TodoAndFilter todoAndFilter = todoService.getTodoDetail(user_id, todo_idx);

		if (todoAndFilter == null) { 
			// 작성한 사용자 아이디와 일치하지 않는 인덱스 번호를 검색하면 
			String message = "해당되는 내용을 찾을 수 없습니다.";
			responseData.put("result", message);
		} else {
			// 작성한 사용자 아이디와 조회하려는 인덱스 번호 일치하면 
			responseData.put("result", todoAndFilter);
		}

		return ResponseEntity.ok(responseData);
	}

	@PostMapping("/search") // 검색
	public ResponseEntity<List<TodoAndFilter>> searchTitle(@RequestBody TodoAndFilter todoAndFilter) {
		String user_id = todoAndFilter.getUser_id();
		String todo_title = todoAndFilter.getTodo_title();
		List<TodoAndFilter> list = todoService.searchTitle(user_id, todo_title);
		return ResponseEntity.ok(list);
	}

}