package com.eco.todo.service;

import java.sql.Timestamp;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.eco.todo.dto.Todo;
import com.eco.todo.mapper.TodoMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {

	private final TodoMapper mapper;

	public void saveTodo(String todo_title, String user_id) {
		Todo todo = new Todo();
		Timestamp created_time = new Timestamp(System.currentTimeMillis());

		todo.setTodo_title(todo_title);
		todo.setUser_id(user_id);
		todo.setCreated_time(created_time);
		
		System.out.println(todo);

		mapper.saveTodo(todo);
	}
}
