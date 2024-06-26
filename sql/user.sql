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
SELECT * FROM FILTERS;
SELECT * FROM todo;
SELECT * FROM V_TODO_FILTER;

ALTER TABLE users ADD NEWTODO_TOP char(1) DEFAULT 0;
ALTER TABLE users ADD IMPTODO_TOP char(1) DEFAULT 0;

COMMENT ON COLUMN "USERS"."NEWTODO_TOP" IS '새로운 항목 상단 정렬';
COMMENT ON COLUMN "USERS"."IMPTODO_TOP" IS '중요한 항목 상단 정렬';