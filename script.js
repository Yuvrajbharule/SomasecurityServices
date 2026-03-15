/* HERO AUTO SLIDER */

let slides = document.querySelectorAll(".slide");

let current = 0;

function nextSlide(){

slides[current].classList.remove("active");

current++;

if(current >= slides.length){
current = 0;
}

slides[current].classList.add("active");

}

setInterval(nextSlide,4000);



/* SCROLL ANIMATION */

let elements = document.querySelectorAll(".animate");

window.addEventListener("scroll",()=>{

elements.forEach(el=>{

let pos = el.getBoundingClientRect().top;

if(pos < window.innerHeight - 100){

el.classList.add("show");

}

});

});



/* WHATSAPP ENQUIRY FORM */

document.getElementById("enquiryForm").addEventListener("submit",function(e){

e.preventDefault();

let name=document.getElementById("name").value;
let phone=document.getElementById("phone").value;
let service=document.getElementById("service").value;
let message=document.getElementById("message").value;

let text=`Hello Soma Security Services

Name: ${name}
Phone: ${phone}
Service: ${service}
Message: ${message}`;

let url="https://wa.me/919657914714?text="+encodeURIComponent(text);

window.open(url);

});