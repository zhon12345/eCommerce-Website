const loginForm = document.querySelector(".login");
const signupForm = document.querySelector(".signup");
const loginInput = loginForm.querySelectorAll(".form-input");
const signupInput = signupForm.querySelectorAll(".form-input");

const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    checkUsername();
    checkPass();

    username.addEventListener('keyup', checkUsername);
    password.addEventListener('keyup', checkPass);

    if (Array.from(loginInput).every(element => !element.classList.contains('error'))) {
        location.href = loginForm.getAttribute("action");
    }
})

function formSignup() {
    checkUsername();
    checkEmail();
    checkPass();
    checkPass2();

    person.push({
        username: username.value
    })

    localStorage.setItem("user", JSON.stringify(person));
}

function checkUsername() {
    const namePattern = /^[a-zA-Z0-9_\.-]+$/;

    if (username.value.match(namePattern)) {
        success(username);
        return;
    }
    
    error(username, 'Username cannot be blank');
}

function checkEmail() {
    const mailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email.value.match(mailPattern)) {
        success(email);
        return;
    }

    if (email.value === '') {
        error(email, 'E-mail cannot be blank');
        return;
    }

    error(email, 'Invalid e-mail');
}

function checkPass() {
    const passPattern = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (password.value.match(passPattern)) {
        success(password);
        return;
    }

    if (password.value === '') {
        error(password, 'Password cannot be blank');
        return;
    }

    if (password.value.length < 8) {
        error(password, 'Password must have at least 8 characters')
    }
}

function checkPass2() {
    if (password2.value !== '' && password.value !== password2.value) {
        success(password2);
        return;
    }

    if (password2.value === '') {
        error(password2, 'Password cannot be blank');
        return;
    } 

    error(password2, 'Passwords does not match');
}

function error(input, message) {
    const formInput = input.parentElement;
    const small = formInput.querySelector('small');

    small.innerText = message;
    formInput.className = "form-input error";
}

function success(input) {
    const formInput = input.parentElement;

    formInput.className = "form-input success";
}