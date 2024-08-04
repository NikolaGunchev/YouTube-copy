function loadUsersFromStorage(){
    return JSON.parse(localStorage.getItem('users')) || []
}

function saveUserInStorage(profile){
    localStorage.setItem('users',JSON.stringify(profile))
}

let userName=document.querySelector('.username').value
let password=document.querySelector('.password').value
let passwordCheck=document.querySelector('.password-check').value

document.querySelector('.sign-up').addEventListener('click',()=>{
if (passwordCheck===password) {
    let profile={
        name:userName,
        password:password
    }
    console.log(password);
    console.log(userName);
    console.log(profile);
} else {
    alert('wrong password')
    
}
})
console.log(loadUsersFromStorage());