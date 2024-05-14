# 마이크로소프트 Todo 클론 코딩
![image](https://github.com/jeongjayun/Todo/assets/116062065/20406348-61f2-4acf-90ff-2f43a46535ef)
![image](https://github.com/jeongjayun/Todo/assets/116062065/4f31bbe2-31e4-497c-9b81-879ff008d8ec)
![image](https://github.com/jeongjayun/Todo/assets/116062065/9ed821c9-b954-48e9-8c6c-3d6393bd8642)
![image](https://github.com/jeongjayun/Todo/assets/116062065/8848fa68-55ad-482f-afe4-183ad90b2acd)
![image](https://github.com/jeongjayun/Todo/assets/116062065/e67b57c6-57a3-4e65-96de-b37046d9772d)
![image](https://github.com/jeongjayun/Todo/assets/116062065/23682e7a-5390-475b-8d87-d762a1a79863)
![image](https://github.com/jeongjayun/Todo/assets/116062065/fe08916d-33c9-4f45-8b32-8e27e2a8e756)

- 사용된 이미지 : 우이 작가님 (https://twitter.com/ouie_e)

## 프로젝트 기간
- 화면 및 기능 분석 : 2024/04/08 - 2024/04/11 (4일)
- DB 및 일정 설계 : 2024/04/16 - 2024/04/17 (2일) 
- 개발 기간 : 2024/04/18 - 2024/05/05 (18일)
  - 화면 및 기능 구현 : 2024/04/18 - 2024/04/29
  - 리팩토링 : 2024/04/30 - 2024/05/05 + 그 외 자잘한 오류 수정 
  
## 프로젝트 환경 및 기술
- Language : HTML, CSS, JavaScript, Thymeleaf, Java SE - 17
- Framework : Spring Boot 3.24, MyBatis
- DB : Oracle
- TOOL : Eclipse, DBeaver, VSCode

## DB 구조도
![image](https://github.com/jeongjayun/Todo/assets/116062065/9f32892a-d581-4201-8f22-5c5028493cd5)
- Todo 테이블과 Filters 를 View 로 엮어서 조회 시 사용함
- 되도록 Todo, Filters 의 각 테이블에 직접 값을 저장, 삭제, 수정함.

## 주요 기능
  1. Spring Security 활용한 회원가입, 로그인/로그아웃
  2. 할 일 저장, 삭제, 수정
  3. 할 일을 filters에 따른 조회 + 설정에 따라 정렬 변경 가능 (되도록 SPA로 구현하려 함.)

## 배운 점
1. Fetch API Get/Post 사용에 익숙해짐.
2. MyBatis 동적쿼리 적용하는 부분.
3. 최대한 바닐라JS로 기능 구현하려고 했으나 DatePicker 위해 Jquery 일부 사용.

## 아쉬운 점
1. Get, Post Mapping 만 사용해서 만든 부분. (RESTful 하게 만들지 못함)
2. 예외처리까지 기한 내 만들지 못하고 클라이언트 기능단에서 기능 테스트 해본 점.
3. 단위 테스트를 해보고 싶었지만 기한 내 못만들까봐 적용하지 못한 점. 실제로도 빠듯했음.
