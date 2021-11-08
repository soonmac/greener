const slideContainer = document.querySelector(".slide-container");
const slide = document.querySelector(".slide");
let slides = document.querySelectorAll(".slide>li")
let currentSlide = 1;
const duration = 400;
let timerId=0;
let photoIndex=0;
let bullet = 0;

//인기메뉴 슬라이드 관련 변수
const popularSlide = document.querySelector(".popular-menu__slide__items");
const popularSlides = document.querySelectorAll(".popular-menu__slide__items > li");
const photoCount =Math.ceil(popularSlides.length/3);
const popularDuration = 1000;
const btnNext=document.querySelector(".next-btn");
const btnPrev=document.querySelector(".prev-btn");

// 슬라이드 버튼 클릭 이벤트
btnPrev.addEventListener("click", prevSlideImage)
btnNext.addEventListener("click", nextSlideImage)

//다음 사진으로 슬라이드
function nextSlideImage() {
    photoIndex++;
    photoIndex %= photoCount;
    popularSlide.style.marginLeft = -100*photoIndex + "%";
    popularSlide.style.transition = popularDuration+"ms";
}
// 이전 사진으로 슬라이드
function prevSlideImage() {
    if(photoIndex==0) return;
    if(photoIndex>0){
        photoIndex --;
        console.log(photoIndex);
        photoIndex %= photoCount;
        popularSlide.style.marginLeft = -100*photoIndex + "%";
        popularSlide.style.transition = popularDuration+"ms";
    }
}




// bullet 생성하는 함수
function createBullets() {
    const bullets = document.createElement("ul");
    bullets.setAttribute("class","slide__bullets");
    slideContainer.appendChild(bullets);
    slides.forEach(_slide => {
        let index = Array.prototype.indexOf.call(slides,_slide);
        const a = document.createElement("a");
        a.setAttribute("href","#");
        a.innerHTML=`"${index}"`;
        const li = document.createElement("li")
        li.setAttribute("class","bullet");
        li.appendChild(a);
        bullets.appendChild(li);
    })
    return bullet = document.querySelectorAll(".slide__bullets > li");
}
createBullets();
bullet[0].classList.add("active");



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
bullet.forEach((btn, i)=> {
    btn.addEventListener("click",()=>{
        menualNav(i);
        currentSlide= i;
    })
})

function repeat (activeClass) {
    let active = document.getElementsByClassName("active");
    let i =1;

    function repeater() {
        setInterval(function(){
            [...active].forEach((activeSlide)=>{
                activeSlide.classList.remove("active");
            })
            slides[i].classList.add("active");
            bullet[i].classList.add("active");
            i++;

            if(slides.length == i) {
                i =0;
            }
            if( i >=slides.length) {
                return;
            }
            
            slide.style.marginLeft = "-100%";
            slide.style.transition = duration+"ms";
            window.setTimeout(function(){ 
                slide.appendChild(slide.firstElementChild);
                slide.removeAttribute("style");
            },duration)
        },3500)
    }
    repeater()
}
repeat();


