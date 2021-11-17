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