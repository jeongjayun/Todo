package com.eco.todo.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eco.todo.dto.Filters;
import com.eco.todo.dto.TodoAndFilter;


@Mapper
public interface TodoMapper {

	public int saveTodo(TodoAndFilter todoAndFilter);

	public int updateFilters(Filters filter);
	
	public TodoAndFilter getTodoDetail(@Param("user_id") String user_id, @Param("todo_idx") int todo_idx);

	public ArrayList<TodoAndFilter> findAllTodo(String user_id);

	public ArrayList<TodoAndFilter> filterTdy(String user_id);

	public ArrayList<TodoAndFilter> filterImp(String user_id);

	public ArrayList<TodoAndFilter> filterCmplt(String user_id);

	public ArrayList<TodoAndFilter> filterNotCmplt(String user_id);

}
