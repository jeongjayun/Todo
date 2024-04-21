package com.eco.todo.controller;

import org.springframework.stereotype.Controller;

import com.eco.todo.service.TodoService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class TodoController {

	private final TodoService service;
	
	
}
