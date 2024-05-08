package com.eco.todo.todos;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.eco.todo.dto.TodoAndFilter;
import com.eco.todo.dto.UserSettings;
import com.eco.todo.dto.Users;

@Mapper
public interface ListMapper {
	// 조회
	public ArrayList<TodoAndFilter> findAllTodo(UserSettings userSettings); // 모든 작업 불러오기

	public ArrayList<TodoAndFilter> filterTdy(UserSettings userSettings); // 오늘 할 일 불러오기

	public ArrayList<TodoAndFilter> filterImp(UserSettings userSettings); // 중요한 일 불러오기

	public ArrayList<TodoAndFilter> filterCmplt(UserSettings userSettings); // 완료한 일 불러오기

	// 마감 기한 별 조회
	public ArrayList<TodoAndFilter> ddlnToday(UserSettings userSettings); // 마감일자 오늘 불러오기

	public ArrayList<TodoAndFilter> ddlnAfter(UserSettings userSettings); // 마감일자 이후에 불러오기

	public ArrayList<TodoAndFilter> ddlnBefore(UserSettings userSettings); // 마감일자 이전에 불러오기
}
