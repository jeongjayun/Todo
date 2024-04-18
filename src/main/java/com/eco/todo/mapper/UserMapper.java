package com.eco.todo.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.eco.todo.dto.Users;

@Mapper
public interface UserMapper {
	
	public void join(Users user);
	
}
