package com.eco.todo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.eco.todo.dto.Users;
import com.eco.todo.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserMapper mapper;
//	private final PasswordEncoder passwordEncoder;

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);

	public void join(String user_id, String user_pw, String user_nm) {
		logger.info("join");

		Users user = new Users();
		user.setUser_id(user_id);

//		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//		user.setUser_pw(passwordEncoder.encode(user_pw));
		// TODO : 복호화 후 데이터 크기를 생각 못함. 처음 설정보다 용량이 커서 저장이 안됨

		user.setUser_pw(user_pw);
		user.setUser_nm(user_nm);

		mapper.join(user);
	}

	public String chkUserId(String user_id) {
		int result = mapper.chkUserId(user_id);
		
		String message;
		if (result > 0) {
			message = "중복된 아이디 입니다.";
		} else if (result < 0) {
			message = "시스템 에러";
		} else {
			message = "사용 가능한 아이디입니다.";
		}


		return message;
	}

}
