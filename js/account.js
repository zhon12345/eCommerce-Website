function switchForm(mode) {
    const login = document.querySelector(".login-form");
    const signup = document.querySelector(".signup-form")

    if (mode === "signup") {
        login.className = 'login-form not-active';
        signup.className = 'signup-form';
    }

    if (mode === "login") {
        login.className = 'login-form';
        signup.className = 'signup-form not-active';
    }
}

const loginForm = document.querySelector(".login");
const signupForm = document.querySelector(".signup");
const loginInput = loginForm.querySelectorAll(".form-input");
const signupInput = signupForm.querySelectorAll(".form-input");


loginForm.addEventListener('submit', event => {
    const username = loginForm.querySelector("#username");
    const password = loginForm.querySelector("#password");

    event.preventDefault();
    checkUsername(0, username);
    checkPass(0, password);

    username.addEventListener('keyup', () => {
        checkUsername(0, username)
    });

    if (Array.from(loginInput).every(element => !element.classList.contains('error'))) {
        const search = person.find(user => user.username === username.value);

        search.loggedin = true;
        localStorage.setItem("user", JSON.stringify(person));
        location.href = loginForm.getAttribute("action");
    }
})

signupForm.addEventListener('submit', event => {
    const username = signupForm.querySelector("#username");
    const password = signupForm.querySelector("#password");
    const email = signupForm.querySelector("#email");
    const password2 = signupForm.querySelector("#password2");

    event.preventDefault();
    checkUsername(1, username);
    checkEmail(email);
    checkPass(1, password);
    checkPass2(password, password2);

    username.addEventListener('keyup', () => {
        checkUsername(1, username)
    });

    email.addEventListener('keyup', () => {
        checkEmail(email)
    });

    password.addEventListener('keyup', () => {
        checkPass(1, password)
    });

    password2.addEventListener('keyup', () => {
        checkPass2(password2)
    })

    if (Array.from(signupInput).every(element => !element.classList.contains('error'))) {
        person.push({
            username: username.value,
            email: email.value,
            password: password.value,
            loggedin: true
        })
    
        localStorage.setItem("user", JSON.stringify(person));
        location.href = signupForm.getAttribute("action");
    }
})

function checkUsername(mode, username) {
    const search = person.find(user => user.username === username.value);

    if (username.value === '') {
        error(username, 'Username cannot be blank');
        return;
    }

    if (username.value.length < 3 || username.value.length > 20) {
        error(username, 'Username must be between 3 and 20 characters')
    }

    if (mode === 0) {
        if (search === undefined) {
            error(username, 'Incorrect username');
            return;
        }

        success(username);
    }

    if (mode === 1) {
        const namePattern = /^[a-zA-Z0-9_-]{3,20}$/;

        if (username.value.match(namePattern)) {
            success(username);
            return;
        }

        if (search !== undefined) {
            error(username, 'Username has already been taken');
        }

        error(username, 'Username must have letters, numbers, dashes and underscore only.')
    }
}

function checkEmail(email) {
    const mailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email.value.match(mailPattern)) {
        success(email);
        return;
    }

    if (email.value === '') {
        error(email, 'E-mail cannot be blank');
        return;
    }

    error(email, 'Invalid e-mail address');
}

function checkPass(mode, password) {
    if (password.value === '') {
        error(password, 'Password cannot be blank');
        return;
    }

    if (mode === 0) {
        const search = person.find(user => user.password === password.value);

        if (search === undefined) {
            error(password, 'Incorrect password');
            return;
        }

        success(password);
    }

    if (mode === 1) {
        const passPattern = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;

        if (password.value.match(passPattern)) {
            success(password);
            return;
        }
    
        if (password.value.length < 8) {
            error(password, 'Password must be at least 8 characters long.')
        }
    }
}

function checkPass2(password, password2) {
    if (password2.value === '') {
        error(password2, 'Password cannot be blank');
        return;
    } 

    if (password.value === password2.value) {
        success(password2);
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