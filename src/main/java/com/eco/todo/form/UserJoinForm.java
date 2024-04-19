package com.eco.todo.form;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserJoinForm {

	@Size(min = 5, max = 10)
	@NotEmpty(message = "사용자ID는 필수항목입니다.")
	private String user_id;

	@Size(min = 3, max = 20)
	@NotEmpty(message = "비밀번호는 필수항목입니다.")
	private String user_pw;

	@Size(min = 3, max = 20)
	@NotEmpty(message = "비밀번호 확인은 필수항목입니다.")
	private String user_pw2;

	@Size(min = 3, max = 10)
	@NotEmpty(message = "이름은 필수항목입니다.")
	private String user_nm;
	
}
