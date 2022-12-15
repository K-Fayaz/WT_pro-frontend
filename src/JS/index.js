
// document elements
let toggler  = document.getElementById("hamburger-menu");
let linkCont = document.getElementById("nav-links");


toggler.addEventListener("click",()=>{
  console.log(linkCont.style.display);
  if(!linkCont.style.display || linkCont.style.display == "none")
  {
    linkCont.style.display = "flex";
  }else{
    linkCont.style.display = "none";
  }
});
