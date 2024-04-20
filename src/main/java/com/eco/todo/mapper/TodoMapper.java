package com.eco.todo.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.eco.todo.dto.Todo;


@Mapper
public interface TodoMapper {

	public void saveTodo(Todo todo);

}
