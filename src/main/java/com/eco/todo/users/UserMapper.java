package com.eco.todo.users;

import org.apache.ibatis.annotations.Mapper;

import com.eco.todo.dto.UserSettings;
import com.eco.todo.dto.Users;

@Mapper
public interface UserMapper {
	
	public int chkUserId(String user_id);
	
	public void join(Users user);
	
	public Users findUser(String user_id); // User 내용 전부찾기 
	
	public UserSettings findUserSettings(String user_id); // 설정관련 부분만 찾기
	
	public int updateSettings(UserSettings setting); // 설정관련 부분만 변경하기
	
}
