package com.eco.todo.lists;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eco.todo.dto.TodoAndFilter;
import com.eco.todo.dto.Users;
import com.eco.todo.users.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/list")
@RequiredArgsConstructor
public class ListApiController {
	private static Logger logger = LoggerFactory.getLogger("ListApiController.class");
	private final ListService listService;
	private final UserService userService;
	
	// 오늘 할 일
	@GetMapping("/today")
	public ResponseEntity<List<TodoAndFilter>> filterTdy(Authentication authentication) {
		String user_id = authentication.getName();
		Users user = userService.chkUserSetting(user_id);

		List<TodoAndFilter> list = listService.filterTdy(user);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	// 중요한 일
	@GetMapping("/important")
	public ResponseEntity<List<TodoAndFilter>> filterImp(Authentication authentication) {
		String user_id = authentication.getName();
		Users user = userService.chkUserSetting(user_id);

		List<TodoAndFilter> list = listService.filterImp(user);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	// 완료된 일
	@GetMapping("/complete")
	public ResponseEntity<List<TodoAndFilter>> filterCmplt(Authentication authentication) {
		String user_id = authentication.getName();
		Users user = userService.chkUserSetting(user_id);

		List<TodoAndFilter> list = listService.filterCmplt(user);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	// 계획된 일
	@GetMapping("/scheduled")
	public ResponseEntity<Map<String, List<TodoAndFilter>>> scheduledList(@RequestParam("id") String user_id) {
		Map<String, List<TodoAndFilter>> responseData = new HashMap<>();
		Users user = userService.chkUserSetting(user_id);
		
		List<TodoAndFilter> ddlnTodayList = new ArrayList<>();
		ddlnTodayList = listService.ddlnToday(user);

		List<TodoAndFilter> ddlnTommorrowList = new ArrayList<>();
		ddlnTommorrowList = listService.ddlnTommorrow(user);

		List<TodoAndFilter> ddlnYesterDayList = new ArrayList<>();
		ddlnYesterDayList = listService.ddlnYesterDay(user);

		List<TodoAndFilter> ddlnLastWeekList = new ArrayList<>();
		ddlnLastWeekList = listService.ddlnLastWeek(user);

		List<TodoAndFilter> ddlnNextWeekList = new ArrayList<>();
		ddlnNextWeekList = listService.ddlnNextWeek(user);

		List<TodoAndFilter> ddlnAfterList = new ArrayList<>();
		ddlnAfterList = listService.ddlnAfter(user);

		List<TodoAndFilter> ddlnBeforeList = new ArrayList<>();
		ddlnBeforeList = listService.ddlnBefore(user);

		responseData.put("마감기한 이전에", ddlnBeforeList);
		responseData.put("마감기한 일주일 전", ddlnLastWeekList);
		responseData.put("마감기한 어제", ddlnYesterDayList);
		responseData.put("마감기한 오늘", ddlnTodayList);
		responseData.put("마감기한 내일", ddlnTommorrowList);
		responseData.put("마감기한 일주일 후", ddlnNextWeekList);
		responseData.put("마감기한 나중에", ddlnAfterList);

		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	// 모든 작업 불러오기 
	@GetMapping("/all")
	public ResponseEntity<List<TodoAndFilter>> filterAllTodo(Authentication authentication) {
		String user_id = authentication.getName();
		Users user = userService.chkUserSetting(user_id);

		List<TodoAndFilter> list = listService.findAllTodo(user);
		return new ResponseEntity<>(list, HttpStatus.OK);
	}


}
