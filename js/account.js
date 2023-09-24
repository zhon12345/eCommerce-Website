function checkInputs(num) {
    if (num === 0) {
        checkUsername()
        checkPass()
        
        if (checkUsername() && checkPass()) {
            return true;
        }
    }

    if (num === 1) {
        checkUsername()
        checkEmail()
        checkPass()
        checkPass2() 

        if (checkUsername() && checkEmail() && checkPass() && checkPass2()) {
            return true;
        }
    }

    return false;
}

function checkUsername() {
    const username = document.querySelector("#username");
    const uName = username.value.trim();
    
    if (uName !== '') {
        success(username);
        return true;
    }
    
    error(username, 'Username cannot be blank');
    return false;
}

function checkEmail() {
    const email = document.querySelector("#email");
    const uEmail = email.value.trim();

    if (uEmail !== '' && isEmail(uEmail)) {
        success(email);
        return true;
    }

    if (uEmail === '' || !isEmail(uEmail)) {
        error(email, uEmail === '' ? 'E-mail cannot be blank' : 'Invalid e-mail');
    } 

    return false;
}

function checkPass() {
    const password = document.querySelector("#password");
    const uPass = password.value.trim();

    if (uPass !== '' && uPass.length >= 8) {
        success(password);
        return true;
    }

    if (uPass === '' || uPass.length < 8) {
        error(password, uPass === '' ? 'Password cannot be blank' : 'Password must have at least 8 characters');
    }

    return false;
}

function checkPass2() {
    const password2 = document.querySelector("#password2");
    const uPass2 = password2.value.trim();

    if (uPass2 !== '' && uPass !== uPass2) {
            success(password2);
            return true;
    }

    if (uPass2 === '' || uPass !== uPass2) {
        error(password2, uPass2 === '' ? 'Password cannot be blank': 'Passwords does not match');
    } 

    return false;
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

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}