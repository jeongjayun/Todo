package com.eco.todo.mapper;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eco.todo.dto.Filters;
import com.eco.todo.dto.Todo;
import com.eco.todo.dto.TodoAndFilter;

@Mapper
public interface TodoMapper {

	// 저장
	public int saveTodo(TodoAndFilter todoAndFilter);

	// 수정
	public int updateFilters(Filters filter);

	public int updateTodo(Todo todo);

	public int updateTodoTime(@Param("todo_idx") int todo_idx, @Param("updated_time") Timestamp updated_time);

	// 삭제
	public int deleteTodo(@Param("todo_idx") int todo_idx);

	public int deleteTodoTime(@Param("todo_idx") int todo_idx, @Param("deleted_time") Timestamp deleted_time);

	// 조회
	public TodoAndFilter getTodoDetail(@Param("user_id") String user_id, @Param("todo_idx") int todo_idx);

	public ArrayList<TodoAndFilter> findAllTodo(String user_id);

	public ArrayList<TodoAndFilter> filterTdy(String user_id);

	public ArrayList<TodoAndFilter> filterImp(String user_id);

	public ArrayList<TodoAndFilter> filterCmplt(String user_id);

	public ArrayList<TodoAndFilter> filterNotCmplt(String user_id);

	// 마감 기한 별 조회
	public ArrayList<TodoAndFilter> ddlnToday(String user_id);
	
	public ArrayList<TodoAndFilter> ddlnTommorrow(String user_id);

	public ArrayList<TodoAndFilter> ddlnYesterDay(String user_id);

	public ArrayList<TodoAndFilter> ddlnLastWeek(String user_id);

	public ArrayList<TodoAndFilter> ddlnNextWeek(String user_id);

	public ArrayList<TodoAndFilter> ddlnAfter(String user_id);

	public ArrayList<TodoAndFilter> ddlnBefore(String user_id);

	// 검색
	public ArrayList<TodoAndFilter> search(@Param("user_id") String user_id, @Param("todo_title") String todo_title);

}
