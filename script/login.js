import { users } from "./userData.js";

let activeProfile=JSON.parse(localStorage.getItem('active')) || 'notLogged'

document.querySelector('.login').addEventListener("click",()=>{
    const name=document.querySelector('.js-user-name').value
    const pass=document.querySelector('.js-password').value
    let wrong=true

    let usersLogin=users.getUserDataFromStorage()
    usersLogin.forEach(user => {
        if (user.name===name && user.password===pass) {
            wrong=false
        }
    });
    if (wrong) {
        alert('Try again')
    } else{
        activeProfile=name
        localStorage.setItem('active', JSON.stringify(activeProfile))
        document.querySelector('.js-user-name').value=''
        document.querySelector('.js-password').value=''
        window.location.href='youtube.html';
    }
})



