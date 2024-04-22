package com.eco.todo.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.eco.todo.dto.Filters;
import com.eco.todo.dto.Todo;

@Mapper
public interface TodoMapper {

	public int saveTodo(Todo todo);

	public int saveTodoFilter(Filters filters);

	public ArrayList<Todo> findAllTodo(String user_id);
	
	public ArrayList<Todo> filterTdy(String user_id);
	
	public ArrayList<Todo> filterImp(String user_id);
	
	public ArrayList<Todo> filterNotCmplt(String user_id);

	public int findMaxNum();

}
