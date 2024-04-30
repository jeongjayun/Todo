package com.eco.todo.mapper;

import java.sql.Timestamp;
import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eco.todo.dto.Filters;
import com.eco.todo.dto.Todo;
import com.eco.todo.dto.TodoAndFilter;
import com.eco.todo.dto.Users;

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

	public ArrayList<TodoAndFilter> findAllTodo(Users user);

	public ArrayList<TodoAndFilter> filterTdy(Users user);

	public ArrayList<TodoAndFilter> filterImp(Users user);

	public ArrayList<TodoAndFilter> filterCmplt(Users user);

	// 마감 기한 별 조회
	public ArrayList<TodoAndFilter> ddlnToday(Users user);
	
	public ArrayList<TodoAndFilter> ddlnTommorrow(Users user);

	public ArrayList<TodoAndFilter> ddlnYesterDay(Users user);

	public ArrayList<TodoAndFilter> ddlnLastWeek(Users user);

	public ArrayList<TodoAndFilter> ddlnNextWeek(Users user);

	public ArrayList<TodoAndFilter> ddlnAfter(Users user);

	public ArrayList<TodoAndFilter> ddlnBefore(Users user);

	// 검색
	public ArrayList<TodoAndFilter> search(@Param("user_id") String user_id, @Param("todo_title") String todo_title);
	
	// 설정
	

}
