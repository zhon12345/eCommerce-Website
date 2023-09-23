let basket = JSON.parse(localStorage.getItem("cart")) || [];
let coupon = JSON.parse(localStorage.getItem("discount")) || [];

function calculate() {
    const cartAmount = document.querySelector(".cartAmount");
    const totalQuantity = basket.reduce((sum, item) => sum + item.num, 0);
    cartAmount.innerHTML = totalQuantity;
}

calculate();

function formatNum(num) {
    return (num).toLocaleString('en', {maximumFractionDigits: 2, minimumFractionDigits: 2})
}