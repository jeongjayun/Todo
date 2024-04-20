package com.eco.todo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eco.todo.dto.Users;
import com.eco.todo.mapper.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

	private final UserMapper mapper;

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);

	public void join(String user_id, String user_pw, String user_nm) {
		logger.info("service. 회원가입");

		Users user = new Users();
		user.setUser_id(user_id);

		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		user.setUser_pw(passwordEncoder.encode(user_pw));		

		user.setUser_nm(user_nm);

		mapper.join(user);
	}

	public int chkUserId(String user_id) {
		logger.info("service. 중복 아이디 확인");
		return mapper.chkUserId(user_id);
	}

	@Override
	public UserDetails loadUserByUsername(String user_id) throws UsernameNotFoundException {
		// 사용자의 정보와 권한을 갖는 UserDetails인터페이스 반환

		// 빈 문자열이 입력 되었을 때
		if (user_id == null || user_id.isEmpty()) {
			throw new UsernameNotFoundException("사용자 ID를 입력하세요.");
		}

		// 문자열이 제대로 입력이 되면
		Users users = mapper.findUser(user_id);

		if (users == null) {
			throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
		}

		return User.builder().username(users.getUser_id()).password(users.getUser_pw()).build();
	}

}
