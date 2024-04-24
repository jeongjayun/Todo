package com.eco.todo.service;

import java.io.Console;
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
import com.eco.todo.mapper.TodoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {

	private final TodoMapper mapper;
	private static Logger logger = LoggerFactory.getLogger("ApiController.class");

	public Map<String, Object> saveTodo(TodoAndFilter todoAndFilter) {
		

		Timestamp created_time = new Timestamp(System.currentTimeMillis());
		todoAndFilter.setCreated_time(created_time);

		int result = mapper.saveTodo(todoAndFilter);

		System.out.println("서비스 : " + todoAndFilter);

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

	public ArrayList<TodoAndFilter> findAllTodo(String user_id) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.findAllTodo(user_id);
		return list;
	}

	public ArrayList<TodoAndFilter> filterTdy(String user_id) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterTdy(user_id);
		return list;
	}

	public ArrayList<TodoAndFilter> filterImp(String user_id) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterImp(user_id);
		return list;
	}

	public ArrayList<TodoAndFilter> filterCmplt(String user_id) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterCmplt(user_id);
		return list;
	}

	public ArrayList<TodoAndFilter> filterNotCmplt(String user_id) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterNotCmplt(user_id);
		return list;
	}

	public int updateFilters(Filters filter) {
		logger.info("filter 수정하기");

		System.out.println(filter);

		int result = mapper.updateFilters(filter);
		System.out.println(result);

		return result;
	}
}
