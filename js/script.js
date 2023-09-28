let basket = JSON.parse(localStorage.getItem("cart")) || [];
let book = JSON.parse(localStorage.getItem("discount")) || [];
let person = JSON.parse(localStorage.getItem("user")) || [];

const userIcon = document.querySelector(".fa-circle-user");
const user = person.find(user => user.loggedin === true);
const menu = document.querySelector('.user div');

userIcon.addEventListener('click', () => {
    if (user === undefined) {
        return window.location = `${window.location.origin}/login.html`;
    }

    menu.classList.toggle('active')
    return menu.innerHTML = `
        <h3>${user.username}<br /><span>${user.email}</span></h3>
        <ul>
            <li><i class="fa-solid fa-arrow-right-from-bracket"></i><a onclick="logout()">Logout</a></li>
        </ul>
    `
})

function logout() {
    if (confirm("Do you want to logout?")) {
        menu.classList.toggle('active');
        user.loggedin = false;
        localStorage.setItem("user", JSON.stringify(person));
        location.reload();
    }
}

function calculate() {
    const cartAmount = document.querySelector(".cart-amount");
    const totalQuantity = basket.reduce((sum, item) => sum + item.num, 0);
    cartAmount.innerHTML = totalQuantity;
}

calculate();

function formatNum(num) {
    return (num).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2})
}

function orderDetails() {
    const id = document.querySelector(".order-details .id");
    const date = document.querySelector(".order-details .date");
    const options = { year:'numeric' ,month:'short', day:'2-digit', hour:"2-digit" ,hour12:true, minute:'2-digit'}

    id.innerHTML = orderID();
    date.innerHTML  = new Date().toLocaleDateString(undefined, options)
}

function orderID() {
    let string = "#"
    for (let index = 0; index < 8; index++) {
        string += ~~(Math.random() * 10)
    }
    return string
}