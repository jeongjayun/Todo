package com.eco.todo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Filters {
	private int todo_idx;
	private String user_id;
	private char fil_tdy;
	private char fil_imp;
	private char fil_cmplt;
	private char fil_dlt;
}
