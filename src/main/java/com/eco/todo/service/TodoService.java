package com.eco.todo.service;

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
import com.eco.todo.mapper.TodoMapper;
import com.eco.todo.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {

	private final TodoMapper mapper;
	private final UserMapper userMapper;
	private static Logger logger = LoggerFactory.getLogger("TodoService.class");

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

	public ArrayList<TodoAndFilter> search(String user_id, String todo_title) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.search(user_id, todo_title);
		return list;
	}

	public ArrayList<TodoAndFilter> findAllTodo(Users user) {
		logger.info("정렬확인");
		System.out.println("엥 왜 안되ㅐ?");
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.findAllTodo(user);
		return list;
	}

	public ArrayList<TodoAndFilter> filterTdy(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterTdy(user);
		return list;
	}

	public ArrayList<TodoAndFilter> filterImp(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterImp(user);
		return list;
	}

	public ArrayList<TodoAndFilter> filterCmplt(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterCmplt(user);
		return list;
	}

	public Map<String, Object> updateTodo(Todo todo) {
		logger.info("filter 수정하기, 수정시간 업데이트 하기");

		int result = mapper.updateTodo(todo);
		Map<String, Object> responseData = new HashMap<>();

		Timestamp updated_Time = new Timestamp(System.currentTimeMillis());

		int todo_idx = todo.getTodo_idx();
		int update_result = mapper.updateTodo(todo);

		String message;
		if (result > 0) {
			message = "데이터를 수정했습니다.";
		} else {
			message = "데이터를 수정하지 못했습니다.";
		}

		int updated_time_result = mapper.updateTodoTime(todo_idx, updated_Time);

		responseData.put("수정 성공여부", message);
		responseData.put("수정 성공시간 변경 성공여부", updated_Time);

		return responseData;
	}


	public Map<String, Object> updateFilters(Filters filter) {
		logger.info("filter 수정하기, 수정시간 업데이트 하기");

		int result = mapper.updateFilters(filter);

		Map<String, Object> responseData = new HashMap<>();

		Timestamp updated_Time = new Timestamp(System.currentTimeMillis());
		int todo_idx = filter.getTodo_idx();
		int update_result = mapper.updateTodoTime(todo_idx, updated_Time);

		String message;
		if (result > 0) {
			message = "데이터를 수정했습니다.";
		} else {
			message = "데이터를 수정하지 못했습니다.";
		}

		int updated_time_result = mapper.deleteTodoTime(todo_idx, updated_Time);

		responseData.put("수정 성공여부", message);
		responseData.put("수정 성공시간 변경 성공여부", updated_Time);

		return responseData;
	}

	public int updateTodoTime(int todo_idx, Timestamp updated_Time) {
		logger.info("수정시간 업데이트하기");

		System.out.println(todo_idx);

		int result = mapper.updateTodoTime(todo_idx, updated_Time);
		System.out.println(result);

		return result;
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

		int updated_time_result = mapper.deleteTodoTime(todo_idx, deleted_Time);

		responseData.put("삭제 성공여부", message);
		responseData.put("삭제 성공시간 변경 성공여부", deleted_Time);

		return responseData;
	}

	public int deleteTodoTime(int todo_idx, Timestamp deleted_Time) {
		logger.info("삭제시간 업데이트하기");

		System.out.println(todo_idx);

		int result = mapper.deleteTodoTime(todo_idx, deleted_Time);
		System.out.println(result);

		return result;
	}

	public TodoAndFilter getTodoDetail(String user_id, int todo_idx) {
		logger.info("선택한 투두 상세정보 불러오기");
		;
		TodoAndFilter todoAndFilter = mapper.getTodoDetail(user_id, todo_idx);
		return todoAndFilter;
	}

	public ArrayList<TodoAndFilter> ddlnYesterDay(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnYesterDay(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnToday(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnToday(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnTommorrow(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnTommorrow(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnLastWeek(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnLastWeek(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnNextWeek(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnNextWeek(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnAfter(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnAfter(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnBefore(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnBefore(user);
		return list;
	}
}
