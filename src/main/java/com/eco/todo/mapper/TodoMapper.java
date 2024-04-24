package com.eco.todo.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.eco.todo.dto.Filters;
import com.eco.todo.dto.TodoAndFilter;

@Mapper
public interface TodoMapper {

	public int saveTodo(TodoAndFilter todooAndFilter);

	public int updateFilters(Filters filter);

	public ArrayList<TodoAndFilter> findAllTodo(String user_id);

	public ArrayList<TodoAndFilter> filterTdy(String user_id);

	public ArrayList<TodoAndFilter> filterImp(String user_id);

	public ArrayList<TodoAndFilter> filterCmplt(String user_id);

	public ArrayList<TodoAndFilter> filterNotCmplt(String user_id);

}
