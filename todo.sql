
-- TODO 저장 --
INSERT INTO TODO 
			(
			 TODO_IDX,
			 USER_ID,
			 TODO_TITLE,
			 CREATED_TIME
			)
	 VALUES (
	   		TODO_SEQ.NEXTVAL,
			'test3333',
			'디비버테스트3',
			SYSTIMESTAMP
			);
						
-- TODO 조회 -- 
SELECT  * FROM TODO;