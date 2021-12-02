# Greener
<그리너> 홈페이지 제작

## 프로젝트 목표

JavaScript와 SCSS를 이용해 샐러드 브랜드 <그리너>를 소개하는 홈페이지를 제작

## 프로젝트에서 사용한 기술
### JavaScript ES6

jQuery 등의 라이브러리를 사용하지 않고 JavaScript 프로그램 작성

### SCSS 

7-1 패턴을 참고해 컴포넌트별로 나눠 작성했으며, main.scss에 임포트한 후 CSS로 컴파일

## 프로젝트의 기능 설명
### 이미지 슬라이드
![슬라이드](cap_01.PNG)
* 3초마다 자동으로 이미지가 넘어가는 이미지 슬라이드 기능
* 이미지 하단의 블릿 버튼을 누르면 해당 번호의 이미지로 이동
* 블릿 버튼들은 JavaScript 프로그램에서 슬라이드 이미지의 개수에 따라 생성
* CSS의 background-image 속성을 이용하여 모바일 기기의 해상도에서는 자동으로 모바일용 슬라이드 이미지가 뜨도록 작성

### 스와이프 (모바일 기기 한정)
![스와이프](cap_03.PNG)
* 이미지 슬라이드 기능에 스와이프 기능 추가
* 스와이프 방향에 따라 슬라이드가 이동
* 슬라이드의 시작과 끝에서 일정 이상 이동하면, 슬라이드가 컨테이너 영역을 벗어나는 것을 방지하기 위해 제자리를 찾아가도록 작성

### 버튼이 있는 이미지 슬라이드
![스와이프](cap_02.PNG)
* 화살표 버튼을 누를 때마다 한 칸씩 이동

### 모바일 대응 반응형 웹페이지

* PC(1024px), 타블렛(768px), 대형 모바일(480px), 소형 모바일 등, 모두 4가지 가로 해상도에 따라 보이도록 미디어 쿼리 작성

> 이 프로젝트에서 쓰인 이미지의 저작권은 (주)그리너에프엔비에 있습니다.

