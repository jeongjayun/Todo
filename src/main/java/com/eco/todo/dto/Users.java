package com.eco.todo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Users {
	private String user_id;
	private String user_pw;
	private String user_nm;
	
	private char newTodo_top;
	private char impTodo_top;
}
