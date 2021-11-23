"use-strict";
// 메인 슬라이드
const slideContainer = document.querySelector(".slide-container");
const slide = document.querySelector(".slide");
let slides = Array.from(document.querySelectorAll(".slide>li"));
const slideImgs = document.querySelectorAll(".slide > li > a > img")
let currentSlide = 0;
const duration = 400;
let timerId=0;
let bullet = 0;
const offsetTime = 3500;

//인기메뉴 슬라이드 관련 변수
const popularSlide = document.querySelector(".popular-menu__slide__items");
const popularSlides = Array.from(document.querySelectorAll(".popular-menu__slide__items > li"));
const popularSlideLi = document.querySelector(".popular-menu__slide__items > li")
const photoCount =popularSlides.length;
const popularDuration = 600;
let photoIndex=0;
let isDragging = false,
    startPos = 0,
    currentTranslate=0,
    prevTranslate=0,
    animationId=0
const btnNext=document.querySelector(".next-btn");
const btnPrev=document.querySelector(".prev-btn");
const popularSlideContainer = document.querySelector(".popular-menu__slide-container");
const body = document.querySelector("body");

// 우클릭 방지
PreventRightClick(popularSlideContainer);

//우클릭 메뉴 뜨는거방지
function PreventRightClick(area) {
    area.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false
    }
}

let mobileFlag = true;
class Swiper {
    constructor(area,slideArray) {
        this.area = area;
        this.slideArray = slideArray;

    }
    swiper() {
            this.slideArray.forEach((item,index) => {
                const slideImage = item.querySelector('img');
                // disable default image drag
                if(slideImage) {
                    slideImage.addEventListener('dragstart', (e) => e.preventDefault());
                }
                // 터치 이벤트
                this.area.addEventListener("touchstart", touchStart(index));
                this.area.addEventListener("touchend", touchEnd);
                this.area.addEventListener("touchmove", touchMove);
                
                // 마우스 이벤트
                this.area.addEventListener("mousedown", touchStart(index));
                this.area.addEventListener("mouseup", touchEnd);
                this.area.addEventListener("mouseleave", touchEnd);
                this.area.addEventListener("mousemove", touchMove);
            
            })
    }
    destroy() {
        this.slideArray.forEach((item,index) => {
            const slideImage = item.querySelector('img');
            // disable default image drag
            if(slideImage) {
                slideImage.removeEventListener('dragstart', (e) => e.preventDefault());
            }
            // 터치 이벤트
            this.area.removeEventListener("touchstart", touchStart(index));
            this.area.removeEventListener("touchend", touchEnd);
            this.area.removeEventListener("touchmove", touchMove);
            
            // 마우스 이벤트
            this.area.removeEventListener("mousedown", touchStart(index));
            this.area.removeEventListener("mouseup", touchEnd);
            this.area.removeEventListener("mouseleave", touchEnd);
            this.area.removeEventListener("mousemove", touchMove);
        
        })
    }
    
}

class PopularSwiper extends Swiper{
};
const popularSwiper = new PopularSwiper(popularSlideContainer,popularSlides);
window.addEventListener("resize", function(){
    if(window.innerWidth <= 1023){
        popularSwiper.swiper();
    }else {
        popularSwiper.destroy();
    }
})
if (window.matchMedia("(max-width: 1023px)").matches) {
    popularSwiper.swiper();
}

// 터치슬라이드 관련 함수들
function touchStart() {
    return function(event) {
        startPos = getPositionX(event);
        isDragging =  true;
        animationId = requestAnimationFrame(animation);
    }
}
function touchEnd() {
    isDragging =  false;
    cancelAnimationFrame(animationId);
  setPositionByIndex()
}
function touchMove(event) {
    if(isDragging) {
        //실시간으로 내 포인터의 위치를 갱신
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos
    }
}
// 클릭, 터치 좌표 구하는 함수
function getPositionX(event) {
    return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX
}
// 애니메이션 관련
function animation() {
    setSliderPosition();
    if(isDragging) requestAnimationFrame(animation);
}
// 터치해서 넘길 때 얼마나 이동시킬지 
function setSliderPosition() {
    const slideWidth = popularSlideLi.offsetWidth;
    const slideFirstPos = -popularSlide.offsetWidth + slideWidth;
    if(currentTranslate < slideFirstPos) {
        currentTranslate = slideFirstPos;
    } if (currentTranslate  > slideWidth) {
        currentTranslate = 0;
    }
    popularSlide.style.transform=`translate(${currentTranslate}px,-50%)`
}
function setPositionByIndex() {
    prevTranslate = currentTranslate;
    setSliderPosition()
}


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


popularItemBtn.forEach((btn,i) => {
    btn.addEventListener("mouseenter",function(){
        popularItemTooltip[i].style.visibility = "visible";
    })
    btn.addEventListener("mouseleave",function(){
        popularItemTooltip[i].removeAttribute("style");
    })
})


