const body=document.body;
const overlay=document.querySelector('.overlay')
const sidebar=document.querySelector('.sidebar-pop')

function renderPage(){
  document.querySelector('.hamburger-menu').addEventListener('click',()=>{
    overlay.style.display='block';
    sidebar.style.display='block';
    body.classList.add('no-scroll')
  })
  
  document.querySelector('.close-sidebar').addEventListener('click',()=>{
    overlay.style.display='none';
    sidebar.style.display='none';
    body.classList.remove('no-scroll')
  })
}
renderPage()
