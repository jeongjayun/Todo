package com.eco.todo.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.eco.todo.dto.Filters;
import com.eco.todo.dto.Todo;
import com.eco.todo.dto.Todos;

@Mapper
public interface TodoMapper {

	public int saveTodo(Todo todo);
	
	public int updateFilters(Filters filter);

	public ArrayList<Todos> findAllTodo(String user_id);
	
	public ArrayList<Todos> filterTdy(String user_id);
	
	public ArrayList<Todos> filterImp(String user_id);

	public ArrayList<Todos> filterCmplt(String user_id);
	
	public ArrayList<Todos> filterNotCmplt(String user_id);
	
}
