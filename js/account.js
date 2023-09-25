const form = document.querySelector(".login");
const nameField = document.querySelector("#username");
const passField = document.querySelector("#password");
const nameInput = nameField.parentElement;
const passInput = passField.parentElement;

function formLogin() {
    checkUsername();
    checkPass();

    if (nameInput.classList.contains('error') || passInput.classList.contains('error')) {
        return;
    }

    person.push({
        username: nameField.value
    })

    localStorage.setItem("user", JSON.stringify(person));
    form.submit();
}

function checkUsername() {
    if (nameField.value.trim() !== "") {
        success(username);
        return;
    }
    
    error(username, 'Username cannot be blank');
}

function checkPass() {
    const uPass = passField.value.trim();

    if (uPass !== '' && uPass.length >= 8) {
        success(password);
        return;
    }

    if (uPass === '' || uPass.length < 8) {
        error(password, uPass === '' ? 'Password cannot be blank' : 'Password must have at least 8 characters');
        return;
    }
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