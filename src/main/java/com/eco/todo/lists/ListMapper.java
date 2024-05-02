package com.eco.todo.lists;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.eco.todo.dto.TodoAndFilter;
import com.eco.todo.dto.Users;

@Mapper
public interface ListMapper {
	// 조회
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

}
