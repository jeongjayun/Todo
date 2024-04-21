package com.eco.todo.dto;

import lombok.Data;

@Data
public class Filters {
	private int TODO_IDX;
	private String USER_ID;
	private char FIL_TDY;
	private char FIL_IMP;
	private char FIL_CMPLT;
	private char FIL_DLT;
}
