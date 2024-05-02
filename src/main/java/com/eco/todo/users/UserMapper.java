package com.eco.todo.users;

import org.apache.ibatis.annotations.Mapper;

import com.eco.todo.dto.UserSettings;
import com.eco.todo.dto.Users;

@Mapper
public interface UserMapper {
	
	public int chkUserId(String user_id);
	
	public void join(Users user);
	
	public Users findUser(String user_id);
	
	public UserSettings findUserSettings(String user_id);
	
	public int updateSettings(UserSettings setting);
	
}
