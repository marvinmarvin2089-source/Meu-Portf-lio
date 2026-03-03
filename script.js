const text = "Olá, eu sou Marcus Vinícius — Desenvolvedor Front-End"
let i = 0

function typing(){

if(i < text.length){

document.getElementById("typing").innerHTML += text.charAt(i)

i++

setTimeout(typing,70)

}else{

setTimeout(()=>{
document.getElementById("typing").innerHTML = ""
i = 0
typing()
},2000)

}

}

typing()

/* ANIMAÇÃO SCROLL */

const sections = document.querySelectorAll("section")

window.addEventListener("scroll", ()=>{

sections.forEach(sec =>{

const top = window.scrollY
const offset = sec.offsetTop - 400

if(top > offset){
sec.classList.add("show")
}

})

})

/* HEADER MUDANDO COR */

const header = document.getElementById("header")

window.addEventListener("scroll", ()=>{

if(window.scrollY > 50){
header.classList.add("scrolled")
}else{
header.classList.remove("scrolled")
}

})

/* BOTÃO VOLTAR TOPO */

const topBtn = document.getElementById("topBtn")

window.addEventListener("scroll", ()=>{

if(window.scrollY > 400){
topBtn.style.display = "flex"
}else{
topBtn.style.display = "none"
}

})

topBtn.onclick = ()=>{
window.scrollTo({
top:0,
behavior:"smooth"
})
}