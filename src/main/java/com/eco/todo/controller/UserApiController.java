package com.eco.todo.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eco.todo.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserApiController {
	private static Logger logger = LoggerFactory.getLogger("UserController.class");
	private final UserService service;

	@GetMapping("/chkId/{user_id}")
	public ResponseEntity<Map<String, Object>> chkUserId(@PathVariable("user_id") String user_id) {
		Map<String, Object> responseData = new HashMap<>();

		String message = service.chkUserId(user_id); // 검색된 쿼리값에 따른 문구
		responseData.put("message", message);

		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

//	@PostMapping("/join")
//	public ResponseEntity<Map<String, Object>> postJoin(@RequestParam("user_id") String user_id,
//			@RequestParam("user_pw") String user_pw, @RequestParam("user_nm") String user_nm) {
//		
//		Map<String, Object> responseData = new HashMap<>();
//		
//		logger.info("postJoin");
//		service.join(user_id, user_pw, user_nm);
//		
//		return new ResponseEntity<>(responseData, HttpStatus.OK);
//	}

}