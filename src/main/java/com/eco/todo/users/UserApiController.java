package com.eco.todo.users;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eco.todo.dto.UserSettings;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserApiController {
	
	private static Logger logger = LoggerFactory.getLogger("ApiController.class");
	private final UserService service;
	
	@GetMapping("/chkId")
	public ResponseEntity<Map<String, Object>> chkUserId(@RequestParam("id") String user_id) {
		logger.info("ApiController. 회원가입 시 아이디 중복체크");
		Map<String, Object> responseData = new HashMap<>();

		int result = service.chkUserId(user_id); // 검색된 쿼리값
		responseData.put("아이디 검색 결과", result);

		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}
	
	@GetMapping("/settings")
	public ResponseEntity<Map<String,UserSettings>> checkUserSettings(@RequestParam("id") String user_id){
		Map<String, Object> responseData = new HashMap<>();
		
		UserSettings setting=service.getUserSetting(user_id);
		System.out.println(setting);
		
		responseData.put("현재 설정", setting);
		
		return new ResponseEntity(responseData, HttpStatus.OK);
	}
	

	@PostMapping("/settings")
	public ResponseEntity<Map<String, Object>> updateSettings(@RequestBody UserSettings setting) {
		Map<String, Object> responseData = new HashMap<>();
				
		String Message=service.updateSettings(setting);
		responseData.put("결과", Message);
		
		return new ResponseEntity(responseData, HttpStatus.OK);
	}

}
