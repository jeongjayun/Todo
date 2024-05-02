package com.eco.todo.lists;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.eco.todo.dto.TodoAndFilter;
import com.eco.todo.dto.Users;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ListService {

	private final ListMapper mapper;
	private static Logger logger = LoggerFactory.getLogger("ListService.class");

	public ArrayList<TodoAndFilter> findAllTodo(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.findAllTodo(user);
		return list;
	}

	public ArrayList<TodoAndFilter> filterTdy(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterTdy(user);
		return list;
	}

	public ArrayList<TodoAndFilter> filterImp(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterImp(user);
		return list;
	}

	public ArrayList<TodoAndFilter> filterCmplt(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.filterCmplt(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnYesterDay(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnYesterDay(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnToday(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnToday(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnTommorrow(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnTommorrow(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnLastWeek(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnLastWeek(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnNextWeek(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnNextWeek(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnAfter(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnAfter(user);
		return list;
	}

	public ArrayList<TodoAndFilter> ddlnBefore(Users user) {
		ArrayList<TodoAndFilter> list = new ArrayList<>();
		list = mapper.ddlnBefore(user);
		return list;
	}

}
