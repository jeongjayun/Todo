-- USERS
-- 아이디 중복 확인
SELECT COUNT(USER_ID)
  FROM USERS
 WHERE USER_ID='test';

-- 회원 추가/생성
INSERT INTO USERS
			( USER_ID
			, USER_PW
			, USER_NM
			)
	 VALUES ( 'dbeaver'
	 		, '1234'
	 		, '테스트'
	   		);
	   	
	   	
-- 회원 조회
SELECT * FROM USERS;