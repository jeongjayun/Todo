package com.eco.todo.service;

import java.sql.Timestamp;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.eco.todo.dto.Todo;
import com.eco.todo.mapper.TodoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {

	private final TodoMapper mapper;

	public String saveTodo(String todo_title, String user_id) {
		Todo todo = new Todo();
		Timestamp created_time = new Timestamp(System.currentTimeMillis());

		todo.setTodo_title(todo_title);
		todo.setUser_id(user_id);
		todo.setCreated_time(created_time);

		int result = mapper.saveTodo(todo);

		String message;

		if (result > 0) {
			return message = "저장되었습니다.";
		} else {
			return message = "저장에 실패하였습니다.";
		}
		
	}

	public ArrayList<Todo> findAllTodo(String user_id) {
		ArrayList<Todo> list = new ArrayList<>();
		list = mapper.findAllTodo(user_id);
		System.out.println(list);
		return list;
	}
}
