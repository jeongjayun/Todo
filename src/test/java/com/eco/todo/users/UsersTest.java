//package com.eco.todo.users;
//
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.eco.todo.dto.Users;
//import com.eco.todo.mapper.UserMapper;
//import com.eco.todo.service.UserService;
//
//@SpringBootTest
//@Configuration
//@Transactional
//public class UsersTest {
//
//	@Autowired
//	UserService userService;
//
//	@Autowired
//	UserMapper mapper;
//
//	@Test
//	@DisplayName("회원가입을 한다.")
//	void join() {
//		System.out.println("@회원가입을 한다.");
//		Users test = new Users();
//		test.setUser_id("test2");
//		test.setUser_pw("1234");
//		test.setUser_nm("이클립스1");
//		System.out.println(test);
//		userService.join(test);
//
//	}
//
//	@Test
//	@DisplayName("아이디가 중복인 경우 회원가입 할 수 없다.")
//	void join2() {
//		System.out.println("@아이디가 중복인 경우 회원가입 할 수 없다.");
//		Users test = new Users();
//		test.setUser_id("test2");
//		test.setUser_pw("1234");
//		test.setUser_nm("이클립스2");
//		System.out.println(test);
//		userService.join(test);
//	}
//}
