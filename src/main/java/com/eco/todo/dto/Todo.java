package com.eco.todo.dto;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Todo{
	private int todo_idx;
	private String user_id;
	private String todo_title;
	private String todo_memo;
	private Date todo_ddln;
	private Timestamp created_time;
	private Timestamp updated_time;
	private Timestamp deleted_time;
}
