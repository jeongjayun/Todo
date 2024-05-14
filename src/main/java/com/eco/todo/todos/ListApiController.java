package com.eco.todo.todos;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eco.todo.dto.TodoAndFilter;
import com.eco.todo.dto.UserSettings;
import com.eco.todo.users.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/list")
@RequiredArgsConstructor
public class ListApiController {
	private static Logger logger = LoggerFactory.getLogger("ListApiController.class");
	
	private final ListService listService;
	private final UserService userService;

	// 모든 작업 불러오기
	@GetMapping("/all")
	public ResponseEntity<List<TodoAndFilter>> filterAllTodo(Authentication authentication) {
		logger.info("모든 작업 불러오기");
		String user_id = authentication.getName();
		UserSettings userSettings = userService.getUserSetting(user_id); // 회원 설정값 가져오기
		List<TodoAndFilter> list = listService.findAllTodo(userSettings);
		return ResponseEntity.ok(list);
	}

	// 오늘 할 일
	@GetMapping("/today")
	public ResponseEntity<List<TodoAndFilter>> filterTdy(Authentication authentication) {
		logger.info("오늘 할 일 가져오기");
		String user_id = authentication.getName();
		UserSettings userSettings = userService.getUserSetting(user_id); // 회원 설정값 가져오기
		List<TodoAndFilter> list = listService.filterTdy(userSettings); // 설정값에 맞게 list 정렬 가져오기
		return ResponseEntity.ok(list);
	}

	// 중요한 일
	@GetMapping("/important")
	public ResponseEntity<List<TodoAndFilter>> filterImp(Authentication authentication) {
		logger.info("중요한 일 가져오기");
		String user_id = authentication.getName();
		UserSettings userSettings = userService.getUserSetting(user_id); // 회원 설정값 가져오기
		List<TodoAndFilter> list = listService.filterImp(userSettings); // 설정값에 맞게 list 정렬 가져오기
		return ResponseEntity.ok(list);
	}

	// 완료된 일
	@GetMapping("/complete")
	public ResponseEntity<List<TodoAndFilter>> filterCmplt(Authentication authentication) {
		logger.info("완료된 일 가져오기");
		String user_id = authentication.getName();
		UserSettings userSettings = userService.getUserSetting(user_id); // 회원 설정값 가져오기
		List<TodoAndFilter> list = listService.filterCmplt(userSettings); // 설정값에 맞게 list 정렬 가져오기
		return ResponseEntity.ok(list);
	}

	// 계획된 일
	@GetMapping("/scheduled")
	public ResponseEntity<Map<String, List<TodoAndFilter>>> scheduledList(Authentication authentication) {
		logger.info("계획된 일 가져오기");
		Map<String, List<TodoAndFilter>> responseData = new HashMap<>();
		String user_id = authentication.getName();
		UserSettings userSettings = userService.getUserSetting(user_id); // 회원 설정값 가져오기

		logger.info("계획된 일정 : 오늘 할 일");
		List<TodoAndFilter> ddlnTodayList = new ArrayList<>();
		ddlnTodayList = listService.ddlnToday(userSettings);

		logger.info("계획된 일정 : 이후에 할 일");
		List<TodoAndFilter> ddlnAfterList = new ArrayList<>();
		ddlnAfterList = listService.ddlnAfter(userSettings);

		logger.info("계획된 일정 : 이전에 할 일");
		List<TodoAndFilter> ddlnBeforeList = new ArrayList<>();
		ddlnBeforeList = listService.ddlnBefore(userSettings);

		responseData.put("마감기한 이전에", ddlnBeforeList);
		responseData.put("마감기한 오늘", ddlnTodayList);
		responseData.put("마감기한 나중에", ddlnAfterList);

		return ResponseEntity.ok(responseData);
	}

}
