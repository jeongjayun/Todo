package com.eco.todo.common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
//공부장님 코멘트 : 스프링 시큐리티 외에 xml로도 회원가입해보기 
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.csrf(csrf->csrf.disable()) //크로스 사이트 요청위조 비활성화 
				.authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
						.requestMatchers("/img/**", "/js/**", "/css/**", "/login/**","/join/**", "/api/user/chkId", "/").permitAll() // 인증이 필요없음
						.anyRequest().authenticated())
				.headers((headers) -> headers.addHeaderWriter(
						new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)))
				.formLogin((formlogin) -> formlogin
						.loginPage("/login")
						.usernameParameter("user_id")
						.passwordParameter("user_pw")
						.defaultSuccessUrl("/list"))
				.logout((logout)->logout
						.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
						.logoutSuccessUrl("/"));
		return http.build();
	}

	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		//시큐리티 인증 처리 
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
