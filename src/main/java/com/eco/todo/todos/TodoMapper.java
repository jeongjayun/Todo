package com.eco.todo.todos;

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
	public TodoAndFilter getTodoDetail(@Param("user_id") String user_id, @Param("todo_idx") int todo_idx);

	// 저장
	public int saveTodo(TodoAndFilter todoAndFilter);

	// 수정
	public int updateFilters(Filters filter);

	public int updateTodo(Todo todo);

	public int updateTodoTime(@Param("todo_idx") int todo_idx, @Param("updated_time") Timestamp updated_time);

	// 삭제
	public int deleteTodo(@Param("todo_idx") int todo_idx);

	public int deleteTodoTime(@Param("todo_idx") int todo_idx, @Param("deleted_time") Timestamp deleted_time);

	// 검색
	public ArrayList<TodoAndFilter> search(@Param("user_id") String user_id, @Param("todo_title") String todo_title);
	
}
