package com.eco.todo.users.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserJoinForm {

	@Size(min = 3, max = 20)
	@NotBlank(message = "사용자ID는 필수항목입니다.")
	private String user_id;

	@Size(min = 8, max = 20)
	@NotBlank(message = "비밀번호는 필수항목입니다.")
	private String user_pw;

	@NotBlank(message = "비밀번호 확인은 필수항목입니다.")
	private String user_pw2;

//	@Size(min = 2, max = 10)
	@Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "이름은 특수문자를 제외한 2~10자리여야 합니다.")
	@NotBlank(message = "이름은 필수항목입니다.")
	private String user_nm;
	
}
