package com.eco.todo.todos;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.eco.todo.dto.TodoAndFilter;
import com.eco.todo.dto.UserSettings;
import com.eco.todo.dto.Users;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ListService {

	private final ListMapper mapper;

	// 모든 작업 가져오기
	public ArrayList<TodoAndFilter> findAllTodo(UserSettings userSettings) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.findAllTodo(userSettings);
		return list;
	}

	// 오늘 할 일 필터링
	public ArrayList<TodoAndFilter> filterTdy(UserSettings userSettings) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterTdy(userSettings);
		return list;
	}

	// 중요한 일 필터링
	public ArrayList<TodoAndFilter> filterImp(UserSettings userSettings) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterImp(userSettings);
		return list;
	}

	// 완료된 일 필터링
	public ArrayList<TodoAndFilter> filterCmplt(UserSettings userSettings) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterCmplt(userSettings);
		return list;
	}

	// 마감기한 : 오늘
	public ArrayList<TodoAndFilter> ddlnToday(UserSettings userSettings) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnToday(userSettings);
		return list;
	}

	// 마감기한 : 이후에
	public ArrayList<TodoAndFilter> ddlnAfter(UserSettings userSettings) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnAfter(userSettings);
		return list;
	}

	// 마감기한 : 이전에
	public ArrayList<TodoAndFilter> ddlnBefore(UserSettings userSettings) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnBefore(userSettings);
		return list;
	}
}
