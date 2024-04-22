package com.eco.todo.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.eco.todo.dto.Todo;
import com.eco.todo.mapper.TodoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {

	private final TodoMapper mapper;
	private static Logger logger = LoggerFactory.getLogger("ApiController.class");

	public Map<String, Object> saveTodo(String todo_title, String user_id) {
		Todo todo = new Todo();

		Timestamp created_time = new Timestamp(System.currentTimeMillis());

		todo.setTodo_title(todo_title);
		todo.setUser_id(user_id);
		todo.setCreated_time(created_time);

		int result = mapper.saveTodo(todo);

		Map<String, Object> returnData = new HashMap<>();

		if (result > 0) {
			String message = "저장되었습니다.";
			returnData.put("message", message);
			returnData.put("todo_idx", todo.getTodo_idx());
			return returnData;
		} else {
			String message = "저장에 실패하였습니다.";
			returnData.put("message", message);
			return returnData;
		}

	}

	public ArrayList<Todo> findAllTodo(String user_id) {
		ArrayList<Todo> list = new ArrayList<>();
		list = mapper.findAllTodo(user_id);
		return list;
	}

	public ArrayList<Todo> filterTdy(String user_id) {
		ArrayList<Todo> list = new ArrayList<>();
		list = mapper.filterTdy(user_id);
		return list;
	}

	public ArrayList<Todo> filterImp(String user_id) {
		ArrayList<Todo> list = new ArrayList<>();
		list = mapper.filterImp(user_id);
		return list;
	}

	public ArrayList<Todo> filterNotCmplt(String user_id) {
		ArrayList<Todo> list = new ArrayList<>();
		list = mapper.filterNotCmplt(user_id);
		return list;
	}

	public int findMaxNum() {
		logger.info("Todo 테이블에 현재 가장 큰 수 구하기");
		return mapper.findMaxNum();
	}
}
