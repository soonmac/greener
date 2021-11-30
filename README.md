# greener
 그리너 홈페이지 제작


## 프로젝트의 구성 안내

### 목표

샐러드 브랜드 <그리너>를 소개하는 홈페이지를 제작했습니다.

### 기술스택

##### JavaScript ES6

라이브러리가 없는 순수 자바스크립트로 구성되어있습니다.

##### SCSS 

7-1 패턴을 참고하여 컴포넌트별로 파일을 분류하여 main.scss에 import한 후 CSS로 컴파일 했습니다.

### 기능 설명

##### 1. 자동 슬라이드

3초마다 자동으로 이미지가 넘어가는 자동 슬라이드입니다. 

이미지 하단의 bullet 버튼을 누르면 해당 번호의 이미지로 슬라이딩 됩니다. 

bullet 버튼들은 슬라이드 이미지의 수에 따라 만들어지도록 코드를 짰음

CSS의 background-image 속성을 이용하여 모바일 해상도에서는 자동으로 모바일 전용 슬라이드 이미지가 뜨도록 제작했습니다.

##### 2. 스와이프 (모바일 한정)

슬라이드에 스와이프 기능을 넣었습니다.

터치 방향에 따라 슬라이드가 움직입니다.

슬라이드의 시작과 끝에서 일정 이상 이동할 경우 슬라이드가 제자리를 찾아가는 코드를 작성했습니다. (슬라이드가 컨테이너에서 벗어나는 것을 방지)

##### 3. 버튼이 있는 슬라이드

화살표가 그려진 버튼을 누를 때마다 한 칸씩 이동합니다.

##### 4. 모바일 대응 반응형 홈페이지

랩탑(1024px) 타블렛(768px) 대형 모바일(480px) 소형 모바일 총 4가지 해상도에 따른 미디어쿼리를 작성했습니다.

### 해당 프로젝트에서 쓰인 가이미지의 저작권은 (주)그리너에프엔비에 있습니다.