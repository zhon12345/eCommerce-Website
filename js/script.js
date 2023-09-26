let basket = JSON.parse(localStorage.getItem("cart")) || [];
let book = JSON.parse(localStorage.getItem("discount")) || [];
let person = JSON.parse(localStorage.getItem("user")) || [];

function calculate() {
    const cartAmount = document.querySelector(".cart-amount");
    const totalQuantity = basket.reduce((sum, item) => sum + item.num, 0);
    cartAmount.innerHTML = totalQuantity;
}

calculate();

function formatNum(num) {
    return (num).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2})
}

function login() {
    if (person.length > 0 && person.find(user => user.loggedin === true)) {
        const userIcon = document.querySelector(".fa-circle-user");

        const result = confirm("You're already logged in, go to cart page?");
        return result ? window.location = `${window.location.origin}/cart.html` : "";
    }

    window.location = `${window.location.origin}/login.html`;
}