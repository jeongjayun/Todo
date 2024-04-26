package com.eco.todo.mapper;


import java.sql.Timestamp;
import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eco.todo.dto.Filters;
import com.eco.todo.dto.TodoAndFilter;


@Mapper
public interface TodoMapper {

	public int saveTodo(TodoAndFilter todoAndFilter);

	public int updateFilters(Filters filter);
	
	public int updateTodoTime(@Param("todo_idx") int todo_idx, @Param("updated_time") Timestamp updated_time);
	
	public int deleteTodo(@Param("todo_idx") int todo_idx);
	
	public int deleteTodoTime(@Param("todo_idx") int todo_idx, @Param("deleted_time") Timestamp deleted_time);
	
	public TodoAndFilter getTodoDetail(@Param("user_id") String user_id, @Param("todo_idx") int todo_idx);

	public ArrayList<TodoAndFilter> findAllTodo(String user_id);

	public ArrayList<TodoAndFilter> filterTdy(String user_id);

	public ArrayList<TodoAndFilter> filterImp(String user_id);

	public ArrayList<TodoAndFilter> filterCmplt(String user_id);

	public ArrayList<TodoAndFilter> filterNotCmplt(String user_id);

}
