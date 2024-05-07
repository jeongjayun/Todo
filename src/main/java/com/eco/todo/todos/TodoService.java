package com.eco.todo.todos;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.eco.todo.dto.Filters;
import com.eco.todo.dto.Todo;
import com.eco.todo.dto.TodoAndFilter;
import com.eco.todo.dto.Users;
import com.eco.todo.users.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {

	private final TodoMapper mapper;
	private final UserMapper userMapper;
	private static Logger logger = LoggerFactory.getLogger("TodoService.class");

	// 저장하기
	public Map<String, Object> saveTodo(TodoAndFilter todoAndFilter) {

		Timestamp created_time = new Timestamp(System.currentTimeMillis());
		todoAndFilter.setCreated_time(created_time);

		int result = mapper.saveTodo(todoAndFilter);

		Map<String, Object> returnData = new HashMap<>();

		if (result > 0) {
			String message = "저장되었습니다.";
			returnData.put("message", message);
			returnData.put("todo_idx", todoAndFilter.getTodo_idx());
			return returnData;

		} else {
			String message = "저장에 실패하였습니다.";
			returnData.put("message", message);
			return returnData;
		}

	}

	// 수정하기
	public Map<String, Object> updateTodo(Todo todo) {
		logger.info("수정하기");
		Map<String, Object> responseData = new HashMap<>();

		Timestamp updated_Time = new Timestamp(System.currentTimeMillis()); // 수정한 시간
		todo.setUpdated_time(updated_Time);
		int result = mapper.updateTodo(todo); // 업데이트 결과

		String message;
		if (result > 0) {
			message = "데이터를 수정했습니다.";
		} else {
			message = "데이터를 수정하지 못했습니다.";
		}

		responseData.put("수정 결과", message);
		return responseData;
	}

	public ArrayList<TodoAndFilter> search(String user_id, String todo_title) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.search(user_id, todo_title);
		return list;
	}

	public TodoAndFilter getTodoDetail(String user_id, int todo_idx) {
		logger.info("선택한 투두 상세정보 불러오기");
		TodoAndFilter todoAndFilter = mapper.getTodoDetail(user_id, todo_idx);
		return todoAndFilter;
	}

	public Map<String, Object> updateFilters(Filters filter) {
		logger.info("filter 수정하기");

		int result = mapper.updateFilters(filter);

		Map<String, Object> responseData = new HashMap<>();

		Timestamp updated_Time = new Timestamp(System.currentTimeMillis());
		int todo_idx = filter.getTodo_idx();
		mapper.updateTodoTime(todo_idx, updated_Time);

		String message;
		if (result > 0) {
			message = "데이터를 수정했습니다.";
		} else {
			message = "데이터를 수정하지 못했습니다.";
		}

		responseData.put("수정 결과", message);
		return responseData;
	}

	public Map<String, Object> deleteTodo(int todo_idx) {
		logger.info("선택한 투두 삭제하기, 삭제시간 업데이트 하기");

		Map<String, Object> responseData = new HashMap<>();

		Timestamp deleted_Time = new Timestamp(System.currentTimeMillis());
		int delete_result = mapper.deleteTodo(todo_idx);

		String message;
		if (delete_result > 0) {
			message = "데이터를 삭제했습니다.";
		} else {
			message = "데이터를 삭제하지 못했습니다.";
		}

		mapper.deleteTodoTime(todo_idx, deleted_Time);

		responseData.put("삭제 결과", message);
		return responseData;
	}

	int updateTodoTime(int todo_idx, Timestamp updated_Time) {
		logger.info("수정시간 업데이트하기");
		return mapper.updateTodoTime(todo_idx, updated_Time);
	}

	int deleteTodoTime(int todo_idx, Timestamp deleted_Time) {
		logger.info("삭제시간 업데이트하기");
		return mapper.deleteTodoTime(todo_idx, deleted_Time);
	}
}
