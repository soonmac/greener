//sub 페이지 hover
const toppingsItems = document.querySelectorAll(".toppings__list__item");
const toppingsItemTitles = document.querySelectorAll(".topping-category__list__info");

toppingsItems.forEach((item,i) => {
    item.addEventListener("mouseenter",function(){
        toppingsItemTitles[i].classList.add("topping-category__list__info--hover");
        toppingsItemTitles[i].classList.add("slide-top");
    })
    item.addEventListener("mouseleave",function(){
        toppingsItemTitles[i].classList.remove("topping-category__list__info--hover");
        toppingsItemTitles[i].classList.remove("slide-top");
    })
})