
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
			'트리거 테스트',
			SYSTIMESTAMP
			);
						
-- TODO 조회 --
SELECT  * FROM TODO;

-- SEQ 조회 --
select TODO_SEQ.nextval FROM DUAL

-- 전체 VIEW 생성 --
CREATE OR REPLACE VIEW v_todo_filter
AS 
	SELECT  t.TODO_IDX
		   ,t.USER_ID
		   ,t.TODO_TITLE
		   ,t.TODO_MEMO
		   ,t.TODO_DDLN
		   ,t.CREATED_TIME
		   ,t.UPDATED_TIME
		   ,t.DELETED_TIME
		   ,f.FIL_TDY
		   ,f.FIL_IMP
		   ,f.FIL_CMPLT
		   ,f.FIL_DLT
	  FROM TODO t
		   ,FILTERS f 
	 WHERE t.TODO_IDX = f.TODO_IDX
;

-- 전체 VIEW 조회 --
SELECT * FROM V_TODO_FILTER;

-- FILTER 조회 --
SELECT * FROM FILTERS;

-- FILTER 추가 --
INSERT INTO FILTERS
			(
			 TODO_IDX
			,USER_ID
			,FIL_TDY
			,FIL_IMP
			,FIL_CMPLT
			,FIL_DLT
			)
	 VALUES (
	 		 54
	 		,'test3333'
	 		,1
	 		,1
	 		,0
	 		,0
	 		)
;

-- todo 테이블 비우고 seq 초기화 --
-- 시퀀스 검색 --
SELECT *
  FROM USER_SEQUENCES 
 WHERE SEQUENCE_NAME = 'TODO_SEQ';

-- 1. 시퀀스의 현재 값 확인
SELECT LAST_NUMBER
  FROM USER_SEQUENCES
 WHERE SEQUENCE_NAME = 'TODO_SEQ';

-- 2. 시퀀스의 INCREMENT 현재 값만큼 빼도록 설정 --
ALTER SEQUENCE TODO_SEQ INCREMENT BY - 6;

-- 3. 시퀀스의 NEXTVAL 값 조회
SELECT TODO_SEQ.NEXTVAL FROM DUAL;

-- 3.1 시퀀스의 CURRVAL 값 조회 
SELECT TODO_SEQ.CURRVAL FROM DUAL;
-- 4. 시퀀스의 increment를 1로 설정
ALTER SEQUENCE TODO_SEQ INCREMENT BY 1;

-- 3.1 시퀀스의 CURRVAL 값 조회 
SELECT TODO_SEQ.CURRVAL FROM DUAL;




-- INSERT 트리거 --
CREATE TRIGGER TODO_INSERT AFTER INSERT ON TODO
FOR EACH ROW
BEGIN 
	INSERT INTO FILTERS
			(
			 TODO_IDX
			,USER_ID
			,FIL_TDY
			,FIL_IMP
			,FIL_CMPLT
			,FIL_DLT
			)
	 VALUES (
	 		 :NEW.TODO_IDX
	 		,:NEW.USER_ID
	 		,1
	 		,1
	 		,0
	 		,0
	 		)
;
END;

DROP TRIGGER TODO_INSERT;