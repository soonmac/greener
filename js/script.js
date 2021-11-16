const slideContainer = document.querySelector(".slide-container");
const slide = document.querySelector(".slide");
let slides = document.querySelectorAll(".slide>li")
let currentSlide = 0;
const duration = 400;
let timerId=0;
let photoIndex=0;
let bullet = 0;
const offsetTime = 3500;

//인기메뉴 슬라이드 관련 변수
const popularSlide = document.querySelector(".popular-menu__slide__items");
const popularSlides = document.querySelectorAll(".popular-menu__slide__items > li");
const photoCount =popularSlides.length;
const popularDuration = 600;
const btnNext=document.querySelector(".next-btn");
const btnPrev=document.querySelector(".prev-btn");

// 슬라이드 버튼 클릭 이벤트
btnPrev.addEventListener("click", prevSlideImage)
btnNext.addEventListener("click", nextSlideImage)

//다음 사진으로 슬라이드
function nextSlideImage() {
    photoIndex++;
    photoIndex %= photoCount;
    popularSlide.style.marginLeft = -35*photoIndex + "%";
    popularSlide.style.transition = popularDuration+"ms";
}
// 이전 사진으로 슬라이드
function prevSlideImage() {
    if(photoIndex==0) return;
    if(photoIndex>0){
        photoIndex --;
        photoIndex %= photoCount;
        popularSlide.style.marginLeft = -35*photoIndex + "%";
        popularSlide.style.transition = popularDuration+"ms";
    }
}


//메인 슬라이드(헤더)

// bullet 생성하는 함수
function createBullets() {
    const bullets = document.createElement("ul");
    bullets.setAttribute("class","slide__bullets");
    slideContainer.appendChild(bullets);
    slides.forEach((_slide,i) => {
        const a = document.createElement("a");
        a.setAttribute("href","#");
        a.innerHTML=`"${i}"`;
        const li = document.createElement("li")
        li.setAttribute("class","bullet");
        li.appendChild(a);
        bullets.appendChild(li);
    })
    return bullet = document.querySelectorAll(".slide__bullets > li");
}
createBullets();
bullet[0].classList.add("active");


//bullet을 클릭하면 active 클래스를 부여하는 함수
function menualNav(manual) {
    slides.forEach((slide)=>{
        slide.classList.remove("active");
        bullet.forEach((btn)=>{
            btn.classList.remove("active");
        })
    })
    slides[manual].classList.add("active");
    bullet[manual].classList.add("active");
}
//bullet을 클릭하면 해당 슬라이드로 이동하는 함수
bullet.forEach((btn,i)=> {
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        menualNav(i);
        const clickedIndex = i;
        console.log(clickedIndex);
        let step = clickedIndex - currentSlide;
        currentSlide = clickedIndex;
        slides = document.querySelectorAll(".slide>li");
        let slidesArr = [...slides];
        console.log(clickedIndex);
        console.log(step);
        if(step>0){
            let sliceSlides = slidesArr.slice(undefined,step);
            slide.style.transition = duration+"ms";
            slide.style.marginLeft=step * (-100)+"%";
            window.setTimeout(function(){ 
                slide.removeAttribute("style");
                slide.append(...sliceSlides);
            },duration)
        }else {
            sliceSlides = slidesArr.slice(step);
            slide.prepend(...sliceSlides);
            slide.style.marginLeft = step * 100 + "%";
            slide.style.transition = "0ms";
            window.setTimeout(function(){ 
                slide.style.marginLeft = 0;
                slide.style.transition = duration+"ms";
            },0)
        }
        if (step == 0) return;
    })
    
})

// 다음 사진으로 넘어가는 슬라이드
function doSlide() {
    
    currentSlide++;
    currentSlide%=slides.length;
    
    slide.style.marginLeft = "-100%";
    slide.style.transition = duration+"ms";
    window.setTimeout(function(){ 
        slide.appendChild(slide.firstElementChild);
        slide.removeAttribute("style");
    },duration)
    menualNav(currentSlide);
}
//자동 슬라이드
function repeater() {
    timerId = window.setInterval(doSlide,offsetTime);
    slideContainer.addEventListener("mouseenter",function(){
        window.clearInterval(timerId);
    })
    slideContainer.addEventListener("mouseleave",function(){
        timerId=window.setInterval(doSlide,offsetTime)
    })
}
repeater();

//메인 페이지 hover
const popularItems = document.querySelectorAll(".popular-menu__slide__items div");
const popularItemBtn = document.querySelectorAll(".popular-menu__slide__items .popular-menu__slide__items__more-btn");
const popularItemTooltip = document.querySelectorAll(".popular-menu__slide__items__tooltip");


//돋보기 버튼 hover
if (matchMedia("screen and (min-width: 1024px)").matches) {
    popularItems.forEach((item,i) => {
        item.addEventListener("mouseenter",function(){
            popularItemBtn[i].classList.add("slide-top-btn");
        })
        item.addEventListener("mouseleave",function(){
            popularItemBtn[i].classList.remove("slide-top-btn");
        })
    })
}
window.onresize = function() {
    if (window.innerWidth > 1024) {
        document.location.reload();
    }
}
//크롬 개발자 도구로 화면을 줄였을 때 새로고침을 해야 matchMedia 함수가 제대로 작동할듯?



popularItemBtn.forEach((btn,i) => {
    btn.addEventListener("mouseenter",function(){
        popularItemTooltip[i].style.visibility = "visible";
    })
    btn.addEventListener("mouseleave",function(){
        popularItemTooltip[i].removeAttribute("style");
    })
})

//드롭다운 관련
const dropdown = document.querySelector(".nav__menu__dropdown");
const submenu = document.querySelector(".nav__submenu");
const downBtn = document.querySelector(".dropdown-down");
const dropdownLi = document.querySelectorAll(".nav__submenu > li")
dropdown.addEventListener("click",function(){
    submenu.classList.toggle("on");

    
})
if (matchMedia("screen and (max-width: 479px)").matches) {
    dropdown.addEventListener("click",function(){
        downBtn.classList.toggle("open");
    })
}
