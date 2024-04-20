package com.eco.todo.form;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginForm {

	@NotBlank(message = "사용자ID는 필수항목입니다.")
	private String user_id;
	
	@NotBlank(message = "비밀번호는 필수항목입니다.")
	private String user_pw;
}
